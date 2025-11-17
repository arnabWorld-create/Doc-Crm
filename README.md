# Faith Clinic - Patient Management System

A comprehensive clinic management system built with Next.js, TypeScript, and PostgreSQL.

## Features

✅ **Patient Management**
- Complete patient records with demographics
- Visit history tracking
- Medical records management
- Report uploads (Supabase storage)

✅ **Appointment System**
- Schedule and manage appointments
- Calendar view
- Walk-in patient support
- Appointment status tracking

✅ **Visit Management**
- Record vitals (temperature, BP, pulse, SpO2)
- Chief complaints and diagnosis
- Treatment and medicine prescriptions
- Follow-up scheduling

✅ **Prescription Printing**
- Professional prescription format
- Clinic branding and logo
- Medicine details with dosage
- Print-ready layout

✅ **Analytics Dashboard**
- Patient statistics
- Visit trends
- Revenue tracking
- Monthly reports

✅ **Authentication & Security**
- Secure login/register
- JWT token authentication
- Password hashing (bcrypt)
- API route protection

✅ **Clinic Settings**
- Clinic profile management
- Doctor information
- Working hours
- Logo upload

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL (Supabase)
- **ORM:** Prisma
- **Styling:** Tailwind CSS
- **Authentication:** JWT + HTTP-only cookies
- **Storage:** Supabase Storage
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database (or Supabase account)

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd doctor-crm
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env.local` file:
```env
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_SUPABASE_URL="https://..."
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
NEXT_PUBLIC_SUPABASE_BUCKET="patient-reports"
JWT_SECRET="your-secret-key"
```

4. Run database migrations
```bash
npx prisma migrate dev
```

5. Seed the database (optional)
```bash
npx prisma db seed
```

6. Start the development server
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000)

## Default Login

**Email:** `doctor@faithclinic.com`  
**Password:** `password123`

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── patients/          # Patient management
│   ├── appointments/      # Appointment system
│   ├── calendar/          # Calendar view
│   ├── analytics/         # Analytics dashboard
│   └── settings/          # Settings pages
├── components/            # React components
├── lib/                   # Utility functions
│   ├── auth.ts           # Authentication utilities
│   ├── prisma.ts         # Prisma client
│   └── medicalData.ts    # Medical data constants
├── prisma/               # Database schema and migrations
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Seed data
└── middleware.ts         # Next.js middleware

```

## Database Schema

- **User** - Authentication and user management
- **Patient** - Patient demographics and information
- **Visit** - Medical visits and consultations
- **Appointment** - Appointment scheduling
- **ClinicProfile** - Clinic settings and information
- **CustomMedicine** - Custom medicine database

## API Routes

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Patients
- `GET /api/patients` - List all patients
- `POST /api/patients` - Create patient
- `GET /api/patients/[id]` - Get patient details
- `PUT /api/patients/[id]` - Update patient
- `DELETE /api/patients/[id]` - Delete patient

### Visits
- `GET /api/patients/[id]/visits` - List patient visits
- `POST /api/patients/[id]/visits` - Create visit
- `PUT /api/patients/[id]/visits/[visitId]` - Update visit
- `DELETE /api/patients/[id]/visits/[visitId]` - Delete visit

### Appointments
- `GET /api/appointments` - List appointments
- `POST /api/appointments` - Create appointment
- `PUT /api/appointments/[id]` - Update appointment
- `DELETE /api/appointments/[id]` - Delete appointment

## Security

- ✅ Passwords hashed with bcrypt
- ✅ JWT tokens with HTTP-only cookies
- ✅ API route protection
- ✅ CSRF protection (SameSite cookies)
- ✅ XSS prevention (HTTP-only cookies)

## Production Deployment

### Vercel Deployment (Recommended)

1. **Push your code to GitHub/GitLab/Bitbucket**

2. **Import project to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository

3. **Set Environment Variables in Vercel**
   - Go to Project Settings → Environment Variables
   - Add these variables:

   ```
   DATABASE_URL=postgresql://user:password@host:port/database
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   NEXT_PUBLIC_SUPABASE_BUCKET=patient-reports
   JWT_SECRET=your-super-secret-jwt-key-change-this
   ```

4. **Deploy**
   - Vercel will automatically build and deploy
   - Your app will be live at `your-project.vercel.app`

### Important: Environment Variables

- `.env.local` is for local development only (not deployed)
- `.env.example` shows what variables are needed
- Set all variables in Vercel dashboard for production
- Never commit `.env.local` to Git (it's in `.gitignore`)

### Manual Deployment

1. Set environment variables on your server
2. Run database migrations:
   ```bash
   npx prisma migrate deploy
   ```
3. Build and start:
   ```bash
   npm run build
   npm start
   ```

## License

Private - All rights reserved

## Support

For support, contact your development team.
