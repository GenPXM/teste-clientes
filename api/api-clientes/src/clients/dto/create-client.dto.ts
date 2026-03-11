import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateClientDto {
  @ApiProperty({
    example: 'João Silva',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'joao@email.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '999999999',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    example: 'Rua das Flores, 123',
  })
  @IsString()
  address: string;
}
