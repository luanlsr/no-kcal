import { Controller, Get } from '@nestjs/common';
import { RankingDetails } from './schemas/ranking-details.schema';
import { RankingDetailsService } from './ranking-details.service';

@Controller('ranking-details')
export class RankingDetailsController {
    constructor(private readonly rankingdetailsService: RankingDetailsService) { }

    @Get()
    async getAllRanking(): Promise<RankingDetails[]> {
        return this.rankingdetailsService.getAll();
    }
}
