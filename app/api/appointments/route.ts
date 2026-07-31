import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ success: false, error: 'Database not configured' }, { status: 500 })
    }

    const data = await request.json()
    
    if (Array.isArray(data)) {
      for (const appointment of data) {
        const { error } = await supabaseAdmin
          .from('appointments')
          .update({ status: appointment.status })
          .eq('id', appointment.id)
        if (error) throw error
      }
    } else {
      const { error } = await supabaseAdmin
        .from('appointments')
        .insert(data)
      if (error) throw error
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving appointments:', error)
    return NextResponse.json({ success: false, error: 'Failed to save appointments' }, { status: 500 })
  }
}

export async function GET() {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json([])
    }

    const { data, error } = await supabaseAdmin
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    
    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Error loading appointments:', error)
    return NextResponse.json([], { status: 500 })
  }
}
