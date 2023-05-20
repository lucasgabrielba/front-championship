import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/public/home";
import { CreateChampionshipForm } from "./pages/public/createChampionship";
import { AddRunnerForm } from "./pages/public/createDriver";
import { TableChampionship } from "./pages/public/tableChampionship";
import { AddScore } from "./pages/public/addScore";

export function AppRoutes() {
  return (
    <React.Suspense fallback="Carregando...">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/newChampionship" element={<CreateChampionshipForm />} />
        <Route path="/addDrivers/:championshipId" element={<AddRunnerForm />} />
        <Route path="/driversTable/:championshipId" element={<TableChampionship />} />
        <Route path="/addScore/:championshipId" element={<AddScore />} />
      </Routes>
    </React.Suspense>
  );
}
