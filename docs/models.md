# JSON Schema 모델 정의

아래 스키마는 Book, Emotion, Keyword, Achievement 엔티티에 대한 JSON Schema 예시입니다. Supabase Table Editor에서 바로 복사해 컬럼을 설계하거나, 런타임 검증에 활용할 수 있습니다.

## Book
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.com/schemas/book.json",
  "title": "Book",
  "type": "object",
  "properties": {
    "id": { "type": "string", "format": "uuid" },
    "title": { "type": "string", "minLength": 1 },
    "author": { "type": "string", "minLength": 1 },
    "publishedAt": { "type": "string", "format": "date" },
    "summary": { "type": ["string", "null"], "maxLength": 2048 },
    "keywords": { "type": "array", "items": { "type": "string" } }
  },
  "required": ["id", "title", "author", "publishedAt", "keywords"],
  "additionalProperties": false
}
```

## Emotion
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.com/schemas/emotion.json",
  "title": "Emotion",
  "type": "object",
  "properties": {
    "id": { "type": "string", "format": "uuid" },
    "label": { "type": "string", "minLength": 1 },
    "intensity": { "type": "integer", "minimum": 0, "maximum": 10 },
    "colorCode": { "type": ["string", "null"], "pattern": "^#([A-Fa-f0-9]{6})$" }
  },
  "required": ["id", "label", "intensity"],
  "additionalProperties": false
}
```

## Keyword
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.com/schemas/keyword.json",
  "title": "Keyword",
  "type": "object",
  "properties": {
    "id": { "type": "string", "format": "uuid" },
    "value": { "type": "string", "minLength": 1 },
    "category": { "type": ["string", "null"], "minLength": 1 }
  },
  "required": ["id", "value"],
  "additionalProperties": false
}
```

## Achievement
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.com/schemas/achievement.json",
  "title": "Achievement",
  "type": "object",
  "properties": {
    "id": { "type": "string", "format": "uuid" },
    "title": { "type": "string", "minLength": 1 },
    "description": { "type": ["string", "null"], "maxLength": 2048 },
    "achievedAt": { "type": "string", "format": "date-time" },
    "relatedBookIds": {
      "type": ["array", "null"],
      "items": { "type": "string", "format": "uuid" }
    }
  },
  "required": ["id", "title", "achievedAt"],
  "additionalProperties": false
}
```
