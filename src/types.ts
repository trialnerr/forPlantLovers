export type FeatureProps = {
  text: string;
  heading: string;
};

export type Organ = {
  image: File; 
  organType: string;
}

export type OrganType = 'fruit' | 'flower' | 'bark' | 'leaf'; 

export type UploadProps = {
  handleImageUpload: (imgFile : File) => void;
};

export type ModalProps =  {
  currImage: File; 
  addOrgan: (organType: OrganType) => void; 
};

export type OrganListItemProps = {
  addOrgan: (organType: OrganType) => void;
  organType: OrganType
};


