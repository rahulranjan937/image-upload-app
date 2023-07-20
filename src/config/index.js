import { config } from 'dotenv';

const PATH = '.env';

if (!PATH) {
  throw new Error('The .env file is missing');
}

config({ path: PATH });

export const { MONGODB_URI, JWT_SECRET, NODE_ENV } = process.env;
