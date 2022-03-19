import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {News} from "../models/news.entity";
import {Repository} from "typeorm";
import {NewsListFilterDto} from "../dto/news-list-filter.dto";
import {CreateNewsDto} from "../dto/create-news.dto";
import {UpdateNewsDto} from "../dto/update-news.dto";
import {ID} from "../../typings";

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private newsRepository: Repository<News>
  ) {}

  async listNews(newsListFilterDto: NewsListFilterDto) {
    return this.newsRepository.find({});
  }

  async createNews(createNewsDto: CreateNewsDto) {
    return this.newsRepository.create(createNewsDto);
  }

  async updateNewsById(newsId: ID, updateNewsDto: UpdateNewsDto) {
    return this.newsRepository.update(newsId, updateNewsDto);
  }
}
