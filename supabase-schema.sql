-- BillCraft Database Schema Setup Script
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Firebase auth)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  firebase_uid TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  full_name TEXT,
  company_name TEXT,
  plan TEXT DEFAULT 'trial' CHECK (plan IN ('trial', 'professional', 'enterprise')),
  trial_ends_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Clients table
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  address TEXT,
  city TEXT,
  phone TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Invoices table
CREATE TABLE IF NOT EXISTS invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  invoice_number TEXT NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'paid', 'overdue', 'cancelled')),
  template TEXT DEFAULT 'modern-blue',
  
  -- Invoice details
  issue_date DATE NOT NULL,
  due_date DATE NOT NULL,
  
  -- Company info (from user's profile or custom)
  company_name TEXT,
  company_email TEXT,
  company_phone TEXT,
  company_address TEXT,
  company_city TEXT,
  company_website TEXT,
  
  -- Client info (copied from client or custom)
  client_name TEXT,
  client_email TEXT,
  client_address TEXT,
  client_city TEXT,
  
  -- Financial data
  subtotal DECIMAL(10,2) DEFAULT 0,
  tax_rate DECIMAL(5,2) DEFAULT 0,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  discount_amount DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  
  -- Additional info
  notes TEXT,
  terms TEXT,
  
  -- Metadata
  sent_at TIMESTAMP WITH TIME ZONE,
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure unique invoice numbers per user
  UNIQUE(user_id, invoice_number)
);

-- Invoice items table
CREATE TABLE IF NOT EXISTS invoice_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_id UUID REFERENCES invoices(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  quantity DECIMAL(10,3) DEFAULT 1,
  rate DECIMAL(10,2) DEFAULT 0,
  amount DECIMAL(10,2) DEFAULT 0,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trial tracking table
CREATE TABLE IF NOT EXISTS trials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  plan TEXT NOT NULL CHECK (plan IN ('professional', 'enterprise')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'expired', 'cancelled', 'converted')),
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  features JSONB,
  usage_stats JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_firebase_uid ON users(firebase_uid);
CREATE INDEX IF NOT EXISTS idx_invoices_user_id ON invoices(user_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);
CREATE INDEX IF NOT EXISTS idx_invoices_created_at ON invoices(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_invoices_invoice_number ON invoices(invoice_number);
CREATE INDEX IF NOT EXISTS idx_clients_user_id ON clients(user_id);
CREATE INDEX IF NOT EXISTS idx_invoice_items_invoice_id ON invoice_items(invoice_id);
CREATE INDEX IF NOT EXISTS idx_trials_user_id ON trials(user_id);
CREATE INDEX IF NOT EXISTS idx_trials_status ON trials(status);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE trials ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Users can insert own profile" ON users;
DROP POLICY IF EXISTS "Users can manage own clients" ON clients;
DROP POLICY IF EXISTS "Users can manage own invoices" ON invoices;
DROP POLICY IF EXISTS "Users can manage own invoice items" ON invoice_items;
DROP POLICY IF EXISTS "Users can manage own trials" ON trials;

-- Create RLS Policies (users can only access their own data)
-- Users table policies
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (firebase_uid = auth.jwt() ->> 'sub');
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (firebase_uid = auth.jwt() ->> 'sub');
CREATE POLICY "Users can insert own profile" ON users FOR INSERT WITH CHECK (firebase_uid = auth.jwt() ->> 'sub');

-- Clients table policies
CREATE POLICY "Users can manage own clients" ON clients FOR ALL USING (
  user_id IN (SELECT id FROM users WHERE firebase_uid = auth.jwt() ->> 'sub')
);

-- Invoices table policies
CREATE POLICY "Users can manage own invoices" ON invoices FOR ALL USING (
  user_id IN (SELECT id FROM users WHERE firebase_uid = auth.jwt() ->> 'sub')
);

-- Invoice items table policies
CREATE POLICY "Users can manage own invoice items" ON invoice_items FOR ALL USING (
  invoice_id IN (
    SELECT id FROM invoices WHERE user_id IN (
      SELECT id FROM users WHERE firebase_uid = auth.jwt() ->> 'sub'
    )
  )
);

-- Trials table policies
CREATE POLICY "Users can manage own trials" ON trials FOR ALL USING (
  user_id IN (SELECT id FROM users WHERE firebase_uid = auth.jwt() ->> 'sub')
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at column
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
DROP TRIGGER IF EXISTS update_clients_updated_at ON clients;
DROP TRIGGER IF EXISTS update_invoices_updated_at ON invoices;
DROP TRIGGER IF EXISTS update_trials_updated_at ON trials;

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON invoices FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_trials_updated_at BEFORE UPDATE ON trials FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Insert some sample data for testing (optional)
-- You can uncomment these lines if you want sample data

/*
-- Sample user (replace 'firebase_uid_here' with a real Firebase UID)
INSERT INTO users (firebase_uid, email, full_name, company_name) VALUES
('sample_firebase_uid', 'test@example.com', 'Test User', 'Test Company')
ON CONFLICT (firebase_uid) DO NOTHING;

-- Sample client
INSERT INTO clients (user_id, name, email, address, city) VALUES
((SELECT id FROM users WHERE firebase_uid = 'sample_firebase_uid'), 'Sample Client', 'client@example.com', '123 Client St', 'Client City')
ON CONFLICT DO NOTHING;
*/

-- Success message
SELECT 'BillCraft database schema created successfully! 🎉' as message; 