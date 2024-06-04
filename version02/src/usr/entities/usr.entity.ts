import { usr } from '@prisma/client';

export class Usr implements usr {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  birthAt: Date;
  role: number;
  createdAt: Date;
  updatedAt: Date;
}
