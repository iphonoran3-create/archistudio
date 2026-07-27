import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const newAppointment = await request.json()
    
    const filePath = path.join(process.cwd(), 'public', 'data', 'appointments.json')
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const appointments = JSON.parse(fileContent)
    
    appointments.push(newAppointment)
    
    fs.writeFileSync(filePath, JSON.stringify(appointments, null, 2), 'utf-8')
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving appointment:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'appointments.json')
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const appointments = JSON.parse(fileContent)
    
    return NextResponse.json(appointments)
  } catch (error) {
    console.error('Error loading appointments:', error)
    return NextResponse.json([], { status: 500 })
  }
}
