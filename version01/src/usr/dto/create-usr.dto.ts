import { UUID } from 'crypto';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class CreateUsrDto {
  @IsString()
  id: UUID;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minSymbols: 1,
  })
  password: string;
}
