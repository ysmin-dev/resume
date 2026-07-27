export const profile = {
  name: "민연식",
  email: "minys94@naver.com",
  github: "https://github.com/ysmin-dev",
  summary: `사용자가 체감하는 서비스 완성도는 **데이터 처리 속도와 오류 없는 시스템**에 시작된다고 생각합니다.
웹 개발 중심으로 **백엔드 아키텍처와 데이터 최적화** 역량을 강화해 왔습니다.

동료들과의 생각의 차이를 존중하고 다양한 관점에서 시스템을 바라보는 것이 최적의 해결책을 만든다고 생각합니다

'코드는 얕게, 생각은 깊게'라는 저만의 개발 철학으로, AI 기술을 적극적으로 활용한 가독성과 유지보수성을 높이는 코드 구조를 지향합니다.

단순히 구현하는 개발에 머무르지 않고 사용자 관점에서 데이터와 UI/UX를 이해하며 안정적 시스템을 구축해 해나가겠습니다.`,
};

export const skills = [
  "Java",
  "Spring Boot",
  "MariaDB",
  "React",
  "TypeScript",
  "Next.js",
  "axios",
  
];

export type Career = {
  company: string;
  role: string;
  period: string;
  duration: string;
  department?: string;
  tasks: string[];
};

function calculateTenure(startYear: number, startMonth: number): string {
  const now = new Date();
  const totalMonths =
    (now.getFullYear() - startYear) * 12 + (now.getMonth() - (startMonth - 1));
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  if (years === 0) return `${months}개월`;
  if (months === 0) return `${years}년`;
  return `${years}년 ${months}개월`;
}

export const careers: Career[] = [
  {
    company: "(주)엔텔스",
    role: "웹 개발자",
    period: "2022.12. ~ 재직 중",
    duration: `${calculateTenure(2022, 12)}, 정규직`,
    department: "Cloud AX 본부",
    tasks: [
      "React 기반 이동통신사 관리자용 대용량 기지국 관리 기능 설계 및 개발",
      "Java/Spring 기반 레거시 시스템 안정화 및 고도화",
      "Kafka 메시징 장애 대응 체계 설계(DB 트랜잭션 분리, 재시도/취소 로직) 및 Producer 설정 튜닝",
      "MyBatis 쿼리 최적화로 N+1 문제 개선 및 API 응답 성능 향상",
    ],
  },
  {
    company: "(주)대마",
    role: "백엔드 개발자",
    period: "2021.04. ~ 2022.10.",
    duration: "1년 7개월, 정규직",
    department: "개발팀",
    tasks: ["Spring Boot, JPA 기반 쇼핑몰/ERP 백오피스 API 설계, 개발 및 운영"],
  },
  {
    company: "(주)지란지교시큐리티",
    role: "메일보안 솔루션 엔지니어",
    period: "2020.12. ~ 2021.04.",
    duration: "5개월, 정규직",
    department: "메일보안사업부",
    tasks: ["Linux 환경 기반 메일보안 솔루션 기술 지원 및 트러블슈팅"],
  },
];

export type Highlight = string | { text: string; href: string };

export type Project = {
  name: string;
  client?: string;
  affiliation?: string;
  period: string;
  description: string;
  highlights: Highlight[];
};

