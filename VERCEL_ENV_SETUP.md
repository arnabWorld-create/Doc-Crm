# Vercel Environment Variables Setup

## Required Environment Variables for Vercel

Add these environment variables in your Vercel project settings:

### 1. Go to Vercel Dashboard
- Visit: https://vercel.com/dashboard
- Select your project: `Doc-Crm`
- Go to: Settings → Environment Variables

### 2. Add These Variables

#### Database Connection
```
DATABASE_URL
```
Value:
```
postgresql://postgres:faith229944xx@db.dqndqxvoqwkrzabsfxnf.supabase.co:5432/postgres
```

#### Supabase Configuration
```
NEXT_PUBLIC_SUPABASE_URL
```
Value:
```
https://dqndqxvoqwkrzabsfxnf.supabase.co
```

```
NEXT_PUBLIC_SUPABASE_ANON_KEY
```
Value:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxbmRxeHZvcXdrcnphYnNmeG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwNDAyMTMsImV4cCI6MjA3ODYxNjIxM30.m8BX2IYs2h74si_pR8Z7VBIakJB-l2d_YzhTRO6sZiM
```

```
NEXT_PUBLIC_SUPABASE_BUCKET
```
Value:
```
patient-reports
```

#### Authentication (IMPORTANT!)
```
JWT_SECRET
```
Value (generate a strong random string):
```
your-super-secret-jwt-key-change-this-in-production-12345
```
**⚠️ IMPORTANT:** For production, generate a strong random secret using:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. Apply to All Environments
Make sure to select:
- ✅ Production
- ✅ Preview
- ✅ Development

### 4. Redeploy
After adding all environment variables, trigger a new deployment:
- Go to Deployments tab
- Click on the three dots (•••) on the latest deployment
- Click "Redeploy"

## Login Credentials (After Deployment)

Once deployed, you need to seed the database with a user. Run this command locally:

```bash
npx prisma db seed
```

This creates a default user:
- **Email:** doctor@faithclinic.com
- **Password:** password123

## Troubleshooting

### If login fails on Vercel:
1. Check that JWT_SECRET is set in Vercel environment variables
2. Make sure the database is seeded with at least one user
3. Check Vercel function logs for errors

### To check Vercel logs:
1. Go to your project in Vercel
2. Click on "Deployments"
3. Click on the latest deployment
4. Click on "Functions" tab
5. Look for errors in the logs
