'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Home, Building, Wrench, Box, Store, RefreshCw, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'

const iconMap: Record<string, any> = {
  'home': Home,
  'building': Building,
  'refresh-cw': RefreshCw,
  'box': Box,
  'layers': Box,
  'clipboard': FileText
}

export default function Services() {
  const [services, setServices] = useState<any[]>([])

  useEffect(() => {
    fetch('/data/services.json')
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error('Failed to load services:', err))
  }, [])

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-archi-dark mb-4">
            Nos services
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Des solutions architecturales complètes pour tous vos projets, de la conception à la réalisation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Building
            return (
              <div key={service.id} className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                    <Icon className="text-white w-10 h-10" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-xl mb-3 text-archi-dark group-hover:text-archi-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {service.description}
                  </p>
                  <Link href="/services">
                    <Button variant="ghost" size="sm" className="text-archi-accent hover:text-archi-dark p-0">
                      En savoir plus →
                    </Button>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
