import { Controller, Get, Post, Put, Delete, Body } from '@nestjs/common';
import { PhysicalDataService } from './physical_data.service';
import { PhysicalData } from './schemas/physical.schema';

@Controller('physical-data')
export class PhysicalDataController {
    constructor(private readonly physicalDataService: PhysicalDataService) { }

    @Get()
    async getAllPhysicalData(): Promise<PhysicalData[]> {
        return this.physicalDataService.getAll();
    }

    @Post()
    async createPhysicalData(@Body() PhysicalData): Promise<PhysicalData> {
        return await this.physicalDataService.insertPhysicalDataAndCheckRanking(PhysicalData);
    }

    @Put('edit')
    async edit(@Body() PhysicalData): Promise<any> {
        return this.physicalDataService.edit(PhysicalData);
    }

    @Delete('remove')
    async remove(id: number): Promise<any> {
        return this.physicalDataService.delete(id);
    }
}
