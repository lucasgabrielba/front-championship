import { SnackbarProvider } from "notistack";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";

export function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <SnackbarProvider maxSnack={3}>
          <AppRoutes />
        </SnackbarProvider>
      </BrowserRouter>
    </React.Fragment>
  );
}
