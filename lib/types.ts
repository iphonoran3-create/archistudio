export type UserRole = 'admin' | 'architect' | 'client'

export type ProjectStatus = 'new' | 'study' | 'design' | 'validation' | 'in_progress' | 'completed' | 'archived'
export type ProjectType = 'house' | 'villa' | 'apartment' | 'building' | 'office' | 'commercial' | 'renovation' | 'other'

export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled'
export type AppointmentType = 'consultation' | 'first_meeting' | 'presentation' | '3d_consultation' | 'follow_up'
export type AppointmentMode = 'online' | 'office' | 'site'

export type QuoteStatus = 'new' | 'processing' | 'quote_sent' | 'accepted' | 'rejected'

export interface User {
  id: string
  email: string
  first_name: string
  last_name: string
  phone?: string
  role: UserRole
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  bio?: string
  company_name?: string
  address?: string
  city?: string
  postal_code?: string
  country?: string
  website?: string
  linkedin?: string
}

export interface Project {
  id: string
  client_id: string
  architect_id?: string
  project_code: string
  name: string
  description?: string
  type: ProjectType
  status: ProjectStatus
  progress: number
  address?: string
  city?: string
  surface_area?: number
  budget_estimated?: number
  budget_actual?: number
  start_date?: string
  estimated_end_date?: string
  actual_end_date?: string
  created_at: string
  updated_at: string
}

export interface Appointment {
  id: string
  client_id: string
  architect_id?: string
  appointment_type: AppointmentType
  appointment_mode: AppointmentMode
  date: string
  time: string
  duration: number
  status: AppointmentStatus
  project_id?: string
  meeting_link?: string
  location?: string
  notes?: string
  internal_notes?: string
  created_at: string
  updated_at: string
}

export interface QuoteRequest {
  id: string
  client_id?: string
  first_name: string
  last_name: string
  email: string
  phone?: string
  city?: string
  project_type: ProjectType
  surface_area?: number
  budget_estimated?: number
  description: string
  preferred_start_date?: string
  status: QuoteStatus
  assigned_to?: string
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  sender_id: string
  receiver_id: string
  project_id?: string
  subject?: string
  content: string
  is_read: boolean
  read_at?: string
  created_at: string
}

export interface Notification {
  id: string
  user_id: string
  type: 'appointment' | 'message' | 'project_update' | 'document' | 'quote' | 'system'
  title: string
  content?: string
  link?: string
  is_read: boolean
  created_at: string
}

export interface PortfolioProject {
  id: string
  title: string
  slug: string
  category: 'house' | 'villa' | 'residential' | 'commercial' | 'office' | 'renovation' | '3d'
  description?: string
  location?: string
  surface_area?: number
  year?: number
  status: 'in_progress' | 'completed'
  is_featured: boolean
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface Service {
  id: string
  name: string
  slug: string
  description?: string
  icon?: string
  image_url?: string
  order_index: number
  is_active: boolean
}

export interface Testimonial {
  id: string
  client_name: string
  client_photo?: string
  project?: string
  rating: number
  content: string
  is_published: boolean
}
