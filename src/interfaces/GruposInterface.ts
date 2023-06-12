import { IPost } from "./PostInterface";

export interface GrupoInterface {
  id: string;
  nome: string;
}

export interface InterfaceGrupo {
  id: string;
}
export interface InterfaceGrupoList {
  id: string;
  image: {
    id: string;
    url: string;
  };
  descricao: string;
  membros: {[key: string]: {id: string; role: string}};
  nome: string;
}

export interface IGrupo {
  descricao: string,
  image: { id: string, url: string },
  membros: {
      [key: string]: {
          id: string,
          role: string
      }
  },
  nome: string,
  regras: string[],
  posts: IPost[]
}

export interface IMembros {
  key: string, id: string; role: string;
}

export interface TabBarIconProps {
  focused: boolean;
}