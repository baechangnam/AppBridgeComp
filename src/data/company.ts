export const companyInfo = {
  name: '앱 브릿지',
  businessNumber: '703-12-01872',
  phone: '010-3021-4772',
  email: 'vicjoa@naver.com',
}

export const projectTypes = [
  '선택해주세요',
  '모바일 앱 개발',
  '웹 플랫폼 구축',
  '운영 시스템 개발',
  '유지보수·고도화',
  'AI/LLM 관련 문의',
]

export const serviceTabs = [
  {
    id: 'finance',
    label: '금융권 프로젝트',
    eyebrow: 'BANKING PROJECT',
    title: '경남은행 모바일/기업 뱅킹 프로젝트',
    description:
      '금융 서비스 특성에 맞춰 보안, 인증, 접근성, 운영 구조까지 포함한 모바일 뱅킹 고도화를 수행했습니다.',
    projects: [
      {
        title: '악성앱 탐지 시스템 구축',
        items: ['백그라운드 탐지 서비스 개발', '전역 탐지 구조 설계 (Base Class 리팩토링)'],
        result: '앱 전체 보안 강화',
      },
      {
        title: '신분증 원본 판별 시스템',
        items: ['카메라 기반 신분증 진위 판별', '암호화 및 API 연동 구조 설계'],
        result: '비대면 인증 시스템 구축',
      },
      {
        title: '시니어 뱅킹 UI 전면 개편',
        items: ['대메뉴/중메뉴 구조 설계', '커스텀 RecyclerView 개발'],
        result: '사용자 접근성 및 UX 개선',
      },
      {
        title: '푸시 시스템 전면 개편',
        items: ['레거시 제거 후 신규 구조 설계', '푸시 API 및 수신 처리 시스템 구축'],
        result: '안정적인 알림 운영 구조 확보',
      },
    ],
    gallery: [
      {
        src: '/web/finance-project-1.png',
        alt: '경남은행 모바일 뱅킹 신분증 촬영 및 인증 화면',
      },
      {
        src: '/web/finance-project-2.png',
        alt: '경남은행 모바일 알림 서비스 가입 및 설정 화면',
      },
    ],
  },
  {
    id: 'ai',
    label: 'AI 프로젝트',
    eyebrow: 'AI PROJECT',
    title: 'AI 기반 체력 측정 분석 웹 시스템',
    description:
      '교사와 관리자가 학생 명단, 측정 라운드, 체력 데이터를 관리하고 AI가 학생별 변화 추이와 추천 활동을 분석하는 웹 시스템을 구축했습니다.',
    projects: [
      {
        title: '학생·라운드·측정 데이터 관리',
        items: ['학생 명단과 클래스 관리 기능 구현', '측정 라운드별 체력 데이터 입력 및 저장'],
        result: '교육 현장 운영 흐름에 맞춘 데이터 관리 구조 구축',
      },
      {
        title: 'AI 기반 학생별 체력 분석',
        items: ['Muscle Strength, Muscle Endurance, Power, Agility 기준 분석', '학생 1명 단위 분석 실행 구조 설계'],
        result: '학생별 변화 추이와 추천 활동 자동 생성',
      },
      {
        title: '개인정보 최소화 API 연동',
        items: ['이름과 학번 제외 후 성별, 생년월일, 회차 데이터만 OpenAI API 전송', 'Responses API 기반 JSON 분석 결과 수신'],
        result: '개인정보 노출을 줄인 AI 분석 파이프라인 구현',
      },
      {
        title: '리포트 저장·조회·전달',
        items: ['분석 결과 DB 저장 및 재조회', '결과 리포트 다운로드와 e-mail 발송 기능 구성'],
        result: '분석 이후 활용 가능한 보고서 운영 기능 확보',
      },
    ],
    gallery: [
      {
        src: '/web/fitmetric-ai-01.png',
        alt: 'FitMetric AI 로그인 및 포털 시작 화면',
      },
      {
        src: '/web/fitmetric-ai-02.png',
        alt: 'FitMetric AI 관리자 대시보드',
      },
      {
        src: '/web/fitmetric-ai-03.png',
        alt: 'FitMetric AI 클래스 관리 화면',
      },
      {
        src: '/web/fitmetric-ai-04.png',
        alt: 'FitMetric AI 측정 라운드 관리 화면',
      },
      {
        src: '/web/fitmetric-ai-05.png',
        alt: 'FitMetric AI 체력 데이터 입력 화면',
      },
      {
        src: '/web/fitmetric-ai-06.png',
        alt: 'FitMetric AI 학생별 분석 차트 화면',
      },
      {
        src: '/web/fitmetric-ai-07.png',
        alt: 'FitMetric AI 학생별 추천 활동 분석 화면',
      },
      {
        src: '/web/fitmetric-ai-08.png',
        alt: 'FitMetric AI 리포트 다운로드 및 발송 화면',
      },
    ],
  },
  {
    id: 'platform',
    label: '플랫폼·서비스 프로젝트',
    eyebrow: 'PLATFORM PROJECT',
    title: '플랫폼 / 서비스 개발 경험',
    description:
      '예약, 콘텐츠, 위치 기반 매칭까지 다양한 플랫폼 서비스를 Flutter와 백엔드 중심으로 설계하고 운영 구조까지 구현했습니다.',
    projects: [
      {
        title: '포코믹',
        items: ['Flutter + Backend 풀스택 개발', '랜덤 가차샵 쇼핑몰', '결제 및 정산 시스템 구현'],
        result: '커머스 서비스 구축',
      },
      {
        title: '포토콩 (콘텐츠 판매 플랫폼)',
        items: ['사진/영상 업로드 및 판매 구조', '스트리밍 및 푸시 시스템 구현'],
        result: '콘텐츠 마켓 플랫폼 구축',
      },
      {
        title: '행복골프 (예약 시스템)',
        items: ['골프 강의 및 예약 시스템 개발', '커스텀 캘린더 및 영상 플레이어 구현'],
        result: '예약 서비스 경험 보유',
      },
      {
        title: '건설장비 콜 서비스',
        items: ['위치 기반 매칭 시스템 개발', '반경 기반 푸시 기능 구현'],
        result: '실시간 매칭 서비스 구축',
      },
    ],
    gallery: [
      {
        src: '/web/po.png',
        alt: '행복골프 예약 및 이용권 확인 화면',
      },
      {
        src: '/web/platform-project-2.png',
        alt: '행복골프 캐디 관리 및 기록 앱 화면',
      },
      {
        src: '/web/platform-project-3.png',
        alt: '건설 현장 관리 서비스 다국어 및 작업중지권 화면',
      },
    ],
  },
]

