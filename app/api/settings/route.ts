import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const settings = await request.json()
    
    const filePath = path.join(process.cwd(), 'public', 'data', 'settings.json')
    const fileContent = JSON.stringify(settings, null, 2)
    
    fs.writeFileSync(filePath, fileContent, 'utf-8')
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving settings:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'settings.json')
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const settings = JSON.parse(fileContent)
    
    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error loading settings:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
