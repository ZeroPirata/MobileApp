type SeeGrupos = {
  key: string;
  name: string;
  path?: string | undefined;
  params: {
    Home: {
      id: string;
      image: {
        id: string;
        url: string;
      };
      nome: string;
      descricao?: string;
      membros: {
        [key: string]: {
          id: string;
        };
      };
      posts: {
        [key: string]: SeePost;
      };
    };
  };
};
