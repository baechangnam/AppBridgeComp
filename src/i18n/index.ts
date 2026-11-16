import * as koCompany from '../data/company'
import * as enCompany from './company.en'

export type Language = 'ko' | 'en'
export const languageStorageKey = 'appbridge-language'

export function resolveLanguage(saved: string | null, browserLanguage: string): Language {
  if (saved === 'ko' || saved === 'en') return saved
  return browserLanguage.toLowerCase().startsWith('ko') ? 'ko' : 'en'
}

export function getInitialLanguage(): Language {
  let saved: string | null = null
  try {
    saved = localStorage.getItem(languageStorageKey)
  } catch {
    // Language switching still works when browser storage is disabled.
  }
  return resolveLanguage(saved, navigator.language)
}

const ko = {
  meta: {
    title: '앱 개발 업체 | 앱브릿지',
    description: '앱 개발, 외주 개발, Android iOS Flutter 개발 전문. 15년 경력, 300건 이상 앱 배포 경험',
    keywords: '앱개발, 앱개발업체, 외주개발, 안드로이드, 아이폰, 플러터, AI연동',
    ogTitle: '앱 개발 전문 | 앱브릿지',
    ogDescription: '앱 개발, 외주 개발, 15년 경력 개발자',
  },
  home: 'App Bridge 홈', language: '언어 선택', openMenu: '메뉴 열기', closeMenu: '메뉴 닫기', navigation: '주요 메뉴',
  projects: '프로젝트', about: '회사소개', portfolio: '구축 사례', reviews: '후기', support: '고객지원', consultation: '상담신청',
  heroTitle: '앱 개발부터 운영까지 한번에', heroIntro: '15년 이상의 실무 경험으로', heroDescription: '실제 운영 가능한 서비스를 구축합니다.',
  heroSystems: '관리자 시스템 + 서버 구축', heroExperience: '300건 이상의 앱 스토어 배포 및 운영 경험', heroAI: 'AI/LLM 기반 서비스 개발',
  contactUs: '문의하기', services: '서비스 안내', delivery: '기획부터 배포까지', heroAlt: '기획부터 배포까지 함께하는 App Bridge 개발팀',
  servicesKicker: '서비스 프로젝트', servicesTitle: '핵심 프로젝트', serviceCategories: '서비스 프로젝트 카테고리',
  metricsKicker: '성과 지표', metricsTitle: '성과로 증명하는 개발 파트너',
  portfolioKicker: '포트폴리오', portfolioCategories: '포트폴리오 카테고리', close: '닫기', detailScreen: '상세 화면',
  reviewsKicker: '고객 후기', reviewsTitle: '실제 고객이 남긴 후기', reviewsNote: '',
  contactKicker: '프로젝트 문의', contactTitle: '프로젝트 상담', contactIntro: '프로젝트 상담은 언제든 환영합니다.',
  name: '이름', namePlaceholder: '이름을 입력해주세요', email: '이메일', projectType: '프로젝트 유형', message: '메시지', messagePlaceholder: '프로젝트에 대해 알려주세요...',
  privacy: '개인정보 처리방침 동의', sending: '전송 중...', send: '문의 보내기',
  company: '회사명', businessNumber: '사업자번호', phone: '연락처',
  notices: {
    success: '문의가 접수되었습니다.',
    privacy: '개인정보 처리방침 동의가 필요합니다.',
    invalid: '입력값을 다시 확인해주세요.',
    rateLimit: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.',
    unavailable: '메일 서버 설정이 완료되지 않았습니다. 이메일로 문의해주세요.',
    failed: '문의 전송에 실패했습니다. 잠시 후 다시 시도해주세요.',
  },
}

const en: typeof ko = {
  meta: {
    title: 'App Development Studio | App Bridge',
    description: 'Android, iOS, Flutter, and AI app development. Over 15 years of experience and 300 app store releases.',
    keywords: 'app development, mobile apps, Android, iOS, Flutter, AI integration, App Bridge',
    ogTitle: 'App Development Studio | App Bridge',
    ogDescription: 'App development backed by 15 years of hands-on experience.',
  },
  home: 'App Bridge home', language: 'Select language', openMenu: 'Open menu', closeMenu: 'Close menu', navigation: 'Main navigation',
  projects: 'Projects', about: 'About', portfolio: 'Our work', reviews: 'Reviews', support: 'Contact', consultation: 'Let’s talk',
  heroTitle: 'From app development to ongoing operations', heroIntro: 'With over 15 years of hands-on experience,', heroDescription: 'we build services ready for the real world.',
  heroSystems: 'Admin systems and server infrastructure', heroExperience: 'Over 300 app store releases and ongoing operations', heroAI: 'AI and LLM-powered services',
  contactUs: 'Get in touch', services: 'Our services', delivery: 'From planning to launch', heroAlt: 'The App Bridge development team, with you from planning to launch',
  servicesKicker: 'OUR PROJECTS', servicesTitle: 'Featured projects', serviceCategories: 'Project categories',
  metricsKicker: 'OUR TRACK RECORD', metricsTitle: 'A development partner with proven results',
  portfolioKicker: 'PORTFOLIO', portfolioCategories: 'Portfolio categories', close: 'Close', detailScreen: 'detail screen',
  reviewsKicker: 'CLIENT REVIEWS', reviewsTitle: 'What our clients say', reviewsNote: 'Translated from Korean.',
  contactKicker: 'START A PROJECT', contactTitle: 'Let’s discuss your project', contactIntro: 'We’d love to hear about your project.',
  name: 'Name', namePlaceholder: 'Your name', email: 'Email', projectType: 'Project type', message: 'Message', messagePlaceholder: 'Tell us about your project...',
  privacy: 'I agree to the privacy policy', sending: 'Sending...', send: 'Send inquiry',
  company: 'Company', businessNumber: 'Business registration no.', phone: 'Phone',
  notices: {
    success: 'Your inquiry has been received.',
    privacy: 'Please agree to the privacy policy.',
    invalid: 'Please check your input and try again.',
    rateLimit: 'Too many requests. Please try again later.',
    unavailable: 'The mail service is not configured yet. Please contact us by email.',
    failed: 'We couldn’t send your inquiry. Please try again shortly.',
  },
}

export type NoticeCode = keyof typeof ko.notices
export const copy = { ko, en }
export const companyContent = { ko: koCompany, en: enCompany }

export function contactNoticeCode(status: number, code?: string): NoticeCode {
  if (status === 429) return 'rateLimit'
  if (code === 'PRIVACY_REQUIRED') return 'privacy'
  if (status === 400 || status === 413) return 'invalid'
  if (code === 'MAIL_NOT_CONFIGURED') return 'unavailable'
  return 'failed'
}
