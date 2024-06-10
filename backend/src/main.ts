import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';

dotenv.config(); // Load .env file

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: process.env.SESSION_SECRET, // Use the secret key from the environment variable
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }, // Set to true if using HTTPS
    }),
  );
  app.use(cookieParser());

  
  app.use(
    cors({
      origin: `${process.env.CLIENT_URL}`, // Allow requests from your frontend
      credentials: true,
    }),
  );
  app.listen(3000, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:3000`);
  });

  // await app.listen(3000);
}
bootstrap();
