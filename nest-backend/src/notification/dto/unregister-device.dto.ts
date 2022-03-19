import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UnregisterDeviceDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    token: string;
}