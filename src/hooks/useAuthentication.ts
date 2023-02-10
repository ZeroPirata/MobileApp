import React from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { reciveUserAttributes } from "../utils/querys";
import { Usuario } from "../interfaces/UsuarioInterface";
const auth = getAuth();

export function useAuthentication() {
  const [user, setUserFirebase] = React.useState<Usuario>();
  React.useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(
      auth,
      async (user) => {
        if (user) {
          const email = user.email;
          setUserFirebase(await reciveUserAttributes(email));
        } else {
          setUserFirebase(undefined);
        }
      }
    );

    return unsubscribeFromAuthStatuChanged;
  }, []);

  return {
    user,
  };
}
