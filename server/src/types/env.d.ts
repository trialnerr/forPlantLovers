export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_PRIVATE_KEY: string;
      CLOUD_NAME: string;
      CLOUDINARY_API_KEY: string;
      CLOUDINARY_API_SECRET: string;
      JWT_SECRET: string;
      SALT_ROUNDS: number; 
      DB_STRING: string; 
      ENV: "test" | "development" | "production";
    }
  }
}
