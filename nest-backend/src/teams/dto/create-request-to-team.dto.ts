import {ID} from "../../typings";
import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber, IsString} from "class-validator";

/**
 * CreateRequestToTeamDto
 */
export class CreateRequestToTeamDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  teamId: number;
}
