type SeePost = {
  key: string;
  name: string;
  path?: string | undefined;
  params: {
    grupo?: {
      id: string;
      validacao: boolean;
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
  };
};
