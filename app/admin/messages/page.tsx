'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/layout/navigation'
import Footer from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Mail, Trash2, Reply, Check } from 'lucide-react'
import Link from 'next/link'

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<any[]>([])

  useEffect(() => {
    fetch('/data/messages.json')
      .then(res => res.json())
      .then(data => {
        // Sort by id (newest first - id is timestamp)
        const sorted = data.sort((a: any, b: any) => b.id - a.id)
        setMessages(sorted)
      })
      .catch(err => console.error('Failed to load messages:', err))
  }, [])

  const handleMarkAsRead = async (id: number) => {
    const updatedMessages = messages.map(m => m.id === id ? { ...m, read: true } : m)
    setMessages(updatedMessages)
    
    try {
      await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedMessages)
      })
    } catch (error) {
      console.error('Error saving messages:', error)
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
      const updatedMessages = messages.filter(m => m.id !== id)
      setMessages(updatedMessages)
      
      try {
        await fetch('/api/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedMessages)
        })
      } catch (error) {
        console.error('Error saving messages:', error)
      }
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
              Messagerie
            </h1>
            <p className="text-gray-600">
              Gérez les messages reçus via le formulaire de contact
            </p>
          </div>

          <div className="space-y-4">
            {messages.map((message) => (
              <Card key={message.id} className={!message.read ? 'border-archi-accent' : ''}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <Mail size={20} />
                      <span>{message.subject}</span>
                      {!message.read && <span className="w-2 h-2 bg-archi-accent rounded-full" />}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleMarkAsRead(message.id)}>
                        <Check size={16} />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(message.id)}>
                        <Trash2 size={16} className="text-red-600" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{message.name}</span>
                      <span>{message.email}</span>
                    </div>
                    <p className="text-gray-700">{message.message}</p>
                    <p className="text-sm text-gray-500">{message.date}</p>
                    <Button variant="outline" size="sm" className="mt-4">
                      <Reply size={16} className="mr-2" />
                      Répondre
                    </Button>
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
