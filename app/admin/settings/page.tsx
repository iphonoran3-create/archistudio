'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/layout/navigation'
import Footer from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Save, Building2, Mail, Phone, MapPin, Facebook, Instagram, Linkedin, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    siteName: 'Archistudio',
    siteDescription: 'Architecture contemporaine et design innovant',
    logo: '/logo.svg',
    contactEmail: 'contact@archistudio.fr',
    contactPhone: '+33 1 23 45 67 89',
    address: '123 Rue de l\'Architecture, 75001 Paris, France',
    socialMedia: {
      facebook: 'https://facebook.com/archistudio',
      instagram: 'https://instagram.com/archistudio',
      linkedin: 'https://linkedin.com/company/archistudio'
    }
  })
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

  useEffect(() => {
    fetch('/data/settings.json')
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(err => console.error('Failed to load settings:', err))
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setSaveMessage('')

    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      })

      if (response.ok) {
        setSaveMessage('Paramètres sauvegardés avec succès !')
      } else {
        setSaveMessage('Erreur lors de la sauvegarde')
      }
    } catch (error) {
      setSaveMessage('Erreur lors de la sauvegarde')
    } finally {
      setIsSaving(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }))
  }

  const handleSocialChange = (platform: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      socialMedia: { ...prev.socialMedia, [platform]: value }
    }))
  }

  return (
    <main className="min-h-screen bg-archi-cream">
      <Navigation />
      
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link href="/admin">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft size={20} className="mr-2" />
                Retour au tableau de bord
              </Button>
            </Link>
            <h1 className="font-serif text-4xl font-bold text-archi-dark mb-2">
              Paramètres du site
            </h1>
            <p className="text-gray-600">
              Gérez les informations générales de votre site
            </p>
          </div>

          <form onSubmit={handleSave} className="max-w-4xl">
            {/* Site Information */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-6">
              <h2 className="font-serif text-2xl font-bold text-archi-dark mb-6 flex items-center">
                <Building2 className="mr-3" size={28} />
                Informations du site
              </h2>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="siteName">Nom du site *</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => handleChange('siteName', e.target.value)}
                    className="mt-2"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="siteDescription">Description du site</Label>
                  <Textarea
                    id="siteDescription"
                    value={settings.siteDescription}
                    onChange={(e) => handleChange('siteDescription', e.target.value)}
                    className="mt-2"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="logo">URL du logo</Label>
                  <Input
                    id="logo"
                    value={settings.logo}
                    onChange={(e) => handleChange('logo', e.target.value)}
                    className="mt-2"
                    placeholder="/logo.svg"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-6">
              <h2 className="font-serif text-2xl font-bold text-archi-dark mb-6 flex items-center">
                <Mail className="mr-3" size={28} />
                Coordonnées de contact
              </h2>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="contactEmail">Email de contact *</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => handleChange('contactEmail', e.target.value)}
                    className="mt-2"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="contactPhone">Téléphone</Label>
                  <Input
                    id="contactPhone"
                    type="tel"
                    value={settings.contactPhone}
                    onChange={(e) => handleChange('contactPhone', e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="address">Adresse</Label>
                  <Textarea
                    id="address"
                    value={settings.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    className="mt-2"
                    rows={2}
                  />
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-6">
              <h2 className="font-serif text-2xl font-bold text-archi-dark mb-6 flex items-center">
                <Facebook className="mr-3" size={28} />
                Réseaux sociaux
              </h2>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="facebook" className="flex items-center">
                    <Facebook size={18} className="mr-2" />
                    Facebook
                  </Label>
                  <Input
                    id="facebook"
                    type="url"
                    value={settings.socialMedia.facebook}
                    onChange={(e) => handleSocialChange('facebook', e.target.value)}
                    className="mt-2"
                    placeholder="https://facebook.com/..."
                  />
                </div>

                <div>
                  <Label htmlFor="instagram" className="flex items-center">
                    <Instagram size={18} className="mr-2" />
                    Instagram
                  </Label>
                  <Input
                    id="instagram"
                    type="url"
                    value={settings.socialMedia.instagram}
                    onChange={(e) => handleSocialChange('instagram', e.target.value)}
                    className="mt-2"
                    placeholder="https://instagram.com/..."
                  />
                </div>

                <div>
                  <Label htmlFor="linkedin" className="flex items-center">
                    <Linkedin size={18} className="mr-2" />
                    LinkedIn
                  </Label>
                  <Input
                    id="linkedin"
                    type="url"
                    value={settings.socialMedia.linkedin}
                    onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                    className="mt-2"
                    placeholder="https://linkedin.com/..."
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex items-center justify-between">
              {saveMessage && (
                <p className={`text-sm ${saveMessage.includes('succès') ? 'text-green-600' : 'text-red-600'}`}>
                  {saveMessage}
                </p>
              )}
              <Button type="submit" variant="architect" size="lg" disabled={isSaving}>
                <Save size={20} className="mr-2" />
                {isSaving ? 'Sauvegarde...' : 'Sauvegarder les paramètres'}
              </Button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  )
}
