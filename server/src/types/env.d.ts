export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_PRIVATE_KEY: string;
      CLOUD_NAME: string;
      CLOUDINARY_API_KEY: string;
      CLOUDINARY_API_SECRET: string;
      SESSION_SECRET: string;
      SALT_ROUNDS: number;
      DB_STRING: string;
      PERENUAL_API_KEY: string;
      PERENUAL_API_KEY_2: string;
      PERENUAL_API_KEY_3: string;
    }
  }
}

// https://dev.to/deepak22448/typescript-and-processenv-a-match-made-in-nodejs-heaven-1h7h
