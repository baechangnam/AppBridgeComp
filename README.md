# App Bridge Homepage

A lightweight company homepage starter built with **React + Vite + TypeScript + pnpm workspace**, plus a small Express contact-form API in `api/`.

React 정적 홈페이지와 문의 메일 API로 구성된 회사 홈페이지입니다.

## Features

- Static-first marketing pages (fast to deploy anywhere)
- Contact form with a minimal Node API (`POST /api/contact`)
- pnpm monorepo layout — frontend and API in one repo
- TypeScript end to end

## Local Development

```bash
pnpm install
pnpm run dev
```

문의 API까지 함께 확인할 때는 별도 터미널에서 실행합니다:

```bash
cp api/.env.example api/.env
pnpm run dev:api
```

React 개발 서버는 `/api/*` 요청을 `http://127.0.0.1:4000`으로 프록시합니다.

## Build

```bash
pnpm run build
```

정적 배포 결과물은 `dist/`에 생성됩니다.

## Contact API

문의폼은 `POST /api/contact`로 전송됩니다. API 서버는 `api/`에 있으며 SMTP 설정은 환경변수로 받습니다.

## Contributing

Issues and PRs are welcome — see [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE)
