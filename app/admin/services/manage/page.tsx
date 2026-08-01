'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/layout/navigation'
import Footer from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, Edit, Trash2, ArrowLeft, Save, X } from 'lucide-react'
import Link from 'next/link'

export default function AdminServicesManagePage() {
  const [services, setServices] = useState<any[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<any>(null)
  const [formData, setFormData] = useState({
    id: 0,
    title: '',
    description: '',
    icon: 'home'
  })
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error('Failed to load services:', err))
  }, [])

  const handleAdd = () => {
    setEditingService(null)
    setFormData({
      id: services.length + 1,
      title: '',
      description: '',
      icon: 'home'
    })
    setIsDialogOpen(true)
  }

  const handleEdit = (service: any) => {
    setEditingService(service)
    setFormData(service)
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) return
    
    const updatedServices = services.filter(s => s.id !== id)
    await saveServices(updatedServices)
    setServices(updatedServices)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      let updatedServices
      if (editingService) {
        updatedServices = services.map(s => s.id === editingService.id ? formData : s)
      } else {
        updatedServices = [...services, { ...formData, id: services.length + 1 }]
      }

      await saveServices(updatedServices)
      setServices(updatedServices)
      setIsDialogOpen(false)
    } catch (error) {
      console.error('Error saving service:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const saveServices = async (data: any[]) => {
    const response = await fetch('/api/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    if (!response.ok) throw new Error('Failed to save')
  }

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
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
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-serif text-4xl font-bold text-archi-dark mb-2">
                  Gestion des services
                </h1>
                <p className="text-gray-600">
                  Ajoutez, modifiez ou supprimez vos services
                </p>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="architect" onClick={handleAdd}>
                    <Plus size={20} className="mr-2" />
                    Nouveau service
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>
                      {editingService ? 'Modifier le service' : 'Nouveau service'}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSave} className="space-y-4">
                    <div>
                      <Label htmlFor="title">Titre *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="icon">Icône</Label>
                      <select
                        id="icon"
                        value={formData.icon}
                        onChange={(e) => handleChange('icon', e.target.value)}
                        className="w-full mt-2 px-3 py-2 border rounded-md"
                      >
                        <option value="home">Home</option>
                        <option value="building">Building</option>
                        <option value="refresh-cw">Refresh</option>
                        <option value="box">Box</option>
                        <option value="layers">Layers</option>
                        <option value="clipboard">Clipboard</option>
                      </select>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                        <X size={20} className="mr-2" />
                        Annuler
                      </Button>
                      <Button type="submit" variant="architect" disabled={isSaving}>
                        <Save size={20} className="mr-2" />
                        {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Icône
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {services.map((service) => (
                  <tr key={service.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="h-12 w-12 rounded object-cover mr-4"
                        />
                        <div>
                          <div className="font-medium text-archi-dark">{service.title}</div>
                          <div className="text-sm text-gray-500">{service.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {service.icon}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(service)}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(service.id)}
                        >
                          <Trash2 size={16} className="text-red-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
