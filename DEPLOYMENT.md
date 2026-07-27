# Guide de Déploiement - Archistudio

## 🚀 Déploiement sur Vercel

### Prérequis
- Compte Vercel (gratuit)
- Compte GitHub (pour le dépôt de code)
- Node.js 18+ installé localement

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

4. **Variables d'environnement** (Optionnel pour l'instant)
   - Ajoutez les variables de `.env.example` si nécessaire
   - Pour l'instant, le projet fonctionne sans variables

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

## ⚠️ Limitations du déploiement actuel

Le projet utilise actuellement:
- **Authentification mock** (non sécurisée pour production)
- **Base de données JSON locale** (non persistante entre redéploiements)
- **Pas de stockage cloud** pour les fichiers

### Pour un déploiement production-ready:

1. **Base de données**
   - Supabase (gratuit et facile)
   - PostgreSQL sur Vercel Postgres
   - MongoDB Atlas

2. **Authentification**
   - NextAuth.js
   - Clerk
   - Supabase Auth

3. **Stockage de fichiers**
   - Cloudinary
   - AWS S3
   - Vercel Blob Storage

## 🔧 Configuration avancée

### Domaine personnalisé

1. Dans Vercel, allez dans Settings > Domains
2. Ajoutez votre domaine
3. Configurez les DNS selon les instructions

### Analytics

Vercel fournit des analytics gratuits. Activez-les dans:
Settings > Analytics

## 📝 Notes importantes

- Les données JSON dans `public/data/` seront réinitialisées à chaque déploiement
- Pour persister les données, utilisez une vraie base de données
- Les images externes (Unsplash) fonctionnent mais peuvent être lentes
- Pour un meilleur SEO, utilisez des images hébergées

## 🆘 Support

En cas de problème:
1. Vérifiez les logs de build dans Vercel
2. Testez localement avec `npm run build && npm start`
3. Consultez la documentation Next.js: https://nextjs.org/docs

## 🔄 Mises à jour

Pour mettre à jour le site après des modifications:

```bash
git add .
git commit -m "Description des changements"
git push
```

Vercel déploiera automatiquement les changements.
