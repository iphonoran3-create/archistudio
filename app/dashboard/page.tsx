'use client'

import Link from 'next/link'
import { Building2, Calendar, FileText, MessageSquare, Bell, TrendingUp, Clock, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const mockProjects = [
  {
    id: 1,
    name: "Villa Moderne Bordeaux",
    status: "in_progress",
    progress: 65,
    architect: "Marie Dupont",
    nextAppointment: "15 Juil 2024 à 14:00",
    nextStep: "Validation des plans"
  },
  {
    id: 2,
    name: "Rénovation Appartement Paris",
    status: "design",
    progress: 35,
    architect: "Pierre Martin",
    nextAppointment: "22 Juil 2024 à 10:00",
    nextStep: "Modélisation 3D"
  }
]

const mockNotifications = [
  { id: 1, title: "Nouveau document disponible", time: "Il y a 2h", unread: true },
  { id: 2, title: "Rendez-vous confirmé", time: "Il y a 5h", unread: true },
  { id: 3, title: "Mise à jour du projet", time: "Hier", unread: false }
]

const mockRecentActivity = [
  { id: 1, action: "Plans 3D ajoutés", project: "Villa Moderne Bordeaux", time: "Il y a 2h" },
  { id: 2, action: "Rendez-vous confirmé", project: "Villa Moderne Bordeaux", time: "Il y a 5h" },
  { id: 3, action: "Message reçu", project: "Rénovation Appartement", time: "Hier" }
]

export default function ClientDashboard() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-archi-dark rounded-full flex items-center justify-center text-white font-bold">
                JD
              </div>
              <div>
                <h1 className="font-semibold text-archi-dark">Jean Dupont</h1>
                <p className="text-sm text-gray-600">Espace Client</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell size={20} />
              </Button>
              <Link href="/">
                <Button variant="outline">Déconnexion</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="bg-white rounded-lg shadow-md p-4 space-y-2">
              <Link href="/dashboard" className="flex items-center space-x-3 p-3 rounded-lg bg-archi-dark text-white">
                <Building2 size={20} />
                <span>Tableau de bord</span>
              </Link>
              <Link href="/dashboard/projects" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700">
                <Building2 size={20} />
                <span>Mes projets</span>
              </Link>
              <Link href="/dashboard/appointments" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700">
                <Calendar size={20} />
                <span>Rendez-vous</span>
              </Link>
              <Link href="/dashboard/documents" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700">
                <FileText size={20} />
                <span>Documents</span>
              </Link>
              <Link href="/dashboard/messages" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700">
                <MessageSquare size={20} />
                <span>Messagerie</span>
              </Link>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-archi-dark to-archi-gray text-white rounded-lg p-6">
              <h2 className="font-serif text-2xl font-bold mb-2">
                Bonjour, Jean !
              </h2>
              <p className="text-gray-300">
                Vous avez 2 projets en cours. Prochain rendez-vous : 15 Juil 2024 à 14:00
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Projets en cours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-archi-dark">2</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Rendez-vous à venir</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-archi-dark">2</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-archi-dark">12</div>
                </CardContent>
              </Card>
            </div>

            {/* Projects Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Mes projets</CardTitle>
                  <Link href="/dashboard/projects">
                    <Button variant="outline" size="sm">Voir tout</Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockProjects.map((project) => (
                    <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-archi-dark">{project.name}</h3>
                          <p className="text-sm text-gray-600">Architecte : {project.architect}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-archi-accent">{project.progress}%</div>
                          <div className="text-xs text-gray-500">en cours</div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                        <div 
                          className="bg-archi-accent h-2 rounded-full transition-all"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Clock size={16} />
                          <span>{project.nextStep}</span>
                        </div>
                        <Link href={`/dashboard/projects/${project.id}`}>
                          <Button variant="ghost" size="sm">Voir détails</Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Notifications & Activity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockNotifications.map((notification) => (
                      <div key={notification.id} className={`p-3 rounded-lg ${notification.unread ? 'bg-archi-cream' : ''}`}>
                        <p className={`text-sm ${notification.unread ? 'font-medium' : ''}`}>{notification.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Activité récente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockRecentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-archi-accent rounded-full mt-2" />
                        <div>
                          <p className="text-sm">{activity.action}</p>
                          <p className="text-xs text-gray-500">{activity.project} • {activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
