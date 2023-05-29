import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import { Container, ContainerListRender, IconsRender, ImageRender, ItensRender, Texts, TextsDate, TypeView } from './style'

interface ListRender {
    avatar?: string,
    data?: string,
    idRequest?: string,
    name?: string,
    solicitador?: string,
    type?: string,
    email?: string,
}

interface RenderNotificationProps {
    list: ListRender[]
}

export const RenderNotifications = ({ list }: RenderNotificationProps) => {
    return (
        <Container>
            {list.map(item => {
                const date = new Date(Number(item.data) * 1000);
                const localeDate = date.toLocaleDateString();
                const localeHours = date.toLocaleTimeString();
                return (
                    <ContainerListRender>
                        <ImageRender source={{ uri: item.avatar }} />
                        <ItensRender>
                            {item.type === "grupo" ?
                                (
                                    <TypeView>
                                        <FontAwesome name="group" size={24} color="white" />
                                        <Text style={{ color: "white" }}>{" "}Grupo</Text>
                                    </TypeView>
                                ) :
                                (
                                    <TypeView>
                                        <Ionicons name="person-add" size={24} color="white" />
                                        <Text style={{ color: "white" }}>{" "}Amigo</Text>
                                    </TypeView>
                                )
                            }
                            <Texts>{item.name}</Texts>
                            <TextsDate>{localeDate + " " + localeHours}</TextsDate>
                        </ItensRender>
                        <IconsRender>
                            <Ionicons name="eye-outline" size={24} color="white" />
                            <AntDesign name="checksquareo" size={24} color="green" />
                            <AntDesign name="closesquareo" size={24} color="red" />
                        </IconsRender>
                    </ContainerListRender>
                )
            })}
        </Container>
    )
}
