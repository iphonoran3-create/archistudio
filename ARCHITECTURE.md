# Architecture Technique - Site Web Architecture Startup

## Stack Technique

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Langage**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **3D**: Three.js (optionnel)

### Backend
- **API**: Next.js API Routes + Server Actions
- **Base de données**: Supabase (PostgreSQL)
- **Authentification**: Supabase Auth
- **Stockage**: Supabase Storage
- **Validation**: Zod

## Architecture du Projet

```
archi/
├── app/
│   ├── (public)/              # Pages publiques
│   │   ├── page.tsx          # Homepage
│   │   ├── about/
│   │   ├── services/
│   │   ├── projects/
│   │   ├── contact/
│   │   ├── quote/
│   │   └── appointment/
│   ├── (client)/             # Espace client (protégé)
│   │   ├── dashboard/
│   │   ├── projects/
│   │   ├── appointments/
│   │   ├── documents/
│   │   ├── messages/
│   │   └── profile/
│   ├── (admin)/              # Espace admin (protégé)
│   │   ├── admin/
│   │   ├── clients/
│   │   ├── projects/
│   │   ├── appointments/
│   │   ├── quotes/
│   │   ├── portfolio/
│   │   └── users/
│   ├── api/                  # API Routes
│   ├── auth/                 # Auth pages (login, register)
│   ├── layout.tsx            # Root layout
│   └── globals.css
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── layout/               # Layout components
│   ├── sections/             # Page sections
│   ├── forms/                # Form components
│   └── dashboard/            # Dashboard components
├── lib/
│   ├── supabase/             # Supabase client
│   ├── utils.ts              # Utilities
│   ├── validations.ts        # Zod schemas
│   └── types.ts              # TypeScript types
├── public/
│   ├── images/
│   └── documents/
└── prisma/                   # Si Prisma est utilisé
```

## Sécurité

- **RBAC**: Role-Based Access Control (Admin, Architect, Client)
- **Middleware**: Protection des routes
- **Validation**: Zod pour tous les formulaires
- **Auth**: Supabase Auth avec sessions sécurisées
- **Protection**: XSS, CSRF, injection SQL
- **File Upload**: Validation des types et tailles

## Performance

- **Images**: Optimisation Next.js Image
- **Lazy Loading**: Composants et images
- **Code Splitting**: Automatic avec Next.js
- **Cache**: Supabase cache + Next.js cache
- **CDN**: Supabase Storage CDN

## SEO

- **Meta Tags**: Next.js Metadata API
- **Sitemap**: Génération automatique
- **Robots.txt**: Configuration
- **Schema.org**: Données structurées
- **Open Graph**: Social media sharing
