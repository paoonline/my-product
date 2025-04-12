import { IsNotEmpty, IsString, Length, IsUUID } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(0, 255)
  description: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 2) // ISO 639-1 language code (e.g. 'en', 'th')
  lang: string;
}