export const portfolioFilters = [
  { id: 'knb', label: '경남은행' },
  { id: 'loc', label: '위치기반' },
  { id: 'blue', label: '블루투스연동' },
  { id: 'service', label: '서비스앱' },
  { id: 'etc', label: '기타' },
]

export const portfolioProjects = [
  {
    id: 'bank-auth',
    category: 'knb',
    title: '경남은행 비대면 실명인증',
    summary: '신분증 촬영과 원본 판별, 비대면 인증 프로세스를 구축한 모바일 인증 프로젝트',
    cover: '/web/pp/bnk01.jpg',
    gallery: ['/web/pp/bk01.jpg', '/web/pp/bk02.jpg', '/web/pp/bk03.jpg', '/web/pp/bk04.jpg', '/web/pp/bk05.jpg'],
  },
  {
    id: 'bank-corp',
    category: 'knb',
    title: '경남은행 기업뱅킹',
    summary: '푸시 알림, 악성앱 탐지 솔루션 적용',
    cover: '/web/pp/bkc01.jpg',
    gallery: ['/web/pp/bkc01.jpg', '/web/pp/bkc02.jpg', '/web/pp/bkc03.jpg'],
  },
  {
    id: 'bank-al',
    category: 'knb',
    title: '경남은행 알콩달콩',
    summary: '커스텀 웹뷰 개발',
    cover: '/web/pp/al01.jpg',
    gallery: ['/web/pp/al01.jpg', '/web/pp/al02.jpg', '/web/pp/al03.jpg', '/web/pp/al04.jpg'],
  },
  {
    id: 'bus',
    category: 'loc',
    title: '버스타고',
    summary: '2만 다운로드를 기록한 전세 버스 예약 앱',
    cover: '/web/pp/bus01.jpg',
    gallery: ['/web/pp/main3.jpg', '/web/pp/bus01.jpg', '/web/pp/bus02.jpg', '/web/pp/bus03.jpg', '/web/pp/bus04.jpg'],
  },
  {
    id: 'ic',
    category: 'loc',
    title: '인천먹고',
    summary: '인천 지역 맛집을 소개하는 로컬 큐레이션 앱',
    cover: '/web/pp/ic.jpg',
    gallery: ['/web/pp/ic01.jpg', '/web/pp/ic02.jpg', '/web/pp/ic03.jpg', '/web/pp/ic04.jpg'],
  },
  {
    id: 'mata',
    category: 'loc',
    title: '마타',
    summary: '마사지샵 소개와 예약 기능을 제공하는 서비스',
    cover: '/web/pp/mata01.jpg',
    gallery: ['/web/pp/mata01.jpg', '/web/pp/mata02.jpg', '/web/pp/mata03.jpg', '/web/pp/mata04.jpg'],
  },
  {
    id: 'gold',
    category: 'loc',
    title: '골드코스트',
    summary: '귀금속 시세 확인과 상담 연결을 위한 앱',
    cover: '/web/pp/gold01.jpg',
    gallery: ['/web/pp/gold02.jpg', '/web/pp/gold03.jpg', '/web/pp/gold04.jpg'],
  },
  {
    id: 'karang',
    category: 'blue',
    title: '카랑',
    summary: 'SwiftUI와 CoreBluetooth 기반 BLE 콤퍼스 센서 연결 방위 실시간 표시 앱',
    cover: '/web/pp/ka.jpg',
    gallery: ['/web/pp/karang01.jpg', '/web/pp/karang02.jpg', '/web/pp/karang03.jpg'],
  },
  {
    id: 'drytrak',
    category: 'blue',
    title: 'Drytrak',
    summary: '엔드투엔드 IoT 모니터링 솔루션',
    cover: '/web/pp/dr01.png',
    gallery: ['/web/pp/dr02.png', '/web/pp/dr03.png', '/web/pp/dr04.png', '/web/pp/dr05.png'],
  },
  {
    id: 'flow',
    category: 'blue',
    title: '유량측정',
    summary: '실시간 유량측정기기와 블루투스 통신 모니터링 앱',
    cover: '/web/pp/flow01.jpg',
    gallery: ['/web/pp/flow01.jpg', '/web/pp/flow02.jpg', '/web/pp/flow03.jpg'],
  },
  {
    id: 'baes',
    category: 'service',
    title: '배슐렝',
    summary: '배달 주문 흐름에 맞춘 배달 플랫폼',
    cover: '/web/pp/ba.png',
    gallery: ['/web/pp/main1.jpg'],
  },
  {
    id: 'ground',
    category: 'service',
    title: '그라운디댄스',
    summary: '댄스 수업 예약 서비스',
    cover: '/web/pp/gr.png',
    gallery: ['/web/pp/main5.jpg', '/web/pp/gr01.jpg', '/web/pp/gr02.jpg', '/web/pp/gr03.jpg', '/web/pp/gr04.jpg'],
  },
  {
    id: 'miyu',
    category: 'service',
    title: '미유',
    summary: '미용실 디자이너 찾기와 소통 중심의 서비스 앱',
    cover: '/web/pp/me01.jpg',
    gallery: ['/web/pp/main6.jpg', '/web/pp/me01.jpg', '/web/pp/me02.jpg', '/web/pp/me03.jpg', '/web/pp/me04.jpg'],
  },
  {
    id: 'giver',
    category: 'service',
    title: '기버',
    summary: '꽃배달 주문과 배송 요청을 처리하는 앱',
    cover: '/web/pp/giver01.jpg',
    gallery: ['/web/pp/giver01.jpg', '/web/pp/giver02.jpg', '/web/pp/giver03.jpg'],
  },
  {
    id: 'buddha',
    category: 'service',
    title: '불교말씀',
    summary: '명언을 공유하고 소비하는 콘텐츠 앱',
    cover: '/web/pp/content01.jpg',
    gallery: ['/web/pp/content01.jpg', '/web/pp/content02.jpg', '/web/pp/content03.jpg'],
  },
  {
    id: 'golf',
    category: 'service',
    title: '행복골프',
    summary: '골프 강의와 예약, 이용권 관리를 지원하는 서비스 앱',
    cover: '/web/pp/golf01.jpg',
    gallery: ['/web/pp/golf01.jpg', '/web/pp/golf02.jpg', '/web/pp/golf03.jpg', '/web/pp/golf04.jpg', '/web/pp/golf05.jpg'],
  },
  {
    id: 'doctor',
    category: 'etc',
    title: '닥터키퍼',
    summary: '치과 고객관리와 진료확인서 등 문서관리 앱',
    cover: '/web/pp/doctor01.jpg',
    gallery: ['/web/pp/doctor01.jpg', '/web/pp/doctor02.jpg', '/web/pp/doctor03.jpg'],
  },
  {
    id: 'withtalk',
    category: 'etc',
    title: '위드톡',
    summary: '장애인을 위한 보조 기능 중심 앱',
    cover: '/web/pp/withtalk01.jpg',
    gallery: ['/web/pp/withtalk01.jpg', '/web/pp/withtalk02.jpg'],
  },
  {
    id: 'health',
    category: 'etc',
    title: '운동기록',
    summary: '운동 기록과 건강 관리 흐름을 담은 라이프스타일 앱',
    cover: '/web/pp/health01.jpg',
    gallery: ['/web/pp/health01.jpg', '/web/pp/health02.jpg', '/web/pp/health03.jpg'],
  },
  {
    id: 'ai',
    category: 'service',
    title: 'AI조달비서',
    summary: '조달 업무를 지원하는 서비스 앱',
    cover: '/web/pp/ai01.jpg',
    gallery: ['/web/pp/ai01.jpg', '/web/pp/ai02.jpg', '/web/pp/ai03.jpg'],
  },
]

