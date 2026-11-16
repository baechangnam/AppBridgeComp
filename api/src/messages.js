const messages = {
  ko: {
    INVALID_INPUT: '입력값을 다시 확인해주세요.',
    PRIVACY_REQUIRED: '개인정보 처리방침 동의가 필요합니다.',
    MAIL_NOT_CONFIGURED: '메일 서버 설정이 완료되지 않았습니다.',
    CONTACT_SENT: '문의가 접수되었습니다.',
    RATE_LIMITED: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.',
    SEND_FAILED: '메일 발송 중 오류가 발생했습니다.',
  },
  en: {
    INVALID_INPUT: 'Please check your input and try again.',
    PRIVACY_REQUIRED: 'Please agree to the privacy policy.',
    MAIL_NOT_CONFIGURED: 'The mail service is not configured yet.',
    CONTACT_SENT: 'Your inquiry has been received.',
    RATE_LIMITED: 'Too many requests. Please try again later.',
    SEND_FAILED: 'We couldn’t send your inquiry. Please try again shortly.',
  },
}

export function contactMessage(request, code) {
  const language = request.body?.language === 'en' ||
    (request.body?.language !== 'ko' && request.acceptsLanguages('ko', 'en') === 'en') ? 'en' : 'ko'
  return { code, message: messages[language][code] }
}
