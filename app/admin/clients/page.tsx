'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Plus, Mail, Phone, MapPin, MoreVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'

const mockClients = [
  {
    id: 1,
    name: "Jean Dupont",
    email: "jean.dupont@email.com",
    phone: "+33 6 12 34 56 78",
    city: "Bordeaux",
    projectsCount: 2,
    totalSpent: 350000,
    joinedDate: "15 Jan 2024",
    status: "active"
  },
  {
    id: 2,
    name: "Marie Martin",
    email: "marie.martin@email.com",
    phone: "+33 6 98 76 54 32",
    city: "Paris",
    projectsCount: 1,
    totalSpent: 120000,
    joinedDate: "01 Mar 2024",
    status: "active"
  },
  {
    id: 3,
    name: "Pierre Bernard",
    email: "pierre.bernard@email.com",
    phone: "+33 6 11 22 33 44",
    city: "Marseille",
    projectsCount: 1,
    totalSpent: 280000,
    joinedDate: "15 Apr 2024",
    status: "active"
  },
  {
    id: 4,
    name: "Sophie Durand",
    email: "sophie.durand@email.com",
    phone: "+33 6 55 66 77 88",
    city: "Lyon",
    projectsCount: 1,
    totalSpent: 450000,
    joinedDate: "01 Juin 2024",
    status: "active"
  },
  {
    id: 5,
    name: "Lucas Petit",
    email: "lucas.petit@email.com",
    phone: "+33 6 99 88 77 66",
    city: "Nice",
    projectsCount: 0,
    totalSpent: 0,
    joinedDate: "10 Juil 2024",
    status: "pending"
  }
]

export default function AdminClients() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredClients = mockClients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.city.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
              <h1 className="font-serif text-2xl font-bold">Gestion des clients</h1>
            </div>
            <Button variant="architect" className="bg-white text-archi-dark hover:bg-gray-100">
              <Plus size={20} className="mr-2" />
              Nouveau client
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Rechercher un client (nom, email, ville...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Clients List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <Card key={client.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-archi-dark rounded-full flex items-center justify-center text-white font-bold">
                      {client.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-semibold text-archi-dark">{client.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        client.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {client.status === 'active' ? 'Actif' : 'En attente'}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical size={20} />
                  </Button>
                </div>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-2">
                    <Mail size={16} />
                    <span>{client.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone size={16} />
                    <span>{client.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin size={16} />
                    <span>{client.city}</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Projets</span>
                    <span className="font-medium">{client.projectsCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total dépensé</span>
                    <span className="font-medium">{(client.totalSpent / 1000).toFixed(0)}k€</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Link href={`/admin/clients/${client.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      Voir détails
                    </Button>
                  </Link>
                  <Link href={`/admin/clients/${client.id}/projects`} className="flex-1">
                    <Button variant="architect" size="sm" className="w-full">
                      Projets
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredClients.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">Aucun client trouvé.</p>
          </div>
        )}
      </div>
    </main>
  )
}
