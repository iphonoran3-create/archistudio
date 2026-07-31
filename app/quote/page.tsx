'use client'

import { useState } from 'react'
import Navigation from '@/components/layout/navigation'
import Footer from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Upload, CheckCircle2, Calculator } from 'lucide-react'

const projectTypes = [
  { id: 'house', label: 'Maison individuelle' },
  { id: 'villa', label: 'Villa' },
  { id: 'building', label: 'Immeuble' },
  { id: 'office', label: 'Bureau / Espace professionnel' },
  { id: 'commercial', label: 'Commerce / Restaurant' },
  { id: 'renovation', label: 'Rénovation' },
  { id: 'other', label: 'Autre' }
]

const budgetRanges = [
  { id: '50-100', label: '50 000€ - 100 000€' },
  { id: '100-250', label: '100 000€ - 250 000€' },
  { id: '250-500', label: '250 000€ - 500 000€' },
  { id: '500-1m', label: '500 000€ - 1 000 000€' },
  { id: '1m+', label: 'Plus de 1 000 000€' }
]

export default function QuotePage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    projectType: '',
    surfaceArea: '',
    budget: '',
    description: '',
    preferredStartDate: '',
    files: [] as File[]
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({ 
        ...prev, 
        files: [...prev.files, ...Array.from(e.target.files!)] 
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const quoteData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        project: projectTypes.find(t => t.id === formData.projectType)?.label || formData.projectType,
        surface_area: formData.surfaceArea,
        budget: budgetRanges.find(b => b.id === formData.budget)?.label || formData.budget,
        description: formData.description,
        preferred_start_date: formData.preferredStartDate,
        status: 'new'
      }

      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quoteData)
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        alert('Erreur lors de l\'envoi de la demande de devis')
      }
    } catch (error) {
      console.error('Error submitting quote:', error)
      alert('Erreur lors de l\'envoi de la demande de devis')
    }
  }

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-archi-cream">
        <Navigation />
        <section className="pt-32 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="text-green-600" size={40} />
              </div>
              <h1 className="font-serif text-3xl font-bold text-archi-dark mb-4">
                Demande de devis envoyée !
              </h1>
              <p className="text-gray-600 mb-8">
                Votre demande a été transmise à notre équipe. Nous vous recontacterons dans les 48 heures pour discuter de votre projet.
              </p>
              <Button variant="architect" onClick={() => window.location.href = '/'}>
                Retour à l'accueil
              </Button>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-archi-cream">
      <Navigation />
      
      {/* Header */}
      <section className="pt-32 pb-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-archi-cream rounded-full flex items-center justify-center">
              <Calculator className="text-archi-accent" size={24} />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-archi-dark">
              Demander un devis
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl">
            Remplissez le formulaire ci-dessous pour recevoir une estimation personnalisée pour votre projet architectural.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
              {/* Personal Information */}
              <div className="mb-8">
                <h2 className="font-serif text-2xl font-bold text-archi-dark mb-6 pb-2 border-b border-gray-200">
                  Informations personnelles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">Prénom *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="mt-2"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Nom *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="mt-2"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="mt-2"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Téléphone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="mt-2"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="city">Ville</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>

              {/* Project Information */}
              <div className="mb-8">
                <h2 className="font-serif text-2xl font-bold text-archi-dark mb-6 pb-2 border-b border-gray-200">
                  Informations sur le projet
                </h2>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="projectType">Type de projet *</Label>
                    <Select onValueChange={(value) => handleInputChange('projectType', value)} required>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Sélectionnez le type de projet" />
                      </SelectTrigger>
                      <SelectContent>
                        {projectTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>{type.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="surfaceArea">Surface approximative (m²)</Label>
                      <Input
                        id="surfaceArea"
                        type="number"
                        value={formData.surfaceArea}
                        onChange={(e) => handleInputChange('surfaceArea', e.target.value)}
                        className="mt-2"
                        placeholder="Ex: 150"
                      />
                    </div>
                    <div>
                      <Label htmlFor="budget">Budget estimatif</Label>
                      <Select onValueChange={(value) => handleInputChange('budget', value)}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Sélectionnez une fourchette" />
                        </SelectTrigger>
                        <SelectContent>
                          {budgetRanges.map((range) => (
                            <SelectItem key={range.id} value={range.id}>{range.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="preferredStartDate">Date souhaitée de début</Label>
                    <Input
                      id="preferredStartDate"
                      type="date"
                      value={formData.preferredStartDate}
                      onChange={(e) => handleInputChange('preferredStartDate', e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description du projet *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className="mt-2"
                      rows={6}
                      placeholder="Décrivez votre projet en détail : vos besoins, vos envies, les contraintes spécifiques, etc."
                      required
                    />
                  </div>
                </div>
              </div>

              {/* File Upload */}
              <div className="mb-8">
                <h2 className="font-serif text-2xl font-bold text-archi-dark mb-6 pb-2 border-b border-gray-200">
                  Documents (optionnel)
                </h2>
                <div>
                  <Label className="text-base font-medium">Joindre des fichiers</Label>
                  <p className="text-sm text-gray-600 mb-3">
                    Plans, photos, documents ou croquis (PDF, JPG, PNG, DWG - max 10MB par fichier)
                  </p>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-archi-dark transition-colors">
                    <Upload className="mx-auto text-gray-400 mb-3" size={40} />
                    <p className="text-gray-600 mb-2">Glissez vos fichiers ici ou</p>
                    <Input
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png,.dwg"
                      onChange={handleFileUpload}
                      className="max-w-xs mx-auto"
                    />
                  </div>
                </div>

                {formData.files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <Label>Fichiers sélectionnés :</Label>
                    {formData.files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-archi-cream p-3 rounded">
                        <span className="text-sm">{file.name}</span>
                        <span className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit */}
              <div className="flex items-center justify-between pt-4">
                <p className="text-sm text-gray-500">
                  * Champs obligatoires
                </p>
                <Button type="submit" variant="architect" size="lg">
                  Envoyer ma demande
                </Button>
              </div>
            </form>

            {/* Info Box */}
            <div className="mt-8 bg-archi-dark text-white p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-3">Ce qui se passe après votre demande :</h3>
              <ol className="space-y-2 text-gray-300">
                <li className="flex items-start space-x-2">
                  <span className="font-bold text-archi-accent">1.</span>
                  <span>Réception de votre demande et analyse par notre équipe</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="font-bold text-archi-accent">2.</span>
                  <span>Contact téléphonique sous 48h pour discuter de votre projet</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="font-bold text-archi-accent">3.</span>
                  <span>Proposition de rendez-vous pour une consultation approfondie</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="font-bold text-archi-accent">4.</span>
                  <span>Envoi d'un devis détaillé après la consultation</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
