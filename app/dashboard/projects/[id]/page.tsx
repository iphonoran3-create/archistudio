'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, Calendar, MapPin, Building2, FileText, Download, MessageSquare, Clock, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const mockProject = {
  id: 1,
  name: "Villa Moderne Bordeaux",
  type: "Villa",
  location: "Bordeaux, France",
  status: "in_progress",
  progress: 65,
  architect: "Marie Dupont",
  architectEmail: "marie.dupont@archistudio.fr",
  startDate: "15 Jan 2024",
  estimatedEnd: "15 Déc 2024",
  surface: 250,
  budget: 350000,
  description: "Construction d'une villa contemporaine avec piscine et vue sur le vignoble bordelais. Le projet intègre des matériaux durables et des technologies écologiques."
}

const timeline = [
  { step: 1, title: "Brief initial", status: "completed", date: "15 Jan 2024" },
  { step: 2, title: "Étude", status: "completed", date: "01 Fév 2024" },
  { step: 3, title: "Avant-projet", status: "completed", date: "15 Mar 2024" },
  { step: 4, title: "Conception", status: "completed", date: "01 Avr 2024" },
  { step: 5, title: "Modélisation 3D", status: "completed", date: "15 Mai 2024" },
  { step: 6, title: "Validation", status: "in_progress", date: "En cours" },
  { step: 7, title: "Plans techniques", status: "pending", date: "À venir" },
  { step: 8, title: "Livraison", status: "pending", date: "15 Déc 2024" }
]

const documents = [
  { id: 1, name: "Plan masse", type: "PDF", size: "2.4 MB", date: "15 Mar 2024" },
  { id: 2, name: "Plans 3D - Version 1", type: "DWG", size: "15.2 MB", date: "15 Mai 2024" },
  { id: 3, name: "Rendu extérieur", type: "JPG", size: "8.1 MB", date: "01 Juin 2024" },
  { id: 4, name: "Devis détaillé", type: "PDF", size: "1.8 MB", date: "10 Juin 2024" }
]

const appointments = [
  { id: 1, title: "Validation des plans", date: "15 Juil 2024", time: "14:00", type: "Présentation" },
  { id: 2, title: "Point d'avancement", date: "22 Juil 2024", time: "10:00", type: "Suivi" }
]

export default function ProjectDetail() {
  const params = useParams()
  const projectId = params.id

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard/projects" className="text-gray-600 hover:text-archi-dark">
                <ArrowLeft size={24} />
              </Link>
              <div>
                <h1 className="font-serif text-2xl font-bold text-archi-dark">{mockProject.name}</h1>
                <p className="text-sm text-gray-600">Projet #{projectId}</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline">
                <MessageSquare size={20} className="mr-2" />
                Contacter l'architecte
              </Button>
              <Button variant="architect">
                <Download size={20} className="mr-2" />
                Télécharger tout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Info */}
            <Card>
              <CardHeader>
                <CardTitle>Informations du projet</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Type :</span>
                    <span className="ml-2 font-medium">{mockProject.type}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Surface :</span>
                    <span className="ml-2 font-medium">{mockProject.surface} m²</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Budget :</span>
                    <span className="ml-2 font-medium">{mockProject.budget.toLocaleString()} €</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Architecte :</span>
                    <span className="ml-2 font-medium">{mockProject.architect}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-600">Localisation :</span>
                    <span className="ml-2 font-medium">{mockProject.location}</span>
                  </div>
                </div>
                <p className="mt-4 text-gray-700">{mockProject.description}</p>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Suivi du projet</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {timeline.map((item) => (
                    <div key={item.step} className="flex items-start space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        item.status === 'completed' ? 'bg-green-500 text-white' :
                        item.status === 'in_progress' ? 'bg-archi-accent text-white' :
                        'bg-gray-200 text-gray-600'
                      }`}>
                        {item.status === 'completed' ? <CheckCircle2 size={16} /> : item.step}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className={`font-medium ${item.status === 'in_progress' ? 'text-archi-accent' : ''}`}>
                            {item.title}
                          </h4>
                          <span className="text-sm text-gray-500">{item.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Documents</CardTitle>
                  <Button variant="outline" size="sm">Voir tout</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-3">
                        <FileText size={20} className="text-gray-600" />
                        <div>
                          <p className="font-medium text-sm">{doc.name}</p>
                          <p className="text-xs text-gray-500">{doc.type} • {doc.size} • {doc.date}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Download size={18} />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Card */}
            <Card>
              <CardHeader>
                <CardTitle>Progression</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-5xl font-bold text-archi-accent">{mockProject.progress}%</div>
                  <div className="text-sm text-gray-600 mt-1">En cours</div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-archi-accent h-3 rounded-full transition-all"
                    style={{ width: `${mockProject.progress}%` }}
                  />
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Début</span>
                    <span className="font-medium">{mockProject.startDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fin estimée</span>
                    <span className="font-medium">{mockProject.estimatedEnd}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Appointments */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Rendez-vous</CardTitle>
                  <Link href="/dashboard/appointments">
                    <Button variant="ghost" size="sm">Voir tout</Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {appointments.map((apt) => (
                    <div key={apt.id} className="p-3 bg-archi-cream rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <Calendar size={16} className="text-archi-accent" />
                        <span className="font-medium text-sm">{apt.date}</span>
                      </div>
                      <p className="text-sm text-gray-700">{apt.title}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Clock size={14} className="text-gray-500" />
                        <span className="text-xs text-gray-500">{apt.time} • {apt.type}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/appointment">
                  <Button variant="outline" className="w-full mt-4">
                    Nouveau rendez-vous
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Architect Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Architecte responsable</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-archi-dark rounded-full flex items-center justify-center text-white font-bold">
                    MD
                  </div>
                  <div>
                    <p className="font-medium">{mockProject.architect}</p>
                    <p className="text-sm text-gray-600">{mockProject.architectEmail}</p>
                  </div>
                </div>
                <Button variant="architect" className="w-full">
                  <MessageSquare size={20} className="mr-2" />
                  Envoyer un message
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
