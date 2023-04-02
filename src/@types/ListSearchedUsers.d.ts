type ListSearchedUsers = {
  key: string;
  name: string;
  path?: string | undefined;
  params: [
    {
      id: string;
      name: string;
      avatar: string;
      email: string;
    }
  ];
};
