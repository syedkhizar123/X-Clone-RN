import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
    PORT: process.env.PORT,
    DB_URI: process.env.DB_URI,
    NODE_ENV: process.env.NODE_ENV,

    CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY || 'pk_test_9sHj8n7a2mXo5vZt3qzj1w6s5e',
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,

    MONGO_URI: process.env.MONGO_URI,

    ARCJET_ENV: process.env.ARCJET_ENV,
    ARCJET_KEY: process.env.ARCJET_KEY,


    CLOUDINARY_CLOUD_NAME : process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY : process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET : process.env.CLOUDINARY_API_SECRET,
}