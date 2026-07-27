# Archistudio - Site Web Professionnel d'Architecture

Une plateforme web complète pour une startup d'architecture avec un site vitrine public, un espace client, et un dashboard administrateur.

## 🏛️ Fonctionnalités

### Site Public
- **Homepage** avec sections Hero, À propos, Services, Projets, Processus, Témoignages
- **Portfolio** avec filtrage par catégorie et pages de détail
- **Système de rendez-vous** en ligne avec formulaire multi-étapes
- **Demande de devis** intelligent avec upload de fichiers
- **Page contact** avec formulaire et informations
- **Page à propos** avec histoire, valeurs et équipe

### Espace Client
- **Dashboard** avec vue d'ensemble des projets
- **Gestion des projets** avec suivi de progression
- **Timeline** interactive des étapes du projet
- **Documents** avec téléchargement
- **Rendez-vous** avec gestion
- **Messagerie** avec les architectes

### Espace Administrateur
- **Dashboard** avec statistiques et KPIs
- **Gestion des clients** (CRUD complet)
- **Gestion des projets** avec statuts et progression
- **Gestion des rendez-vous** avec calendrier
- **Gestion des devis** et demandes
- **Gestion du portfolio** public

## 🛠️ Technologies

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Lucide Icons
- **Animations**: Framer Motion
- **Backend**: Next.js API Routes, Server Actions
- **Base de données**: Supabase (PostgreSQL)
- **Authentification**: Supabase Auth
- **Stockage**: Supabase Storage
- **Forms**: React Hook Form + Zod validation

## 📋 Prérequis

- Node.js 18+ 
- npm ou yarn
- Un compte Supabase (gratuit)

## 🚀 Installation

### 1. Cloner le projet

```bash
git clone <repository-url>
cd archi
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configuration Supabase

1. Créer un compte sur [supabase.com](https://supabase.com)
2. Créer un nouveau projet
3. Aller dans Settings > API
4. Copier l'URL et la clé anon

### 4. Configuration des variables d'environnement

Créer un fichier `.env.local` à la racine du projet :

```env
NEXT_PUBLIC_SUPABASE_URL=votre_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_supabase_anon_key
```

### 5. Configuration de la base de données

Exécuter le script SQL fourni dans `DATABASE_SCHEMA.md` dans l'éditeur SQL Supabase pour créer toutes les tables nécessaires.

### 6. Lancer le serveur de développement

```bash
npm run dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📁 Structure du Projet

```
archi/
├── app/                      # Pages Next.js (App Router)
│   ├── (public)/            # Pages publiques
│   │   ├── page.tsx         # Homepage
│   │   ├── about/           # À propos
│   │   ├── projects/        # Portfolio
│   │   ├── contact/         # Contact
│   │   ├── quote/           # Demande de devis
│   │   └── appointment/     # Rendez-vous
│   ├── (client)/            # Espace client (protégé)
│   │   └── dashboard/       # Dashboard client
│   ├── (admin)/             # Espace admin (protégé)
│   │   └── admin/           # Dashboard admin
│   ├── layout.tsx           # Layout racine
│   └── globals.css          # Styles globaux
├── components/              # Composants React
│   ├── ui/                  # Composants shadcn/ui
│   ├── layout/              # Navigation, Footer
│   ├── sections/            # Sections de pages
│   └── forms/               # Formulaires
├── lib/                     # Utilitaires
│   ├── supabase/            # Client Supabase
│   ├── utils.ts             # Fonctions utilitaires
│   ├── types.ts             # Types TypeScript
│   └── validations.ts       # Schémas Zod
└── public/                  # Fichiers statiques
```

## 🎨 Personnalisation

### Couleurs

Les couleurs sont définies dans `tailwind.config.ts` :

```typescript
colors: {
  'archi-dark': '#1a1a1a',
  'archi-gray': '#2d2d2d',
  'archi-concrete': '#808080',
  'archi-beige': '#d4c4a8',
  'archi-cream': '#f5f0e6',
  'archi-accent': '#c9a227',
}
```

### Contenu

Remplacer les données fictives dans les composants par vos propres données :
- Projets dans `app/projects/page.tsx`
- Témoignages dans `components/sections/testimonials.tsx`
- Équipe dans `app/about/page.tsx`

## 🔐 Sécurité

Le projet inclut :
- Authentification Supabase sécurisée
- Protection des routes avec middleware
- Validation des formulaires avec Zod
- RBAC (Role-Based Access Control) pour les rôles admin/architecte/client

## 📱 Responsive Design

Le site est entièrement responsive :
- Mobile (320px+)
- Tablet (768px+)
- Desktop (1024px+)
- Large screens (1280px+)

## 🚀 Build pour la production

```bash
npm run build
npm start
```

## 📊 Base de Données

Le schéma complet de la base de données est disponible dans `DATABASE_SCHEMA.md`.

Tables principales :
- `users` - Utilisateurs et authentification
- `projects` - Projets clients
- `appointments` - Rendez-vous
- `quote_requests` - Demandes de devis
- `portfolio_projects` - Projets du portfolio public
- `messages` - Messagerie
- `notifications` - Notifications

## 🔧 Développement

### Ajouter une nouvelle page publique

1. Créer un dossier dans `app/(public)/`
2. Ajouter un fichier `page.tsx`
3. Inclure Navigation et Footer

### Ajouter une nouvelle page client

1. Créer un dossier dans `app/(client)/dashboard/`
2. Ajouter un fichier `page.tsx`
3. La page sera automatiquement protégée

### Ajouter un composant UI

Les composants shadcn/ui sont déjà configurés. Pour en ajouter :

```bash
npx shadcn-ui@latest add [component-name]
```

## 📝 TODO

- [ ] Intégration complète Supabase Auth
- [ ] Configuration du middleware de protection des routes
- [ ] Implémentation de l'envoi d'emails
- [ ] Configuration du stockage Supabase
- [ ] Ajout des composants Tabs et Toast manquants
- [ ] Optimisation SEO complète
- [ ] Tests E2E avec Playwright
- [ ] Configuration CI/CD

## 🤝 Contribution

Ce projet est un template de départ. N'hésitez pas à l'adapter selon vos besoins.

## 📄 Licence

Ce projet est fourni tel quel pour usage commercial ou personnel.

## 🆘 Support

Pour toute question ou problème :
- Consulter la documentation Next.js
- Consulter la documentation Supabase
- Vérifier les issues du projet

---

**Développé avec ❤️ pour Archistudio**
