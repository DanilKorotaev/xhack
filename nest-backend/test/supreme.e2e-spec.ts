import {AppModule} from "../src/app.module";
import {NestFactory} from "@nestjs/core";
import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: require('path').resolve('./.testingENV') });

const TESTING_PORT = process.env.TESTING_PORT;

describe('Team creation', () => {
  const httpClient = axios.create({
    baseURL: `http://localhost:${TESTING_PORT}`
  });

  beforeAll(async () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    await app.listen(TESTING_PORT);
  });

  it('Returns list of hackathons', async () => {
    const response = await httpClient.post('/api/hackathons/get-list');
    expect(response.data.length).toBe(0);
  });
});

describe('Authorization', () => {
  const httpClient = axios.create({
    baseURL: `http://localhost:${TESTING_PORT}`
  });

  beforeAll(async () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    await app.listen(TESTING_PORT);
  });
});
