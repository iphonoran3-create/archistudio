'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/layout/navigation'
import Footer from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, Edit, Trash2, ArrowLeft, Save, X, Star } from 'lucide-react'
import Link from 'next/link'

export default function AdminTestimonialsManagePage() {
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null)
  const [formData, setFormData] = useState({
    id: 0,
    name: '',
    project: '',
    rating: 5,
    comment: '',
    avatar: ''
  })
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    fetch('/api/testimonials')
      .then(res => res.json())
      .then(data => setTestimonials(data))
      .catch(err => console.error('Failed to load testimonials:', err))
  }, [])

  const handleAdd = () => {
    setEditingTestimonial(null)
    setFormData({
      id: testimonials.length + 1,
      name: '',
      project: '',
      rating: 5,
      comment: '',
      avatar: ''
    })
    setIsDialogOpen(true)
  }

  const handleEdit = (testimonial: any) => {
    setEditingTestimonial(testimonial)
    setFormData(testimonial)
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce témoignage ?')) return
    
    const updatedTestimonials = testimonials.filter(t => t.id !== id)
    await saveTestimonials(updatedTestimonials)
    setTestimonials(updatedTestimonials)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      let updatedTestimonials
      if (editingTestimonial) {
        updatedTestimonials = testimonials.map(t => t.id === editingTestimonial.id ? formData : t)
      } else {
        updatedTestimonials = [...testimonials, { ...formData, id: testimonials.length + 1 }]
      }

      await saveTestimonials(updatedTestimonials)
      setTestimonials(updatedTestimonials)
      setIsDialogOpen(false)
    } catch (error) {
      console.error('Error saving testimonial:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const saveTestimonials = async (data: any[]) => {
    const response = await fetch('/api/testimonials', {
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
                  Gestion des témoignages
                </h1>
                <p className="text-gray-600">
                  Ajoutez, modifiez ou supprimez les témoignages clients
                </p>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="architect" onClick={handleAdd}>
                    <Plus size={20} className="mr-2" />
                    Nouveau témoignage
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>
                      {editingTestimonial ? 'Modifier le témoignage' : 'Nouveau témoignage'}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSave} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nom du client *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="project">Projet</Label>
                        <Input
                          id="project"
                          value={formData.project}
                          onChange={(e) => handleChange('project', e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="rating">Note</Label>
                      <div className="flex items-center gap-2 mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => handleChange('rating', star)}
                            className="focus:outline-none"
                          >
                            <Star
                              size={24}
                              className={star <= formData.rating ? 'fill-archi-accent text-archi-accent' : 'text-gray-300'}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="comment">Commentaire *</Label>
                      <Textarea
                        id="comment"
                        value={formData.comment}
                        onChange={(e) => handleChange('comment', e.target.value)}
                        rows={4}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="avatar">URL de l'avatar</Label>
                      <Input
                        id="avatar"
                        value={formData.avatar}
                        onChange={(e) => handleChange('avatar', e.target.value)}
                        placeholder="https://..."
                      />
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
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Projet
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Note
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {testimonials.map((testimonial) => (
                  <tr key={testimonial.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="h-10 w-10 rounded-full object-cover mr-4"
                        />
                        <div className="font-medium text-archi-dark">{testimonial.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {testimonial.project}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} size={16} className="fill-archi-accent text-archi-accent" />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(testimonial)}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(testimonial.id)}
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
