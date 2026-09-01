This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🚀 Hostinger Deployment Guide

To deploy this project to Hostinger, you need to upload the source code (excluding the large `node_modules` and `.next` folders) so that Hostinger can build it natively on their Linux servers.

### Step 1: Create the Zip File (Run in PowerShell)

Open your terminal (PowerShell) inside the project folder and run this exact command to generate `deploy.zip`:

```powershell
$exclude = @("node_modules", "out", ".git", ".next"); $items = Get-ChildItem -Force | Where-Object { $_.Name -notin $exclude }; Compress-Archive -Path ($items.FullName) -DestinationPath "deploy.zip" -Force; Write-Host "✅ Created deploy.zip"
```

### Step 2: Upload to Hostinger

1. Go to Hostinger **File Manager** and open the root folder for your Web App.
2. Delete the existing files to start with a clean slate.
3. Upload `deploy.zip` and extract it.

### Step 3: Configure Hostinger Web App

In your Hostinger Node.js / Web App settings, ensure:

- **Build command**: `npm run build`
- **Start command**: `npm start`
- **Output directory**: `.next`

Click **Deploy / Restart**. Hostinger will run the build natively and your site will be live!

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
