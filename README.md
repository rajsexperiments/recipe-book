# Culinary Codex

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/rajsexperiments/recipe-workflow-app)

Culinary Codex is a sophisticated, minimalist web application designed to serve as a digital 'Recipe Bible' for professional culinary operations. It provides a centralized, structured platform for managing recipes, ensuring consistency, and streamlining kitchen workflows. The application features a detailed recipe management system where each dish is documented using a standardized 14-point template, covering everything from ingredients and preparation to quality control checkpoints and plating instructions.

The user interface is designed with a focus on clarity, usability, and visual elegance, employing a clean, grid-based layout, generous white space, and a professional color palette to create a calm and focused user experience. The ultimate goal is to transform culinary art into a scalable science, enabling brand consistency and operational excellence.

## ✨ Key Features

-   **Comprehensive Recipe Management:** Document recipes using a standardized 14-point template for ultimate consistency.
-   **Visual Recipe Library:** Browse and filter recipes (Breakfast, Lunch, Brunch) in a clean, card-based gallery.
-   **Standard Operating Procedures (SOPs):** Centralized section for kitchen checklists, equipment usage, and safety notes.
-   **Structured Training Guidelines:** A clear, step-by-step process for onboarding new kitchen staff.
-   **Interactive Pilot Checklist:** Manage and track pilot sprint tasks with an interactive interface.
-   **Minimalist & Responsive UI:** A beautiful, professional interface built for clarity and focus on all devices.

## 🚀 Technology Stack

-   **Frontend:** [React](https://react.dev/), [Vite](https://vitejs.dev/), [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)
-   **Routing:** [React Router](https://reactrouter.com/)
-   **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
-   **Animation:** [Framer Motion](https://www.framer.com/motion/)
-   **Icons:** [Lucide React](https://lucide.dev/)
-   **Deployment:** [Cloudflare Pages & Workers](https://workers.cloudflare.com/)

## 🏁 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have [Bun](https://bun.sh/) installed on your machine.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/culinary-codex.git
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd culinary-codex
    ```
3.  **Install dependencies:**
    ```sh
    bun install
    ```

## 🛠️ Development

To start the local development server, run the following command:

```sh
bun run dev
```

The application will be available at `http://localhost:3000`. The server will automatically reload when you make changes to the source files.

### Building for Production

To create a production-ready build of the application, run:

```sh
bun run build
```

This command bundles the application into the `dist` directory, optimized for deployment.

## ☁️ Deployment

This project is configured for seamless deployment to **Cloudflare Pages**.

### One-Click Deploy

You can deploy this template to Cloudflare Pages with a single click.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/rajsexperiments/recipe-workflow-app)

### Manual Deployment with Wrangler

1.  **Login to Wrangler:**
    ```sh
    bunx wrangler login
    ```
2.  **Deploy the application:**
    ```sh
    bun run deploy
    ```

This command will build and deploy your application. Wrangler will provide you with the URL of your deployed project.

## 📂 Project Structure

The project follows a standard Vite + React structure with some key directories:

-   `src/`: Contains all the frontend source code.
    -   `components/`: Reusable React components, including `ui/` for shadcn components.
    -   `data/`: Static data, such as recipes and checklists.
    -   `pages/`: Top-level page components for each route.
    -   `types/`: TypeScript type definitions.
    -   `lib/`: Utility functions.
-   `worker/`: Source code for the Cloudflare Worker backend.
-   `public/`: Static assets that are served directly.

## 🧪 Linting

This project uses ESLint for code quality and consistency. To run the linter, use:

```sh
bun run lint
```

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.