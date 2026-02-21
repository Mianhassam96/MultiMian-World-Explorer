# Deployment Guide

## GitHub Pages Deployment

Your MultiMian World Explorer app is now configured for automatic deployment to GitHub Pages!

### Setup Steps

1. **Enable GitHub Pages** (You need to do this manually):
   - Go to your repository: https://github.com/Mianhassam96/MultiMian-World-Explorer
   - Click on **Settings** tab
   - Scroll down to **Pages** section (left sidebar)
   - Under **Source**, select **GitHub Actions**
   - Save the changes

2. **Automatic Deployment**:
   - Every push to the `main` branch will automatically trigger a deployment
   - The GitHub Actions workflow will build and deploy your app
   - Check the **Actions** tab to monitor deployment progress

3. **Access Your Live Site**:
   - Once deployed, your site will be available at:
   - **https://mianhassam96.github.io/MultiMian-World-Explorer/**

### Manual Deployment Trigger

You can also manually trigger a deployment:
1. Go to the **Actions** tab in your repository
2. Select the "Deploy Next.js to GitHub Pages" workflow
3. Click **Run workflow**
4. Select the `main` branch
5. Click **Run workflow** button

### Deployment Status

Check deployment status:
- Go to **Actions** tab: https://github.com/Mianhassam96/MultiMian-World-Explorer/actions
- You'll see the deployment workflow running
- Green checkmark = successful deployment
- Red X = deployment failed (check logs for details)

### Local Development

To run locally:
```bash
npm install
npm run dev
```

Open http://localhost:3000

### Build for Production Locally

To test the production build locally:
```bash
npm run build
npm start
```

### Troubleshooting

If deployment fails:
1. Check the Actions tab for error logs
2. Ensure all dependencies are in package.json
3. Make sure the build completes without errors locally
4. Verify GitHub Pages is enabled in repository settings

### Environment Variables

This app doesn't require any environment variables as it uses the public REST Countries API.

### Custom Domain (Optional)

To use a custom domain:
1. Add a `CNAME` file to the `public` folder with your domain
2. Configure DNS settings with your domain provider
3. Update the `basePath` and `assetPrefix` in `next.config.js`

---

**Repository**: https://github.com/Mianhassam96/MultiMian-World-Explorer
**Live Site**: https://mianhassam96.github.io/MultiMian-World-Explorer/
