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
