'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  const [settings, setSettings] = useState<any>({
    siteName: 'Archistudio',
    siteDescription: 'Architecture, conception et visualisation 3D pour donner vie à vos projets.',
    contactEmail: 'contact@archistudio.fr',
    contactPhone: '+33 1 23 45 67 89',
    address: '123 Rue de l\'Architecture, 75001 Paris, France',
    socialMedia: {
      facebook: '#',
      instagram: '#',
      linkedin: '#'
    }
  })

  useEffect(() => {
    fetch('/data/settings.json')
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(err => console.error('Failed to load settings:', err))
  }, [])

  return (
    <footer className="bg-archi-dark text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-white flex items-center justify-center">
                <span className="text-archi-dark font-serif text-xl font-bold">{settings.siteName.charAt(0)}</span>
              </div>
              <span className="font-serif text-xl font-semibold">
                {settings.siteName}
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              {settings.siteDescription}
            </p>
            <div className="flex space-x-4">
              <a href={settings.socialMedia.facebook} className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href={settings.socialMedia.instagram} className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href={settings.socialMedia.linkedin} className="text-gray-400 hover:text-white transition-colors">
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
                  {settings.address}
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="text-archi-accent" size={20} />
                <a href={`tel:${settings.contactPhone}`} className="text-gray-400 hover:text-white transition-colors">
                  {settings.contactPhone}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="text-archi-accent" size={20} />
                <a href={`mailto:${settings.contactEmail}`} className="text-gray-400 hover:text-white transition-colors">
                  {settings.contactEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} {settings.siteName}. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
