import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import rateLimit from 'express-rate-limit'
import nodemailer from 'nodemailer'
import { z } from 'zod'

const app = express()
const port = Number(process.env.PORT ?? 4000)
const allowedOrigin = process.env.ALLOWED_ORIGIN ?? 'http://127.0.0.1:5173'

const contactSchema = z.object({
  name: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(160),
  projectType: z.string().trim().min(1).max(80),
  message: z.string().trim().min(1).max(3000),
  privacy: z.boolean(),
  website: z.string().trim().max(0).optional(),
})

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

app.set('trust proxy', 1)
app.use(cors({ origin: allowedOrigin }))
app.use(express.json({ limit: '32kb' }))
app.use(
  rateLimit({
    windowMs: 10 * 60 * 1000,
    limit: 5,
    standardHeaders: true,
    legacyHeaders: false,
  }),
)

const contactHandler = async (request, response) => {
  const parsed = contactSchema.safeParse(request.body)

  if (!parsed.success) {
    return response.status(400).json({ message: '입력값을 다시 확인해주세요.' })
  }

  const { name, email, projectType, message, privacy, website } = parsed.data

  if (!privacy) {
    return response.status(400).json({ message: '개인정보 처리방침 동의가 필요합니다.' })
  }

  if (website) {
    return response.status(204).send()
  }

  if (!process.env.MAIL_TO || !process.env.MAIL_FROM) {
    return response.status(500).json({ message: '메일 서버 설정이 완료되지 않았습니다.' })
  }

  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: process.env.MAIL_TO,
    replyTo: email,
    subject: '[App Bridge] 프로젝트 문의',
    text: [
      '회사명: 앱 브릿지',
      `문의 이름: ${name}`,
      `이메일: ${email}`,
      `프로젝트 유형: ${projectType}`,
      '',
      '메시지:',
      message,
    ].join('\n'),
  })

  return response.json({ message: '문의가 접수되었습니다.' })
}

app.get('/health', (_request, response) => {
  response.json({ ok: true })
})

app.post('/contact', contactHandler)
app.post('/api/contact', contactHandler)

app.use((error, _request, response, _next) => {
  console.error(error)
  response.status(500).json({ message: '메일 발송 중 오류가 발생했습니다.' })
})

app.listen(port, () => {
  console.log(`App Bridge contact API listening on ${port}`)
})
