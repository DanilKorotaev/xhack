import {ID} from "../../typings";
import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber} from "class-validator";

/**
 * CreateRequestToUserDto
 */
export class CreateRequestToUserDto {
  @ApiProperty({
    type: 'number',
    description: 'User id',
  })
  @IsNotEmpty({
    message: 'User id cannot be empty!',
  })
  @IsNumber()
  userId: ID;

  @ApiProperty({
    type: 'number',
    description: 'Team id',
  })
  @IsNotEmpty({
    message: 'Team id cannot be empty!',
  })
  @IsNumber()
  teamId: ID;
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJ0ZXN0QHRlc3QudGVzdCIsImlhdCI6MTYwNjI0NDMyN30.d0id_EmYOp_HNJ8kbr5yzIbAMHH4aP5_yGyHljrEJ2k
