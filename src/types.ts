export type FeatureProps = {
  text: string;
  heading: string;
};

export type Organ = {
  image: File;
  organType: string;
};

export type OrganType = "fruit" | "flower" | "bark" | "leaf";

export type UploadProps = {
  handleImageUpload: (imgFile: File) => void;
};

export type ModalProps = {
  currImage: File;
  addOrgan: (organType: OrganType) => void;
};

export type OrganListItemProps = {
  addOrgan: (organType: OrganType) => void;
  organType: OrganType;
};

export type ImageDisplayProps = {
  imgUrl: string | undefined;
  organType: string | undefined;
};

export type SelectedSpecies = {};

export type Species = {
  scientificNameWithoutAuthor: string;
  scientificNameAuthorship: string;
  scientificName: string;
  genus: {
    scientificNameWithoutAuthor: string;
    scientificNameAuthorship: string;
    scientificName: string;
  };
  family: {
    scientificNameWithoutAuthor: string;
    scientificNameAuthorship: string;
    scientificName: string;
  };
  commonNames: string[];
};

export type PlantIdAPIResult = {
  score: number;
  species: Species;
  images: [
    {
      organ: string;
      author: string;
      license: string;
      date: {
        timestamp: number;
        string: string;
      };
      citation: string;
      url: {
        o: string;
        m: string;
        s: string;
      };
    },
  ];
  gbif: {
    id: string;
  };
  powo: {
    id: string;
  };
  iucn?: {
    id: string;
    category: string;
  };
};
export type PlantIdResults = PlantIdAPIResult[];

export type PlantIdAPIResults = {
  query: {
    project: string;
    images: string[];
    organs: string[];
    includeRelatedImages: boolean;
    noReject: boolean;
  };
  language: string;
  preferedReferential: string;
  switchToProject?: string;
  bestMatch: string;
  results: PlantIdResults;
  remainingIdentificationRequests: number;
  version: string;
};

export type ApiImageResponse = [ImageResponse];
export type ImageResponse = {
  url: string;
  public_id: string;
};
export type ApiImagesAndResultsResponse = {
  data: PlantIdAPIResults;
  images: ApiImageResponse;
};

export type userData = {
  email: string;
  _id: string;
};
export type AuthState = {
  user: userData | null;
  login: (user: userData) => void;
  logout: () => void;
  loading: boolean;
};

export type ResultCardProps = {
  result: PlantIdAPIResult;
  id: number;
  handleAddSpecies: (selectedId: number) => void;
};

export type PlantSelectFormProps = {
  identifiedPlant: Species | null;
  apiImages: ApiImageResponse | null;
  handleSetDone: () => void;
};

export type PlantNote = {
  idDate: Date;
  idPlace: string;
  note: string;
};

export type PlantNoteBody = {
  idDate: Date;
  idPlace: string;
  note: string;
};

export type PlantDataWithNotes = {
  userPlantsWithNotes: PlantWithNote[]; 
};

type PlantWithNote = {
  __v: number,
  _id: string,
  cloudinaryImages: string[],
  commonNames: string[],
  genus: string,
  postedBy: string,
  scientificName: string,
  notes: PlantNoteResponse[],
}

export type PlantNoteResponse = {
  _id: string;
  idDate: Date;
  idPlace: string;
  postedBy: string;
  plantID: string;
  note: string;
  __v: number;
};


export type GalleryCardProps = {
  plantWithNote: PlantWithNote
}