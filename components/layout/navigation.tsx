'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, Phone, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [settings, setSettings] = useState<any>({
    site_name: 'Archistudio',
    logo: '/images/logo.jpg'
  })

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        // Force logo to always be the correct path
        data.logo = '/images/logo.jpg'
        setSettings(data)
      })
      .catch(err => console.error('Failed to load settings:', err))
  }, [])

  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/about', label: 'À propos' },
    { href: '/services', label: 'Services' },
    { href: '/projects', label: 'Projets' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-4">
            <img
              src={settings.logo || '/images/logo.jpg'}
              alt={settings.site_name || 'Archistudio'}
              className="h-24 w-auto"
            />
            <span className="font-serif text-3xl font-semibold text-archi-dark">
              {settings.site_name || 'Archistudio'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-archi-dark transition-colors font-medium text-lg"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center space-x-4">
              <Link href="/quote">
                <Button variant="architectOutline" size="sm">
                  Demander un devis
                </Button>
              </Link>
              <Link href="/appointment">
                <Button variant="architect" size="sm">
                  Prendre RDV
                </Button>
              </Link>
              <Link href="/login" className="text-gray-700 hover:text-archi-dark">
                Connexion
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-archi-dark transition-colors font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100">
                <Link href="/quote" onClick={() => setIsOpen(false)}>
                  <Button variant="architectOutline" size="sm" className="w-full">
                    Demander un devis
                  </Button>
                </Link>
                <Link href="/appointment" onClick={() => setIsOpen(false)}>
                  <Button variant="architect" size="sm" className="w-full">
                    Prendre RDV
                  </Button>
                </Link>
                <Link href="/login" onClick={() => setIsOpen(false)} className="text-center">
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
