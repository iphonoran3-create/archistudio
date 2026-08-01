import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ success: false, error: 'Database not configured' }, { status: 500 })
    }

    const testimonials = await request.json()
    
    if (Array.isArray(testimonials)) {
      for (const testimonial of testimonials) {
        const { error } = await supabaseAdmin
          .from('testimonials')
          .upsert({ ...testimonial, updated_at: new Date().toISOString() })
        if (error) throw error
      }
    } else {
      const { error } = await supabaseAdmin
        .from('testimonials')
        .insert({ ...testimonials, created_at: new Date().toISOString(), updated_at: new Date().toISOString() })
      if (error) throw error
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving testimonials:', error)
    return NextResponse.json({ success: false, error: 'Failed to save testimonials' }, { status: 500 })
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
      .from('testimonials')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting testimonial:', error)
    return NextResponse.json({ success: false, error: 'Failed to delete testimonial' }, { status: 500 })
  }
}

export async function GET() {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json([])
    }

    const { data, error } = await supabaseAdmin
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    
    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Error loading testimonials:', error)
    return NextResponse.json([], { status: 500 })
  }
}
