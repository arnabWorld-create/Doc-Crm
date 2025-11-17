# Fix Vercel Database Connection - Use Supabase Pooler

## Problem
Vercel serverless functions cannot connect to Supabase using direct PostgreSQL connection (port 5432).

## Solution
Use Supabase Connection Pooler (port 6543) which is designed for serverless environments.

## Steps to Fix

### 1. Get Connection Pooler URL from Supabase

1. Go to: https://supabase.com/dashboard
2. Select your project: `dqndqxvoqwkrzabsfxnf`
3. Navigate to: **Settings** → **Database**
4. Scroll down to **Connection Pooling** section
5. Look for **Connection string** (Transaction mode or Session mode)
6. Copy the entire connection string

It should look something like:
```
postgresql://postgres.dqndqxvoqwkrzabsfxnf:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
```

### 2. Update DATABASE_URL in Vercel

1. Go to Vercel Dashboard: https://vercel.com/dashboard
2. Select your project: `Doc-Crm`
3. Go to: **Settings** → **Environment Variables**
4. Find `DATABASE_URL`
5. Click the three dots (•••) → **Edit**
6. Replace the value with the pooler connection string from Supabase
7. Make sure it's applied to all environments (Production, Preview, Development)
8. Click **Save**

### 3. Important: Add Connection Pooling Parameters

Your DATABASE_URL should include these parameters:

**For Prisma with PgBouncer (Transaction mode):**
```
postgresql://postgres.dqndqxvoqwkrzabsfxnf:faith229944xx@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1
```

**Key parameters:**
- `pgbouncer=true` - Tells Prisma to use PgBouncer mode
- `connection_limit=1` - Limits connections per serverless function

### 4. Update Prisma Schema (if needed)

Check your `prisma/schema.prisma` file. It should have:

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

If you see `directUrl`, you need TWO environment variables:
- `DATABASE_URL` - Pooler connection (for Vercel)
- `DIRECT_URL` - Direct connection (for migrations)

### 5. Add DIRECT_URL (Optional but Recommended)

In Vercel, add another environment variable:

**Name:** `DIRECT_URL`
**Value:** 
```
postgresql://postgres:faith229944xx@db.dqndqxvoqwkrzabsfxnf.supabase.co:5432/postgres
```

This is used for database migrations and schema changes.

### 6. Redeploy

After updating the environment variables:
1. Go to **Deployments** tab
2. Click on latest deployment
3. Click three dots (•••) → **Redeploy**

OR push a new commit to trigger deployment.

## Quick Reference

### Current (Not Working) - Direct Connection
```
postgresql://postgres:faith229944xx@db.dqndqxvoqwkrzabsfxnf.supabase.co:5432/postgres
```
❌ Port 5432 - Direct connection - Doesn't work with Vercel

### New (Working) - Pooler Connection
```
postgresql://postgres.dqndqxvoqwkrzabsfxnf:faith229944xx@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true
```
✅ Port 6543 - Connection pooler - Works with Vercel

## After Fixing

1. Visit: `https://your-app.vercel.app/api/health`
2. You should see: `"database": "connected"`
3. Then you can register/login successfully

## Troubleshooting

### If you still get connection errors:

1. **Check Supabase Database is Running**
   - Go to Supabase Dashboard
   - Check if project is paused (free tier pauses after inactivity)
   - Click "Resume" if paused

2. **Verify Password**
   - Make sure the password in the connection string is correct
   - No special characters that need URL encoding

3. **Check Region**
   - The pooler URL must match your Supabase project region
   - Common regions: `ap-southeast-1`, `us-east-1`, `eu-west-1`

4. **Test Locally First**
   - Update your `.env.local` with the pooler URL
   - Run `npm run dev`
   - Try to login locally
   - If it works locally, it should work on Vercel
