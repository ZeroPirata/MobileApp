import { BodyContent, ButtonLike, ButtonSeeMore, Container, FooterPostSettings, LikeCount, PostData, TextButtonSeeMore, UserName, } from "./style";
import { ref, child, onValue, runTransaction, remove } from "firebase/database";
import { useAuthentication } from "../../hooks/useAuthentication";
import { IFiles, IPost } from "../../interfaces/PostInterface";
import { useNavigation } from "@react-navigation/native";
import { Option } from "../../interfaces/ModalInterface";
import { RenderImagesComponent } from "../RenderImage";
import { useEffect, useRef, useState } from "react";
import { database } from "../../configs/firebase";
import { ScrollView, Text, } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import themes from "../../styles/themes";
import { Modals } from "../Modals";


export const PostView = ({ id, ...rest }: IPost) => {
  const { user } = useAuthentication();
  const [liked, setLiked] = useState(false);

  const images: string[] = [];
  const [likesCount, setLikesCount] = useState(0);
  const isCarousel = useRef(null);

  const navigation = useNavigation();

  function EditPost(
    id: string,
    user?: {
      nome: string;
      email: string;
    },
    body?: string,
    data?: number,
    images?: IFiles[],
    arquivos?: IFiles
  ) {
    navigation.navigate("EditPost", { id: id, ...rest });
  }

  function SeePost(
    id: string,
    user?: {
      nome: string;
      email: string;
    },
    body?: string,
    data?: number,
    images?: IFiles[],
    arquivos?: IFiles,
    grupo?: { id: string, validacao: boolean }
  ) {
    navigation.navigate("SeePost", { id: id, grupo: { id: String(rest.grupo?.id), validacao: true }, ...rest });
  }

  const handleLike = () => {
    if (!user) {
      return;
    }
    const postLikesRef = !rest.grupo?.validacao ? ref(database, `posts/${id}/likes`) : ref(database, `grupos/${rest.grupo.id}/posts/${id}/likes`);
    const userLikeRef = child(postLikesRef, user.uid);
    const handleTransaction = (currentData: any) => {
      if (currentData === null) {
        return { userId: user.uid };
      } else {
        return null;
      }
    };
    runTransaction(userLikeRef, handleTransaction)
      .then()
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const postLikesRef = !rest.grupo?.validacao ? ref(database, `posts/${id}/likes`) : ref(database, `grupos/${rest.grupo.id}/posts/${id}/likes`);
    const handleSnapshot = (snapshot: any) => {
      const likes = snapshot.val();
      const likesCount = likes ? Object.keys(likes).length : 0;
      setLikesCount(likesCount);
      setLiked(likes && likes[String(user?.uid)]);
    };
    onValue(postLikesRef, handleSnapshot);
  }, [id, user]);

  const date = new Date(rest.data * 1000);
  const localeDate = date.toLocaleDateString();
  const localeHours = date.toLocaleTimeString();

  const userinfo: { email: string; nome: string } = {
    email: String(user?.email),
    nome: String(user?.displayName),
  };

  const options: Option[] = [
    {
      name: "Editar Postagem",
      function: () => EditPost(id, userinfo, String(rest.body)),
    },
    { name: "Excluir Postagem", function: () => handleDeletePost(id) },
  ];

  const handleDeletePost = (id: string) => {
    deletePost(id);
  };

  const deletePost = async (id: string) => {
    !rest.grupo?.validacao ? await remove(ref(database, `posts/${id}`)) : await remove(ref(database, `grupos/${rest.grupo.id}/posts/${id}`))
  };

  return (
    <Container>
      <ScrollView>
        <UserName>{rest.user.nome}</UserName>
        <PostData>
          {localeDate} - {localeHours}
        </PostData>
        <BodyContent>{rest.body}</BodyContent>
        {rest.images ? (
          <RenderImagesComponent arrayImages={rest.images} />
        ) : null}
        {rest.arquivos ? <Text>Oi</Text> : null}
        <FooterPostSettings>
          <ButtonLike onPress={handleLike}>
            <AntDesign
              style={{ fontWeight: "bold" }}
              color={liked ? themes.COLORS.RED : themes.COLORS.WHITE}
              name="heart"
              size={25}
            />
            <LikeCount
              style={
                liked
                  ? { color: themes.COLORS.RED }
                  : { color: themes.COLORS.WHITE }
              }
            >
              {likesCount}
            </LikeCount>
          </ButtonLike>
          {rest.user.email == user?.email ? (
            <Modals options={options} iconNameFeater="settings" iconSize={25} />
          ) : null}
          <ButtonSeeMore onPress={() => SeePost(id)}>
            <TextButtonSeeMore>See more</TextButtonSeeMore>
          </ButtonSeeMore>
        </FooterPostSettings>
      </ScrollView>
    </Container>
  );
};
