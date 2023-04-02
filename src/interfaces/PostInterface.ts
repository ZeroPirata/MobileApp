export interface IFiles {
  type: string;
  uri: string;
  id: string;
}
export interface IArquivos {
  mimeType: string;
  name: string;
  size: number;
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
  user: string;
  title: string;
  description?: string;
  data: number;
  files?: string[];
}
