import Keycloak from "keycloak-js";
const AUTH_URL = import.meta.env.VITE_AUTH_URL

const keycloak = new Keycloak({
  url: import.meta.env.VITE_AUTH_URL,
  realm: "tfm",
  clientId: "tfm-web",
});

export default keycloak;
