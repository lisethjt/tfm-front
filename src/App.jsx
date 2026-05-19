import keycloak from "./keycloak";

function App({ user, authenticated }) {
  if (!authenticated) {
    return <p>No autenticado</p>;
  }

  if (!user) {
    return <p>Cargando usuario...</p>;
  }

  const handleLogout = () => {
    keycloak.logout({
      redirectUri: window.location.origin, // vuelve al inicio después de logout
    });
  };

  return (
    <div>
      <h1>Bienvenido</h1>
      <p>Usuario: {user.nombre}</p>
      <p>Correo: {user.correo_electronico}</p>
      <button onClick={handleLogout}>
        Cerrar sesión
      </button>
    </div>
  );
}

export default App;