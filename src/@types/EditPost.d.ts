type EditPost = {
  key: string;
  name: string;
  path?: string | undefined;
  params: {
    id: string;
    user: string;
    title: string;
    description?: string;
    files?: string[];
  };
};