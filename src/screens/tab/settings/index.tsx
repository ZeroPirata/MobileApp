import { getAuth, signOut } from "firebase/auth";
import { Button } from "react-native";
import { useAuthentication } from "../../../hooks/useAuthentication";
import { Container } from "./style";

const Settings = () => {
  const auth = getAuth();
  return (
    <Container>
      <Button title="Sair" onPress={() => signOut(auth)} />
    </Container>
  );
};
export { Settings };
