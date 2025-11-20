#!/usr/bin/env sh
set -euo pipefail

supabase db push
supabase gen types typescript --local > types/database.types.ts
