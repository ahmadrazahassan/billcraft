-- ============================================================================
-- BillCraft Production Database Schema
-- ============================================================================
-- 
-- PROFESSIONAL SUPABASE SQL SETUP
-- Copy and paste this entire script into your Supabase SQL Editor
-- 
-- This script creates a complete, production-ready database schema for BillCraft
-- with proper indexing, Row Level Security (RLS), and all necessary tables.
-- 
-- Features:
-- ✅ Complete user management with Firebase auth integration
-- ✅ Client management system
-- ✅ Full invoice lifecycle (draft → sent → paid)
-- ✅ Invoice line items with flexible pricing
-- ✅ Trial and subscription management
-- ✅ Advanced security with RLS policies
-- ✅ Performance optimized with proper indexing
-- ✅ Automatic timestamp updates
-- ✅ Data integrity with foreign key constraints
-- 
-- ============================================================================

-- Enable necessary PostgreSQL extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- CORE APPLICATION TABLES
-- ============================================================================

-- Users table (extends Firebase authentication)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    firebase_uid TEXT UNIQUE NOT NULL,
    email TEXT NOT NULL,
    full_name TEXT,
    company_name TEXT,
    company_email TEXT,
    company_phone TEXT,
    company_address TEXT,
    company_city TEXT,
    company_state TEXT,
    company_zip TEXT,
    company_country TEXT DEFAULT 'US',
    company_website TEXT,
    company_logo_url TEXT,
    tax_id TEXT,
    
    -- Subscription and billing
    plan TEXT DEFAULT 'trial' CHECK (plan IN ('trial', 'professional', 'enterprise')),
    trial_ends_at TIMESTAMP WITH TIME ZONE,
    stripe_customer_id TEXT,
    
    -- User preferences
    currency TEXT DEFAULT 'USD',
    date_format TEXT DEFAULT 'MM/DD/YYYY',
    timezone TEXT DEFAULT 'UTC',
    language TEXT DEFAULT 'en',
    
    -- Invoice settings
    invoice_prefix TEXT DEFAULT 'INV',
    next_invoice_number INTEGER DEFAULT 1,
    default_payment_terms INTEGER DEFAULT 30,
    default_tax_rate DECIMAL(5,2) DEFAULT 0.00,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Clients table
CREATE TABLE IF NOT EXISTS clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Client information
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    website TEXT,
    
    -- Address information
    address_line_1 TEXT,
    address_line_2 TEXT,
    city TEXT,
    state TEXT,
    zip_code TEXT,
    country TEXT DEFAULT 'US',
    
    -- Business details
    company_name TEXT,
    tax_id TEXT,
    
    -- Additional information
    notes TEXT,
    tags TEXT[], -- Array of tags for organization
    is_active BOOLEAN DEFAULT true,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Invoices table
CREATE TABLE IF NOT EXISTS invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
    
    -- Invoice identification
    invoice_number TEXT NOT NULL,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'viewed', 'paid', 'overdue', 'cancelled', 'refunded')),
    
    -- Template and branding
    template_name TEXT DEFAULT 'modern-blue',
    logo_url TEXT,
    
    -- Dates
    issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
    due_date DATE NOT NULL,
    sent_at TIMESTAMP WITH TIME ZONE,
    viewed_at TIMESTAMP WITH TIME ZONE,
    paid_at TIMESTAMP WITH TIME ZONE,
    
    -- Company information (snapshot at time of invoice creation)
    company_name TEXT,
    company_email TEXT,
    company_phone TEXT,
    company_address TEXT,
    company_city TEXT,
    company_state TEXT,
    company_zip TEXT,
    company_country TEXT,
    company_website TEXT,
    
    -- Client information (snapshot at time of invoice creation)
    client_name TEXT,
    client_email TEXT,
    client_company TEXT,
    client_address TEXT,
    client_city TEXT,
    client_state TEXT,
    client_zip TEXT,
    client_country TEXT,
    
    -- Financial calculations
    subtotal DECIMAL(12,2) DEFAULT 0.00,
    tax_rate DECIMAL(5,2) DEFAULT 0.00,
    tax_amount DECIMAL(12,2) DEFAULT 0.00,
    discount_type TEXT DEFAULT 'fixed' CHECK (discount_type IN ('fixed', 'percentage')),
    discount_value DECIMAL(12,2) DEFAULT 0.00,
    discount_amount DECIMAL(12,2) DEFAULT 0.00,
    shipping_amount DECIMAL(12,2) DEFAULT 0.00,
    total_amount DECIMAL(12,2) DEFAULT 0.00,
    amount_paid DECIMAL(12,2) DEFAULT 0.00,
    amount_due DECIMAL(12,2) DEFAULT 0.00,
    
    -- Currency and localization
    currency TEXT DEFAULT 'USD',
    exchange_rate DECIMAL(10,4) DEFAULT 1.0000,
    
    -- Terms and notes
    payment_terms TEXT,
    notes TEXT,
    internal_notes TEXT, -- Private notes not shown to client
    terms_and_conditions TEXT,
    
    -- Payment information
    payment_method TEXT, -- cash, check, bank_transfer, credit_card, paypal, etc.
    payment_reference TEXT, -- Check number, transaction ID, etc.
    late_fee_amount DECIMAL(12,2) DEFAULT 0.00,
    
    -- Recurring invoice settings
    is_recurring BOOLEAN DEFAULT false,
    recurring_frequency TEXT CHECK (recurring_frequency IN ('weekly', 'monthly', 'quarterly', 'yearly')),
    recurring_interval INTEGER DEFAULT 1,
    recurring_end_date DATE,
    next_recurring_date DATE,
    recurring_count INTEGER DEFAULT 0,
    max_recurring INTEGER,
    parent_invoice_id UUID REFERENCES invoices(id) ON DELETE SET NULL,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraints
    UNIQUE(user_id, invoice_number),
    CHECK (total_amount >= 0),
    CHECK (amount_paid >= 0),
    CHECK (amount_due >= 0)
);

