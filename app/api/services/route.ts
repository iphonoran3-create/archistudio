import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ success: false, error: 'Database not configured' }, { status: 500 })
    }

    const services = await request.json()
    
    if (Array.isArray(services)) {
      for (const service of services) {
        const { error } = await supabaseAdmin
          .from('services')
          .upsert({ ...service, updated_at: new Date().toISOString() })
        if (error) throw error
      }
    } else {
      const { error } = await supabaseAdmin
        .from('services')
        .insert({ ...services, created_at: new Date().toISOString(), updated_at: new Date().toISOString() })
      if (error) throw error
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving services:', error)
    return NextResponse.json({ success: false, error: 'Failed to save services' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ success: false, error: 'Database not configured' }, { status: 500 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 })
    }

    const { error } = await supabaseAdmin
      .from('services')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting service:', error)
    return NextResponse.json({ success: false, error: 'Failed to delete service' }, { status: 500 })
  }
}

export async function GET() {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json([])
    }

    const { data, error } = await supabaseAdmin
      .from('services')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    
    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Error loading services:', error)
    return NextResponse.json([], { status: 500 })
  }
}
