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

export default function AdminProjectsManagePage() {
  const [projects, setProjects] = useState<any[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<any>(null)
  const [formData, setFormData] = useState({
    id: 0,
    title: '',
    category: '',
    location: '',
    year: new Date().getFullYear(),
    area: 0,
    image: '',
    slug: '',
    description: '',
    status: 'new',
    featured: false
  })
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error('Failed to load projects:', err))
  }, [])

  const handleAdd = () => {
    setEditingProject(null)
    setFormData({
      id: projects.length + 1,
      title: '',
      category: '',
      location: '',
      year: new Date().getFullYear(),
      area: 0,
      image: '',
      slug: '',
      description: '',
      status: 'new',
      featured: false
    })
    setIsDialogOpen(true)
  }

  const handleEdit = (project: any) => {
    setEditingProject(project)
    setFormData(project)
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) return
    
    const updatedProjects = projects.filter(p => p.id !== id)
    await saveProjects(updatedProjects)
    setProjects(updatedProjects)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      let updatedProjects
      if (editingProject) {
        updatedProjects = projects.map(p => p.id === editingProject.id ? formData : p)
      } else {
        updatedProjects = [...projects, { ...formData, id: projects.length + 1 }]
      }

      await saveProjects(updatedProjects)
      setProjects(updatedProjects)
      setIsDialogOpen(false)
    } catch (error) {
      console.error('Error saving project:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const saveProjects = async (data: any[]) => {
    const response = await fetch('/api/projects', {
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
                  Gestion des projets
                </h1>
                <p className="text-gray-600">
                  Ajoutez, modifiez ou supprimez vos projets
                </p>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="architect" onClick={handleAdd}>
                    <Plus size={20} className="mr-2" />
                    Nouveau projet
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingProject ? 'Modifier le projet' : 'Nouveau projet'}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSave} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
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
                        <Label htmlFor="category">Catégorie</Label>
                        <Input
                          id="category"
                          value={formData.category}
                          onChange={(e) => handleChange('category', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="location">Localisation</Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => handleChange('location', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="year">Année</Label>
                        <Input
                          id="year"
                          type="number"
                          value={formData.year}
                          onChange={(e) => handleChange('year', parseInt(e.target.value))}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="area">Surface (m²)</Label>
                      <Input
                        id="area"
                        type="number"
                        value={formData.area}
                        onChange={(e) => handleChange('area', parseInt(e.target.value))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="image">URL de l'image</Label>
                      <Input
                        id="image"
                        value={formData.image}
                        onChange={(e) => handleChange('image', e.target.value)}
                        placeholder="https://..."
                      />
                    </div>

                    <div>
                      <Label htmlFor="slug">Slug (URL)</Label>
                      <Input
                        id="slug"
                        value={formData.slug}
                        onChange={(e) => handleChange('slug', e.target.value)}
                        placeholder="mon-projet"
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

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="status">Statut</Label>
                        <select
                          id="status"
                          value={formData.status}
                          onChange={(e) => handleChange('status', e.target.value)}
                          className="w-full mt-2 px-3 py-2 border rounded-md"
                        >
                          <option value="new">Nouveau</option>
                          <option value="design">En conception</option>
                          <option value="in_progress">En cours</option>
                          <option value="validation">En validation</option>
                          <option value="completed">Terminé</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="featured">Mis en avant</Label>
                        <select
                          id="featured"
                          value={formData.featured ? 'true' : 'false'}
                          onChange={(e) => handleChange('featured', e.target.value === 'true')}
                          className="w-full mt-2 px-3 py-2 border rounded-md"
                        >
                          <option value="false">Non</option>
                          <option value="true">Oui</option>
                        </select>
                      </div>
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

          {/* Projects List */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Projet
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Catégorie
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progression
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="h-12 w-12 rounded object-cover mr-4"
                        />
                        <div>
                          <div className="font-medium text-archi-dark">{project.title}</div>
                          <div className="text-sm text-gray-500">{project.location}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 capitalize">
                      {project.category}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        project.status === 'completed' ? 'bg-green-100 text-green-800' :
                        project.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-archi-accent h-2 rounded-full"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600">{project.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(project)}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(project.id)}
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
