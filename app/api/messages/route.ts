import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const filePath = path.join(process.cwd(), 'public', 'data', 'messages.json')
    
    if (Array.isArray(data)) {
      // Update all messages
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
    } else {
      // Add new message
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const messages = JSON.parse(fileContent)
      messages.push(data)
      fs.writeFileSync(filePath, JSON.stringify(messages, null, 2), 'utf-8')
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving messages:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'messages.json')
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const messages = JSON.parse(fileContent)
    
    return NextResponse.json(messages)
  } catch (error) {
    console.error('Error loading messages:', error)
    return NextResponse.json([], { status: 500 })
  }
}
