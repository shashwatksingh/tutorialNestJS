import { ValidationPipe } from '@nestjs/common';
import { NestApplication } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from '../src/app.module';
import * as pactum from 'pactum';
import { AuthDTO } from '../src/auth/dto';

describe('App e2e', () => {
  let app: NestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
    await app.listen(4002);
    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:4002');
  });

  it.todo('should pass');
  describe('Auth', () => {
    const dto: AuthDTO = {
      email: 'shashwat@gmail.com',
      password: 'Hello@123',
    };
    describe('Signup', () => {
      it('should sign up', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201)
          .inspect();
      });
      it('should throw exception if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ password: dto.password })
          .expectStatus(400)
          .inspect();
      });
      it('should throw exception if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ email: dto.email })
          .expectStatus(400)
          .inspect();
      });
      it('should throw exception if body missing', () => {
        return pactum.spec().post('/auth/signup').expectStatus(400).inspect();
      });
    });
    describe('Signin', () => {
      it('should sign in', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .inspect()
          .stores('userAccessToken', 'access_token');
      });
      it('should throw exception if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ password: dto.password })
          .expectStatus(400)
          .inspect();
      });
      it('should throw exception if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ email: dto.email })
          .expectStatus(400)
          .inspect();
      });
      it('should throw exception if body missing', () => {
        return pactum.spec().post('/auth/signin').expectStatus(400).inspect();
      });
    });
  });
  describe('Bookmarks', () => {
    describe('create bookmark', () => {});
    describe('get bookmarks', () => {});
    describe('fetch bookmark by ID', () => {});
    describe('edit bookmark', () => {});
    describe('delete bookmark', () => {});
  });
  describe('User', () => {
    describe('me', () => {
      it('should get currrent user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .expectStatus(200)
          .withHeaders({
            Authorization: 'Bearer $S{userAccessToken}',
          })
          .inspect();
      });
    });
    describe('edit user', () => {});
  });
  afterAll(() => {
    app.close();
  });
});
