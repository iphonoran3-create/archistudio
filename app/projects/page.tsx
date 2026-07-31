'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MapPin, Calendar, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Navigation from '@/components/layout/navigation'
import Footer from '@/components/layout/footer'

const categories = [
  { id: 'all', label: 'Tous' },
  { id: 'house', label: 'Maisons' },
  { id: 'villa', label: 'Villas' },
  { id: 'residential', label: 'Résidentiel' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'office', label: 'Bureaux' },
  { id: 'renovation', label: 'Rénovation' },
  { id: '3d', label: '3D' }
]

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [projects, setProjects] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error('Failed to load projects:', err))
  }, [])

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  return (
    <main className="min-h-screen bg-archi-cream">
      <Navigation />
      
      {/* Header */}
      <section className="pt-32 pb-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-archi-dark mb-4">
            Nos projets
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            Découvrez l'ensemblede nos réalisations architecturales, des maisons individuelles aux projets commerciaux.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 mb-4">
            <Filter size={20} className="text-archi-dark" />
            <span className="font-semibold text-archi-dark">Filtrer par catégorie :</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "architect" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id ? "" : "border-archi-dark text-archi-dark hover:bg-archi-dark hover:text-white"}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Link key={project.id} href={`/projects/${project.slug}`} className="group">
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-archi-dark text-white px-3 py-1 rounded-full text-sm capitalize">
                      {categories.find(c => c.id === project.category)?.label}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-xl mb-3 text-archi-dark group-hover:text-archi-accent transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-1">
                        <MapPin size={16} />
                        <span>{project.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar size={16} />
                        <span>{project.year}</span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {project.surface} m²
                    </div>
                    <Button variant="architectOutline" size="sm" className="w-full mt-4">
                      Voir le projet
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">
                Aucun projet trouvé dans cette catégorie.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
