import { UUID } from 'crypto';

export class CreateUsrDto {
  id: UUID;
  name: string;
  username: string;
  password: string;
}
