# Frontend Pagination Guide

## Overview
The API routes now return paginated responses. Frontend components need to be updated to handle the new response format.

## New API Response Format

### **Before (Old Format):**
```json
[
  { id: 1, name: "John", ... },
  { id: 2, name: "Jane", ... }
]
```

### **After (New Format):**
```json
{
  "data": [
    { id: 1, name: "John", ... },
    { id: 2, name: "Jane", ... }
  ],
  "pagination": {
    "total": 150,
    "page": 1,
    "limit": 50,
    "pages": 3
  }
}
```

---

## Components That Need Updates

### **1. PatientTable Component**
**File:** `components/PatientTable.tsx`

**Current Issue:** Expects array, now gets object with `data` property

**Fix:**
```typescript
// OLD
const patients = await fetch('/api/patients').then(r => r.json());

// NEW
const response = await fetch('/api/patients?page=1&limit=50').then(r => r.json());
const patients = response.data;
const pagination = response.pagination;
```

---

### **2. Appointments Component**
**File:** `app/appointments/page.tsx`

**Current Issue:** Expects array, now gets object with `data` property

**Fix:**
```typescript
// OLD
const appointments = await fetch('/api/appointments').then(r => r.json());

// NEW
const response = await fetch('/api/appointments?page=1&limit=50').then(r => r.json());
const appointments = response.data;
const pagination = response.pagination;
```

---

### **3. QuickPatientSearch Component**
**File:** `components/QuickPatientSearch.tsx`

**Current Issue:** Search results now paginated

**Fix:**
```typescript
// OLD
const results = await fetch(`/api/patients/search?q=${query}`).then(r => r.json());

// NEW
const response = await fetch(`/api/patients?search=${query}&page=1&limit=50`).then(r => r.json());
const results = response.data;
```

---

## API Query Parameters

### **Patient API**
```
GET /api/patients?page=1&limit=50&search=john
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | number | 1 | Page number (1-indexed) |
| `limit` | number | 50 | Items per page (max 100) |
| `search` | string | - | Search by name, contact, or patient ID |

### **Appointments API**
```
GET /api/appointments?page=1&limit=50&date=2024-01-15&status=Scheduled
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | number | 1 | Page number (1-indexed) |
| `limit` | number | 50 | Items per page (max 100) |
| `date` | string | - | Filter by specific date (YYYY-MM-DD) |
| `startDate` | string | - | Filter by date range start |
| `endDate` | string | - | Filter by date range end |
| `status` | string | - | Filter by status |
| `patientId` | string | - | Filter by patient ID |

---

## Pagination Component Usage

### **Example: Implementing Pagination**

```typescript
'use client';

import { useState, useEffect } from 'react';
import { Pagination } from '@/components/Pagination';

export default function PatientList() {
  const [patients, setPatients] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchPatients = async () => {
      const response = await fetch(`/api/patients?page=${page}&limit=50`);
      const data = await response.json();
      setPatients(data.data);
      setPagination(data.pagination);
    };
    
    fetchPatients();
  }, [page]);

  return (
    <div>
      {/* Patient list */}
      {patients.map(patient => (
        <div key={patient.id}>{patient.name}</div>
      ))}
      
      {/* Pagination */}
      {pagination && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.pages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
```

---

## Migration Checklist

- [ ] Update PatientTable to handle new response format
- [ ] Update Appointments page to handle new response format
- [ ] Update QuickPatientSearch to handle new response format
- [ ] Update any other components fetching from these APIs
- [ ] Test pagination works correctly
- [ ] Test search with pagination
- [ ] Test date filters with pagination
- [ ] Verify no console errors

---

## Backward Compatibility

**Note:** The old API format is no longer supported. All components must be updated to use the new paginated format.

If you have custom code fetching from these APIs, update it to:
1. Extract `data` from response
2. Use `pagination` metadata for pagination UI
3. Pass `page` and `limit` parameters

---

## Performance Tips

1. **Use reasonable page sizes:** 50-100 items per page
2. **Implement lazy loading:** Load next page when user scrolls
3. **Cache results:** Store fetched pages in state
4. **Debounce search:** Wait 300ms before fetching search results
5. **Show loading state:** Display skeleton while fetching

---

## Troubleshooting

### **Issue: "Cannot read property 'map' of undefined"**
**Solution:** Response format changed. Use `response.data` instead of `response`

### **Issue: Pagination not showing**
**Solution:** Check that `response.pagination` exists and has correct values

### **Issue: Search not working**
**Solution:** Use `search` parameter instead of `q`. Example: `/api/patients?search=john`

### **Issue: Date filters not working**
**Solution:** Use `date` or `startDate`/`endDate` parameters. Format: YYYY-MM-DD

---

## Questions?

Refer to the API response examples above or check the implementation in:
- `app/api/patients/route.ts`
- `app/api/appointments/route.ts`

