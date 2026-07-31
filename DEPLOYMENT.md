# Guide de Déploiement - Archistudio

## 🚀 Déploiement sur Vercel avec Supabase

### Prérequis
- Compte Vercel (gratuit)
- Compte Supabase (gratuit)
- Compte GitHub (pour le dépôt de code)
- Node.js 18+ installé localement

## 📦 Configuration Supabase

### Étape 1: Créer un projet Supabase

1. **Allez sur https://supabase.com**
2. **Cliquez sur "Start your project"**
3. **Connectez-vous avec GitHub**
4. **Cliquez sur "New Project"**
5. **Remplissez les informations** :
   - **Name**: `archistudio` (ou autre nom)
   - **Database Password**: Choisissez un mot de passe fort (notez-le !)
   - **Region**: Choisissez une région proche (ex: EU West)
6. **Cliquez sur "Create new project"**
7. **Attendez ~2 minutes** que le projet soit créé

### Étape 2: Obtenir les clés API

1. **Allez sur** : https://supabase.com/dashboard/project/VOTRE_PROJECT_ID/settings/api
2. **Cherchez "Project API keys"**
3. **Copiez ces 3 informations** :
   - **Project URL** (ex: https://xxxxxxxx.supabase.co)
   - **anon public key** (commence par `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)
   - **service_role key** (commence par `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

### Étape 3: Créer les tables de base de données

1. **Allez sur** : https://supabase.com/dashboard/project/VOTRE_PROJECT_ID/sql
2. **Cliquez sur "New Query"**
3. **Copiez tout le contenu** du fichier `supabase-schema.sql`
4. **Collez-le dans l'éditeur SQL**
5. **Cliquez sur "Run"** pour exécuter

Cela créera toutes les tables nécessaires (settings, projects, services, testimonials, team, messages, quotes, appointments).

### Étape 4: Configurer les variables d'environnement

Créez un fichier `.env.local` à la racine du projet avec :

```env
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_anon_key
SUPABASE_SERVICE_ROLE_KEY=votre_service_role_key
```

## 🚀 Déploiement sur Vercel

### Étape 1: Préparer le dépôt GitHub

1. **Initialiser Git (si pas déjà fait)**
```bash
git init
git add .
git commit -m "Initial commit"
```

2. **Créer un dépôt sur GitHub**
   - Allez sur github.com
   - Créez un nouveau dépôt
   - Copiez l'URL du dépôt

3. **Connecter le dépôt local**
```bash
git remote add origin VOTRE_URL_GITHUB
git branch -M main
git push -u origin main
```

### Étape 2: Déployer sur Vercel

#### Option A: Via l'interface Vercel (Recommandé)

1. **Connecter Vercel à GitHub**
   - Allez sur vercel.com
   - Connectez-vous avec GitHub
   - Cliquez sur "Add New Project"

2. **Importer le dépôt**
   - Sélectionnez votre dépôt GitHub
   - Cliquez sur "Import"

3. **Configurer le projet**
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (laisser par défaut)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

4. **Ajouter les variables d'environnement**
   - Cliquez sur "Environment Variables"
   - Ajoutez les 3 variables de votre fichier `.env.local` :
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`

5. **Déployer**
   - Cliquez sur "Deploy"
   - Attendez que le build termine (~2-3 minutes)
   - Votre site sera accessible à `https://votre-projet.vercel.app`

#### Option B: Via Vercel CLI

1. **Installer Vercel CLI**
```bash
npm install -g vercel
```

2. **Se connecter**
```bash
vercel login
```

3. **Déployer**
```bash
vercel
```

4. **Déployer en production**
```bash
vercel --prod
```

### Étape 3: Vérifier le déploiement

1. **Tester le site**
   - Allez sur l'URL fournie par Vercel
   - Vérifiez que toutes les pages fonctionnent
   - Testez le formulaire de contact

2. **Tester l'admin**
   - Connectez-vous avec `admin@demo.com` / `admin123`
   - Vérifiez que les pages admin fonctionnent
   - Testez la modification des paramètres
   - Vérifiez que les données sont sauvegardées dans Supabase

## ✅ Avantages du déploiement actuel

Le projet utilise maintenant:
- **Base de données Supabase** (persistante et sécurisée)
- **API routes optimisées** pour Supabase
- **Gestion d'erreurs** si la base de données n'est pas configurée
- **Données persistantes** entre les déploiements

## ⚠️ Limitations actuelles

- **Authentification mock** (non sécurisée pour production)
- **Pas de stockage cloud** pour les fichiers

### Pour un déploiement production-ready:

1. **Authentification réelle**
   - Supabase Auth (intégré à votre projet Supabase)
   - NextAuth.js
   - Clerk

2. **Stockage de fichiers**
   - Supabase Storage (intégré à votre projet Supabase)
   - Cloudinary
   - AWS S3

## 🔧 Configuration avancée

### Domaine personnalisé

1. Dans Vercel, allez dans Settings > Domains
2. Ajoutez votre domaine
3. Configurez les DNS selon les instructions

### Analytics

Vercel fournit des analytics gratuits. Activez-les dans:
Settings > Analytics

## 📝 Notes importantes

- Les données sont maintenant persistantes dans Supabase
- Les images externes (Unsplash) fonctionnent mais peuvent être lentes
- Pour un meilleur SEO, utilisez des images hébergées sur Supabase Storage
- Gardez vos clés Supabase secrètes, ne les commitez pas sur GitHub

## 🆘 Support

En cas de problème:
1. Vérifiez les logs de build dans Vercel
2. Vérifiez que les variables d'environnement sont correctement configurées
3. Testez localement avec `npm run build && npm start`
4. Consultez la documentation Supabase: https://supabase.com/docs
5. Consultez la documentation Next.js: https://nextjs.org/docs

## 🔄 Mises à jour

Pour mettre à jour le site après des modifications:

```bash
git add .
git commit -m "Description des changements"
git push
```

Vercel déploiera automatiquement les changements.
