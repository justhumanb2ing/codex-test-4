# 2025-11-20 Supabase 스키마 및 SSR 데이터 흐름

## 기능 개요
- Book, Emotion, Keyword, Achievement 도메인을 Supabase 테이블로 정식 정의했습니다.
- 모든 테이블에 user_id 기반 RLS를 적용해 사용자 데이터 격리를 보장합니다.
- `push.sh` 스크립트로 마이그레이션 적용과 타입 생성을 한 번에 실행할 수 있습니다.
- 서버 컴포넌트가 Supabase 데이터를 직접 페칭하거나, 환경이 준비되지 않은 경우 안전한 샘플 데이터를 SSR로 노출합니다.

## 데이터 흐름
1. `supabase/migrations/20251120_0624_initial_schema.sql`을 통해 테이블과 RLS가 생성됩니다.
2. `services/book-service.ts`의 `fetchRecentBooks`가 서버에서 Supabase를 쿼리합니다.
3. 환경 변수가 없거나 오류가 발생하면 내장된 `FALLBACK_BOOKS`를 반환해 UI가 깨지지 않습니다.
4. `app/page.tsx`가 서버에서 동일한 함수 결과를 받아 SSR로 리스트를 렌더링합니다.

## API 구조
- **books**: id, user_id, title, author, summary, published_at, created_at
- **emotions**: id, user_id, book_id, label, intensity, color_code, created_at
- **keywords**: id, user_id, value, category, created_at
- **book_keywords**: (book_id, keyword_id) PK, user_id, created_at
- **achievements**: id, user_id, title, description, achieved_at, created_at
- **achievement_books**: (achievement_id, book_id) PK, user_id, created_at
- self-access RLS 정책을 모든 테이블에 생성했습니다.

## SSR 전략
- `fetchRecentBooks`를 Server Component에서 호출하여 데이터 페칭과 렌더링을 한 흐름으로 유지합니다.
- 클라이언트 상태 관리나 React Query 없이 SSR 만으로 초기 화면을 구성합니다.

## 에러 처리
- Supabase 환경 미설정 또는 쿼리 오류 시 `source: 'fallback'`과 함께 샘플 데이터를 반환합니다.
- 오류 객체는 `BookListResponse.error`로 전달되어 서버 로깅이나 추가 처리를 할 수 있습니다.

## 타입 변화
- `types/entities.ts`가 DB 스키마를 반영해 userId, createdAt 필드를 포함합니다.
- `supabase gen types` 실행 시 `types/database.types.ts`에 DB 타입 정의가 추가됩니다.

## 테스트 기준
- `tests/book-service.test.ts`에서 환경 부재, 성공, 오류 3가지 경로를 검증합니다.
- 추가 도메인 서비스가 생기면 동일한 패턴으로 서버 우선 페칭과 폴백 로직을 테스트합니다.
