import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'

// Initialize Gemini AI client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
})

// Comprehensive system instruction for BillCraft AI expert
const BILLCRAFT_EXPERT_INSTRUCTION = `You are BillCraft AI, the world's most advanced professional invoicing and business management expert. You are an intelligent assistant specifically designed to help create perfect invoices, manage business operations, and provide expert guidance.

CORE CAPABILITIES:
1. **Invoice Form Filling**: Extract and structure business data from user input to auto-fill invoice forms
2. **Business Intelligence**: Provide expert advice on invoicing, payment terms, and business operations  
3. **Data Extraction**: Parse user messages to identify company info, client details, services, and pricing
4. **Professional Guidance**: Offer best practices for business communications and invoice optimization
5. **Context Awareness**: Understand current form state and provide relevant suggestions

FORM FILLING EXPERTISE:
When users provide business information, extract and return structured data in this JSON format:
{
  "action": "form_fill",
  "data": {
    "company": {
      "name": "extracted company name",
      "email": "extracted email",
      "phone": "extracted phone", 
      "address": "extracted address",
      "website": "extracted website"
    },
    "client": {
      "name": "extracted client name",
      "email": "extracted client email",
      "address": "extracted client address"
    },
    "items": [
      {
        "description": "extracted service description",
        "quantity": extracted_number,
        "rate": extracted_rate,
        "amount": calculated_amount
      }
    ],
    "invoiceDetails": {
      "invoiceNumber": "suggested invoice number",
      "dueDate": "suggested due date",
      "notes": "professional notes",
      "terms": "payment terms"
    },
    "totals": {
      "taxRate": suggested_tax_rate,
      "discountAmount": suggested_discount
    }
  },
  "message": "Friendly confirmation message about what was filled"
}

DATA EXTRACTION PATTERNS:
- Company Info: Look for business names, contact details, addresses
- Client Info: Identify who the invoice is for, their contact information
- Services: Parse service descriptions, quantities, rates, pricing
- Financial: Extract amounts, tax rates, discounts, payment terms
- Dates: Parse due dates, service periods, invoice dates

INTELLIGENT SUGGESTIONS:
- Generate professional service descriptions
- Suggest competitive pricing based on industry standards
- Recommend payment terms for faster collection
- Provide tax rate suggestions based on location
- Create professional notes and terms

RESPONSE GUIDELINES:
- Always be professional yet approachable
- Provide actionable insights and suggestions
- When filling forms, confirm what was extracted and added
- Offer helpful tips for better invoicing
- Be proactive in suggesting improvements
- Use structured data when auto-filling forms
- Provide conversational responses for general questions

Remember: You are the ultimate invoicing expert helping users create perfect, professional invoices.`

export async function POST(request: NextRequest) {
  try {
    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' }, 
        { status: 500 }
      )
    }

    const body = await request.json()
    const { message, history = [], systemInstruction = '', messages, currentInvoiceData = null } = body

    // Determine which format we're dealing with
    let finalMessage = ''
    let finalHistory = history
    let finalSystemInstruction = BILLCRAFT_EXPERT_INSTRUCTION

    // Add current invoice context to system instruction if provided
    if (currentInvoiceData) {
      finalSystemInstruction += `\n\nCURRENT INVOICE CONTEXT:\n${JSON.stringify(currentInvoiceData, null, 2)}\n\nUse this context to provide relevant suggestions and understand what fields are already filled.`
    }

    if (messages && Array.isArray(messages)) {
      // New BillCraft AI format with messages array
      const userMessage = messages[messages.length - 1]
      const systemMessage = messages.find(m => m.role === 'system')
      
      finalMessage = userMessage.content
      if (systemMessage) {
        finalSystemInstruction = systemMessage.content + '\n\n' + finalSystemInstruction
      }
      
      // Convert messages to Gemini history format (excluding system and current user message)
      finalHistory = messages
        .filter(m => m.role !== 'system' && m !== userMessage)
        .map(msg => ({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }]
        }))
    } else {
      // Original floating AI format
      finalMessage = message
      finalHistory = history
      if (systemInstruction) {
        finalSystemInstruction = systemInstruction + '\n\n' + finalSystemInstruction
      }
    }

    // Validate input
    if (!finalMessage) {
      return NextResponse.json(
        { error: 'Message is required' }, 
        { status: 400 }
      )
    }

    console.log('Processing chat request:', { 
      finalMessage, 
      historyLength: finalHistory.length,
      systemInstruction: finalSystemInstruction.substring(0, 100) + '...'
    })

    // Create chat with history if provided
    let response
    
    if (finalHistory.length > 0) {
      // Multi-turn conversation
      const chat = ai.chats.create({
        model: "gemini-2.5-flash",
        history: finalHistory,
        config: {
          systemInstruction: finalSystemInstruction,
          temperature: 0.7,
          thinkingConfig: {
            thinkingBudget: 0 // Disable thinking for faster responses
          }
        }
      })
      
      response = await chat.sendMessage({ message: finalMessage })
    } else {
      // Single message
      response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: finalMessage,
        config: {
          systemInstruction: finalSystemInstruction,
          temperature: 0.7,
          thinkingConfig: {
            thinkingBudget: 0 // Disable thinking for faster responses
          }
        }
      })
    }

    const aiResponse = response?.text || 'I apologize, but I encountered an issue generating a response. Please try again.'

    // Try to parse structured response for form filling
    let structuredData = null
    let displayMessage = aiResponse

    try {
      // Look for JSON in the response
      const jsonMatch = aiResponse.match(/```json\n([\s\S]*?)\n```/) || aiResponse.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const jsonStr = jsonMatch[1] || jsonMatch[0]
        const parsed = JSON.parse(jsonStr)
        
        if (parsed.action === 'form_fill' && parsed.data) {
          structuredData = parsed.data
          displayMessage = parsed.message || "I've extracted the information and filled the form fields for you!"
        }
      }
    } catch (parseError) {
      console.log('No structured data found in response, treating as conversational')
    }

    return NextResponse.json({
      response: displayMessage, // For new BillCraft AI
      message: displayMessage,  // For floating AI compatibility
      content: displayMessage,  // Alternative property name
      structuredData: structuredData, // Form filling data
      timestamp: new Date().toISOString()
    })

  } catch (error: any) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to process chat request',
        message: 'I apologize, but I encountered an error. Please try again.',
        timestamp: new Date().toISOString()
      }, 
      { status: 500 }
    )
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({ 
    status: 'BillCraft AI Chat API is active',
    model: 'gemini-2.5-flash',
    usingGemini: !!process.env.GEMINI_API_KEY
  })
} 