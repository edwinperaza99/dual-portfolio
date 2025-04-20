# ⚡ Dual Persona Portfolio

This is a dynamic and interactive personal portfolio built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Sanity CMS**. The site is designed to support **two distinct personas** (or profiles):

- One for a **professional** identity (with About, Experience, Skills, etc.)
- One for a **content creator or streamer** identity (with Twitch integrations like VODs and Clips)

The project originally started as a general-purpose portfolio template, but evolved into a dual-mode portfolio with a focus on supporting streamers in the second view.

---

## 🛠️ Technologies Used

- [Next.js (App Router)](https://nextjs.org/docs/app)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) – for animations and transitions
- [Sanity.io](https://www.sanity.io/) – headless CMS for managing dynamic content
- [shadcn/ui](https://ui.shadcn.com/) – for reusable, accessible UI components
- [Twitch API](https://dev.twitch.tv/docs/api/) – to embed live streams and fetch VODs/Clips

---

## 🌐 Live Sections

- 🎓 **Primary Persona**:

  - About Section
  - Experience Timeline
  - Skills List

- 🎮 **Secondary Persona**:

  - Twitch Stream Embed
  - Recent VODs and Clips
  - Schedule and Events

- 💬 **Contact Section**: Shared across both personas

---

## 🧪 Environment Variables

Create a `.env.local` file in the root of the project with the following variables:

```.env
NEXT_PUBLIC_SANITY_PROJECT_ID="your_project_id"
NEXT_PUBLIC_SANITY_DATASET="production"
TWITCH_CLIENT_SECRET="your_client_secret"
TWITCH_CLIENT_ID="your_client_id"
```

> Your Sanity project ID can be found in your Sanity Studio or on [sanity.io/manage](https://www.sanity.io/manage).

---

## 🔧 How to Setup Sanity

1. Go to [https://www.sanity.io](https://www.sanity.io) and create a free account.
2. Create a new project from your Sanity dashboard.
3. Choose a dataset name (use `production` to match the example).

---

## 🚀 Getting Started

```bash
git clone https://github.com/edwinperaza99/dual-portfolio.git
cd dual-portfolio

# Install dependencies
npm install

# Create and fill out .env.local
cp .env.local.example .env.local

# Run the dev server
npm run dev
```

---

## 🚢 Deployment

This app is ready to be deployed on [Vercel](https://vercel.com/):

- Push your repo to GitHub
- Import it in Vercel
- Set environment variables in the project settings
- Done 🎉

> Make sure `NEXT_PUBLIC_SANITY_PROJECT_ID`, etc., are added to Vercel's environment.

---

## 🔍 Example

You can see a live example of this dual portfolio in action here:

👉 [https://www.cindynphan.com](https://www.cindynphan.com)
