interface IFiles {
  fileType: string;
  fileName: string;
  fileURI: string;
}
export interface ICreatePost {
  title: string;
  description: string;
  file?: IFiles;
}
