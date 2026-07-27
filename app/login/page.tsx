'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navigation from '@/components/layout/navigation'
import Footer from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Mail, Lock, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulation de connexion
    setTimeout(() => {
      setIsLoading(false)
      // Redirection selon le type d'utilisateur
      if (email === 'admin@demo.com') {
        window.location.href = '/admin'
      } else {
        window.location.href = '/dashboard'
      }
    }, 1000)
  }

  return (
    <main className="min-h-screen bg-archi-cream">
      <Navigation />
      
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h1 className="font-serif text-3xl font-bold text-archi-dark mb-2 text-center">
                Connexion
              </h1>
              <p className="text-gray-600 text-center mb-8">
                Accédez à votre espace client ou administrateur
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      placeholder="votre@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password">Mot de passe</Label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-gray-600">Se souvenir de moi</span>
                  </label>
                  <Link href="/forgot-password" className="text-archi-accent hover:underline">
                    Mot de passe oublié ?
                  </Link>
                </div>

                <Button type="submit" variant="architect" size="lg" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Connexion...' : 'Se connecter'}
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Pas encore de compte ?{' '}
                  <Link href="/register" className="text-archi-accent hover:underline font-semibold">
                    Créer un compte
                  </Link>
                </p>
              </div>

              <div className="mt-8 pt-6 border-t">
                <p className="text-sm text-gray-500 text-center mb-4">
                  Comptes de démonstration :
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Client :</span>
                    <span className="font-mono">client@demo.com / demo123</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Admin :</span>
                    <span className="font-mono">admin@demo.com / admin123</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
