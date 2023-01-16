import { Controller, Delete, Get, Patch, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';

@Controller('bookmarks')
@UseGuards(JwtGuard)
export class BookmarkController {
    @Get()
    getBookmarks() {

    }

    @Get()
    getBookmarkById() {

    }

    @Patch()
    editBookmarkById() {

    }

    @Delete()
    deleteBookmarkById() {

    }

}
