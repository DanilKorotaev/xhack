import { IsString, IsDate, IsArray, IsDateString } from "class-validator";
import { Tag } from "src/tags/models/tag.entity";

export class UpdateHackathonDto {
    @IsString()
    name: string;
    
    @IsString()
    description: string;

    @IsString()
    avatarUrl: string;

    @IsDateString()
    startDate: Date;

    @IsDateString()
    endDate: Date;
}
