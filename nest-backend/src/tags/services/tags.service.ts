import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Hackathon } from '../../hackathons/models/hackathon.entity';
import { Connection, Repository } from 'typeorm';
import { User } from '../../users/models/user.entity';
import { ID } from '../../typings';
import { Tag } from '../models/tag.entity';

const _ = require('lodash')

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Hackathon)
    private hackathonRepository: Repository<Hackathon>,
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,

    @InjectConnection()
    private typeormConnection: Connection,
  ) {}

  async getTagsList() {
    return (await this.tagRepository.find()).map(tag => {
      return {
        name: tag.name,
        id: tag.id
      }
    }) 
  }

  async addTagsForUser(userId: ID, tagIds: ID[]) {
    const user = await this.userRepository.findOne(userId, {
      relations: ['tags'],
    });

    const tags = tagIds.map(id => ({
      userTagId: id,
      userId,
    }));

    console.log(tags);

    await this.typeormConnection
      .createQueryBuilder()
      .insert()
      .into('user_to_tag')
      .values(tags)
      .execute();
    return;
  }

  async addUserTag(tagName: string) {
    await this.tagRepository.save(
      this.tagRepository.create({
        name: tagName,
      }),
    );
  }

  async addTagForHackathon(hackathonId: ID, tagId: ID) {
    const hack = await this.hackathonRepository.findOne(hackathonId, {
      relations: ['tags'],
    });
    const tagAlreadyAttach = hack.tags.find(x => x.id === tagId);
    if (tagAlreadyAttach) return;

    await this.typeormConnection
      .createQueryBuilder()
      .insert()
      .into('hackathon_to_tag')
      .values({
        hackathonId,
        tagId,
      })
      .execute();
    return;
  }

  async addHackathonTag(tagName: string) {
    await this.tagRepository.save(
      this.tagRepository.create({
        name: tagName,
      }),
    );
  }

  async createTags(names: string[]) {
    const tags = names.map(tag => {return {name: tag}})
    await this.tagRepository.save(this.tagRepository.create(tags))
  }
}
