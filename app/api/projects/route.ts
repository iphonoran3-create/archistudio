import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const projects = await request.json()
    
    const filePath = path.join(process.cwd(), 'public', 'data', 'projects.json')
    const fileContent = JSON.stringify(projects, null, 2)
    
    fs.writeFileSync(filePath, fileContent, 'utf-8')
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving projects:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