-- Invoice line items table
CREATE TABLE IF NOT EXISTS invoice_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
    
    -- Item details
    description TEXT NOT NULL,
    quantity DECIMAL(10,3) DEFAULT 1.000,
    unit_price DECIMAL(12,2) DEFAULT 0.00,
    line_total DECIMAL(12,2) DEFAULT 0.00,
    
    -- Tax settings (can override invoice-level tax)
    tax_rate DECIMAL(5,2),
    tax_amount DECIMAL(12,2) DEFAULT 0.00,
    
    -- Organization
    sort_order INTEGER DEFAULT 0,
    item_type TEXT DEFAULT 'service' CHECK (item_type IN ('product', 'service', 'expense', 'discount')),
    
    -- Product/service details
    sku TEXT,
    unit_of_measure TEXT DEFAULT 'each',
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraints
    CHECK (quantity > 0),
    CHECK (line_total >= 0)
);

-- ============================================================================
-- TRIAL AND SUBSCRIPTION MANAGEMENT
-- ============================================================================

-- User trials table
CREATE TABLE IF NOT EXISTS user_trials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Trial details
    plan_type TEXT NOT NULL DEFAULT 'professional' CHECK (plan_type IN ('professional', 'enterprise')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'expired', 'cancelled', 'converted')),
    
    -- Trial period
    trial_start TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    trial_end TIMESTAMP WITH TIME ZONE NOT NULL,
    trial_days INTEGER NOT NULL DEFAULT 14,
    
    -- Extension tracking
    original_end_date TIMESTAMP WITH TIME ZONE,
    extension_days INTEGER DEFAULT 0,
    extension_reason TEXT,
    
    -- Conversion tracking
    converted_to_plan TEXT,
    converted_at TIMESTAMP WITH TIME ZONE,
    stripe_subscription_id TEXT,
    
    -- Usage tracking
    invoices_created INTEGER DEFAULT 0,
    clients_created INTEGER DEFAULT 0,
    features_used JSONB DEFAULT '{}',
    last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraints
    UNIQUE(user_id), -- One trial per user
    CHECK (trial_end > trial_start)
);

