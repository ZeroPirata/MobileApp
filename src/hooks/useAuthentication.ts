import React from "react";
import {getAuth, onAuthStateChanged, User} from "firebase/auth/react-native";

const auth = getAuth();
export function useAuthentication() {
  const [user, setUser] = React.useState<User>();
  React.useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(undefined);
      }
    });

    return unsubscribeFromAuthStatuChanged;
  }, []);
  return {
    user,
  };
}
