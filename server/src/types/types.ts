import { Request } from "express";
import { IUser } from "../models/User";
import { HydratedDocument } from "mongoose";

export enum HttpCode {
  OK = 200,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export interface ServerError extends Error {
  status: HttpCode;
  log?: string;
}

export interface UserRegistrationRequestBody {
  userName: string;
  email: string;
  password: string;
}

export interface UserLoginRequestBody {
  email: string;
  password: string;
}

// export interface UserRequest extends Request {
//   cookies: { refreshToken: string };
// }

export type Images = {
  url: string;
  public_id: string;
};

export interface PassportRequest extends Request {
  user: HydratedDocument<IUser>;
}

export type ImageRequestBody = {
  organTypes: string;
};

export type PlantIdResults = [
  {
    score: number;
    species: {
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
  },
];

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

export type CreatePlantBody = {
  commonNames: string[];
  scientificName: string;
  genus: string;
  postedBy: string;
  apiImages: string[];
  cloudinaryImages: string[];
};

export type CreatePlantNoteBody = {
  idDate: Date;
  idPlace: string;
  note: string;
  postedBy: string;
  plantID: string;
};

export type PerenualPlantCareData = {
  id: number;
  species_id: number;
  common_name: string;
  scientific_name: string[];
  section: {
    id: number;
    type: string;
    description: string;
  }[];
};

export type PerenualPlantCareResponse = {
  data: PerenualPlantCareData[];
  to: number;
  per_page: number;
  current_page: number;
  from: number;
  last_page: number;
  total: number;
};

export type PerenualPlantListData = {
  id: number;
  common_name: string;
  scientific_name: string[];
  other_name: string[] | null;
  cycle: string;
  watering: string;
  sunlight: string[];
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

export type PerenualPlantListResponse = {
  data: PerenualPlantListData[];
  to: number;
  per_page: number;
  current_page: number;
  from: number;
  last_page: number;
  total: number;
};

export type SetOptionsType = {
  maxAge: number;
};
