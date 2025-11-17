# Quick Vercel Deployment Guide

## 🚀 Deploy in 5 Minutes

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Import to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Click "Deploy" (don't set variables yet)

### Step 3: Set Environment Variables

After first deployment, go to:
**Project Settings → Environment Variables**

Add these 5 variables:

```
DATABASE_URL
postgresql://postgres:[YOUR_PASSWORD]@[YOUR_HOST]:5432/postgres

NEXT_PUBLIC_SUPABASE_URL
https://[YOUR_PROJECT].supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY
[YOUR_ANON_KEY]

NEXT_PUBLIC_SUPABASE_BUCKET
patient-reports

JWT_SECRET
[GENERATE_RANDOM_32_CHAR_STRING]
```

**Generate JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 4: Redeploy

After adding variables:
1. Go to "Deployments" tab
2. Click "..." on latest deployment
3. Click "Redeploy"

### Step 5: Run Database Migrations

In your terminal:
```bash
# Use your production DATABASE_URL
DATABASE_URL="your-production-url" npx prisma migrate deploy
```

### Step 6: Seed Database (Optional)

```bash
DATABASE_URL="your-production-url" npx prisma db seed
```

## ✅ Done!

Your app is live at: `https://your-project.vercel.app`

### Default Login:
- Email: `doctor@faithclinic.com`
- Password: `password123`

## 🔧 Troubleshooting

**Build fails?**
- Check all 5 environment variables are set
- Make sure DATABASE_URL is correct

**Can't login?**
- Run database migrations (Step 5)
- Seed the database (Step 6)

**File upload fails?**
- Check Supabase bucket exists
- Verify bucket name matches `NEXT_PUBLIC_SUPABASE_BUCKET`

## 📝 Important Notes

- `.env.local` is NOT deployed (it's in `.gitignore`)
- Set all variables in Vercel dashboard
- Never commit sensitive keys to Git
- Use strong JWT_SECRET in production

---

**Need help?** Check `DEPLOYMENT.md` for detailed guide.
