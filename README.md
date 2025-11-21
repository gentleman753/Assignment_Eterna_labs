# Real-Time Token Tracking Dashboard

## Description

Token Trading Table is a dynamic, real-time dashboard for monitoring cryptocurrency tokens. It provides a clean, intuitive interface for tracking the lifecycle of tokens, from their creation as new pairs to their final migration. The dashboard is designed to be fast, responsive, and informative, offering users an at-a-glance view of market activity.

## Key Features

- **Real-Time Data:** The dashboard updates in real-time to provide the most current token information.
- **Categorized Swimlanes:** Tokens are organized into three distinct categories for easy tracking:
  - **New Pairs:** Displays the newest tokens entering the market.
  - **Final Stretch:** Tracks tokens that are nearing the completion of their bonding curve.
  - **Migrated:** Showcases established tokens that have successfully launched.
- **Detailed Token Modal:** Clicking on any token opens a detailed view with in-depth statistics, a simulated price chart, and bonding curve progress.
- **Live Search:** A powerful search bar allows users to instantly filter tokens across all categories by name or ticker symbol.
- **Responsive Design:** The application is fully responsive and works seamlessly on both desktop and mobile devices, down to 320px width.

## Screenshots

**Desktop Layout**
<img width="1920" height="1080" alt="Screenshot (71)" src="https://github.com/user-attachments/assets/189c6655-bd2e-40a4-809c-0663740cb9b9" />



**Mobile Layout (320px)**
<img width="1920" height="1080" alt="Screenshot (70)" src="https://github.com/user-attachments/assets/6ecba995-9723-4cf5-ae4b-949a176f6248" />


## Tech Stack

- **Frontend:**
  - [React](https://reactjs.org/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Vite](https://vitejs.dev/)
- **Styling:**
  - [Tailwind CSS](https://tailwindcss.com/)
- **Icons:**
  - [Lucide React](https://lucide.dev/)

## Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/gentleman753/Assignment_Eterna_labs.git
   ```
2. **Navigate to the project directory:**
   ```sh
   cd Assignment_Eterna_labs
   ```
3. **Install the dependencies:**
   ```sh
   npm install
   ```

### Running the Application

To start the development server, run the following command:

```sh
npm run dev
```

This will start the application on `http://localhost:5173` (or the next available port).

## Deployment

This project is configured for easy deployment on [Vercel](https://vercel.com/). Simply connect your GitHub repository to a new Vercel project, and it will be deployed automatically. The `vercel.json` file in the root directory contains the necessary configuration.
