# Visit History System - Migration Plan

## Database Changes

### New Structure:
1. **Patient Table** - Basic info only (name, age, gender, contact, patient ID)
2. **Visit Table** - Each consultation/visit (symptoms, treatment, medicines, dates)

### Migration Steps:
1. Create new tables
2. Migrate existing patient data to new structure
3. Convert old records to first visit
4. Generate patient IDs (FC-001, FC-002...)

## Features Being Added:
1. Patient ID system (FC-XXX)
2. Visit history timeline
3. Quick search (name, phone, ID)
4. Recent patients widget
5. Add new visit functionality

## This is a MAJOR update - backing up data recommended!
