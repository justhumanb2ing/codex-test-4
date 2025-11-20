# Supabase 로컬 개발 가이드

이 문서는 Next.js App Router(Next.js 16 호환)와 Supabase를 로컬에서 함께 실행하는 최소 단계를 설명합니다.

## 사전 준비
- Docker Desktop 또는 Podman
- `supabase` CLI (로컬에서 `supabase init` 후 `supabase start` 명령 사용)
- `.env.local` 파일에 Supabase 프로젝트 키 설정

## 환경 변수
`.env.example`을 복사해 `.env.local`을 만든 뒤 로컬 프로젝트 값으로 치환하세요.

- `NEXT_PUBLIC_SUPABASE_URL`: Supabase 프로젝트 URL (로컬일 경우 `http://localhost:54321`)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: 익명 키
- `SUPABASE_SERVICE_ROLE_KEY`: 서버 전용 서비스 롤 키 (로컬 개발 시에도 필수)
- `SUPABASE_LOCAL_URL`: Docker 실행 시 Supabase 공개 URL (선택 사항, 기본값 사용 가능)

## 실행 절차
1. `supabase start`로 로컬 스택을 기동합니다.
2. 프로젝트 루트에서 `npm install`로 의존성을 설치합니다.
3. `sh push.sh`로 마이그레이션을 반영하고 타입을 생성합니다.
4. `npm run dev`로 Next.js 개발 서버를 실행합니다.
5. 브라우저에서 `http://localhost:3000`에 접속하여 초기 화면과 Supabase 상태를 확인합니다.

## 테스트
- `npm test`로 Jest 단위 테스트를 실행합니다. (의존성 설치가 필요한 환경입니다.)

## 문제 해결
- 네트워크 차단으로 패키지 설치가 되지 않는 경우, 오프라인 패키지 캐시 또는 사설 레지스트리를 사용하세요.
- Supabase 포트 충돌 시 `supabase stop` 후 `SUPABASE_INTERNAL_PORT`를 조정해 재시작합니다.
