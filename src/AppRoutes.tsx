import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/public/home";
import { CreateChampionshipForm } from "./pages/public/createChampionship";
import { AddRunnerForm } from "./pages/public/createDriver";

export function AppRoutes() {
  return (
    <React.Suspense fallback="Carregando...">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/newChampionship" element={<CreateChampionshipForm />} />
        <Route path="/addDrivers" element={<AddRunnerForm />} />
      </Routes>
    </React.Suspense>
  );
}
