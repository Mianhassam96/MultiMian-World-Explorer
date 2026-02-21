# 🚀 Deployment Guide

## ✅ Quick Deploy with Vercel (Recommended - 2 Minutes)

Vercel is the easiest and fastest way to deploy your Next.js app:

### Steps:
1. Go to **https://vercel.com**
2. Click **"Sign Up"** or **"Log In"** with GitHub
3. Click **"Add New Project"**
4. Select **"MultiMian-World-Explorer"** repository
5. Click **"Deploy"**
6. Wait 2 minutes ⏱️
7. **Done!** Your site is live 🎉

**Your URL will be**: `https://multimian-world-explorer.vercel.app`

---

## 🔧 GitHub Pages Setup

If you prefer GitHub Pages:

### Step 1: Enable GitHub Pages
1. Go to: https://github.com/Mianhassam96/MultiMian-World-Explorer/settings/pages
2. Under **"Build and deployment"**:
   - **Source**: Select **"GitHub Actions"**
3. Click **"Save"**

### Step 2: Wait for Deployment
1. Go to: https://github.com/Mianhassam96/MultiMian-World-Explorer/actions
2. Wait for the workflow to complete (green checkmark ✅)
3. Takes about 3-5 minutes

### Step 3: Access Your Site
**URL**: https://mianhassam96.github.io/MultiMian-World-Explorer/

---

## 🐛 If Deployment Fails

### Check the Actions Tab
1. Go to: https://github.com/Mianhassam96/MultiMian-World-Explorer/actions
2. Click on the failed workflow
3. Read the error logs

### Common Issues:

**Issue 1: Build Fails**
- Run `npm install` locally
- Run `npm run build` locally
- Fix any errors shown
- Commit and push

**Issue 2: Pages Not Enabled**
- Go to Settings > Pages
- Make sure Source is set to "GitHub Actions"

**Issue 3: 404 Error**
- Wait 5-10 minutes after first deployment
- Clear browser cache
- Try incognito mode

---

## 💻 Run Locally

To test before deploying:

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
http://localhost:3000

# Build for production
npm run build
```

---

## 🎯 Recommendation

**Use Vercel** because it's:
- ✅ Faster (2 min vs 5-10 min)
- ✅ Easier (one-click deploy)
- ✅ More reliable
- ✅ Better performance (global CDN)
- ✅ Automatic deployments on push
- ✅ Free for personal projects

---

## 📝 After Deployment

Once deployed, test these features:
- [ ] Home page loads
- [ ] Search works
- [ ] Country cards are clickable
- [ ] Country details page loads
- [ ] Compare page works
- [ ] Favorites page works
- [ ] Map page works
- [ ] Statistics page works
- [ ] Theme toggle works
- [ ] Mobile responsive

---

**Need Help?**
- Check Actions tab for errors
- Read error logs carefully
- Make sure all dependencies are installed
- Try Vercel if GitHub Pages fails

**Repository**: https://github.com/Mianhassam96/MultiMian-World-Explorer
