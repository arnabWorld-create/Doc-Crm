# Deployment Guide

## Environment Variables Setup

### ⚠️ Important: `.env.local` vs Production

- **`.env.local`** - Local development only (NOT deployed, in `.gitignore`)
- **`.env.example`** - Template showing required variables
- **Production** - Set variables in hosting platform (Vercel, Railway, etc.)

## Vercel Deployment (Recommended)

### Step 1: Prepare Your Code

1. Make sure `.env.local` is in `.gitignore` (it already is)
2. Push your code to GitHub/GitLab/Bitbucket
3. Don't commit sensitive keys!

### Step 2: Set Up Database

**Option A: Use Supabase (Recommended)**
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Get your database URL from Settings → Database
4. Format: `postgresql://postgres:[password]@[host]:5432/postgres`

**Option B: Use Vercel Postgres**
1. In Vercel dashboard, go to Storage
2. Create Postgres database
3. Copy the `DATABASE_URL`

### Step 3: Deploy to Vercel

1. **Go to [vercel.com](https://vercel.com)**
2. **Click "New Project"**
3. **Import your Git repository**
4. **Configure Project:**
   - Framework Preset: Next.js
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

5. **Add Environment Variables:**

   Click "Environment Variables" and add:

   ```
   DATABASE_URL
   postgresql://user:password@host:port/database

   NEXT_PUBLIC_SUPABASE_URL
   https://your-project.supabase.co

   NEXT_PUBLIC_SUPABASE_ANON_KEY
   your-anon-key-here

   NEXT_PUBLIC_SUPABASE_BUCKET
   patient-reports

   JWT_SECRET
   generate-a-strong-random-secret-here
   ```

   **Generate JWT_SECRET:**
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

6. **Deploy!**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live!

### Step 4: Run Database Migrations

After first deployment:

1. Go to Vercel dashboard → Your Project → Settings → General
2. Copy your project URL
3. In your terminal:
   ```bash
   # Set DATABASE_URL to your production database
   DATABASE_URL="your-production-db-url" npx prisma migrate deploy
   ```

Or use Vercel CLI:
```bash
vercel env pull .env.production
npx prisma migrate deploy
```

### Step 5: Seed Database (Optional)

```bash
DATABASE_URL="your-production-db-url" npx prisma db seed
```

## Railway Deployment

1. **Go to [railway.app](https://railway.app)**
2. **Create New Project**
3. **Add PostgreSQL database**
4. **Deploy from GitHub**
5. **Add environment variables** (same as Vercel)
6. **Deploy!**

## Render Deployment

1. **Go to [render.com](https://render.com)**
2. **Create New Web Service**
3. **Connect your repository**
4. **Configure:**
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
5. **Add environment variables**
6. **Create PostgreSQL database** (in Render)
7. **Deploy!**

## Environment Variables Reference

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `JWT_SECRET` | Secret key for JWT tokens | `random-32-char-string` |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | `https://xxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | `eyJhbGc...` |
| `NEXT_PUBLIC_SUPABASE_BUCKET` | Storage bucket name | `patient-reports` |

### Optional Variables

| Variable | Description |
|----------|-------------|
| `GEMINI_API_KEY` | Google Gemini API key (if using AI) |
| `NODE_ENV` | Set to `production` (auto-set by most platforms) |

## Post-Deployment Checklist

- [ ] All environment variables set correctly
- [ ] Database migrations run successfully
- [ ] Can login with default credentials
- [ ] Can create new patient
- [ ] Can upload files (Supabase storage working)
- [ ] Prescriptions print correctly
- [ ] All pages load without errors
- [ ] HTTPS is enabled (automatic on Vercel)
- [ ] Custom domain configured (optional)

## Troubleshooting

### Build Fails

**Error: "Cannot find module 'prisma'"**
- Solution: Make sure `prisma` is in `devDependencies` in `package.json`

**Error: "Environment variable not found"**
- Solution: Check all required variables are set in hosting platform

### Database Connection Fails

**Error: "Can't reach database server"**
- Check `DATABASE_URL` is correct
- Ensure database allows connections from Vercel IPs
- For Supabase: Enable "Direct Connection" in settings

### File Upload Fails

**Error: "Storage bucket not found"**
- Check Supabase bucket exists
- Verify `NEXT_PUBLIC_SUPABASE_BUCKET` matches bucket name
- Ensure bucket is public or has correct policies

### Login Not Working

**Error: "Invalid token"**
- Check `JWT_SECRET` is set
- Clear browser cookies
- Try registering a new account

## Security Checklist for Production

- [ ] Strong `JWT_SECRET` (32+ random characters)
- [ ] Database password is strong
- [ ] Supabase RLS (Row Level Security) enabled
- [ ] HTTPS enabled (automatic on Vercel)
- [ ] Environment variables not exposed in client code
- [ ] `.env.local` in `.gitignore`
- [ ] No sensitive data in Git history

## Monitoring & Maintenance

### Vercel Analytics
- Enable in Vercel dashboard
- Monitor page views, performance

### Database Backups
- Supabase: Automatic daily backups
- Vercel Postgres: Configure backup schedule

### Error Tracking
Consider adding:
- Sentry for error tracking
- LogRocket for session replay

## Updating Production

1. **Push changes to Git**
   ```bash
   git add .
   git commit -m "Update feature"
   git push
   ```

2. **Vercel auto-deploys** from main branch

3. **Run migrations if schema changed:**
   ```bash
   DATABASE_URL="prod-url" npx prisma migrate deploy
   ```

## Custom Domain Setup

1. **In Vercel Dashboard:**
   - Go to Project Settings → Domains
   - Add your domain (e.g., `clinic.yourdomain.com`)

2. **In Your DNS Provider:**
   - Add CNAME record pointing to Vercel
   - Wait for DNS propagation (5-30 minutes)

3. **SSL Certificate:**
   - Automatically provisioned by Vercel
   - HTTPS enabled automatically

## Support

For deployment issues:
- Vercel: [vercel.com/docs](https://vercel.com/docs)
- Supabase: [supabase.com/docs](https://supabase.com/docs)
- Next.js: [nextjs.org/docs](https://nextjs.org/docs)

---

**Your Faith Clinic app is ready for production! 🚀**
