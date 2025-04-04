# 🌪️ Vortex 360 – Mechanical Design Hackathon Platform

##https://vortex-weld.vercel.app/

**Vortex 360** is a three-day Mechanical Design Hackathon hosted by **RoboVITics**, powered by **Autodesk Fusion 360**. This platform streamlines the event process — from registration to idea submission — making it easier for participants to create teams, submit ideas, and track their progress.

---

## 🚀 Features

- 🔐 Google Authentication (NextAuth)
- 👥 Create or Join Teams
- 👑 Team Leader Controls: delete team, remove members
- ✍️ Idea Submission Portal (once only)
- 📊 Dashboards for both leaders and members
- 🔔 Live updates on round qualifications

---

## 🧭 User Journey

1. **Enter the website** – scroll up to navigate through the 3D tunnel experience.
2. **Sign in** using Google authentication.
3. **Submit hostel details** as part of initial setup.
4. Choose to either:
   - **Create a new team** (you become the team leader), or  
   - **Join an existing team** using a team code.
5. As **team leader**, access the dashboard to:
   - View team code
   - Remove members
   - Delete the team
6. As a **member**, you can:
   - View the dashboard
   - Leave the team
7. Submit your idea (leader only):
   - Select topic and track
   - Write and submit the idea (editable only once)
   - Revisit the idea from the dashboard anytime
8. View updates on selection status from the **leader dashboard**.

---

## 🧰 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: TypeScript
- **Authentication**: NextAuth.js with Google OAuth
- **Database**: MongoDB (via Mongoose)
- **Deployment**: [Vercel](https://vercel.com/)
- **Design**: Tailwind CSS

---

## ⚙️ Getting Started (Local Setup)

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/vortex360.git
   cd vortex360
2.Install dependencies

    npm install
3.Create a .env.local file and add the following variables:


MONGODB_URI=your_mongodb_uri

NEXTAUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id

GOOGLE_CLIENT_SECRET=your_google_client_secret

REFRESH_TOKEN_SECRET=your_refresh_token_secret

ACCESS_TOKEN_SECRET=your_access_token_secret

NEXTAUTH_SECRET=your_nextauth_secret

4.Run the app locally

    npm run dev
🌍 Deployment
This project is deployed on Vercel. Just connect the GitHub repo to Vercel, add the environment variables, and you're good to go!
https://vortex-weld.vercel.app/


📜 License
MIT License © 2025 RoboVITics

