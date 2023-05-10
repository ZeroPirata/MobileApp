import { useNavigation } from "@react-navigation/native";
import { ref, child, onValue, runTransaction, remove } from "firebase/database";
import { useEffect, useRef, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  Dimensions,
  Animated,
  View,
} from "react-native";
import { database } from "../../configs/firebase";
import { useAuthentication } from "../../hooks/useAuthentication";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import { IFiles, IPost } from "../../interfaces/PostInterface";

import {
  BodyContent,
  ButtonLike,
  ButtonSeeMore,
  Container,
  FooterPostSettings,
  ImageViewControll,
  ImagesRender,
  ImagesRenderView,
  LikeCount,
  PostData,
  TextButtonSeeMore,
  UserName,
} from "./style";
import themes from "../../styles/themes";

import { Modals } from "../Modals";
import { Option } from "../../interfaces/ModalInterface";
import { RenderImagesComponent } from "../RenderImage";

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
    arquivos?: IFiles
  ) {
    navigation.navigate("SeePost", { id: id, ...rest });
  }

  const handleLike = () => {
    if (!user) {
      return;
    }
    const postLikesRef = ref(database, `posts/${id}/likes`);
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
    const postLikesRef = ref(database, `posts/${id}/likes`);
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
    await remove(ref(database, `posts/${id}`));
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
