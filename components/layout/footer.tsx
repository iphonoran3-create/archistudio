'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  const [settings, setSettings] = useState<any>({
    site_name: 'Archistudio',
    logo: '/images/logo.jpg',
    description: 'Architecture, conception et visualisation 3D pour donner vie à vos projets.',
    email: 'contact@archistudio.fr',
    phone: '+33 1 23 45 67 89',
    address: '123 Rue de l\'Architecture, 75001 Paris, France',
    facebook: '#',
    instagram: '#',
    linkedin: '#'
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

  return (
    <footer className="bg-archi-dark text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-4 mb-6">
              <img
                src={settings.logo || '/images/logo.jpg'}
                alt={settings.site_name || 'Archistudio'}
                className="h-24 w-auto"
              />
              <span className="font-serif text-3xl font-semibold">
                {settings.site_name || 'Archistudio'}
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              {settings.description || 'Architecture, conception et visualisation 3D pour donner vie à vos projets.'}
            </p>
            <div className="flex space-x-4">
              <a href={settings.facebook || '#'} className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href={settings.instagram || '#'} className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href={settings.linkedin || '#'} className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Liens rapides</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-400 hover:text-white transition-colors">
                  Projets
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Services</h3>
            <ul className="space-y-3">
              <li className="text-gray-400">Architecture résidentielle</li>
              <li className="text-gray-400">Architecture commerciale</li>
              <li className="text-gray-400">Rénovation</li>
              <li className="text-gray-400">Modélisation 3D</li>
              <li className="text-gray-400">Visualisation architecturale</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="text-archi-accent mt-1" size={20} />
                <span className="text-gray-400">
                  {settings.address || 'Paris, France'}
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="text-archi-accent" size={20} />
                <a href={`tel:${settings.phone || ''}`} className="text-gray-400 hover:text-white transition-colors">
                  {settings.phone || '+33 1 23 45 67 89'}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="text-archi-accent" size={20} />
                <a href={`mailto:${settings.email || ''}`} className="text-gray-400 hover:text-white transition-colors">
                  {settings.email || 'contact@archistudio.fr'}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} {settings.site_name || 'Archistudio'}. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
