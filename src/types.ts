export type FeatureProps = {
  text: string;
  heading: string;
  icon: string;
};

export type ErrorMessageProps = {
  errMsg?: string;
};
export type OrganType = "fruit" | "flower" | "bark" | "leaf";
export type Organ = {
  image: File;
  organType: OrganType;
};

export type UploadProps = {
  handleImageUpload: (imgFile: File) => void;
};

export type ModalProps = {
  currImage: File;
  addOrgan: (organType: OrganType) => void;
  disabledOrganTypes: OrganType[]; 
};

export type OrganListItemProps = {
  addOrgan: (organType: OrganType) => void;
  organType: OrganType;
  disabledOrganTypes: OrganType[];
};

export type ImageDisplayProps = {
  imgUrl: string | undefined;
  organType: OrganType | undefined;
  handleOrganDelete: (index: number) => void;
  index: number;
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

export type PlantWithNote = {
  __v: number;
  _id: string;
  cloudinaryImages: string[];
  commonNames: string[];
  genus: string;
  postedBy: string;
  scientificName: string;
  notes: PlantNoteResponse[];
};

export type PlantNoteResponse = {
  _id: string;
  idDate: Date;
  idPlace: string;
  postedBy: string;
  plantID: string;
  note: string;
  __v: number;
};

export type PlantNoteUpdateBody = {
  idDate?: Date;
  idPlace?: string;
  note?: string;
};

export type GalleryCardProps = {
  plantWithNote: PlantWithNote;
  deletePlantAndNote: (plantId: string, noteId: string) => void;
  updateNote: (noteId: string, updateBody: PlantNoteUpdateBody) => void;
};

export type CareType = "watering" | "sunlight" | "pruning";

export type PlantCare = {
  id: number;
  type: CareType;
  description: string;
};

export type PlantDetails = {
  id: number;
  common_name: string;
  scientific_name: string[];
  other_name: string[];
  family: string;
  origin: string | null;
  type: string;
  dimensions: {
    type: string | null;
    min_value: number;
    max_value: number;
    unit: string;
  };
  cycle: string;
  watering: string;
  depth_water_requirement: {
    unit: string;
    value: string;
  };
  volume_water_requirement: {
    unit: string;
    value: string;
  };
  watering_period: string;
  watering_general_benchmark: {
    value: string;
    unit: string;
  };
  plant_anatomy: Record<string, string>;
  sunlight: string[];
  pruning_month: string[];
  pruning_count: {
    amount: number;
    interval: string;
  };
  seeds: number;
  attracts: string[];
  propagation: string[];
  hardiness: {
    min: string;
    max: string;
  };
  hardiness_location: {
    full_url: string;
    full_iframe: string;
  };
  flowers: boolean;
  flowering_season: string;
  color: string;
  soil: string[];
  pest_susceptibility: string | null;
  cones: boolean;
  fruits: boolean;
  edible_fruit: boolean;
  fruit_color: string | null;
  fruiting_season: string | null;
  harvest_season: string | null;
  harvest_method: string;
  leaf: boolean;
  leaf_color: string[];
  edible_leaf: boolean;
  growth_rate: string;
  maintenance: string;
  medicinal: boolean;
  poisonous_to_humans: boolean;
  poisonous_to_pets: boolean;
  drought_tolerant: boolean;
  salt_tolerant: boolean;
  thorny: boolean;
  invasive: boolean;
  rare: boolean;
  rare_level: string;
  tropical: boolean;
  cuisine: boolean;
  indoor: boolean;
  care_level: string;
  description: string;
  default_image: {
    image_id: number;
    license: number;
    license_name: string;
    license_url: string;
    original_url: string;
    regular_url: string;
    medium_url: string;
    small_url: string;
    thumbnail: string;
  };
};

export type PlantCareResponse = {
  plantCare: PlantCare[];
};

export type PlantDetailsResponse = {
  plantDetails: PlantDetails;
}

export type PlantCareDetailImagesProps = {
  images : string[]
}

