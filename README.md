# PhD Research Survey Webapp

## Study Title
**"Eco-label Credibility and Green Advertising Claims as Antecedents of Greenwashing Skepticism, Green Brand Trust, and Perceived Health Risk in Shaping Consumer Green Purchase Intention for Pharmaceutical and Nutraceutical Products: A Mixed-Method Empirical Study"**

## Stack
- **Frontend:** Next.js 16 + TypeScript + Tailwind CSS
- **Backend:** Supabase (PostgreSQL + Row Level Security)
- **Deployment:** Vercel

## Setup

### 1. Supabase
1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase_schema.sql`
3. Go to **Settings > API** and copy your Project URL and anon/public key

### 2. Environment Variables
Copy `.env.local.example` to `.env.local` and fill in your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Local Development
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### 4. Deploy to Vercel
1. Push this repo to GitHub
2. Import the repo on [vercel.com](https://vercel.com)
3. Add the same environment variables in Vercel project settings
4. Deploy

## Survey Structure
- **48 Likert-scale items** across 7 core constructs + 4 alignment items
- **8 open-ended qualitative questions**
- **Screening & Demographics** with product type selection
- **12-step multi-page form** with progress tracking

## Constructs
| Code | Construct | Role |
|------|-----------|------|
| ELC | Eco-label Credibility | IV |
| GAC | Green Advertising Claims | IV |
| GWS | Greenwashing Skepticism | Mediator |
| GBT | Green Brand Trust | Mediator |
| PHR | Perceived Health Risk | Mediator |
| GPI | Green Purchase Intention | DV |
| WPP | Willingness to Pay Premium | DV |
| HC | Health Consciousness | Moderator |
| AW | AI & SDG-3 Awareness | Alignment |
