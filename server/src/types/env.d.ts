export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_PRIVATE_KEY: string;
      CLOUD_NAME: string;
      CLOUDINARY_API_KEY: string;
      CLOUDINARY_API_SECRET: string;
      JWT_ACCESS_SECRET: string;
      JWT_REFRESH_SECRET: string;
      SALT_ROUNDS: number; 
      DB_STRING: string; 
      ENV: "test" | "development" | "production";
    }
  }
}

// https://dev.to/deepak22448/typescript-and-processenv-a-match-made-in-nodejs-heaven-1h7h