'use client'

import { useState } from 'react'
import Navigation from '@/components/layout/navigation'
import Footer from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, Facebook, Instagram, Linkedin, Calendar } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const messageData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message
      }

      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(messageData)
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        alert('Erreur lors de l\'envoi du message')
      }
    } catch (error) {
      console.error('Error submitting contact form:', error)
      alert('Erreur lors de l\'envoi du message')
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
                <MessageSquare className="text-green-600" size={40} />
              </div>
              <h1 className="font-serif text-3xl font-bold text-archi-dark mb-4">
                Message envoyé !
              </h1>
              <p className="text-gray-600 mb-8">
                Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais.
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
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-archi-dark mb-4">
            Contactez-nous
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            Une question ? Un projet ? N'hésitez pas à nous contacter, notre équipe est à votre écoute.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-archi-dark mb-6">
                Nos coordonnées
              </h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-archi-dark rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-archi-dark mb-1">Adresse</h3>
                    <p className="text-gray-600">
                      123 Rue de l'Architecture<br />
                      algerie
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-archi-dark rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-archi-dark mb-1">Téléphone</h3>
                    <p className="text-gray-600">
                      <a href="tel:+33123456789" className="hover:text-archi-accent transition-colors">
                        +33 1 23 45 67 89
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-archi-dark rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-archi-dark mb-1">Email</h3>
                    <p className="text-gray-600">
                      <a href="mailto:contact@archistudio.fr" className="hover:text-archi-accent transition-colors">
                        contact@archistudio.fr
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-archi-dark rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-archi-dark mb-1">Horaires</h3>
                    <p className="text-gray-600">
                      Lundi - Vendredi : 9h00 - 18h00<br />
                      Samedi : 10h00 - 16h00
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="font-semibold text-archi-dark mb-4">Suivez-nous</h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-12 h-12 bg-archi-dark rounded-lg flex items-center justify-center hover:bg-archi-gray transition-colors">
                    <Facebook className="text-white" size={24} />
                  </a>
                  <a href="#" className="w-12 h-12 bg-archi-dark rounded-lg flex items-center justify-center hover:bg-archi-gray transition-colors">
                    <Instagram className="text-white" size={24} />
                  </a>
                  <a href="#" className="w-12 h-12 bg-archi-dark rounded-lg flex items-center justify-center hover:bg-archi-gray transition-colors">
                    <Linkedin className="text-white" size={24} />
                  </a>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-8 space-y-3">
                <a href="tel:+33123456789">
                  <Button variant="architect" className="w-full">
                    <Phone size={20} className="mr-2" />
                    Appeler maintenant
                  </Button>
                </a>
                <a href="mailto:contact@archistudio.fr">
                  <Button variant="outline" className="w-full border-archi-dark text-archi-dark">
                    <Mail size={20} className="mr-2" />
                    Envoyer un email
                  </Button>
                </a>
                <a href="/appointment">
                  <Button variant="architectOutline" className="w-full">
                    <Calendar className="mr-2" size={20} />
                    Prendre rendez-vous
                  </Button>
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-archi-dark mb-6">
                Envoyez-nous un message
              </h2>
              
              <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="name">Nom complet *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="mt-2"
                      required
                    />
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
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Sujet *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className="mt-2"
                      placeholder="Ex: Demande de devis, Renseignements..."
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="mt-2"
                      rows={6}
                      placeholder="Décrivez votre demande ou votre projet..."
                      required
                    />
                  </div>

                  <Button type="submit" variant="architect" size="lg" className="w-full">
                    <Send size={20} className="mr-2" />
                    Envoyer le message
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

{/* Map Section */}
<section className="py-16 bg-white">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="bg-gray-200 rounded-lg h-96 w-full overflow-hidden">
      
      {<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d36616.967230807975!2d-0.5996543696116213!3d35.678272230148735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd7e6353bd16c81b%3A0xdfb3d57e1f00b255!2sAZ%20Mall%20Grand%20Oran!5e0!3m2!1sfr!2sdz!4v1784993512574!5m2!1sfr!2sdz" width="1200" height="450" style= {{border:0 }} allowFullScreen= {true} loading="lazy" ></iframe>}
      <iframe 
        src="https://google.com..." 
        width="100%" 
        height="100%" 
        style={{ border: 0 }} 
        allowFullScreen={true} 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

    </div>
  </div>
</section>
 
      <Footer />
    </main>
  )
}
