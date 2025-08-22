-- ============================================================================
-- BILLCRAFT DATABASE MIGRATION: Add missing usage_stats column
-- ============================================================================
-- 
-- This migration adds the missing 'usage_stats' column to the user_trials table
-- to fix the error: "Could not find the 'usage_stats' column of 'user_trials'"
--
-- SAFE TO RUN: This migration is idempotent and can be run multiple times
-- ============================================================================

-- Add the missing usage_stats column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'user_trials' 
        AND column_name = 'usage_stats'
    ) THEN
        ALTER TABLE user_trials 
        ADD COLUMN usage_stats JSONB DEFAULT '{}';
        
        RAISE NOTICE 'Added usage_stats column to user_trials table';
    ELSE
        RAISE NOTICE 'usage_stats column already exists in user_trials table';
    END IF;
END $$;

-- Update existing records to have proper usage_stats structure
UPDATE user_trials 
SET usage_stats = jsonb_build_object(
    'invoicesCreated', COALESCE(invoices_created, 0),
    'customersAdded', COALESCE(clients_created, 0),
    'paymentsProcessed', 0,
    'reportsGenerated', 0,
    'lastUsageUpdate', COALESCE(last_activity_at, created_at)::text
)
WHERE usage_stats = '{}' OR usage_stats IS NULL;

-- Verify the migration
SELECT 
    'Migration completed successfully!' as status,
    COUNT(*) as total_trials,
    COUNT(CASE WHEN usage_stats != '{}' THEN 1 END) as trials_with_usage_stats
FROM user_trials;

-- Display sample of updated data
SELECT 
    id,
    user_id,
    plan_type,
    status,
    usage_stats
FROM user_trials 
LIMIT 5;
