import { useCallback, useState, useEffect } from "react";
import { Modals } from "../../../components/Modals";
import { Option } from "../../../interfaces/ModalInterface";
import { Container } from "./style";
import { child, get, onValue, ref, runTransaction } from "firebase/database";
import { database } from "../../../configs/firebase";

const Chat = () => {
  return <Container></Container>;
};
export { Chat };
