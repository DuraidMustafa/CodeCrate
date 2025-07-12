# CodeCrate 🧠📦

A simple, clean, and efficient code snippet manager built for developers who don’t want to lose great code.

## 🚀 Features

- ✍️ **Add Snippets**  
  Store code snippets in over 100+ programming languages.

- 🔖 **Tag & Search**  
  Easily organize your snippets using tags and quickly search through them.

- 🔄 **Import / Export**  
  Backup or transfer your snippets with JSON import/export functionality.

- 🌐 **Share Publicly**  
  Share any snippet by making it public – perfect for collaboration or showing off cool code.

## 🛠️ Tech Stack

- **Framework**: Next.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB

## 📁 Getting Started

Follow these steps to set up the project locally:

### 🔁 1. Clone the Repository

```bash
git clone https://github.com/yourusername/codecrate.git
cd codecrate
```

### 📦 2. Install Dependencies

```bash
pnpm install
```

### ⚙️ 3. Setup Environment Variables

Create a `.env` file in the root directory and add the following:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="Your Next js Public Clerk key"
CLERK_SECRET_KEY="Your Next js Private Clerk key"
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
MONGO_URI="Your MongoDB URI"
SERVER_URL=http://localhost:3000
```

### 🚀 4. Run the Development Server

```bash
pnpm run dev
```

Once the server is running, open your browser and go to:  
[http://localhost:3000](http://localhost:3000)