-- User subscriptions table
CREATE TABLE IF NOT EXISTS user_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Subscription details
    plan_type TEXT NOT NULL CHECK (plan_type IN ('professional', 'enterprise')),
    status TEXT NOT NULL CHECK (status IN ('active', 'canceled', 'past_due', 'incomplete', 'trialing', 'paused')),
    billing_interval TEXT NOT NULL CHECK (billing_interval IN ('monthly', 'yearly')),
    
    -- Stripe integration
    stripe_subscription_id TEXT UNIQUE NOT NULL,
    stripe_customer_id TEXT NOT NULL,
    stripe_price_id TEXT NOT NULL,
    stripe_product_id TEXT,
    
    -- Billing periods
    current_period_start TIMESTAMP WITH TIME ZONE NOT NULL,
    current_period_end TIMESTAMP WITH TIME ZONE NOT NULL,
    trial_start TIMESTAMP WITH TIME ZONE,
    trial_end TIMESTAMP WITH TIME ZONE,
    
    -- Cancellation
    cancel_at_period_end BOOLEAN NOT NULL DEFAULT false,
    canceled_at TIMESTAMP WITH TIME ZONE,
    cancellation_reason TEXT,
    
    -- Pricing
    amount INTEGER NOT NULL, -- Amount in cents
    currency TEXT NOT NULL DEFAULT 'USD',
    tax_percent DECIMAL(5,2) DEFAULT 0.00,
    
    -- Features and limits
    features JSONB DEFAULT '{}',
    usage_limits JSONB DEFAULT '{}',
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- PAYMENT AND TRANSACTION TRACKING
-- ============================================================================

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
    
    -- Payment details
    amount DECIMAL(12,2) NOT NULL,
    currency TEXT NOT NULL DEFAULT 'USD',
    payment_method TEXT NOT NULL, -- cash, check, bank_transfer, credit_card, paypal, stripe, etc.
    payment_status TEXT DEFAULT 'completed' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded', 'cancelled')),
    
    -- External references
    transaction_id TEXT, -- External payment processor transaction ID
    reference_number TEXT, -- Check number, wire transfer reference, etc.
    
    -- Payment processor details
    processor TEXT, -- stripe, paypal, square, etc.
    processor_fee DECIMAL(12,2) DEFAULT 0.00,
    net_amount DECIMAL(12,2), -- Amount after fees
    
    -- Dates
    payment_date DATE NOT NULL DEFAULT CURRENT_DATE,
    processed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Notes
    notes TEXT,
    internal_notes TEXT,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraints
    CHECK (amount > 0)
);

-- ============================================================================
-- PERFORMANCE INDEXES
-- ============================================================================

-- Users table indexes
CREATE INDEX IF NOT EXISTS idx_users_firebase_uid ON users(firebase_uid);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_plan ON users(plan);
CREATE INDEX IF NOT EXISTS idx_users_trial_ends_at ON users(trial_ends_at);

-- Clients table indexes
CREATE INDEX IF NOT EXISTS idx_clients_user_id ON clients(user_id);
CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email);
CREATE INDEX IF NOT EXISTS idx_clients_name ON clients(name);
CREATE INDEX IF NOT EXISTS idx_clients_is_active ON clients(is_active);

