# Fix PgBouncer Error on Vercel

## The Error
```
prepared statement "s0" already exists
ConnectorError: QueryError(PostgresError { code: "42P05" })
```

This happens because Prisma tries to use prepared statements with PgBouncer in transaction mode.

## Solution: Add Two Environment Variables in Vercel

### 1. DATABASE_URL (Connection Pooler - for queries)

Go to Supabase Dashboard and get your **Connection Pooling** URL:
1. https://supabase.com/dashboard
2. Select project: `dqndqxvoqwkrzabsfxnf`
3. Settings → Database
4. Scroll to **Connection Pooling** section
5. Copy the **Transaction** mode connection string

It should look like:
```
postgresql://postgres.dqndqxvoqwkrzabsfxnf:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true
```

**In Vercel:**
- Name: `DATABASE_URL`
- Value: `postgresql://postgres.dqndqxvoqwkrzabsfxnf:faith229944xx@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true`
- ⚠️ **IMPORTANT:** Replace `[REGION]` with your actual region from Supabase
- Apply to: Production, Preview, Development

### 2. DIRECT_URL (Direct Connection - for migrations)

This is your original direct database connection:

**In Vercel:**
- Name: `DIRECT_URL`
- Value: `postgresql://postgres:faith229944xx@db.dqndqxvoqwkrzabsfxnf.supabase.co:5432/postgres`
- Apply to: Production, Preview, Development

## Key Differences

| Variable | Port | Purpose | When Used |
|----------|------|---------|-----------|
| DATABASE_URL | 6543 | Pooler connection | Runtime queries (Vercel functions) |
| DIRECT_URL | 5432 | Direct connection | Database migrations, schema changes |

## Steps to Fix

### 1. Update Vercel Environment Variables

Add both variables as shown above.

### 2. Find Your Correct Pooler URL

If you don't know your region, check Supabase:
1. Go to Supabase Dashboard
2. Settings → Database
3. Look for "Connection Pooling"
4. Copy the **Transaction mode** connection string
5. Make sure it ends with `?pgbouncer=true`

Common regions:
- `aws-0-ap-southeast-1` (Singapore)
- `aws-0-us-east-1` (US East)
- `aws-0-eu-west-1` (Europe)

### 3. Redeploy

After adding both environment variables:
1. Go to Deployments tab in Vercel
2. Click latest deployment → three dots → Redeploy

## Verify It Works

After redeployment, visit:
```
https://your-app.vercel.app/api/health
```

You should see:
```json
{
  "status": "ok",
  "database": "connected",
  "userCount": 1
}
```

Then try logging in or registering!

## Troubleshooting

### Still getting "prepared statement" error?

Make sure `?pgbouncer=true` is at the end of DATABASE_URL in Vercel.

### Can't find pooler URL in Supabase?

1. Make sure you're looking at **Connection Pooling** section (not Connection String)
2. Use **Transaction** mode (not Session mode)
3. The URL should have `pooler.supabase.com` in it

### Database still disconnected?

1. Check if your Supabase project is paused (free tier)
2. Verify the password is correct
3. Make sure there are no extra quotes around the URLs in Vercel
