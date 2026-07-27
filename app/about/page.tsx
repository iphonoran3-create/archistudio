'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/layout/navigation'
import Footer from '@/components/layout/footer'
import { Award, Users, Target, Heart, Building2, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const milestones = [
  { year: "2009", title: "Fondation", description: "Création d'Archistudio à Paris" },
  { year: "2012", title: "Premier grand projet", description: "Réalisation d'un immeuble résidentiel de 50 logements" },
  { year: "2015", title: "Expansion", description: "Ouverture d'un second bureau à Bordeaux" },
  { year: "2018", title: "Innovation", description: "Intégration des technologies 3D et BIM" },
  { year: "2021", title: "Reconnaissance", description: "Prix National d'Architecture" },
  { year: "2024", title: "150 projets", description: "Célébration de nos 150 projets réalisés" }
]

export default function AboutPage() {
  const [team, setTeam] = useState<any[]>([])

  useEffect(() => {
    fetch('/data/team.json')
      .then(res => res.json())
      .then(data => setTeam(data))
      .catch(err => console.error('Failed to load team:', err))
  }, [])

  return (
    <main className="min-h-screen bg-archi-cream">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
          <img
            src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920&q=80"
            alt="Notre équipe"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4">
            À propos d'Archistudio
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Plus de 15 ans d'expertise en architecture contemporaine et design innovant.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-archi-dark mb-8 text-center">
              Notre histoire
            </h2>
            <div className="prose prose-lg text-gray-700 space-y-6">
              <p>
                Fondé en 2009 par Marie Dupont, Archistudio est né d'une passion commune pour l'architecture contemporaine et le design durable. Ce qui a commencé comme un petit cabinet d'architecture à Paris s'est transformé en une référence nationale dans le domaine de l'architecture résidentielle et commerciale.
              </p>
              <p>
                Notre philosophie est simple : créer des espaces qui allient esthétique, fonctionnalité et respect de l'environnement. Chaque projet est unique et mérite une attention particulière, de la première esquisse jusqu'à la livraison finale.
              </p>
              <p>
                Aujourd'hui, notre équipe de 15 architectes et designers collabore sur des projets allant de la villa individuelle aux grands ensembles résidentiels, en passant par les espaces commerciaux et les bureaux innovants.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-archi-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-archi-dark mb-12 text-center">
            Nos valeurs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-archi-dark rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-white" size={32} />
              </div>
              <h3 className="font-semibold text-xl mb-3 text-archi-dark">Excellence</h3>
              <p className="text-gray-600">
                Nous nous engageons à délivrer des projets de la plus haute qualité, sans compromis sur les détails.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-archi-dark rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="font-semibold text-xl mb-3 text-archi-dark">Collaboration</h3>
              <p className="text-gray-600">
                Nous travaillons en étroite collaboration avec nos clients pour comprendre leurs besoins et transformer leurs visions.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-archi-dark rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="text-white" size={32} />
              </div>
              <h3 className="font-semibold text-xl mb-3 text-archi-dark">Innovation</h3>
              <p className="text-gray-600">
                Nous intégrons les dernières technologies et méthodes de conception pour créer des espaces modernes et durables.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-archi-dark rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-white" size={32} />
              </div>
              <h3 className="font-semibold text-xl mb-3 text-archi-dark">Passion</h3>
              <p className="text-gray-600">
                Notre équipe est passionnée par l'architecture et met son cœur dans chaque projet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-archi-dark mb-12 text-center">
            Notre parcours
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-archi-beige" />
              
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className="flex-1">
                      <div className={`p-6 rounded-lg shadow-md ${index % 2 === 0 ? 'mr-8 text-right' : 'ml-8 text-left'}`}>
                        <div className="text-3xl font-bold text-archi-accent mb-2">{milestone.year}</div>
                        <h3 className="font-semibold text-xl text-archi-dark mb-2">{milestone.title}</h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-archi-dark rounded-full flex items-center justify-center text-white font-bold z-10">
                      {index + 1}
                    </div>
                    <div className="flex-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-archi-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-archi-dark mb-4 text-center">
            Notre équipe
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Une équipe passionnée et expérimentée dédiée à la réalisation de vos projets architecturaux.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-semibold text-xl text-archi-dark mb-1">{member.name}</h3>
                  <p className="text-archi-accent text-sm mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-archi-dark text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Prêt à concrétiser votre projet ?
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Discutons de votre projet et transformons votre vision en réalité.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/appointment">
              <Button size="lg" variant="architect" className="bg-white text-archi-dark hover:bg-gray-100">
                <Calendar size={20} className="mr-2" />
                Prendre rendez-vous
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
