import {Body, Controller, Get, Post, UseGuards, UseInterceptors, ValidationPipe} from '@nestjs/common';
import {CreateNewsDto} from "../dto/create-news.dto";
import {NewsService} from "../services/news.service";
import {LoggingInterceptor} from "../../common/interceptors/logging.interceptor";
import {AdminGuard} from "../../common/guards/admin.guard";
import { ApiOperation } from '@nestjs/swagger';

@Controller('news')
@UseInterceptors(LoggingInterceptor)
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get()
  @ApiOperation({
    summary: 'List news',
    tags: [NewsController.name],
  })
  async listNews(/*@Body() newsListFilterDto: NewsListFilterDto*/) {
    return this.newsService.listNews({});
  }

  @Post()
  @UseGuards(AdminGuard)
  @ApiOperation({
    summary: 'Create news',
    tags: [NewsController.name],
  })
  async createNews(@Body(ValidationPipe) createNewsDTO: CreateNewsDto) {
    return this.newsService.createNews(createNewsDTO);
  }

}
