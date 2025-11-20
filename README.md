# Supabase Local Next.js 16 샌드박스

Next.js App Router(Next.js 16 가이드라인 준수)와 Supabase 로컬 개발 환경을 위한 스타터입니다. 타입 안전성과 테스트 가능성을 우선하며,
서버 우선 렌더링과 최소 자바스크립트 번들을 지향합니다. Supabase 마이그레이션과 push 스크립트가 포함되어 Postgres 스키마를 즉시
올릴 수 있습니다.

## 폴더 구조
- **/app**: App Router 기반 페이지와 레이아웃.
- **/components**: 재사용 가능한 UI 컴포넌트 모음.
- **/components/ui**: shadcn/ui 스타일 가이드를 따른 기본 UI 파편.
- **/services**: Supabase 등 외부 API와 데이터 로직을 모듈화.
- **/lib**: 범용 유틸리티와 공유 로직.
- **/config**: Supabase 등 환경별 설정 파일.
- **/tests**: Jest 단위/통합 테스트.
- **/types**: TypeScript 인터페이스 및 타입 선언.
- **/docs**: JSON Schema, 기능 문서 및 스키마 변경 기록.
- **/supabase/migrations**: Postgres 스키마 마이그레이션(SQL).
- **push.sh**: 로컬 Supabase에 마이그레이션 반영 및 타입 생성 스크립트.

## 로컬 개발
1. `.env.example`을 복사해 `.env.local`을 만들고 값 채우기
2. `npm install` (네트워크 제한 시 의존성 설치가 필요함)
3. `sh push.sh`로 로컬 Supabase에 스키마 반영 및 타입 생성
4. Supabase Docker 스택을 실행 후 `npm run dev`

자세한 Supabase 설정 방법은 `docs/setup.md`를 참고하세요.