export const projects: Project[] = [
  {
    name: "Cloud BEMS/E-Optimizer 관리자 웹",
    client: "SK텔레콤",
    period: "2026.02. ~ 진행 중 (6개월)",
    description:
      "클라우드 기반 에너지 관리 시스템(EMS) 관리자 웹 신규 구축 및 CSR → SSR 전환",
    highlights: [
      "React 기반 CSR을 Spring Boot/Thymeleaf 기반 SSR로 전면 전환",
      "알람/DDC/Agent 관리, 메뉴·권한 관리 등 관리자 화면 신규 구축 및 Toast 알림 전환 등 UI/UX 표준화",
      "에너지계통 트리 ID 채번 방식을 2자리 숫자(01~99)에서 영문 조합(AA~ZZ)으로 확장해 등록 한도 문제 해소",
      {
        text: "Kafka 발행 실패 시 DB 트랜잭션과 메시지 발행을 분리하고, 프론트엔드 주도 재시도(최대 10회)·자동 취소 로직을 설계해 DB-메시징 데이터 불일치 문제 해결",
        href: "/posts/kafka-publish-failure-and-retry",
      },
      {
        text: "Kafka Producer 재접속/타임아웃 설정 최적화로 브로커 장애 시 초당 수십 줄씩 발생하던 로그 폭주 제거",
        href: "/posts/kafka-producer-infinite-retry-log",
      },
      {
        text: "마이그레이션 등록 시 서버가 캐스케이드 방식으로 의도치 않은 조합까지 자동 생성하던 문제를, 확정된 조합만 저장하도록 구조를 바꾸고 서버 유효성 검증을 추가해 해결",
        href: "/posts/migration-unintended-combination",
      },
    ],
  },
  {
    name: "EMS 통계·데이터 이관 배치 시스템 구축",
    client: "SK텔레콤",
    period: "2026.06. ~ 진행 중 (2개월)",
    description:
      "에너지/태양광 통계 집계 및 데이터 이관을 담당하는 Java 배치 시스템 신규 구축과 안정화",
    highlights: [
      {
        text: "시간별~연별 통계 집계 SQL의 불필요한 단위 변환과 날짜 포맷 오류로 인한 통계값 왜곡을 원인 분석 후 매퍼 4종 수정 및 단위 테스트로 회귀 방지",
        href: "/posts/energy-tree-stat-distortion",
      },
      "태양광 통계 집계 배치 신규 개발 — CTE 기반 집계 SQL 설계, UPSERT로 재실행 안전성 확보, 15분 단위 버킷 처리",
      {
        text: "이관 데이터에서 다른 빌딩 값이 섞인 것으로 의심되는 이상값을 단계별 진단 로그로 추적해 원인을 특정하고, 무중단 UPSERT 방식으로 안전하게 보정",
        href: "/posts/solar-data-cross-building-contamination",
      },
      "Kafka로 수신한 마이그레이션 작업을 실행하는 CLI 연동 배치 구축, 기간(Daily Range) 단위 재처리 기능으로 확장",
      "운영 로그에 SQL 파라미터·조회 결과가 그대로 노출되는 위험을 발견해 p6spy 도입 및 프로파일별 로그 레벨 분리로 차단",
    ],
  },
  {
    name: "웹 보안 취약점 개선 및 레거시 아키텍처 리팩토링",
    affiliation: "(주)엔텔스",
    period: "2025.11. ~ 2025.12. (2개월)",
    description: "통신망 감시 시스템의 보안 취약점 조치 및 DB 설정 구조 개선",
    highlights: [
      "SQL Injection 방어 강화 (MyBatis 매개변수화 쿼리)",
      "세션 ID 강제 재발급으로 Session Fixation 방지",
      "전역 예외 처리 적용으로 SQL 에러 정보 노출 차단",
      "Spring Java Config 방식으로 DB 설정 개편",
    ],
  },
  {
    name: "NWDAF (지능형 기지국 관리 플랫폼)",
    client: "SK텔레콤",
    period: "2024.06. ~ 2025.01. (8개월)",
    description:
      "기지국 트래픽 급증 시 네트워크 품질 문제를 사전 대응하는 플랫폼",
    highlights: [
      "shadcn/ui 기반 사내 디자인 시스템 구축으로 UI/UX 일관성 확보",
      "Tanstack Query 캐싱 전략으로 페이지 평균 로딩 속도 최대 2초 단축",
      "HTTP 청크 분할 전송으로 대용량 기지국 데이터 업로드 시간을 2분 이상에서 20초 이내로 단축",
    ],
  },
  {
    name: "Site Manager (클라우드 방송 플랫폼)",
    client: "SK텔레콤",
    period: "2023.03. ~ 2024.12. (1년 10개월)",
    description:
      "가상화된 방송장비를 통해 자원 효율화, 채널 관리, 모니터링이 가능한 플랫폼",
    highlights: [
      "ReactFlow 기반 드래그 앤 드롭 워크플로우 편집기 구현",
      "Promise.allSettled로 병렬 API 호출 시 개별 에러 관리",
      "에러 메시지 개선으로 고객 문의율 전 월 대비 50% 감소",
    ],
  },
  {
    name: "SKLMNO/천리마폰마트 (휴대폰 판매 ERP 솔루션)",
    affiliation: "(주)대마",
    period: "2022.05. ~ 2022.10. (6개월)",
    description: "휴대폰 이동통신 가입 유치 및 판매 관리 ERP 솔루션",
    highlights: [
      "백엔드 API 서버 개발",
      "웹 쇼핑몰 개발 및 유지보수",
      "JPA 기반 도메인 설계로 연관관계 순환참조 문제 해결",
      "월 평균 10건의 유지보수 이슈 처리",
    ],
  },
];

export type Education = {
  school: string;
  degree: string;
  period: string;
};

export const education: Education[] = [
  {
    school: "국민대학교 소프트웨어융합대학원",
    degree: "석사 (소프트웨어)",
    period: "2021.03. ~ 2023.02. (졸업)",
  },
  {
    school: "성결대학교",
    degree: "학사 (컴퓨터공학)",
    period: "2018.03. ~ 2021.02. (졸업)",
  },
];

export const certifications = [
  {
    name: "정보처리기사",
    issuer: "한국산업인력공단",
    date: "2017.05",
  },
];
