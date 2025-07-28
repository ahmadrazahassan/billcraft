import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'

// Initialize Gemini AI client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
})

export async function POST(request: NextRequest) {
  try {
    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' }, 
        { status: 500 }
      )
    }

    const { message, history = [], systemInstruction = '' } = await request.json()

    // Validate input
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' }, 
        { status: 400 }
      )
    }

    // Rate limiting check (simple implementation)
    const userIP = request.headers.get('x-forwarded-for') || 'unknown'
    // You can implement more sophisticated rate limiting here

    // Create chat with history if provided
    let response
    
    if (history.length > 0) {
      // Multi-turn conversation
      const chat = ai.chats.create({
        model: "gemini-2.5-flash",
        history: history,
        config: {
          systemInstruction: systemInstruction || "You are a helpful assistant for BillCraft, an invoice management system. Be concise and professional.",
          temperature: 0.7,
          thinkingConfig: {
            thinkingBudget: 0 // Disable thinking for faster responses
          }
        }
      })
      
      response = await chat.sendMessage({ message })
    } else {
      // Single message
      response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: message,
        config: {
          systemInstruction: systemInstruction || "You are a helpful assistant for BillCraft, an invoice management system. Be concise and professional.",
          temperature: 0.7,
          thinkingConfig: {
            thinkingBudget: 0 // Disable thinking for faster responses
          }
        }
      })
    }

    return NextResponse.json({
      message: response.text,
      timestamp: new Date().toISOString()
    })

  } catch (error: any) {
    console.error('Gemini API error:', error)
    
    // Handle specific error types
    if (error.message?.includes('quota')) {
      return NextResponse.json(
        { error: 'API quota exceeded. Please try again later.' }, 
        { status: 429 }
      )
    }
    
    if (error.message?.includes('invalid')) {
      return NextResponse.json(
        { error: 'Invalid request. Please check your input.' }, 
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to process chat request. Please try again.' }, 
      { status: 500 }
    )
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({ 
    status: 'Chat API is active',
    model: 'gemini-2.5-flash'
  })
} 