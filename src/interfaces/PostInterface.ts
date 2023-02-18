export interface IFiles {
  type: string;
  uri: string;
}
export interface ICreatePost {
  title: string;
  description: string;
  file?: IFiles;
}
export interface IPost {
  id: string;
  body: {
    user: string;
    title: string;
    description?: string;
    files?: string[];
  };
}
