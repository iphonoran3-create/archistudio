'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MapPin, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([])

  useEffect(() => {
    fetch('/data/projects.json')
      .then(res => res.json())
      .then(data => setProjects(data.slice(0, 6)))
      .catch(err => console.error('Failed to load projects:', err))
  }, [])

  return (
    <section className="py-24 bg-archi-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-archi-dark mb-4">
            Nos projets
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Découvrez nos réalisations récentes et laissez-vous inspirer par nos créations architecturales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link key={project.id} href={`/projects/${project.slug}`} className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-archi-dark text-white px-3 py-1 rounded-full text-sm">
                    {project.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-xl mb-3 text-archi-dark group-hover:text-archi-accent transition-colors">
                    {project.title}
                  </h3>
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
                  <Button variant="architectOutline" size="sm" className="w-full">
                    Voir le projet
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/projects">
            <Button variant="architect" size="lg">
              Voir tous les projets
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
