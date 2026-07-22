export type Post = {
  slug: string;
  title: string;
  tags: string[];
  excerpt: string;
  content: string;
};

export const posts: Post[] = [
  {
    slug: "kafka-publish-failure-and-retry",
    title: "Kafka 발행 실패로 DB에 유령 레코드가 남는 문제",
    tags: ["Kafka", "Spring", "Transaction", "Frontend"],
    excerpt:
      "저장은 성공했는데 Kafka 발행만 실패하면 DB에 처리되지 않을 레코드가 남았습니다. 원인을 추적해 Kafka 발행을 트랜잭션에서 분리하고, 프론트엔드가 직접 재시도와 취소를 구동하는 구조로 바꿨습니다.",
    content: `마이그레이션 등록 화면에서 이상한 버그 리포트가 들어왔습니다. 분명 저장에 실패했다는 에러를 받았는데, 같은 기간으로 다시 등록을 시도하면 이번엔 중복이라며 막히는 현상이었습니다. tb_migration_history 테이블을 확인해보니 실제로 WAITING 상태의 레코드가 남아 있었고, 정작 이 데이터를 처리해야 할 데몬(emsv3-data-migration)은 해당 작업을 전혀 인지하지 못하고 있었습니다.

원인을 추적해보니 기존 코드는 @Transactional이 붙은 insert() 메서드가 정상적으로 반환된 뒤, 컨트롤러에서 Kafka 발행을 호출하는 구조였습니다. @Transactional은 메서드가 반환되는 시점에 커밋이 확정되기 때문에 DB 저장은 이미 끝난 뒤였고, 그 다음에 Kafka 발행이 실패하면 되돌릴 방법이 없었습니다. 결과적으로 DB에는 처리되지 않을 레코드가 남고, 클라이언트는 에러만 받은 채 재시도할 방법도 없는 상태가 됐습니다.

해결을 위해 먼저 insert()에서 Kafka 발행 로직을 완전히 분리했습니다. insert()는 DB 저장만 담당하고, Kafka 발행은 sendKafka(id)라는 별도 트랜잭션 없는 메서드로 빼냈습니다. POST /compose는 insert 후 sendKafka를 호출하고, 실패하면 {kafkaRetry: true, id}를 응답으로 내려줍니다. 재시도는 백엔드가 아니라 프론트엔드가 직접 구동하도록 설계했는데, 이렇게 하면 진행 상황을 실시간으로 보여주기 쉽고 사용자가 페이지를 이탈했을 때 즉시 재시도를 중단시킬 수 있기 때문입니다.

프론트에서는 실패 응답을 받으면 startKafkaRetry(id)를 실행해 1초 간격으로 POST /api/kafka-retry/{id}를 최대 10회까지 호출합니다. 화면 하단에는 "⟳ Kafka 재접속 시도 중 3 / 10" 같은 배너를 띄워 진행 상황을 보여주고, 성공하거나 최종 실패하면 배너를 제거합니다. 10회 모두 실패하면 DELETE /api/delete를 호출해 DB의 레코드를 CANCELLED로 정리해 정합성을 맞춥니다.

까다로웠던 부분은 페이지 이탈 처리였습니다. beforeunload 시점에는 $.ajax 같은 일반 요청이 보장되지 않기 때문에, navigator.sendBeacon으로 DELETE 요청을 비동기 이탈 상황에서도 안전하게 전송하도록 했습니다. 재시도 타이머도 clearTimeout으로 함께 정리해, 페이지를 벗어난 뒤에도 좀비 요청이 남지 않도록 만들었습니다.`,
  },
  {
    slug: "kafka-producer-infinite-retry-log",
    title: "Kafka 브로커가 죽었을 뿐인데 로그가 초당 수십 줄씩 쌓인 이유",
    tags: ["Kafka", "Spring", "Logging"],
    excerpt:
      "브로커 연결이 끊긴 상태에서 send() 예외가 처리된 뒤에도 재접속 로그가 끊임없이 쌓였습니다. 싱글턴 프로듀서의 IO 스레드가 응답과 무관하게 독립적으로 재시도한다는 게 원인이었습니다.",
    content: `운영 중인 서버 로그를 보다가 이상한 점을 발견했습니다. Kafka 브로커(192.168.11.9:29092)에 연결할 수 없는 상황에서 kafkaTemplate.send(...).get() 호출이 예외를 던지고 응답까지 정상적으로 내려간 뒤에도, "Rebootstrapping with...", "Connection to node -1 could not be established", "Bootstrap broker disconnected" 같은 로그가 초당 수십 줄씩 끊임없이 쌓이고 있었습니다.

원인은 Kafka의 ProducerFactory가 싱글턴 프로듀서 인스턴스를 재사용한다는 데 있었습니다. 프로듀서 내부의 NetworkClient IO 스레드는 send 성공이나 실패와 무관하게 독립적으로 브로커 재접속을 계속 시도합니다. 기본값 기준으로 RECONNECT_BACKOFF_MAX_MS가 1초, DELIVERY_TIMEOUT_MS가 2분, RETRIES는 사실상 무한(Integer.MAX_VALUE)이었기 때문에, send 요청 하나가 실패한 뒤에도 IO 스레드는 계속 살아남아 로그를 만들어내고 있었던 것입니다.

KafkaConfig.java에서 MAX_BLOCK_MS와 REQUEST_TIMEOUT_MS를 3초로, DELIVERY_TIMEOUT_MS를 5초로 낮추고 RETRIES를 0으로 설정해 빠르게 실패하도록 바꿨습니다. 재접속 간격은 RECONNECT_BACKOFF_MS/MAX를 1초로 고정해, 프론트엔드에서 1초 간격으로 도는 재시도 로직과 박자를 맞췄습니다. 마지막으로 application.yaml의 local 프로파일에서 org.apache.kafka.clients.NetworkClient와 Metadata 로거 레벨을 error로 낮춰, 정상적인 재시도 과정에서 나오는 잡음성 로그를 걸러냈습니다.`,
  },
  {
    slug: "usagetree-n-plus-1-latency",
    title: "같은 요청인데 왜 87ms와 6.94초를 오갈까",
    tags: ["MyBatis", "MariaDB", "Performance", "N+1"],
    excerpt:
      "동일한 파라미터로 요청했는데 응답시간이 80배 가까이 차이 났습니다. 계통별 순차 쿼리(N+1)와 DB 버퍼풀의 cold/warm 상태가 겹쳐 편차가 증폭되는 구조였습니다.",
    content: `portal/energy/usageTree 메뉴에서 POST .../usage 요청의 응답시간이 같은 파라미터로 요청해도 어떤 때는 87ms, 어떤 때는 6.94초로 80배 가까이 차이가 났습니다. energy_code, system_id, search_type 등 파라미터가 완전히 동일했기 때문에, 원인은 요청 값이 아니라 서버 내부 로직이나 DB 상태에 있을 수밖에 없었습니다.

코드를 따라가 보니 PortalEnergyUsageTreeService.getUsageFromEnergyTree()가 energy_code별 계통(facility) 목록을 조회한 뒤, 계통 하나하나마다 데이터 쿼리와 비교 쿼리를 순차적으로 호출하고 있었습니다. 즉 요청 1건의 DB 라운드트립 수가 계통 개수 × 2회였고, system_id를 비워 "전체"를 선택하면 건물 산하의 모든 계통을 순회하게 됩니다. tb_energy_tree를 건물별로 묶어보니 계통 수는 건물마다 편차가 커서 많게는 67개, 적게는 1~5개였고, 계통이 많은 대형 건물에서 전체 조회를 하면 이 N+1 루프가 최대치로 발동했습니다.

같은 파라미터인데도 응답시간이 갈리는 이유는 여기에 DB 버퍼풀의 cold/warm 상태가 겹치기 때문이었습니다. 쿼리 횟수 자체는 매번 동일하지만, 각 쿼리가 디스크 I/O를 타는지(cold) 이미 메모리에 올라온 데이터를 바로 읽는지(warm)가 갈리면서 편차가 증폭됐습니다. tb_measure_data_energy_tree는 약 283만 row(231MB) 규모였고 인덱스 자체는 적절했지만, 최초 조회 시 계통 수만큼 반복되는 쿼리가 전부 디스크를 읽으면 지연이 누적돼 7초 가까이 걸렸고, 직후 동일 쿼리를 재실행하면 버퍼풀에 남아있던 페이지를 그대로 읽어 87ms로 끝났습니다. 인덱스 부재, 배치 락 경합, TimeRange 생성기 폭주 같은 다른 가설은 하나씩 확인해 배제했고, HikariCP 커넥션 풀이 기본값(10)으로 튜닝되지 않은 점은 근본 원인은 아니지만 동시 요청이 몰릴 때 증상을 더 키우는 부가 요인으로 남겨뒀습니다.

핵심 해결 방향은 계통별 순차 호출을 IN 절 기반 배치 쿼리로 묶어, 요청당 쿼리 횟수를 "계통 개수 × 2"에서 "energy_code 개수 × 2"(사실상 상수)로 줄이는 것입니다. 매퍼에는 energy_system_id를 리스트로 받는 배치 버전 쿼리를 신설하고, 서비스에서는 계통 루프를 없애고 결과를 energy_system_id 기준으로 그룹핑해 기존과 동일한 응답 스키마로 재구성하도록 리팩토링을 설계했습니다. 쿼리 횟수가 줄면 콜드 캐시 상태에서도 디스크 I/O 누적이 크게 줄고, 커넥션 점유 시간도 짧아질 것으로 기대하고 있습니다.`,
  },
];
