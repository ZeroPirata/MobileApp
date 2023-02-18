type SeePost = {
  key: string;
  name: string;
  path?: string | undefined;
  params: {
    id: string;
    body: {
      user: string;
      title: string;
      description?: string;
      files?: string[];
    };
  };
};
type EditPost = {
  key: string;
  name: string;
  path?: string | undefined;
  params: {
    id: string;
    body: {
      user: string;
      title: string;
      description?: string;
      files?: string[];
    };
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
