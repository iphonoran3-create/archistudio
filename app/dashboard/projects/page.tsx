'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Building2, Calendar, MapPin, TrendingUp, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const statusLabels: Record<string, { label: string; color: string }> = {
  new: { label: "Nouveau", color: "bg-blue-100 text-blue-800" },
  study: { label: "En étude", color: "bg-yellow-100 text-yellow-800" },
  design: { label: "Conception", color: "bg-purple-100 text-purple-800" },
  validation: { label: "Validation", color: "bg-orange-100 text-orange-800" },
  in_progress: { label: "En cours", color: "bg-green-100 text-green-800" },
  completed: { label: "Terminé", color: "bg-gray-100 text-gray-800" }
}

export default function ClientProjectsPage() {
  const [projects, setProjects] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error('Failed to load projects:', err))
  }, [])

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-gray-600 hover:text-archi-dark">
                ← Retour
              </Link>
              <h1 className="font-serif text-2xl font-bold text-archi-dark">Mes projets</h1>
            </div>
            <Link href="/quote">
              <Button variant="architect">
                <Plus size={20} className="mr-2" />
                Nouveau projet
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusLabels[project.status]?.color || 'bg-gray-100 text-gray-800'}`}>
                    {statusLabels[project.status]?.label || project.status}
                  </span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg text-archi-dark mb-2">{project.title}</h3>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-2">
                    <MapPin size={16} />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Building2 size={16} />
                    <span>{project.category} • {project.area} m²</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} />
                    <span>Année : {project.year}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Link href={`/projects/${project.slug}`}>
                    <Button variant="outline" size="sm">Voir détails</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
