import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Provider } from '@nestjs/common';

export const PrismaProvider: Provider = {
  provide: PrismaClient,
  useFactory() {
    const connectionString = process.env.DATABASE_URL;
    const adapter = new PrismaPg({ connectionString });
    return new PrismaClient({ adapter });
  },
};
