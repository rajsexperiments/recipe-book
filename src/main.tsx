import { enableMapSet } from "immer";
enableMapSet();
import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import '@/index.css'
import { HomePage } from '@/pages/HomePage'
import { MainLayout } from '@/components/layout/MainLayout';
import { RecipesPage } from '@/pages/RecipesPage';
import { RecipeDetailPage } from '@/pages/RecipeDetailPage';
import { SopsPage } from '@/pages/SopsPage';
import { TrainingPage } from '@/pages/TrainingPage';
import { ChecklistPage } from '@/pages/ChecklistPage';
import { FeedbackPage } from '@/pages/FeedbackPage';
import { FeedbackResultsPage } from '@/pages/FeedbackResultsPage';
import { RecipeFormPage } from '@/pages/RecipeFormPage';
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "recipes", element: <RecipesPage /> },
      { path: "recipes/new", element: <RecipeFormPage /> },
      { path: "recipes/:recipeId", element: <RecipeDetailPage /> },
      { path: "recipes/:recipeId/edit", element: <RecipeFormPage /> },
      { path: "sops", element: <SopsPage /> },
      { path: "training", element: <TrainingPage /> },
      { path: "checklist", element: <ChecklistPage /> },
      { path: "feedback", element: <FeedbackPage /> },
      { path: "feedback-results", element: <FeedbackResultsPage /> },
    ]
  },
]);
// Do not touch this code
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>,
)