'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Users, Building2, Calendar, FileText, MessageSquare, TrendingUp, DollarSign, Clock, Settings, Star, Layers } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/contexts/AuthContext'

const mockStats = {
  totalClients: 45,
  activeProjects: 12,
  completedProjects: 33,
  upcomingAppointments: 8,
  pendingQuotes: 5,
  unreadMessages: 3,
  monthlyRevenue: 125000
}

const recentProjects = [
  { id: 1, name: "Villa Moderne Bordeaux", client: "Jean Dupont", status: "in_progress", progress: 65 },
  { id: 2, name: "Rénovation Appartement Paris", client: "Marie Martin", status: "design", progress: 35 },
  { id: 3, name: "Bureaux Tech Hub", client: "Pierre Bernard", status: "validation", progress: 80 },
  { id: 4, name: "Restaurant Gastronomique", client: "Sophie Durand", status: "new", progress: 10 }
]

const upcomingAppointments = [
  { id: 1, title: "Consultation - Villa Bordeaux", client: "Jean Dupont", date: "15 Juil 2024", time: "14:00" },
  { id: 2, title: "Suivi - Rénovation Paris", client: "Marie Martin", date: "16 Juil 2024", time: "10:00" },
  { id: 3, title: "Présentation - Bureaux Tech", client: "Pierre Bernard", date: "17 Juil 2024", time: "15:00" }
]

const recentQuoteRequests = [
  { id: 1, client: "Lucas Petit", project: "Maison Lyon", amount: 280000, status: "new" },
  { id: 2, client: "Emma Laurent", project: "Villa Nice", amount: 450000, status: "processing" },
  { id: 3, client: "Thomas Moreau", project: "Rénovation Marseille", amount: 120000, status: "quote_sent" }
]

export default function AdminDashboard() {
  const router = useRouter()
  const { signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-archi-dark text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-archi-dark font-bold">
                A
              </div>
              <div>
                <h1 className="font-semibold">Admin Dashboard</h1>
                <p className="text-sm text-gray-300">Archistudio</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <MessageSquare size={20} />
              </Button>
              <Button
                onClick={handleSignOut}
                variant="outline"
                className="border-white text-black hover:bg-white/10"
              >
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="bg-white rounded-lg shadow-md p-4 space-y-2">
              <Link href="/admin" className="flex items-center space-x-3 p-3 rounded-lg bg-archi-dark text-white">
                <TrendingUp size={20} />
                <span>Tableau de bord</span>
              </Link>
              <Link href="/admin/clients" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700">
                <Users size={20} />
                <span>Clients</span>
              </Link>
              <Link href="/admin/projects/manage" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700">
                <Building2 size={20} />
                <span>Gérer Projets</span>
              </Link>
              <Link href="/admin/services/manage" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700">
                <Layers size={20} />
                <span>Gérer Services</span>
              </Link>
              <Link href="/admin/testimonials/manage" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700">
                <Star size={20} />
                <span>Gérer Témoignages</span>
              </Link>
              <Link href="/admin/team/manage" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700">
                <Users size={20} />
                <span>Gérer Équipe</span>
              </Link>
              <Link href="/admin/settings" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700">
                <Settings size={20} />
                <span>Paramètres</span>
              </Link>
              <Link href="/admin/appointments" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700">
                <Calendar size={20} />
                <span>Rendez-vous</span>
              </Link>
              <Link href="/admin/quotes" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700">
                <FileText size={20} />
                <span>Devis</span>
              </Link>
              <Link href="/admin/messages" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700">
                <MessageSquare size={20} />
                <span>Messagerie</span>
              </Link>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Clients</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-archi-dark">{mockStats.totalClients}</div>
                    <Users className="text-archi-accent" size={24} />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Projets actifs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-archi-dark">{mockStats.activeProjects}</div>
                    <Building2 className="text-archi-accent" size={24} />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Rendez-vous</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-archi-dark">{mockStats.upcomingAppointments}</div>
                    <Calendar className="text-archi-accent" size={24} />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Revenu mensuel</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-archi-dark">{(mockStats.monthlyRevenue / 1000).toFixed(0)}k€</div>
                    <DollarSign className="text-archi-accent" size={24} />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Projects */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Projets récents</CardTitle>
                  <Link href="/admin/projects">
                    <Button variant="outline" size="sm">Voir tout</Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentProjects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-archi-dark">{project.name}</h4>
                        <p className="text-sm text-gray-600">Client : {project.client}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-archi-accent">{project.progress}%</div>
                        <div className="text-xs text-gray-500 capitalize">{project.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Appointments & Quote Requests */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Rendez-vous à venir</CardTitle>
                    <Link href="/admin/appointments">
                      <Button variant="outline" size="sm">Voir tout</Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingAppointments.map((apt) => (
                      <div key={apt.id} className="p-3 bg-archi-cream rounded-lg">
                        <div className="flex items-center space-x-2 mb-1">
                          <Clock size={16} className="text-archi-accent" />
                          <span className="font-medium text-sm">{apt.date} à {apt.time}</span>
                        </div>
                        <p className="text-sm text-gray-700">{apt.title}</p>
                        <p className="text-xs text-gray-500">{apt.client}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Demandes de devis</CardTitle>
                    <Link href="/admin/quotes">
                      <Button variant="outline" size="sm">Voir tout</Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentQuoteRequests.map((quote) => (
                      <div key={quote.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{quote.client}</p>
                          <p className="text-xs text-gray-500">{quote.project}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-archi-accent">{(quote.amount / 1000).toFixed(0)}k€</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            quote.status === 'new' ? 'bg-blue-100 text-blue-800' :
                            quote.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {quote.status === 'new' ? 'Nouveau' : quote.status === 'processing' ? 'En cours' : 'Envoyé'}
                          </span>
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
