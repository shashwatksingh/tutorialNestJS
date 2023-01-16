import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EditBookmarkDTO {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  link?: string;
}
