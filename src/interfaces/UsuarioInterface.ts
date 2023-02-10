export interface Usuario {
  displayName: string;
  email: string;
  assets?: {
    profile: string;
    background: string;
  };
  riot: {
    summonerName: string;
  };
}
