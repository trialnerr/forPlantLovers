export type FeatureProps = {
  text: string;
  heading: string;
};

export type PlantProps = {
  common_name: string; 
  image_url: string; 
};

export type OrganAndImage = {
  image: string, 
  organ: string
}

export type Organ = 'fruit' | 'flower' | 'bark' | 'leaf'; 

export type ModalProps = {
  isOpen: boolean;
  hasCloseBtn?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
};