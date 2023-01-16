import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';

@Controller('bookmarks')
@UseGuards(JwtGuard)
export class BookmarkController {
  @Get()
  getBookmarks() {}

  @Post()
  createBookmark() {}

  @Get()
  getBookmarkById() {}

  @Patch()
  editBookmarkById() {}

  @Delete()
  deleteBookmarkById() {}
}
