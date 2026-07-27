'use client'

import { useState } from 'react'
import Navigation from '@/components/layout/navigation'
import Footer from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar, Clock, MapPin, Upload, CheckCircle2 } from 'lucide-react'

const appointmentTypes = [
  { id: 'consultation', label: 'Consultation architecturale', description: 'Première discussion sur votre projet' },
  { id: 'first_meeting', label: 'Première rencontre', description: 'Présentation détaillée de nos services' },
  { id: 'presentation', label: 'Présentation de projet', description: 'Présentation d\'un projet existant' },
  { id: '3d_consultation', label: 'Consultation 3D', description: 'Visualisation 3D de votre projet' },
  { id: 'follow_up', label: 'Suivi de projet', description: 'Point d\'avancement sur un projet en cours' }
]

const appointmentModes = [
  { id: 'online', label: 'En ligne (Visio)', icon: '📹' },
  { id: 'office', label: 'Au bureau', icon: '🏢' },
  { id: 'site', label: 'Sur site', icon: '📍' }
]

const timeSlots = [
  '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'
]

export default function AppointmentPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    appointmentType: '',
    appointmentMode: '',
    date: '',
    time: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    projectType: '',
    description: '',
    files: [] as File[]
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

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
      const appointmentData = {
        id: Date.now(),
        title: `${appointmentTypes.find(t => t.id === formData.appointmentType)?.label} - ${formData.firstName} ${formData.lastName}`,
        client: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        date: formData.date,
        time: formData.time,
        type: formData.appointmentType,
        mode: formData.appointmentMode,
        projectType: formData.projectType,
        description: formData.description,
        status: 'pending'
      }

      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointmentData)
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        alert('Erreur lors de la sauvegarde du rendez-vous')
      }
    } catch (error) {
      console.error('Error submitting appointment:', error)
      alert('Erreur lors de la sauvegarde du rendez-vous')
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
                Rendez-vous confirmé !
              </h1>
              <p className="text-gray-600 mb-8">
                Votre demande de rendez-vous a été envoyée avec succès. Vous recevrez une confirmation par email dans les prochaines heures.
              </p>
              <div className="bg-archi-cream p-6 rounded-lg mb-8 text-left">
                <h3 className="font-semibold text-archi-dark mb-4">Détails du rendez-vous</h3>
                <div className="space-y-2 text-gray-700">
                  <p><span className="font-medium">Type :</span> {appointmentTypes.find(t => t.id === formData.appointmentType)?.label}</p>
                  <p><span className="font-medium">Mode :</span> {appointmentModes.find(m => m.id === formData.appointmentMode)?.label}</p>
                  <p><span className="font-medium">Date :</span> {formData.date}</p>
                  <p><span className="font-medium">Heure :</span> {formData.time}</p>
                </div>
              </div>
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
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-archi-dark mb-4">
            Prendre rendez-vous
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            Réservez un rendez-vous avec l'un de nos architectes pour discuter de votre projet.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-12">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= stepNumber ? 'bg-archi-dark text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step > stepNumber ? '✓' : stepNumber}
                  </div>
                  {stepNumber < 3 && (
                    <div className={`w-24 h-1 mx-2 ${
                      step > stepNumber ? 'bg-archi-dark' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
              {/* Step 1: Appointment Details */}
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="font-serif text-2xl font-bold text-archi-dark mb-6">
                    Détails du rendez-vous
                  </h2>

                  <div>
                    <Label className="text-base font-medium">Type de rendez-vous *</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                      {appointmentTypes.map((type) => (
                        <div
                          key={type.id}
                          onClick={() => handleInputChange('appointmentType', type.id)}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            formData.appointmentType === type.id
                              ? 'border-archi-dark bg-archi-cream'
                              : 'border-gray-200 hover:border-archi-dark'
                          }`}
                        >
                          <div className="font-semibold text-archi-dark">{type.label}</div>
                          <div className="text-sm text-gray-600 mt-1">{type.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-medium">Mode de rendez-vous *</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                      {appointmentModes.map((mode) => (
                        <div
                          key={mode.id}
                          onClick={() => handleInputChange('appointmentMode', mode.id)}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all text-center ${
                            formData.appointmentMode === mode.id
                              ? 'border-archi-dark bg-archi-cream'
                              : 'border-gray-200 hover:border-archi-dark'
                          }`}
                        >
                          <div className="text-3xl mb-2">{mode.icon}</div>
                          <div className="font-semibold text-archi-dark">{mode.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="date">Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={formData.date}
                        onChange={(e) => handleInputChange('date', e.target.value)}
                        className="mt-2"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="time">Heure *</Label>
                      <Select onValueChange={(value) => handleInputChange('time', value)} required>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Sélectionnez une heure" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button 
                      type="button" 
                      variant="architect"
                      onClick={() => setStep(2)}
                      disabled={!formData.appointmentType || !formData.appointmentMode || !formData.date || !formData.time}
                    >
                      Continuer
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Personal Information */}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="font-serif text-2xl font-bold text-archi-dark mb-6">
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
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  </div>

                  <div>
                    <Label htmlFor="projectType">Type de projet</Label>
                    <Select onValueChange={(value) => handleInputChange('projectType', value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Sélectionnez le type de projet" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="house">Maison</SelectItem>
                        <SelectItem value="villa">Villa</SelectItem>
                        <SelectItem value="apartment">Appartement</SelectItem>
                        <SelectItem value="building">Immeuble</SelectItem>
                        <SelectItem value="office">Bureau</SelectItem>
                        <SelectItem value="commercial">Commerce</SelectItem>
                        <SelectItem value="renovation">Rénovation</SelectItem>
                        <SelectItem value="other">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="description">Description du projet</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className="mt-2"
                      rows={4}
                      placeholder="Décrivez brièvement votre projet..."
                    />
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setStep(1)}
                    >
                      Retour
                    </Button>
                    <Button 
                      type="button" 
                      variant="architect"
                      onClick={() => setStep(3)}
                      disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone}
                    >
                      Continuer
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Files & Confirmation */}
              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="font-serif text-2xl font-bold text-archi-dark mb-6">
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
                    <div className="space-y-2">
                      <Label>Fichiers sélectionnés :</Label>
                      {formData.files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-archi-cream p-3 rounded">
                          <span className="text-sm">{file.name}</span>
                          <span className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="bg-archi-cream p-6 rounded-lg">
                    <h3 className="font-semibold text-archi-dark mb-4">Récapitulatif</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Type :</span> {appointmentTypes.find(t => t.id === formData.appointmentType)?.label}</p>
                      <p><span className="font-medium">Mode :</span> {appointmentModes.find(m => m.id === formData.appointmentMode)?.label}</p>
                      <p><span className="font-medium">Date :</span> {formData.date} à {formData.time}</p>
                      <p><span className="font-medium">Nom :</span> {formData.firstName} {formData.lastName}</p>
                      <p><span className="font-medium">Email :</span> {formData.email}</p>
                      <p><span className="font-medium">Téléphone :</span> {formData.phone}</p>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setStep(2)}
                    >
                      Retour
                    </Button>
                    <Button 
                      type="submit"
                      variant="architect"
                    >
                      Confirmer le rendez-vous
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
