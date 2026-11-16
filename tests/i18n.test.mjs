import assert from 'node:assert/strict'
import { after, test } from 'node:test'
import { createServer } from 'vite'
import { contactMessage } from '../api/src/messages.js'

const vite = await createServer({ server: { middlewareMode: true, ws: false }, appType: 'custom' })
after(() => vite.close())
const { companyContent, copy, resolveLanguage, contactNoticeCode } = await vite.ssrLoadModule('/src/i18n/index.ts')

const strings = (value) => typeof value === 'string' ? [value] :
  value && typeof value === 'object' ? Object.values(value).flatMap(strings) : []

test('saved preference wins; Korean browser locales use Korean and other locales use English', () => {
  assert.equal(resolveLanguage('en', 'ko-KR'), 'en')
  assert.equal(resolveLanguage('ko', 'en-US'), 'ko')
  assert.equal(resolveLanguage(null, 'ko-KR'), 'ko')
  assert.equal(resolveLanguage('invalid', 'KO'), 'ko')
  assert.equal(resolveLanguage(null, 'en-GB'), 'en')
  assert.equal(resolveLanguage(null, 'ja-JP'), 'en')
})

test('all English copy is translated, except the original masked reviewer identity', () => {
  const remaining = strings(companyContent.en).filter((text) => /[가-힣]/u.test(text))
  assert.deepEqual(remaining, ['주*****'])
  assert.equal(strings(copy.en).some((text) => /[가-힣]/u.test(text)), false)
})

test('both languages share every image, project ID, category and contact link', () => {
  const { ko, en } = companyContent
  assert.equal(en.portfolioProjects.length, ko.portfolioProjects.length)
  ko.portfolioProjects.forEach((project, index) => {
    const translated = en.portfolioProjects[index]
    for (const key of ['id', 'category', 'cover', 'gallery']) {
      assert.deepEqual(translated[key], project[key])
    }
  })
  assert.deepEqual(en.serviceTabs.map((tab) => tab.gallery.map((image) => image.src)),
    ko.serviceTabs.map((tab) => tab.gallery.map((image) => image.src)))
  assert.equal(en.projectTypes.length, ko.projectTypes.length)
  assert.deepEqual(en.footerLinks, ko.footerLinks)
  for (const key of ['businessNumber', 'phone', 'email']) {
    assert.equal(en.companyInfo[key], ko.companyInfo[key])
  }
})

test('API messages use the requested language and retain stable codes', () => {
  const request = (language, accepted = 'ko') => ({ body: { language }, acceptsLanguages: () => accepted })
  for (const code of ['INVALID_INPUT', 'PRIVACY_REQUIRED', 'MAIL_NOT_CONFIGURED', 'CONTACT_SENT', 'RATE_LIMITED', 'SEND_FAILED']) {
    const en = contactMessage(request('en'), code)
    const ko = contactMessage(request('ko', 'en'), code)
    assert.equal(en.code, ko.code)
    assert.equal(/[가-힣]/u.test(en.message), false)
    assert.equal(/[가-힣]/u.test(ko.message), true)
    assert.equal(contactMessage(request(undefined, 'en'), code).message, en.message)
    assert.equal(contactMessage(request(undefined), code).message, ko.message)
  }
})

test('frontend handles coded, legacy, rate-limit, and non-JSON failures without leaking another language', () => {
  assert.equal(contactNoticeCode(429), 'rateLimit')
  assert.equal(contactNoticeCode(400, 'PRIVACY_REQUIRED'), 'privacy')
  assert.equal(contactNoticeCode(400), 'invalid')
  assert.equal(contactNoticeCode(413), 'invalid')
  assert.equal(contactNoticeCode(500, 'MAIL_NOT_CONFIGURED'), 'unavailable')
  assert.equal(contactNoticeCode(502), 'failed')
})
