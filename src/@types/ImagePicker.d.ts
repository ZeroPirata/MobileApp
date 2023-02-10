type ImagePickerResponse = {
  assets: [
    {
      assetId: string;
      duration: number;
      fileName: string;
      fileSize: number;
      height: number;
      type: string;
      uri: string;
      width: number;
    }
  ];
};
