import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'

interface ContactSubmission {
  name: string
  email: string
  company: string
  jobTitle: string
  phone: string
  teamSize: string
  industry: string
  useCase: string
  message: string
  plan: string
  interval: string
  userId?: string
  timestamp: string
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactSubmission = await request.json()

    // Validate required fields
    const requiredFields: (keyof ContactSubmission)[] = ['name', 'email', 'company', 'message']
    const missingFields = requiredFields.filter(field => !data[field])
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // In production, you would:
    // 1. Save to database
    // 2. Send email notifications to sales team
    // 3. Add to CRM (HubSpot, Salesforce, etc.)
    // 4. Send auto-responder email to customer

    // Mock implementation - save to database
    try {
      // Example: Save to Supabase
      /*
      const { data: savedContact, error } = await supabase
        .from('contact_submissions')
        .insert({
          name: data.name,
          email: data.email,
          company: data.company,
          job_title: data.jobTitle,
          phone: data.phone,
          team_size: data.teamSize,
          industry: data.industry,
          use_case: data.useCase,
          message: data.message,
          plan_interest: data.plan,
          billing_interval: data.interval,
          user_id: data.userId,
          status: 'new',
          priority: data.plan === 'enterprise' ? 'high' : 'normal',
          source: 'website_contact_form',
          submitted_at: data.timestamp,
          created_at: new Date().toISOString()
        })
        .select()
        .single()

      if (error) {
        throw error
      }
      */

      // Mock: Send notification email to sales team
      await sendSalesNotification(data)

      // Mock: Send auto-responder email to customer
      await sendCustomerAutoResponder(data)

      // Mock: Add to CRM
      await addToCRM(data)

      return NextResponse.json({ 
        success: true,
        message: 'Contact form submitted successfully',
        submissionId: `contact_${Date.now()}` // Mock ID
      })

    } catch (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        { error: 'Failed to save submission' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Contact form submission failed:', error)
    return NextResponse.json(
      { error: 'Failed to process submission' },
      { status: 500 }
    )
  }
}

// Mock function - replace with actual email service
async function sendSalesNotification(data: ContactSubmission) {
  // Example using SendGrid, Resend, or similar service
  /*
  const emailContent = {
    to: 'sales@billcraft.com',
    from: 'noreply@billcraft.com',
    subject: `New ${data.plan} inquiry from ${data.company}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Priority:</strong> ${data.plan === 'enterprise' ? 'HIGH' : 'Normal'}</p>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Company:</strong> ${data.company}</p>
      <p><strong>Job Title:</strong> ${data.jobTitle}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Team Size:</strong> ${data.teamSize}</p>
      <p><strong>Industry:</strong> ${data.industry}</p>
      <p><strong>Use Case:</strong> ${data.useCase}</p>
      <p><strong>Plan Interest:</strong> ${data.plan} (${data.interval})</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
      <p><strong>Submitted:</strong> ${data.timestamp}</p>
    `
  }
  
  await emailService.send(emailContent)
  */
  
  console.log('Sales notification sent for:', data.email)
}

// Mock function - replace with actual email service
async function sendCustomerAutoResponder(data: ContactSubmission) {
  /*
  const emailContent = {
    to: data.email,
    from: 'sales@billcraft.com',
    subject: 'Thank you for your interest in BillCraft',
    html: `
      <h2>Thank you for contacting BillCraft!</h2>
      <p>Hi ${data.name},</p>
      <p>Thank you for your interest in BillCraft ${data.plan}. We've received your message and our team will get back to you within 24 hours.</p>
      <p>In the meantime, feel free to:</p>
      <ul>
        <li>Start your free trial at <a href="${process.env.NEXT_PUBLIC_APP_URL}/auth/signup">our signup page</a></li>
        <li>Check out our <a href="${process.env.NEXT_PUBLIC_APP_URL}/templates">invoice templates</a></li>
        <li>Read our <a href="${process.env.NEXT_PUBLIC_APP_URL}/docs">documentation</a></li>
      </ul>
      <p>Best regards,<br>The BillCraft Team</p>
    `
  }
  
  await emailService.send(emailContent)
  */
  
  console.log('Auto-responder sent to:', data.email)
}

// Mock function - replace with actual CRM integration
async function addToCRM(data: ContactSubmission) {
  // Example: HubSpot, Salesforce, Pipedrive integration
  /*
  const crmData = {
    email: data.email,
    firstname: data.name.split(' ')[0],
    lastname: data.name.split(' ').slice(1).join(' '),
    company: data.company,
    jobtitle: data.jobTitle,
    phone: data.phone,
    industry: data.industry,
    hs_lead_status: 'NEW',
    lifecyclestage: 'lead',
    plan_interest: data.plan,
    billing_preference: data.interval,
    team_size: data.teamSize,
    use_case: data.useCase,
    message: data.message,
    source: 'website_contact_form'
  }
  
  await hubspotClient.crm.contacts.basicApi.create({
    properties: crmData
  })
  */
  
  console.log('Added to CRM:', data.email)
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}
