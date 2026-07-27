# Guide de Configuration - Archistudio

Ce guide vous accompagne dans la configuration finale du projet pour le rendre opérationnel.

## 📦 Étapes immédiates

### 1. Installer les dépendances

```bash
cd c:\Users\userr\Documents\archi
npm install
```

### 2. Ajouter les dépendances manquantes

Le projet utilise `tailwindcss-animate` qui n'est pas dans package.json. Ajoutez-le :

```bash
npm install tailwindcss-animate
```

### 3. Configuration Supabase

1. Créez un compte sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Allez dans Settings > API
4. Copiez l'URL et la clé anon
5. Créez un fichier `.env.local` à la racine :

```env
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anon
```

### 4. Créer les tables de la base de données

1. Allez dans l'éditeur SQL de votre projet Supabase
2. Copiez et exécutez le contenu de `DATABASE_SCHEMA.md`
3. Vérifiez que toutes les tables sont créées correctement

## 🔐 Configuration de l'authentification

### Activer l'authentification email

Dans Supabase :
1. Allez dans Authentication > Providers
2. Activez Email provider
3. Configurez les options de confirmation email selon vos besoins

### Créer les rôles utilisateurs

Exécutez ce SQL dans l'éditeur Supabase :

```sql
-- Créer un utilisateur admin
INSERT INTO users (email, password_hash, first_name, last_name, role)
VALUES ('admin@archistudio.fr', 'hash_ici', 'Admin', 'User', 'admin');

-- Créer un utilisateur architecte
INSERT INTO users (email, password_hash, first_name, last_name, role)
VALUES ('architecte@archistudio.fr', 'hash_ici', 'Marie', 'Dupont', 'architect');
```

**Note** : En production, utilisez bcrypt pour hasher les mots de passe réels.

## 🎨 Personnalisation du contenu

### Remplacer les images

Les images actuelles proviennent d'Unsplash. Pour utiliser vos propres images :

1. Créez un bucket dans Supabase Storage
2. Uploadez vos images
3. Remplacez les URLs dans les composants correspondants

### Modifier les textes

- **Nom de l'entreprise** : Modifiez dans `components/layout/navigation.tsx` et `components/layout/footer.tsx`
- **Coordonnées** : Modifiez dans `components/layout/footer.tsx` et `app/contact/page.tsx`
- **Projets** : Modifiez dans `app/projects/page.tsx` et `components/sections/projects.tsx`
- **Équipe** : Modifiez dans `app/about/page.tsx`
- **Témoignages** : Modifiez dans `components/sections/testimonials.tsx`

## 🚀 Lancer le projet

```bash
npm run dev
```

Le site sera accessible sur http://localhost:3000

## 📱 Pages disponibles

### Pages publiques
- `/` - Homepage
- `/about` - À propos
- `/projects` - Portfolio
- `/projects/[slug]` - Détail projet
- `/contact` - Contact
- `/quote` - Demande de devis
- `/appointment` - Prise de rendez-vous

### Espace client
- `/dashboard` - Dashboard client
- `/dashboard/projects` - Liste des projets
- `/dashboard/projects/[id]` - Détail projet

### Espace admin
- `/admin` - Dashboard admin
- `/admin/clients` - Gestion clients
- `/admin/projects` - Gestion projets

## 🔧 Fonctionnalités à compléter

### 1. Middleware de protection des routes

Créez `middleware.ts` à la racine :

```typescript
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Protéger les routes admin et dashboard
  if (req.nextUrl.pathname.startsWith('/admin') || 
      req.nextUrl.pathname.startsWith('/dashboard')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  return res
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'],
}
```

### 2. Page de login

Créez `app/login/page.tsx` avec un formulaire d'authentification Supabase.

### 3. Intégration email

Configurez Supabase Email ou un service comme Resend pour les notifications.

## 📊 Données de démonstration

Le projet utilise des données fictives (mock data) pour démontrer les fonctionnalités. Pour les remplacer par des données réelles :

1. Créez des API routes dans `app/api/`
2. Connectez-les à Supabase
3. Remplacez les données mock dans les composants

## 🎯 Prochaines étapes recommandées

1. **Tester le site** sur différents appareils
2. **Configurer le SEO** (meta tags, sitemap)
3. **Ajouter Google Analytics**
4. **Configurer le domaine** personnalisé
5. **Activer HTTPS** en production
6. **Configurer les backups** de la base de données
7. **Tester les formulaires** avec envoi réel d'emails
8. **Ajouter les tests** E2E

## 🐛 Dépannage

### Erreurs TypeScript

Les erreurs TypeScript actuelles sont normales - elles disparaîtront après `npm install`.

### Images qui ne s'affichent pas

Vérifiez que les URLs sont correctes et accessibles. Pour les images locales, utilisez le dossier `public/`.

### Supabase connection error

Vérifiez que `.env.local` est correctement configuré et que le projet Supabase est actif.

## 📞 Support

Pour toute question technique :
- Documentation Next.js : https://nextjs.org/docs
- Documentation Supabase : https://supabase.com/docs
- Documentation Tailwind : https://tailwindcss.com/docs

---

**Bon développement ! 🏗️**
