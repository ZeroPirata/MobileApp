import { Container, ListChatHistory, NewChatButtonStld, NewChatText } from "./style";
import { useAuthentication } from "../../../hooks/useAuthentication";
import { ValidarLista, ValidarChat } from "../../../components/index";
import { useListFriends } from "../../../utils/functions";
import { useState, useEffect, useCallback } from "react";

const Chat = () => {
  const { user } = useAuthentication();
  const [showList, setShowList] = useState(false);
  const [__, setRefreshing] = useState(false);
  const [chats, setChats] = useState<any>([]);
  const listFriends = useListFriends(String(user?.uid));

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setChats(listFriends[0]?.chats);
      setRefreshing(false);
    }, 1000);
  }, [listFriends]);

  useEffect(() => {
    onRefresh();
    setChats(listFriends[0]?.chats);
  }, [listFriends[0]?.chats, onRefresh]);

  const [updateCounter, setUpdateCounter] = useState(0);
  useEffect(() => {
    setUpdateCounter((prevCounter) => prevCounter + 1);
  }, [listFriends]);

  const handleListShow = () => {
    setShowList((prevShowList) => !prevShowList);
  };

  return (
    <Container>
      <NewChatButtonStld onPress={handleListShow}>
        <NewChatText>{showList ? "Close new" : "New"} Chat</NewChatText>
      </NewChatButtonStld>
      {showList ? (
        <ValidarLista key={`validar-lista-${updateCounter}`} list={listFriends[0].friends} user={user} />
      ) : (
        <ListChatHistory>
          {listFriends[0]?.chats && (<ValidarChat key={`validar-lista-${updateCounter}`} chats={chats} user={user} />)}
        </ListChatHistory>
      )}
    </Container>
  );
};
export { Chat };