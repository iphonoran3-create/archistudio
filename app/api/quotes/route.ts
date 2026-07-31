import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ success: false, error: 'Database not configured' }, { status: 500 })
    }

    const data = await request.json()
    
    if (Array.isArray(data)) {
      for (const quote of data) {
        const { error } = await supabaseAdmin
          .from('quotes')
          .update({ status: quote.status })
          .eq('id', quote.id)
        if (error) throw error
      }
    } else {
      const { error } = await supabaseAdmin
        .from('quotes')
        .insert(data)
      if (error) throw error
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving quotes:', error)
    return NextResponse.json({ success: false, error: 'Failed to save quotes' }, { status: 500 })
  }
}

export async function GET() {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json([])
    }

    const { data, error } = await supabaseAdmin
      .from('quotes')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    
    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Error loading quotes:', error)
    return NextResponse.json([], { status: 500 })
  }
}
