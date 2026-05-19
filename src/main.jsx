import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import keycloak from "./keycloak";
import { me } from "./api/me";

async function initApp() {
  try {
    const authenticated = await keycloak.init({
      onLoad: "login-required",
    });

    if (!authenticated) {
      console.log("No autenticado");
    }

    let user = null;

    if (authenticated) {
      try {
        user = await me();
      } catch (err) {
        console.error('Error cargando usuario', err);
      }
    }

    console.log("Usuario desde backend:", user);

    ReactDOM.createRoot(document.getElementById("root")).render(
      <React.StrictMode>
        <App user={user} authenticated={authenticated} />
      </React.StrictMode>
    );

  } catch (error) {
    console.error("Error iniciando app:", error);
  }
}

initApp();