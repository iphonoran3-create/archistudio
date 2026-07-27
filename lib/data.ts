// Local data loader - reads from JSON files in data/ directory

export async function getProjects() {
  const response = await fetch('/data/projects.json')
  if (!response.ok) {
    throw new Error('Failed to fetch projects')
  }
  return response.json()
}

export async function getProjectBySlug(slug: string) {
  const projects = await getProjects()
  return projects.find((p: any) => p.slug === slug)
}

export async function getClients() {
  const response = await fetch('/data/clients.json')
  if (!response.ok) {
    throw new Error('Failed to fetch clients')
  }
  return response.json()
}

export async function getAppointments() {
  const response = await fetch('/data/appointments.json')
  if (!response.ok) {
    throw new Error('Failed to fetch appointments')
  }
  return response.json()
}

export async function getServices() {
  const response = await fetch('/data/services.json')
  if (!response.ok) {
    throw new Error('Failed to fetch services')
  }
  return response.json()
}

export async function getTestimonials() {
  const response = await fetch('/data/testimonials.json')
  if (!response.ok) {
    throw new Error('Failed to fetch testimonials')
  }
  return response.json()
}

export async function getTeam() {
  const response = await fetch('/data/team.json')
  if (!response.ok) {
    throw new Error('Failed to fetch team')
  }
  return response.json()
}
