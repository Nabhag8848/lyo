declare type FashnaiTryonRequest = {
  model_name: string;
  inputs: {
    model_image: string;
    garment_image: string;
    output_format?: 'jpeg' | 'png';
    return_base64?: boolean;
  };
};

declare type FashnaiTryonResponse = {
  id: string;
};
