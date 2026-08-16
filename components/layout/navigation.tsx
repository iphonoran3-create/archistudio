'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, signOut } = useAuth()

  const [settings, setSettings] = useState({
    site_name: 'Archistudio',
    logo: '/images/logo.png',
  })

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        setSettings(data)
      })
      .catch((err) => console.error('Failed to load settings:', err))
  }, [])

  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/about', label: 'À propos' },
    { href: '/services', label: 'Services' },
    { href: '/projects', label: 'Projets' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-white/60 backdrop-blur-xl border-b border-white/30 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header principal */}
        <div className="h-28 flex items-center justify-between gap-8">

          {/* Logo + nom du site */}
          <Link
            href="/"
            className="flex items-center gap-4 shrink-0"
          >
            <img
              src={settings.logo || '/images/logo.jpg'}
              alt={settings.site_name }
              className="h-24 w-auto object-contain"
            />

            <span className="text-2xl font-semibold text-gray-900 whitespace-nowrap">
              {settings.site_name }
            </span>
          </Link>

          {/* Navigation Desktop */}
          <div className="hidden md:flex items-center justify-end gap-8 flex-1">

            {/* Liens */}
            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-archi-dark transition-colors font-medium text-lg whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Boutons */}
            <div className="flex items-center gap-4 shrink-0">
              <Link href="/quote">
                <Button
                  variant="architectOutline"
                  size="lg"
                  className="whitespace-nowrap"
                >
                  Demander un devis
                </Button>
              </Link>

              <Link href="/appointment">
                <Button
                  variant="architect"
                  size="lg"
                  className="whitespace-nowrap"
                >
                  Prendre RDV
                </Button>
              </Link>

              {user ? (
                <Button
                  onClick={() => signOut()}
                  variant="ghost"
                  className="text-gray-700 hover:text-archi-dark font-medium whitespace-nowrap ml-2"
                >
                  Déconnexion
                </Button>
              ) : (
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-archi-dark transition-colors font-medium whitespace-nowrap ml-2"
                >
                  Connexion
                </Link>
              )}
            </div>
          </div>

          {/* Bouton Mobile */}
          <button
            type="button"
            className="md:hidden flex items-center justify-center p-2 text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Navigation Mobile */}
        {isOpen && (
          <div className="md:hidden py-5 border-t border-gray-100">
            <div className="flex flex-col gap-4">

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-archi-dark transition-colors font-medium py-1"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">

                <Link
                  href="/quote"
                  onClick={() => setIsOpen(false)}
                  className="w-full"
                >
                  <Button
                    variant="architectOutline"
                    size="sm"
                    className="w-full"
                  >
                    Demander un devis
                  </Button>
                </Link>

                <Link
                  href="/appointment"
                  onClick={() => setIsOpen(false)}
                  className="w-full"
                >
                  <Button
                    variant="architect"
                    size="sm"
                    className="w-full"
                  >
                    Prendre RDV
                  </Button>
                </Link>

                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="text-center text-gray-700 hover:text-archi-dark font-medium py-2"
                >
                  Connexion
                </Link>

              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
