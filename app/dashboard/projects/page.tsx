'use client'

import Link from 'next/link'
import { Building2, Calendar, MapPin, TrendingUp, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const mockProjects = [
  {
    id: 1,
    name: "Villa Moderne Bordeaux",
    type: "Villa",
    location: "Bordeaux, France",
    status: "in_progress",
    progress: 65,
    architect: "Marie Dupont",
    startDate: "15 Jan 2024",
    estimatedEnd: "15 Déc 2024",
    surface: 250,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80"
  },
  {
    id: 2,
    name: "Rénovation Appartement Paris",
    type: "Rénovation",
    location: "Paris, France",
    status: "design",
    progress: 35,
    architect: "Pierre Martin",
    startDate: "01 Mar 2024",
    estimatedEnd: "30 Nov 2024",
    surface: 90,
    image: "https://images.unsplash.com/photo-1504389557843-d1e695e971a9?w=400&q=80"
  },
  {
    id: 3,
    name: "Maison Contemporaine Lyon",
    type: "Maison",
    location: "Lyon, France",
    status: "completed",
    progress: 100,
    architect: "Sophie Bernard",
    startDate: "01 Juin 2023",
    estimatedEnd: "15 Fév 2024",
    actualEnd: "10 Fév 2024",
    surface: 180,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80"
  }
]

const statusLabels: Record<string, { label: string; color: string }> = {
  new: { label: "Nouveau", color: "bg-blue-100 text-blue-800" },
  study: { label: "En étude", color: "bg-yellow-100 text-yellow-800" },
  design: { label: "Conception", color: "bg-purple-100 text-purple-800" },
  validation: { label: "Validation", color: "bg-orange-100 text-orange-800" },
  in_progress: { label: "En cours", color: "bg-green-100 text-green-800" },
  completed: { label: "Terminé", color: "bg-gray-100 text-gray-800" }
}

export default function ClientProjects() {
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
          {mockProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusLabels[project.status].color}`}>
                    {statusLabels[project.status].label}
                  </span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg text-archi-dark mb-2">{project.name}</h3>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-2">
                    <MapPin size={16} />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Building2 size={16} />
                    <span>{project.type} • {project.surface} m²</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} />
                    <span>Début : {project.startDate}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">Progression</span>
                    <span className="font-medium text-archi-accent">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-archi-accent h-2 rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Architecte : {project.architect}</span>
                  <Link href={`/dashboard/projects/${project.id}`}>
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
