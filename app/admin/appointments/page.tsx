'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/layout/navigation'
import Footer from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Calendar, Clock, User, Check, X, Edit, Phone, Mail } from 'lucide-react'
import Link from 'next/link'

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<any[]>([])

  useEffect(() => {
    fetch('/data/appointments.json')
      .then(res => res.json())
      .then(data => {
        // Sort by id (newest first - id is timestamp)
        const sorted = data.sort((a: any, b: any) => b.id - a.id)
        setAppointments(sorted)
      })
      .catch(err => console.error('Failed to load appointments:', err))
  }, [])

  const handleStatusChange = async (id: number, newStatus: string) => {
    const updatedAppointments = appointments.map(a => a.id === id ? { ...a, status: newStatus } : a)
    setAppointments(updatedAppointments)
    
    try {
      await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedAppointments)
      })
    } catch (error) {
      console.error('Error saving appointments:', error)
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente'
      case 'confirmed': return 'Confirmé'
      case 'cancelled': return 'Annulé'
      case 'completed': return 'Terminé'
      default: return status
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <main className="min-h-screen bg-archi-cream">
      <Navigation />
      
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link href="/admin">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft size={20} className="mr-2" />
                Retour au tableau de bord
              </Button>
            </Link>
            <h1 className="font-serif text-4xl font-bold text-archi-dark mb-2">
              Rendez-vous
            </h1>
            <p className="text-gray-600">
              Gérez les rendez-vous avec les clients
            </p>
          </div>

          <div className="space-y-4">
            {appointments.map((appointment) => (
              <Card key={appointment.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <Calendar size={20} />
                      <span>{appointment.title}</span>
                    </CardTitle>
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(appointment.status)}`}>
                      {getStatusLabel(appointment.status)}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-gray-500" />
                        <span className="text-gray-600">{appointment.client}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-gray-500" />
                        <span className="text-gray-600">{appointment.date} à {appointment.time}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Phone size={16} className="text-gray-500" />
                        <a href={`tel:${appointment.phone}`} className="text-sm text-archi-accent hover:underline">
                          {appointment.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail size={16} className="text-gray-500" />
                        <a href={`mailto:${appointment.email}`} className="text-sm text-archi-accent hover:underline">
                          {appointment.email}
                        </a>
                      </div>
                    </div>
                    {appointment.description && (
                      <div>
                        <p className="text-sm text-gray-600">Description</p>
                        <p className="text-sm text-gray-700">{appointment.description}</p>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleStatusChange(appointment.id, 'confirmed')}>
                          <Check size={16} className="mr-2" />
                          Confirmer
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleStatusChange(appointment.id, 'cancelled')}>
                          <X size={16} className="mr-2" />
                          Annuler
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        <select
                          value={appointment.status}
                          onChange={(e) => handleStatusChange(appointment.id, e.target.value)}
                          className="px-3 py-1 border rounded-md text-sm"
                        >
                          <option value="pending">En attente</option>
                          <option value="confirmed">Confirmé</option>
                          <option value="cancelled">Annulé</option>
                          <option value="completed">Terminé</option>
                        </select>
                        <Button variant="outline" size="sm">
                          <Edit size={16} className="mr-2" />
                          Modifier
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
