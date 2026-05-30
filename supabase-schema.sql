-- ═══════════════════════════════════════════════════════════════════════════
--  Aangan Restaurant — Supabase Schema
--  Run this entire file in: Supabase → SQL Editor → New query → Run
-- ═══════════════════════════════════════════════════════════════════════════

-- ── 1. menu_items ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS menu_items (
  id          TEXT        PRIMARY KEY,              -- e.g. "cg-01", "sk-03"
  name        TEXT        NOT NULL,
  category    TEXT        NOT NULL,                 -- slug: "charcoal-grill", etc.
  description TEXT        NOT NULL DEFAULT '',
  price       INTEGER     NOT NULL DEFAULT 0,       -- PKR, integer
  tags        TEXT[]      NOT NULL DEFAULT '{}',    -- ["bestseller","spicy",…]
  is_featured BOOLEAN     NOT NULL DEFAULT FALSE,
  available   BOOLEAN     NOT NULL DEFAULT TRUE,
  prep_time   INTEGER     NOT NULL DEFAULT 15,      -- minutes
  image       TEXT,                                 -- nullable Unsplash/Blob URL
  sort_order  INTEGER     NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── 2. gallery_images ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS gallery_images (
  id          TEXT        PRIMARY KEY,              -- "g1" … "g6"
  slot        TEXT        UNIQUE NOT NULL,          -- stable key e.g. "rooftop-ambiance"
  label       TEXT        NOT NULL,
  url         TEXT,                                 -- nullable
  alt         TEXT        NOT NULL DEFAULT '',
  sort_order  INTEGER     NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── 3. Row Level Security ────────────────────────────────────────────────────
ALTER TABLE menu_items    ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read (public menu / gallery pages)
CREATE POLICY "public_read_menu_items"
  ON menu_items FOR SELECT USING (true);

CREATE POLICY "public_read_gallery_images"
  ON gallery_images FOR SELECT USING (true);

-- Service-role key bypasses RLS automatically — no extra write policy needed.
-- (Admin API routes use supabaseAdmin which uses the service-role key.)

-- ── Done ─────────────────────────────────────────────────────────────────────
-- After running this script, run:  npm run seed:supabase
