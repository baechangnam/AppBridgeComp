# App Bridge Homepage

React 정적 홈페이지와 문의 메일 API로 구성된 App Bridge 회사 홈페이지입니다.

## Local Development

```bash
pnpm install
pnpm run dev
```

문의 API까지 함께 확인할 때는 별도 터미널에서 실행합니다.

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

필요한 환경변수:

```ini
PORT=4000
ALLOWED_ORIGIN=https://appbridge.co.kr
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password
MAIL_FROM="App Bridge <no-reply@appbridge.co.kr>"
MAIL_TO=vicjoa@naver.com
```

## Server Deployment

정적 파일:

```txt
/opt/appbridge
```

문의 API:

```txt
/opt/appbridge-api
```

서버에는 이 저장소의 `api/` 폴더 내용을 `/opt/appbridge-api`에 배포합니다.

Nginx 예시:

```nginx
server {
    listen 80;
    server_name appbridge.co.kr www.appbridge.co.kr;

    root /opt/appbridge;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:4000/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

API 서버는 `pm2` 등으로 상시 실행합니다.

```bash
cd /opt/appbridge-api
pnpm install --prod
pm2 start src/server.js --name appbridge-api
pm2 save
```
