-- =============================================================================
-- SUPABASE SCHEMA: PhD Research Survey
-- Study: Green Marketing & Pharma/Nutraceutical Consumer Behavior
-- =============================================================================
-- Run this SQL in the Supabase SQL Editor (Dashboard > SQL Editor > New Query)

-- 1. Main survey responses table
CREATE TABLE IF NOT EXISTS survey_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,

  -- Screening
  sq1_purchased BOOLEAN NOT NULL,
  sq2_noticed TEXT NOT NULL CHECK (sq2_noticed IN ('yes', 'not_sure', 'no')),

  -- Demographics
  dem1_age TEXT NOT NULL,
  dem2_gender TEXT NOT NULL,
  dem3_education TEXT NOT NULL,
  dem4_region TEXT NOT NULL,
  dem4_region_other TEXT,
  dem5_income TEXT NOT NULL,
  dem6_frequency TEXT NOT NULL,
  dem7_products TEXT[] NOT NULL,  -- array of selected product types
  dem7_other TEXT,

  -- ELC (Eco-label Credibility) 1-5
  elc1 SMALLINT NOT NULL CHECK (elc1 BETWEEN 1 AND 5),
  elc2 SMALLINT NOT NULL CHECK (elc2 BETWEEN 1 AND 5),
  elc3 SMALLINT NOT NULL CHECK (elc3 BETWEEN 1 AND 5),
  elc4 SMALLINT NOT NULL CHECK (elc4 BETWEEN 1 AND 5),
  elc5 SMALLINT NOT NULL CHECK (elc5 BETWEEN 1 AND 5),

  -- GAC (Green Advertising Claims) 1-5
  gac1 SMALLINT NOT NULL CHECK (gac1 BETWEEN 1 AND 5),
  gac2 SMALLINT NOT NULL CHECK (gac2 BETWEEN 1 AND 5),
  gac3 SMALLINT NOT NULL CHECK (gac3 BETWEEN 1 AND 5),
  gac4 SMALLINT NOT NULL CHECK (gac4 BETWEEN 1 AND 5),
  gac5 SMALLINT NOT NULL CHECK (gac5 BETWEEN 1 AND 5),

  -- GWS (Greenwashing Skepticism) 1-5 [reverse-scored]
  gws1 SMALLINT NOT NULL CHECK (gws1 BETWEEN 1 AND 5),
  gws2 SMALLINT NOT NULL CHECK (gws2 BETWEEN 1 AND 5),
  gws3 SMALLINT NOT NULL CHECK (gws3 BETWEEN 1 AND 5),
  gws4 SMALLINT NOT NULL CHECK (gws4 BETWEEN 1 AND 5),
  gws5 SMALLINT NOT NULL CHECK (gws5 BETWEEN 1 AND 5),

  -- GBT (Green Brand Trust) 1-5
  gbt1 SMALLINT NOT NULL CHECK (gbt1 BETWEEN 1 AND 5),
  gbt2 SMALLINT NOT NULL CHECK (gbt2 BETWEEN 1 AND 5),
  gbt3 SMALLINT NOT NULL CHECK (gbt3 BETWEEN 1 AND 5),
  gbt4 SMALLINT NOT NULL CHECK (gbt4 BETWEEN 1 AND 5),
  gbt5 SMALLINT NOT NULL CHECK (gbt5 BETWEEN 1 AND 5),

  -- PHR (Perceived Health Risk) 1-5 [reverse-scored]
  phr1 SMALLINT NOT NULL CHECK (phr1 BETWEEN 1 AND 5),
  phr2 SMALLINT NOT NULL CHECK (phr2 BETWEEN 1 AND 5),
  phr3 SMALLINT NOT NULL CHECK (phr3 BETWEEN 1 AND 5),
  phr4 SMALLINT NOT NULL CHECK (phr4 BETWEEN 1 AND 5),
  phr5 SMALLINT NOT NULL CHECK (phr5 BETWEEN 1 AND 5),

  -- GPI (Green Purchase Intention) 1-5
  gpi1 SMALLINT NOT NULL CHECK (gpi1 BETWEEN 1 AND 5),
  gpi2 SMALLINT NOT NULL CHECK (gpi2 BETWEEN 1 AND 5),
  gpi3 SMALLINT NOT NULL CHECK (gpi3 BETWEEN 1 AND 5),
  gpi4 SMALLINT NOT NULL CHECK (gpi4 BETWEEN 1 AND 5),
  gpi5 SMALLINT NOT NULL CHECK (gpi5 BETWEEN 1 AND 5),

  -- WPP (Willingness to Pay Premium) 1-5
  wpp1 SMALLINT NOT NULL CHECK (wpp1 BETWEEN 1 AND 5),
  wpp2 SMALLINT NOT NULL CHECK (wpp2 BETWEEN 1 AND 5),
  wpp3 SMALLINT NOT NULL CHECK (wpp3 BETWEEN 1 AND 5),
  wpp4 SMALLINT NOT NULL CHECK (wpp4 BETWEEN 1 AND 5),

  -- HC (Health Consciousness) 1-5
  hc1 SMALLINT NOT NULL CHECK (hc1 BETWEEN 1 AND 5),
  hc2 SMALLINT NOT NULL CHECK (hc2 BETWEEN 1 AND 5),
  hc3 SMALLINT NOT NULL CHECK (hc3 BETWEEN 1 AND 5),
  hc4 SMALLINT NOT NULL CHECK (hc4 BETWEEN 1 AND 5),
  hc5 SMALLINT NOT NULL CHECK (hc5 BETWEEN 1 AND 5),

  -- AW (AI & SDG-3 Awareness) 1-5
  aw1 SMALLINT NOT NULL CHECK (aw1 BETWEEN 1 AND 5),
  aw2 SMALLINT NOT NULL CHECK (aw2 BETWEEN 1 AND 5),
  aw3 SMALLINT NOT NULL CHECK (aw3 BETWEEN 1 AND 5),
  aw4 SMALLINT NOT NULL CHECK (aw4 BETWEEN 1 AND 5),

  -- Open-Ended Qualitative
  oe1 TEXT,
  oe2 TEXT,
  oe3 TEXT,
  oe4 TEXT,
  oe5 TEXT,
  oe6 TEXT,
  oe7 TEXT,
  oe8 TEXT
);

-- 2. Enable Row Level Security
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Allow anonymous INSERT (public respondents submit surveys)
CREATE POLICY "Allow anonymous insert" ON survey_responses
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 4. Policy: Only authenticated users (researcher) can SELECT
CREATE POLICY "Allow authenticated select" ON survey_responses
  FOR SELECT
  TO authenticated
  USING (true);

-- 5. Index for faster queries
CREATE INDEX idx_survey_created ON survey_responses (created_at DESC);
CREATE INDEX idx_survey_region ON survey_responses (dem4_region);
