import { Body, Controller, Get, Post, Delete, Put } from '@nestjs/common';
import { Ranking } from './schemas/ranking.schema';
import { RankingService } from './ranking.service';

@Controller('ranking')
export class RankingController {
    constructor(private readonly rankingService: RankingService) { }

    @Get()
    async getAllRanking(): Promise<Ranking[]> {
        return this.rankingService.getAll();
    }

    @Post()
    async createRanking(@Body() ranking): Promise<Ranking> {
        return this.rankingService.create(ranking);
    }

    @Put('edit')
    async edit(@Body() ranking): Promise<any> {
        return this.rankingService.edit(ranking);
    }

    @Delete('remove')
    async remove(id: number): Promise<any> {
        return this.rankingService.delete(id);
    }
}
