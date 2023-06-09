import {IListSearchedUsers} from "./ListagemDeUsuario";

export interface ISendFiles {
  mimeType: string;
  name: string;
  size: number;
  type: string;
  uri: string;
}
export interface IFiles {
  id: string;
  url: string;
  type: string;
}
export interface ICreatePost {
  title: string;
  description: string;
  file?: ISendFiles;
}
export interface IPost {
  grupo?: {
    validacao: boolean;
    id: string;
  };
  id: string;
  user: {
    nome: string;
    email: string;
  };
  body?: string;
  data: number;
  images?: IFiles[];
  arquivos?: IFiles;
}

export interface ICreateGrupo {
  nome: string;
  descricao: string;
  image: ISendFiles;
  membros: IListSearchedUsers[];
}
