import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const services = await request.json()
    
    const filePath = path.join(process.cwd(), 'public', 'data', 'services.json')
    const fileContent = JSON.stringify(services, null, 2)
    
    fs.writeFileSync(filePath, fileContent, 'utf-8')
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving services:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
