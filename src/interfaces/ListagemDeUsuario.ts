export interface IListSearchedUsers {
  id: string;
  email: string;
  avatar: string;
  name: string;
  open?: (value: boolean) => void;
}