-- Invoices table indexes
CREATE INDEX IF NOT EXISTS idx_invoices_user_id ON invoices(user_id);
CREATE INDEX IF NOT EXISTS idx_invoices_client_id ON invoices(client_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);
CREATE INDEX IF NOT EXISTS idx_invoices_invoice_number ON invoices(invoice_number);
CREATE INDEX IF NOT EXISTS idx_invoices_issue_date ON invoices(issue_date DESC);
CREATE INDEX IF NOT EXISTS idx_invoices_due_date ON invoices(due_date);
CREATE INDEX IF NOT EXISTS idx_invoices_created_at ON invoices(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_invoices_is_recurring ON invoices(is_recurring);
CREATE INDEX IF NOT EXISTS idx_invoices_next_recurring_date ON invoices(next_recurring_date);

-- Invoice items table indexes
CREATE INDEX IF NOT EXISTS idx_invoice_items_invoice_id ON invoice_items(invoice_id);
CREATE INDEX IF NOT EXISTS idx_invoice_items_sort_order ON invoice_items(sort_order);

-- Trials table indexes
CREATE INDEX IF NOT EXISTS idx_user_trials_user_id ON user_trials(user_id);
CREATE INDEX IF NOT EXISTS idx_user_trials_status ON user_trials(status);
CREATE INDEX IF NOT EXISTS idx_user_trials_trial_end ON user_trials(trial_end);

-- Subscriptions table indexes
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_user_id ON user_subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_status ON user_subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_stripe_subscription_id ON user_subscriptions(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_current_period_end ON user_subscriptions(current_period_end);

-- Payments table indexes
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_invoice_id ON payments(invoice_id);
CREATE INDEX IF NOT EXISTS idx_payments_payment_date ON payments(payment_date DESC);
CREATE INDEX IF NOT EXISTS idx_payments_payment_status ON payments(payment_status);

-- ============================================================================
-- AUTOMATIC TIMESTAMP UPDATES
-- ============================================================================

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for automatic timestamp updates
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_clients_updated_at ON clients;
CREATE TRIGGER update_clients_updated_at 
    BEFORE UPDATE ON clients 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_invoices_updated_at ON invoices;
CREATE TRIGGER update_invoices_updated_at 
    BEFORE UPDATE ON invoices 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_trials_updated_at ON user_trials;
CREATE TRIGGER update_user_trials_updated_at 
    BEFORE UPDATE ON user_trials 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_subscriptions_updated_at ON user_subscriptions;
CREATE TRIGGER update_user_subscriptions_updated_at 
    BEFORE UPDATE ON user_subscriptions 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_payments_updated_at ON payments;
CREATE TRIGGER update_payments_updated_at 
    BEFORE UPDATE ON payments 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) SETUP
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_trials ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Users can insert own profile" ON users;
DROP POLICY IF EXISTS "Users can manage own clients" ON clients;
DROP POLICY IF EXISTS "Users can manage own invoices" ON invoices;
DROP POLICY IF EXISTS "Users can manage own invoice items" ON invoice_items;
DROP POLICY IF EXISTS "Users can manage own trials" ON user_trials;
DROP POLICY IF EXISTS "Users can manage own subscriptions" ON user_subscriptions;
DROP POLICY IF EXISTS "Users can manage own payments" ON payments;

-- ============================================================================
-- RLS POLICIES - SECURE DATA ACCESS
-- ============================================================================

-- Users table policies
CREATE POLICY "Users can view own profile" ON users 
    FOR SELECT USING (firebase_uid = auth.jwt() ->> 'sub');

CREATE POLICY "Users can update own profile" ON users 
    FOR UPDATE USING (firebase_uid = auth.jwt() ->> 'sub');

CREATE POLICY "Users can insert own profile" ON users 
    FOR INSERT WITH CHECK (firebase_uid = auth.jwt() ->> 'sub');

-- Clients table policies
CREATE POLICY "Users can manage own clients" ON clients 
    FOR ALL USING (
        user_id IN (SELECT id FROM users WHERE firebase_uid = auth.jwt() ->> 'sub')
    );

-- Invoices table policies
CREATE POLICY "Users can manage own invoices" ON invoices 
    FOR ALL USING (
        user_id IN (SELECT id FROM users WHERE firebase_uid = auth.jwt() ->> 'sub')
    );

-- Invoice items table policies
CREATE POLICY "Users can manage own invoice items" ON invoice_items 
    FOR ALL USING (
        invoice_id IN (
            SELECT id FROM invoices 
            WHERE user_id IN (
                SELECT id FROM users WHERE firebase_uid = auth.jwt() ->> 'sub'
            )
        )
    );

-- User trials table policies
CREATE POLICY "Users can manage own trials" ON user_trials 
    FOR ALL USING (
        user_id IN (SELECT id FROM users WHERE firebase_uid = auth.jwt() ->> 'sub')
    );

-- User subscriptions table policies
CREATE POLICY "Users can manage own subscriptions" ON user_subscriptions 
    FOR ALL USING (
        user_id IN (SELECT id FROM users WHERE firebase_uid = auth.jwt() ->> 'sub')
    );

-- Payments table policies
CREATE POLICY "Users can manage own payments" ON payments 
    FOR ALL USING (
        user_id IN (SELECT id FROM users WHERE firebase_uid = auth.jwt() ->> 'sub')
    );

-- ============================================================================
-- UTILITY FUNCTIONS
-- ============================================================================

-- Function to get user plan status and trial information
CREATE OR REPLACE FUNCTION get_user_plan_status(p_firebase_uid TEXT)
RETURNS TABLE (
    user_id UUID,
    plan TEXT,
    status TEXT,
    is_trial BOOLEAN,
    days_remaining INTEGER,
    subscription_status TEXT,
    trial_end_date TIMESTAMP WITH TIME ZONE,
    subscription_end_date TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    -- Get user information
    RETURN QUERY
    SELECT 
        u.id as user_id,
        u.plan,
        CASE 
            WHEN us.status IS NOT NULL THEN us.status
            WHEN ut.status IS NOT NULL THEN ut.status
            ELSE 'expired'
        END as status,
        CASE 
            WHEN ut.id IS NOT NULL AND ut.status = 'active' AND ut.trial_end > NOW() THEN true
            ELSE false
        END as is_trial,
        CASE 
            WHEN ut.id IS NOT NULL AND ut.status = 'active' AND ut.trial_end > NOW() THEN 
                EXTRACT(DAY FROM ut.trial_end - NOW())::INTEGER
            WHEN us.id IS NOT NULL AND us.status = 'active' THEN 
                EXTRACT(DAY FROM us.current_period_end - NOW())::INTEGER
            ELSE 0
        END as days_remaining,
        COALESCE(us.status, 'none') as subscription_status,
        ut.trial_end as trial_end_date,
        us.current_period_end as subscription_end_date
    FROM users u
    LEFT JOIN user_trials ut ON u.id = ut.user_id AND ut.status = 'active'
    LEFT JOIN user_subscriptions us ON u.id = us.user_id AND us.status IN ('active', 'trialing')
    WHERE u.firebase_uid = p_firebase_uid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to expire trials automatically
CREATE OR REPLACE FUNCTION expire_trials()
RETURNS INTEGER AS $$
DECLARE
    updated_count INTEGER;
BEGIN
    UPDATE user_trials 
    SET 
        status = 'expired',
        updated_at = NOW()
    WHERE 
        status = 'active' 
        AND trial_end <= NOW();
    
    GET DIAGNOSTICS updated_count = ROW_COUNT;
    RETURN updated_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to calculate invoice totals automatically
CREATE OR REPLACE FUNCTION calculate_invoice_totals(p_invoice_id UUID)
RETURNS VOID AS $$
DECLARE
    v_subtotal DECIMAL(12,2);
    v_tax_amount DECIMAL(12,2);
    v_discount_amount DECIMAL(12,2);
    v_total DECIMAL(12,2);
    v_invoice_record RECORD;
BEGIN
    -- Get invoice details
    SELECT * INTO v_invoice_record FROM invoices WHERE id = p_invoice_id;
    
    -- Calculate subtotal from line items
    SELECT COALESCE(SUM(line_total), 0) INTO v_subtotal
    FROM invoice_items 
    WHERE invoice_id = p_invoice_id;
    
    -- Calculate discount
    IF v_invoice_record.discount_type = 'percentage' THEN
        v_discount_amount := v_subtotal * (v_invoice_record.discount_value / 100);
    ELSE
        v_discount_amount := v_invoice_record.discount_value;
    END IF;
    
    -- Calculate tax on discounted amount
    v_tax_amount := (v_subtotal - v_discount_amount) * (v_invoice_record.tax_rate / 100);
    
    -- Calculate total
    v_total := v_subtotal - v_discount_amount + v_tax_amount + COALESCE(v_invoice_record.shipping_amount, 0);
    
    -- Update invoice
    UPDATE invoices 
    SET 
        subtotal = v_subtotal,
        discount_amount = v_discount_amount,
        tax_amount = v_tax_amount,
        total_amount = v_total,
        amount_due = v_total - COALESCE(amount_paid, 0),
        updated_at = NOW()
    WHERE id = p_invoice_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- SAMPLE DATA (OPTIONAL - UNCOMMENT TO USE)
-- ============================================================================

/*
-- Insert sample user (replace 'your_firebase_uid' with actual Firebase UID)
INSERT INTO users (
    firebase_uid, 
    email, 
    full_name, 
    company_name,
    company_email,
    company_phone,
    company_address,
    company_city,
    company_state,
    company_zip
) VALUES (
    'your_firebase_uid_here', 
    'demo@billcraft.com', 
    'Demo User', 
    'BillCraft Demo Company',
    'billing@billcraft.com',
    '+1 (555) 123-4567',
    '123 Business Ave',
    'San Francisco',
    'CA',
    '94105'
) ON CONFLICT (firebase_uid) DO NOTHING;

-- Insert sample client
INSERT INTO clients (
    user_id, 
    name, 
    email, 
    company_name,
    address_line_1, 
    city,
    state,
    zip_code
) VALUES (
    (SELECT id FROM users WHERE firebase_uid = 'your_firebase_uid_here'), 
    'John Smith', 
    'john@acmecorp.com', 
    'Acme Corporation',
    '456 Client Street', 
    'New York',
    'NY',
    '10001'
) ON CONFLICT DO NOTHING;
*/

-- ============================================================================
-- COMPLETION MESSAGE
-- ============================================================================

SELECT 
    '🎉 BillCraft Production Database Schema Created Successfully!' as message,
    '✅ All tables, indexes, and security policies are now configured.' as status,
    '📊 Ready for production use with full invoice management capabilities.' as note;

-- End of BillCraft Production Schema
