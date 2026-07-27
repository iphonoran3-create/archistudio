'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/layout/navigation'
import Footer from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, Edit, Trash2, ArrowLeft, Save, X, Users } from 'lucide-react'
import Link from 'next/link'

export default function AdminTeamManagePage() {
  const [team, setTeam] = useState<any[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<any>(null)
  const [formData, setFormData] = useState({
    id: 0,
    name: '',
    role: '',
    bio: '',
    image: ''
  })
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    fetch('/data/team.json')
      .then(res => res.json())
      .then(data => setTeam(data))
      .catch(err => console.error('Failed to load team:', err))
  }, [])

  const handleAdd = () => {
    setEditingMember(null)
    setFormData({
      id: team.length + 1,
      name: '',
      role: '',
      bio: '',
      image: ''
    })
    setIsDialogOpen(true)
  }

  const handleEdit = (member: any) => {
    setEditingMember(member)
    setFormData(member)
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce membre ?')) return
    
    const updatedTeam = team.filter(m => m.id !== id)
    await saveTeam(updatedTeam)
    setTeam(updatedTeam)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      let updatedTeam
      if (editingMember) {
        updatedTeam = team.map(m => m.id === editingMember.id ? formData : m)
      } else {
        updatedTeam = [...team, { ...formData, id: team.length + 1 }]
      }

      await saveTeam(updatedTeam)
      setTeam(updatedTeam)
      setIsDialogOpen(false)
    } catch (error) {
      console.error('Error saving team member:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const saveTeam = async (data: any[]) => {
    const response = await fetch('/api/team', {
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
                  Gestion de l'équipe
                </h1>
                <p className="text-gray-600">
                  Ajoutez, modifiez ou supprimez les membres de l'équipe
                </p>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="architect" onClick={handleAdd}>
                    <Plus size={20} className="mr-2" />
                    Nouveau membre
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>
                      {editingMember ? 'Modifier le membre' : 'Nouveau membre'}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSave} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nom *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="role">Rôle *</Label>
                      <Input
                        id="role"
                        value={formData.role}
                        onChange={(e) => handleChange('role', e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="bio">Biographie</Label>
                      <Textarea
                        id="bio"
                        value={formData.bio}
                        onChange={(e) => handleChange('bio', e.target.value)}
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label htmlFor="image">URL de la photo</Label>
                      <Input
                        id="image"
                        value={formData.image}
                        onChange={(e) => handleChange('image', e.target.value)}
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
                    Membre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rôle
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {team.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="h-12 w-12 rounded-full object-cover mr-4"
                        />
                        <div className="font-medium text-archi-dark">{member.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {member.role}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(member)}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(member.id)}
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
