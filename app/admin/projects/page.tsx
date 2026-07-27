'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Plus, Filter, MoreVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'

const mockProjects = [
  {
    id: 1,
    name: "Villa Moderne Bordeaux",
    client: "Jean Dupont",
    architect: "Marie Dupont",
    type: "Villa",
    status: "in_progress",
    progress: 65,
    budget: 350000,
    startDate: "15 Jan 2024",
    estimatedEnd: "15 Déc 2024",
    location: "Bordeaux"
  },
  {
    id: 2,
    name: "Rénovation Appartement Paris",
    client: "Marie Martin",
    architect: "Pierre Martin",
    type: "Rénovation",
    status: "design",
    progress: 35,
    budget: 120000,
    startDate: "01 Mar 2024",
    estimatedEnd: "30 Nov 2024",
    location: "Paris"
  },
  {
    id: 3,
    name: "Bureaux Tech Hub",
    client: "Pierre Bernard",
    architect: "Sophie Bernard",
    type: "Bureau",
    status: "validation",
    progress: 80,
    budget: 280000,
    startDate: "15 Avr 2024",
    estimatedEnd: "15 Oct 2024",
    location: "Marseille"
  },
  {
    id: 4,
    name: "Restaurant Gastronomique",
    client: "Sophie Durand",
    architect: "Marie Dupont",
    type: "Commercial",
    status: "new",
    progress: 10,
    budget: 450000,
    startDate: "01 Juin 2024",
    estimatedEnd: "15 Fév 2025",
    location: "Nice"
  },
  {
    id: 5,
    name: "Maison Contemporaine Lyon",
    client: "Lucas Petit",
    architect: "Pierre Martin",
    type: "Maison",
    status: "completed",
    progress: 100,
    budget: 280000,
    startDate: "01 Juin 2023",
    estimatedEnd: "15 Fév 2024",
    actualEnd: "10 Fév 2024",
    location: "Lyon"
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

export default function AdminProjects() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = 
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-archi-dark text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="text-gray-300 hover:text-white">
                ← Retour
              </Link>
              <h1 className="font-serif text-2xl font-bold">Gestion des projets</h1>
            </div>
            <Button variant="architect" className="bg-white text-archi-dark hover:bg-gray-100">
              <Plus size={20} className="mr-2" />
              Nouveau projet
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Rechercher un projet (nom, client, ville...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="new">Nouveau</SelectItem>
              <SelectItem value="study">En étude</SelectItem>
              <SelectItem value="design">Conception</SelectItem>
              <SelectItem value="validation">Validation</SelectItem>
              <SelectItem value="in_progress">En cours</SelectItem>
              <SelectItem value="completed">Terminé</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Projects List */}
        <div className="space-y-4">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg text-archi-dark">{project.name}</h3>
                        <p className="text-sm text-gray-600">
                          Client : {project.client} • Architecte : {project.architect}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusLabels[project.status].color}`}>
                        {statusLabels[project.status].label}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                      <div>
                        <span className="text-gray-500">Type :</span>
                        <span className="ml-1">{project.type}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Budget :</span>
                        <span className="ml-1">{(project.budget / 1000).toFixed(0)}k€</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Début :</span>
                        <span className="ml-1">{project.startDate}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Fin estimée :</span>
                        <span className="ml-1">{project.estimatedEnd}</span>
                      </div>
                    </div>

                    <div className="mb-3">
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
                  </div>

                  <div className="flex items-center space-x-2">
                    <Link href={`/admin/projects/${project.id}`}>
                      <Button variant="outline" size="sm">Voir détails</Button>
                    </Link>
                    <Button variant="ghost" size="icon">
                      <MoreVertical size={20} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">Aucun projet trouvé.</p>
          </div>
        )}
      </div>
    </main>
  )
}
