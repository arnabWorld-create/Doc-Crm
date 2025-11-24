-- ============================================================================
-- Faith Clinic CRM - Complete Migration for Supabase
-- ============================================================================
-- This includes both database indexes and new BP/RBS fields
-- All table names are lowercase as they appear in Supabase

-- ============================================================================
-- PART 1: Database Indexes (for performance)
-- ============================================================================

-- Patient table indexes
CREATE INDEX IF NOT EXISTS idx_patient_name ON patients(name);
CREATE INDEX IF NOT EXISTS idx_patient_contact ON patients(contact);
CREATE INDEX IF NOT EXISTS idx_patient_created_at ON patients("createdAt");
CREATE INDEX IF NOT EXISTS idx_patient_gender ON patients(gender);

-- Visit table indexes
CREATE INDEX IF NOT EXISTS idx_visit_patient_id ON visits("patientId");
CREATE INDEX IF NOT EXISTS idx_visit_date ON visits("visitDate");
CREATE INDEX IF NOT EXISTS idx_visit_follow_up_date ON visits("followUpDate");
CREATE INDEX IF NOT EXISTS idx_visit_patient_date ON visits("patientId", "visitDate" DESC);

-- Appointment table indexes
CREATE INDEX IF NOT EXISTS idx_appointment_patient_id ON appointments("patientId");
CREATE INDEX IF NOT EXISTS idx_appointment_date ON appointments("appointmentDate");
CREATE INDEX IF NOT EXISTS idx_appointment_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointment_date_status ON appointments("appointmentDate", status);

-- User table indexes
CREATE INDEX IF NOT EXISTS idx_user_email ON users(email);

-- ============================================================================
-- PART 2: Add BP and RBS fields to visits table
-- ============================================================================

-- Add bpSystolic column (Systolic Blood Pressure in mmHg)
ALTER TABLE visits ADD COLUMN IF NOT EXISTS "bpSystolic" INTEGER;

-- Add bpDiastolic column (Diastolic Blood Pressure in mmHg)
ALTER TABLE visits ADD COLUMN IF NOT EXISTS "bpDiastolic" INTEGER;

-- Add rbs column (Random Blood Sugar in mg/dl)
ALTER TABLE visits ADD COLUMN IF NOT EXISTS "rbs" INTEGER;

-- ============================================================================
-- PART 3: Add comments for clarity (optional but helpful)
-- ============================================================================

COMMENT ON COLUMN visits."bpSystolic" IS 'Systolic Blood Pressure in mmHg';
COMMENT ON COLUMN visits."bpDiastolic" IS 'Diastolic Blood Pressure in mmHg';
COMMENT ON COLUMN visits."rbs" IS 'Random Blood Sugar in mg/dl';

-- ============================================================================
-- VERIFICATION QUERIES (run these separately to verify)
-- ============================================================================

-- Check if indexes were created:
-- SELECT indexname FROM pg_indexes 
-- WHERE tablename IN ('patients', 'visits', 'appointments', 'users')
-- AND indexname LIKE 'idx_%'
-- ORDER BY tablename, indexname;

-- Check if new columns were added:
-- SELECT column_name, data_type, is_nullable
-- FROM information_schema.columns
-- WHERE table_name = 'visits'
-- AND column_name IN ('bpSystolic', 'bpDiastolic', 'rbs')
-- ORDER BY column_name;
