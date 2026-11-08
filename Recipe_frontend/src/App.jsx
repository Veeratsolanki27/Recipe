import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./components/layout/RootLayout";
import Home from "./components/home/Home";
import RecipeDetails from "./components/recipe/RecipeDetails";
import RecipeUpdater from "./components/recipe/RecipeUpdater";
import ImageUpdater from "./components/image/ImageUpdater";
import RecipeForm from "./components/recipe/RecipeForm";
import Login from "./components/auth/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Aboutus from "./components/Aboutus";
import Profile from "./components/profile/Profile";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route
          path='/recipe/:recipeId/recipe-details'
          element={<RecipeDetails />}
        />
        <Route
          path='/update/:recipeId/update-recipe'
          element={
            <ProtectedRoute>
              <RecipeUpdater />
            </ProtectedRoute>
          }
        />

        <Route
          path='/update-image/:recipeId/update-image'
          element={
            <ProtectedRoute>
              <ImageUpdater />
            </ProtectedRoute>
          }
        />

        <Route
          path='/add-recipe'
          element={
            <ProtectedRoute>
              <RecipeForm />
            </ProtectedRoute>
          }
        />

        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path='/login' element={<Login />} />
        <Route path='/aboutus' element={<Aboutus />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;