import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, BookmarkModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
