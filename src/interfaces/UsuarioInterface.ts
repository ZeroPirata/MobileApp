export interface Usuario {
  id: string;
  displayName: string;
  email: string;
  assets?: {
    profile: string;
    background: string;
  };
}
