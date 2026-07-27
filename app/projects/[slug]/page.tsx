'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { MapPin, Calendar, Ruler, ArrowLeft, Download, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Navigation from '@/components/layout/navigation'
import Footer from '@/components/layout/footer'

const projectData: Record<string, any> = {
  'villa-moderne-bordeaux': {
    title: "Villa Moderne Bordeaux",
    category: "Villa",
    location: "Bordeaux, France",
    year: 2024,
    surface: 250,
    status: "Terminé",
    description: "Une villa contemporaine située au cœur des vignobles bordelais, combinant design moderne et matériaux traditionnels. Ce projet met en valeur l'architecture minimaliste avec de grandes ouvertures vers l'extérieur.",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80"
    ],
    features: [
      "Piscine à débordement",
      "Terrasse panoramique",
      "Système domotique",
      "Isolation thermique haute performance",
      "Panneaux solaires intégrés"
    ],
    materials: [
      "Béton architectural",
      "Bois naturel",
      "Verre triple vitrage",
      "Acier corten"
    ]
  },
  'maison-contemporaine-lyon': {
    title: "Maison Contemporaine Lyon",
    category: "Maison",
    location: "Lyon, France",
    year: 2024,
    surface: 180,
    status: "Terminé",
    description: "Maison moderne construite selon les principes de l'architecture éco-responsable. Une intégration parfaite dans son environnement avec une attention particulière portée à l'efficacité énergétique.",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80"
    ],
    features: [
      "Label BBC (Bâtiment Basse Consommation)",
      "Toiture végétalisée",
      "Récupération d'eau de pluie",
      "Chauffage géothermique"
    ],
    materials: [
      "Bois certifié FSC",
      "Isolation bio-sourcée",
      "Enduit à la chaux"
    ]
  }
}

export default function ProjectDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const [project, setProject] = useState<any>(projectData[slug] || projectData['villa-moderne-bordeaux'])

  useEffect(() => {
    fetch('/data/projects.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find((p: any) => p.slug === slug)
        if (found) {
          setProject({
            ...found,
            images: [
              found.image,
              "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
              "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80"
            ],
            features: [
              "Piscine à débordement",
              "Terrasse panoramique",
              "Système domotique",
              "Isolation thermique haute performance"
            ],
            materials: [
              "Béton architectural",
              "Bois naturel",
              "Verre triple vitrage"
            ]
          })
        }
      })
      .catch(err => console.error('Failed to load project:', err))
  }, [slug])

  return (
    <main className="min-h-screen bg-archi-cream">
      <Navigation />
      
      {/* Header */}
      <section className="pt-32 pb-8 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/projects">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft size={20} className="mr-2" />
              Retour aux projets
            </Button>
          </Link>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="text-archi-accent font-medium mb-2">{project.category}</div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-archi-dark mb-4">
                {project.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-gray-600">
                <div className="flex items-center space-x-2">
                  <MapPin size={20} />
                  <span>{project.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar size={20} />
                  <span>{project.year}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Ruler size={20} />
                  <span>{project.surface} m²</span>
                </div>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  {project.status}
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" className="border-archi-dark text-archi-dark">
                <Share2 size={20} className="mr-2" />
                Partager
              </Button>
              <Button variant="architect">
                <Download size={20} className="mr-2" />
                Télécharger les plans
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="lg:col-span-2">
              <img
                src={project.images[0]}
                alt={project.title}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            {project.images.slice(1).map((image: string, index: number) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`${project.title}
 ${index + 1}`}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="font-serif text-3xl font-bold text-archi-dark mb-6">
                Description du projet
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                {project.description}
              </p>
              
              <h3 className="font-serif text-2xl font-bold text-archi-dark mb-4">
                Caractéristiques
              </h3>
              <ul className="space-y-3">
                {project.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-center space-x-3 text-gray-700">
                    <div className="w-2 h-2 bg-archi-accent rounded-full" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
                <h3 className="font-semibold text-xl text-archi-dark mb-4">
                  Matériaux utilisés
                </h3>
                <ul className="space-y-3">
                  {project.materials.map((material: string, index: number) => (
                    <li key={index} className="text-gray-600">
                      {material}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-xl text-archi-dark mb-4">
                    Informations techniques
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Surface</span>
                      <span className="font-medium">{project.surface} m²</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Année</span>
                      <span className="font-medium">{project.year}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Statut</span>
                      <span className="font-medium">{project.status}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Link href="/quote">
                    <Button variant="architect" className="w-full">
                      Je veux un projet similaire
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
