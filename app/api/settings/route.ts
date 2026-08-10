import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ success: false, error: 'Database not configured' }, { status: 500 })
    }

    const settings = await request.json()
    
    // Update or insert settings (always use id=1 for single settings row)
    const { error } = await supabaseAdmin
      .from('settings')
      .upsert({ id: 1, ...settings, updated_at: new Date().toISOString() })
    
    if (error) throw error
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving settings:', error)
    return NextResponse.json({ success: false, error: 'Failed to save settings' }, { status: 500 })
  }
}

export async function GET() {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({
        site_name: 'Archistudio',
        logo: '/images/logo.jpg',
        description: 'Architecture moderne et design innovant',
        email: 'contact@archistudio.com',
        phone: '+33 1 23 45 67 89',
        address: 'Paris, France'
      })
    }

    const { data, error } = await supabaseAdmin
      .from('settings')
      .select('*')
      .eq('id', 1)
      .single()
    
    if (error) {
      // If no settings exist, return default
      if (error.code === 'PGRST116') {
        return NextResponse.json({
          site_name: 'Archistudio',
          logo: '/images/logo.jpg',
          description: 'Architecture moderne et design innovant',
          email: 'contact@archistudio.com',
          phone: '+33 1 23 45 67 89',
          address: 'Paris, France'
        })
      }
      throw error
    }
    
    // Ensure logo is set to custom logo
    if (!data.logo) {
      data.logo = '/images/logo.jpg'
    }
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error loading settings:', error)
    return NextResponse.json({ success: false, error: 'Failed to load settings' }, { status: 500 })
  }
}
