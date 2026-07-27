import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const filePath = path.join(process.cwd(), 'public', 'data', 'quotes.json')
    
    if (Array.isArray(data)) {
      // Update all quotes
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
    } else {
      // Add new quote
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const quotes = JSON.parse(fileContent)
      quotes.push(data)
      fs.writeFileSync(filePath, JSON.stringify(quotes, null, 2), 'utf-8')
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving quotes:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'quotes.json')
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const quotes = JSON.parse(fileContent)
    
    return NextResponse.json(quotes)
  } catch (error) {
    console.error('Error loading quotes:', error)
    return NextResponse.json([], { status: 500 })
  }
}
