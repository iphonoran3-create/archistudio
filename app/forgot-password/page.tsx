'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navigation from '@/components/layout/navigation'
import Footer from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulation d'envoi d'email
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)
    }, 1500)
  }

  return (
    <main className="min-h-screen bg-archi-cream">
      <Navigation />

      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <Link href="/login" className="inline-flex items-center text-gray-600 hover:text-archi-dark mb-6">
              <ArrowLeft size={20} className="mr-2" />
              Retour à la connexion
            </Link>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h1 className="font-serif text-3xl font-bold text-archi-dark mb-2">
                Mot de passe oublié ?
              </h1>
              <p className="text-gray-600 mb-8">
                Entrez votre email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
              </p>

              {isSuccess ? (
                <div className="text-center py-8">
                  <CheckCircle className="mx-auto text-green-600 mb-4" size={64} />
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Email envoyé !
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Si un compte existe avec cet email, vous recevrez un lien de réinitialisation.
                  </p>
                  <Link href="/login">
                    <Button variant="architect" size="lg" className="w-full">
                      Retour à la connexion
                    </Button>
                  </Link>
                </div>
              ) : (
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

                  <Button type="submit" variant="architect" size="lg" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Envoi en cours...' : 'Envoyer le lien'}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