export const metrics = [
  { value: '300+', label: '완료 프로젝트' },
  { value: '99%', label: '고객 만족도' },
  { value: '15년', label: '실무 경력' },
]

export const testimonials = [
  {
    name: 'K32*****',
    rating: '5.0',
    date: '26.03.18 15:46',
    body: [
      '단순히 앱 하나를 만든 게 아니라, 사용자의 요구사항을 정확히 파악하고 끝까지 책임감 있게 개발해 주셔서 정말 감사합니다.',
      '특히 뮤패드와 브라더 프린터의 복잡한 연결 문제를 해결하기 위해 성심을 다해 고민하고 제작해 주신 점이 깊이 느껴졌습니다.',
      '질문 하나하나에도 친절하게 답변해 주시고, 실 사용 환경을 고려한 세심한 배려에 큰 신뢰를 얻었습니다. 앞으로도 앱 관련 작업이 있다면 꼭 다시 찾고 싶은 최고의 개발자님입니다!',
    ],
  },
  {
    name: 'dyl*****',
    rating: '5.0',
    date: '25.11.18 13:38',
    body: [
      '끝까지 책임감 있게 작업을 진행해주셔서 정말 만족했습니다.',
      '이전에 사용하던 앱이 안드로이드 버전 문제로 막혀서 어려움을 겪고 있었는데, 관련 이슈들을 정확하게 파악해서 깔끔하게 해결해주셨어요.',
      '또 요청한 사항 외에도 필요한 부분들을 세심하게 챙겨주셔서 더 편하게 작업할 수 있었습니다. 다음에도 꼭 다시 이용하고 싶은 전문가입니다!',
    ],
  },
  {
    name: '주*****',
    rating: '5.0',
    date: '23.06.27 17:43',
    body: [
      '업무 특성상 여러 개발자와 협업을 진행해봤는데 앱브릿지처럼 꼼꼼하고 요청사항을 끝까지 잘 반영해주신 곳은 처음인 것 같습니다.',
      '개발쪽 지식이 부족해서 걱정했는데 친절하게 상담부터 검수까지 잘 해주셨습니다. 금액이 낮아서 걱정되시는 분들은 전혀 걱정 안 하셔도 됩니다.',
      '메시지 답장 속도도 빠르시고 마지막까지 끝까지 잘 챙겨주십니다. 번창하세요 사장님 감사합니다!!',
    ],
  },
  {
    name: 'phj*****',
    rating: '5.0',
    date: '23.06.28 21:02',
    body: [
      '이번이 처음으로 어플리케이션 개발을 의뢰하는 경험이었지만, 개발자님의 전문성과 진정성에 깊은 감사를 느꼈습니다.',
      '기대 이상으로 세세하게 작업해주셔서 완성도 높은 결과물에 매우 만족하였습니다.',
      '특히, 책임감 있게 소통해주시며 저희의 의견을 반영해 주신 점, 그리고 개발 과정에서의 어려움을 함께 이겨낼 수 있었던 것이 인상적이었습니다. 진심으로 감사의 말씀을 전합니다.',
    ],
  },
]

export const footerLinks = [
  { label: 'GitHub', href: 'https://github.com/baechangnam/' },
  { label: 'Kmong', href: 'https://kmong.com/gig/30824' },
  { label: 'Kmong Portfolio', href: 'https://kmong.com/@%EB%A1%9C%EA%B7%B8%EC%BA%A3/portfolios' },
]
