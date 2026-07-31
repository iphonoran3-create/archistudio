'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/layout/navigation'
import Footer from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Home, Building, RefreshCw, Box, FileText, Clipboard, ArrowRight, CheckCircle } from 'lucide-react'

const iconMap: Record<string, any> = {
  'home': Home,
  'building': Building,
  'refresh-cw': RefreshCw,
  'box': Box,
  'layers': FileText,
  'clipboard': Clipboard
}

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error('Failed to load services:', err))
  }, [])

  return (
    <main className="min-h-screen bg-archi-cream">
      <Navigation />
      
      {/* Header */}
      <section className="pt-32 pb-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-archi-dark mb-4">
            Nos services
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            Des solutions architecturales complètes pour tous vos projets, de la conception à la réalisation.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = iconMap[service.icon] || Building
              return (
                <div key={service.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                      <Icon className="text-white w-12 h-12" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-xl text-archi-dark mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {service.description}
                    </p>
                    <Link href="/contact">
                      <Button variant="architectOutline" size="sm" className="w-full">
                        En savoir plus
                        <ArrowRight className="ml-2" size={16} />
                      </Button>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-archi-dark mb-12 text-center">
            Pourquoi nous choisir ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-archi-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-archi-accent" size={32} />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-archi-dark">Expertise</h3>
              <p className="text-gray-600 text-sm">
                Plus de 15 ans d'expérience en architecture
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-archi-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-archi-accent" size={32} />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-archi-dark">Qualité</h3>
              <p className="text-gray-600 text-sm">
                Projets de haute qualité sans compromis
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-archi-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-archi-accent" size={32} />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-archi-dark">Innovation</h3>
              <p className="text-gray-600 text-sm">
                Technologies et méthodes modernes
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-archi-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-archi-accent" size={32} />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-archi-dark">Support</h3>
              <p className="text-gray-600 text-sm">
                Accompagnement complet du début à la fin
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-archi-dark text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Prêt à démarrer votre projet ?
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Contactez-nous dès aujourd'hui pour discuter de votre projet architectural.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="architect" className="bg-white text-archi-dark hover:bg-gray-100">
                Nous contacter
              </Button>
            </Link>
            <Link href="/quote">
              <Button size="lg" variant="architectOutline" className="border-white text-white hover:bg-white/10">
                Demander un devis
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
