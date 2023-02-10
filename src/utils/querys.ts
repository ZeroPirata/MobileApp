import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../configs/firebase";

const queryFindNameAndNickName = async (NickName: string) => {
  let dados: any = {};
  const queryFind = collection(db, "users");
  const queueNick = query(queryFind, where("nickname", "==", NickName));
  const querySnapshot = await getDocs(queueNick);
  querySnapshot.forEach((doc) => {
    dados = doc.data();
  });
  if (dados["nickname"] == NickName) {
    return true;
  }
};

const queryByEmail = async (email: string | null) => {
  let dados: any = {};
  const collect = collection(db, "users");
  const quertEmail = query(collect, where("email", "==", email));
  const querySnapshot = await getDocs(quertEmail);
  querySnapshot.forEach((doc) => {
    dados = doc.data();
  });
  if (dados["email"] == email) {
    return true;
  }
};

const reciveUserAttributes = async (email: string | null) => {
  let dados: any = {};
  const collect = collection(db, "users");
  const quertEmail = query(collect, where("email", "==", email));
  const querySnapshot = await getDocs(quertEmail);
  querySnapshot.forEach((doc) => {
    dados = doc.data();
  });
  return dados;
};

export { queryByEmail, reciveUserAttributes };
