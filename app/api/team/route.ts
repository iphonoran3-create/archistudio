import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ success: false, error: 'Database not configured' }, { status: 500 })
    }

    const team = await request.json()
    
    if (Array.isArray(team)) {
      for (const member of team) {
        const { error } = await supabaseAdmin
          .from('team')
          .upsert({ ...member, updated_at: new Date().toISOString() })
        if (error) throw error
      }
    } else {
      const { error } = await supabaseAdmin
        .from('team')
        .insert({ ...team, created_at: new Date().toISOString(), updated_at: new Date().toISOString() })
      if (error) throw error
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving team:', error)
    return NextResponse.json({ success: false, error: 'Failed to save team' }, { status: 500 })
  }
}

export async function GET() {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json([])
    }

    const { data, error } = await supabaseAdmin
      .from('team')
      .select('*')
      .order('order_index', { ascending: true })
    
    if (error) throw error
    
    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Error loading team:', error)
    return NextResponse.json([], { status: 500 })
  }
}
