import {IsDate, IsDateString, IsNotEmpty, IsString} from "class-validator";

export class CreateHackathonDto {
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsString()
    description: string;

    @IsString()
    avatarUrl: string;

    @IsDateString()
    startDate: string;

    @IsDateString()
    endDate: string;
}
