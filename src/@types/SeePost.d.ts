type SeePost = {
  key: string;
  name: string;
  path?: string | undefined;
  params: {
    id: string;
    user: string;
    data: number,
    title: string;
    description?: string;
    files?: string[];
  };
};
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
type SeeImage = {
  key: string;
  name: string;
  path?: string | undefined;
  params: {
    files: string;
  };
};
