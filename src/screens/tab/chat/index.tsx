import { Modals } from "../../../components/Modals";
import { Option } from "../../../interfaces/ModalInterface";
import { Container } from "./style";

const Chat = () => {
  const options: Option[] = [
    {
      name: "Baatata",
      function: () => console.log("batat"),
    },
  ];
  return (
    <Container>
      <Modals
        options={options}
        key={"modal"}
        iconSize={150}
        iconNameFeater={"settings"}
      />
    </Container>
  );
};
export { Chat };
