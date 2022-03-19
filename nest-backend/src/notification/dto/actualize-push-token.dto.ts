import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty, IsString } from "class-validator";

export class ActualizePushTokenDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    currentToken: string

    @ApiProperty()
    @IsString()
    @IsEmpty()
    oldToken: string
}