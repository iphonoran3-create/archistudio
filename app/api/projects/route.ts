import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ success: false, error: 'Database not configured' }, { status: 500 })
    }

    const projects = await request.json()
    
    if (Array.isArray(projects)) {
      for (const project of projects) {
        const { error } = await supabaseAdmin
          .from('projects')
          .upsert({ ...project, updated_at: new Date().toISOString() })
        if (error) throw error
      }
    } else {
      const { error } = await supabaseAdmin
        .from('projects')
        .insert({ ...projects, created_at: new Date().toISOString(), updated_at: new Date().toISOString() })
      if (error) throw error
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving projects:', error)
    return NextResponse.json({ success: false, error: 'Failed to save projects' }, { status: 500 })
  }
}

export async function GET() {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json([])
    }

    const { data, error } = await supabaseAdmin
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    
    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Error loading projects:', error)
    return NextResponse.json([], { status: 500 })
  }
}
