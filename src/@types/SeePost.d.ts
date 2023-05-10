type SeePost = {
  key: string;
  name: string;
  path?: string | undefined;
  params: {
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
