export type FeatureProps = {
  text: string;
  heading: string;
};

export type PlantProps = {
  common_name: string; 
  image_url: string; 
};

export type Organ = {
  image: string; 
  organType: string;
}

export type OrganID = { [id: string]: Organ }

export type OrganType = 'fruit' | 'flower' | 'bark' | 'leaf'; 

export type UploadProps = {
  setOrganId: React.Dispatch<React.SetStateAction<OrganID[]>>;
  currImage: string; 
  setCurrImage: React.Dispatch<React.SetStateAction<string>>;
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type ModalProps = UploadProps & {
  organType: OrganType; 
  id: string; 
};

export type OrganChoiceModalProps = {
  image_url: string;
  values: Organ[];
  handleOrganChoice: () => void;
}

export type OrganListItemProps = {
  value: Organ;
  handleOrganChoice: () => void;
};

