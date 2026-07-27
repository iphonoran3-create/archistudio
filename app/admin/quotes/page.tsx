'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/layout/navigation'
import Footer from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, FileText, Check, Clock, DollarSign, Edit, Phone, Mail, MapPin } from 'lucide-react'
import Link from 'next/link'

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<any[]>([])

  useEffect(() => {
    fetch('/data/quotes.json')
      .then(res => res.json())
      .then(data => {
        // Sort by id (newest first - id is timestamp)
        const sorted = data.sort((a: any, b: any) => b.id - a.id)
        setQuotes(sorted)
      })
      .catch(err => console.error('Failed to load quotes:', err))
  }, [])

  const handleStatusChange = async (id: number, newStatus: string) => {
    const updatedQuotes = quotes.map(q => q.id === id ? { ...q, status: newStatus } : q)
    setQuotes(updatedQuotes)
    
    try {
      await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedQuotes)
      })
    } catch (error) {
      console.error('Error saving quotes:', error)
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'new': return 'Nouveau'
      case 'processing': return 'En cours'
      case 'quote_sent': return 'Envoyé'
      case 'accepted': return 'Accepté'
      case 'rejected': return 'Refusé'
      default: return status
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800'
      case 'processing': return 'bg-yellow-100 text-yellow-800'
      case 'quote_sent': return 'bg-green-100 text-green-800'
      case 'accepted': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
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
              Demande de devis
            </h1>
            <p className="text-gray-600">
              Gérez les demandes de devis des clients
            </p>
          </div>

          <div className="space-y-4">
            {quotes.map((quote) => (
              <Card key={quote.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <FileText size={20} />
                      <span>{quote.client}</span>
                    </CardTitle>
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(quote.status)}`}>
                      {getStatusLabel(quote.status)}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Projet</p>
                        <p className="font-medium">{quote.project}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Budget</p>
                        <p className="font-medium">{quote.budget}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Phone size={16} className="text-gray-500" />
                        <a href={`tel:${quote.phone}`} className="text-sm text-archi-accent hover:underline">
                          {quote.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail size={16} className="text-gray-500" />
                        <a href={`mailto:${quote.email}`} className="text-sm text-archi-accent hover:underline">
                          {quote.email}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-gray-500" />
                      <span className="text-sm text-gray-700">{quote.city}</span>
                    </div>
                    {quote.description && (
                      <div>
                        <p className="text-sm text-gray-600">Description</p>
                        <p className="text-sm text-gray-700">{quote.description}</p>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-500">{quote.date}</p>
                      <div className="flex gap-2">
                        <select
                          value={quote.status}
                          onChange={(e) => handleStatusChange(quote.id, e.target.value)}
                          className="px-3 py-1 border rounded-md text-sm"
                        >
                          <option value="new">Nouveau</option>
                          <option value="processing">En cours</option>
                          <option value="quote_sent">Envoyé</option>
                          <option value="accepted">Accepté</option>
                          <option value="rejected">Refusé</option>
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
