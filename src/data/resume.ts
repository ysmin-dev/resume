function calculateAge(birthYear: number, birthMonth: number, birthDay: number): number {
  const now = new Date();
  let age = now.getFullYear() - birthYear;
  const hasHadBirthdayThisYear =
    now.getMonth() + 1 > birthMonth ||
    (now.getMonth() + 1 === birthMonth && now.getDate() >= birthDay);
  if (!hasHadBirthdayThisYear) age -= 1;
  return age;
}

export const profile = {
  name: "민연식",
  birthYear: 1994,
  age: calculateAge(1994, 11, 21),
  residence: "서울시 관악구",
  phone: "010-5095-5912",
  email: "minys94@naver.com",
  github: "https://github.com/ysmin-dev",
  summary: `사용자가 체감하는 서비스 완성도는 **데이터 처리 속도와 오류 없는 시스템**에 시작된다고 생각합니다.
웹 개발 중심으로 **백엔드 아키텍처와 데이터 최적화** 역량을 강화해 왔습니다.

동료들과의 생각의 차이를 존중하고 다양한 관점에서 시스템을 바라보는 것이 최적의 해결책을 만든다고 생각합니다

'코드는 얕게, 생각은 깊게'라는 저만의 개발 철학으로, AI 기술을 적극적으로 활용한 가독성과 유지보수성을 높이는 코드 구조를 지향합니다.

단순히 구현하는 개발에 머무르지 않고 사용자 관점에서 데이터와 UI/UX를 이해하며 안정적 시스템을 구축해 해나가겠습니다.`,
};

export const philosophy = {
  title: "코드는 얕게, 생각은 깊게",
  intro:
    "개발자로 처음 일을 시작할 때 읽었던 『클린 코드』에서, 코드의 물리적 깊이가 깊어질수록 읽기 어렵고 유지보수가 힘들어진다는 깨달음은 저만의 확고한 개발 원칙으로 자리 잡았습니다.",
  principles: [
    {
      title: "코드는 얕게",
      en: "Code Shallow",
      description:
        "이중 중첩문을 지양하고 1-depth 구조를 유지합니다. 복잡한 if-else 블록이나 삼항 연산자 대신 기능을 명확히 함수화하여 중복을 줄이고, 누구나 직관적으로 읽을 수 있는 코드를 작성합니다.",
    },
    {
      title: "생각은 깊게",
      en: "Think Deep",
      description:
        "무작정 키보드에 손을 올리지 않습니다. 코드를 타이핑하기 전 비즈니스 로직을 완벽하게 분석하고 예외 상황과 데이터의 흐름을 먼저 설계합니다. 시스템 구조가 머릿속에서 명확하게 정리되었을 때 비로소 코드를 작성합니다.",
    },
  ],
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

function monthsSince(startYear: number, startMonth: number): number {
  const now = new Date();
  return (
    (now.getFullYear() - startYear) * 12 + (now.getMonth() - (startMonth - 1))
  );
}

function calculateTenure(startYear: number, startMonth: number): string {
  const totalMonths = monthsSince(startYear, startMonth);
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  if (years === 0) return `${months}개월`;
  if (months === 0) return `${years}년`;
  return `${years}년 ${months}개월`;
}

// 첫 입사(2020.12) 기준 연차 — 첫 해가 1년차이므로 경과 연수 + 1
export const careerYear = Math.floor(monthsSince(2020, 12) / 12) + 1;

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

export type HighlightGroup = {
  label: string;
  period?: string;
  highlights: Highlight[];
};

export type Project = {
  name: string;
  client?: string;
  affiliation?: string;
  period: string;
  description: string;
  highlights?: Highlight[];
  groups?: HighlightGroup[];
};

export const projects: Project[] = [
  {
    name: "에너지 관리 시스템(Energy Management System) 운영",
    client: "SK텔레콤",
    period: "2026.02. ~ 진행 중 (6개월)",
    description:
      "에너지 관리 시스템(EMS)의 관리자 웹 구축(CSR → SSR 전환)부터 통계 집계·데이터 이관 배치까지 담당",
    groups: [
      {
        label: "관리자 웹 · CSR → SSR 전환",
        period: "2026.02. ~ 진행 중",
        highlights: [
          "React 기반 CSR을 Spring Boot/Thymeleaf 기반 SSR로 전면 전환",
          "알람/DDC/Agent 등 관리자 화면 신규 구축 및 UI 표준화",
          {
            text: "Kafka 발행 실패 시 DB 정합성을 재시도·취소로 보장",
            href: "/posts/kafka-publish-failure-and-retry",
          },
          {
            text: "Kafka 브로커 장애 시 폭주하던 Producer 로그를 타임아웃·재시도 설정 조정으로 해소",
            href: "/posts/kafka-producer-infinite-retry-log",
          },
          {
            text: "마이그레이션 조합 자동 생성 오류를 확정 조합만 저장하도록 개선",
            href: "/posts/migration-unintended-combination",
          },
        ],
      },
      {
        label: "통계 집계 · 데이터 이관 배치 시스템",
        period: "2026.06. ~ 진행 중",
        highlights: [
          {
            text: "통계 집계 SQL의 단위 변환·날짜 포맷 오류로 인한 값 왜곡 수정",
            href: "/posts/energy-tree-stat-distortion",
          },
          "태양광 통계 집계 배치 신규 개발 (CTE·UPSERT 설계)",
          {
            text: "이관 데이터 빌딩값 혼입을 진단 로그로 추적해 무중단 보정",
            href: "/posts/solar-data-cross-building-contamination",
          },
          "Kafka 수신 마이그레이션 실행 CLI 배치 구축 및 기간 재처리 확장",
          "운영 로그의 SQL 파라미터 노출 위험을 p6spy 도입으로 차단",
        ],
      },
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
      {
        text: "HTTP 청크 분할 전송으로 대용량 기지국 데이터 업로드 시간을 2분 이상에서 20초 이내로 단축",
        href: "/posts/bulk-file-upload-redesign",
      },
      {
        text: "화면마다 반복되던 페이징 버그를 DB 함수의 페이지 보정 로직으로 근본 해결",
        href: "/posts/paging-validation-to-db-function",
      },
      {
        text: "LTE/5G 원천 테이블을 통합 Materialized View로 정규화해 조회 단순화·성능 개선",
        href: "/posts/lte-5g-materialized-view",
      },
      {
        text: "기지국 제어 스케줄 판정 함수를 시 단위에서 분 단위로 정규화",
        href: "/posts/cron-range-minute-normalization",
      },
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
      {
        text: "Promise.allSettled로 병렬 API 호출 시 개별 에러 관리",
        href: "/posts/promise-all-to-allsettled",
      },
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
