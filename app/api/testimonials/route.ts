import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const testimonials = await request.json()
    
    const filePath = path.join(process.cwd(), 'public', 'data', 'testimonials.json')
    const fileContent = JSON.stringify(testimonials, null, 2)
    
    fs.writeFileSync(filePath, fileContent, 'utf-8')
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving testimonials:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
