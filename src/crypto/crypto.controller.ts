import { Controller, Get, Param } from '@nestjs/common';
import { CryptoService } from './crypto.service';

@Controller('crypto')
export class CryptoController {
    constructor(private readonly cryptoService: CryptoService) { }

    // Endpoint to get cryptocurrency data by id (e.g., bitcoin, ethereum)
    @Get(':id')
    async getCryptoData(@Param('id') id: string) {
        return await this.cryptoService.getCryptoData(id);
    }

    // Endpoint to get market data for a cryptocurrency
    @Get('market/:id')
    async getMarketData(@Param('id') id: string) {
        return await this.cryptoService.getMarketData(id);
    }

    // Endpoint to get historical market data for a cryptocurrency
    @Get('historical/:id')
    async getHistoricalData(@Param('id') id: string) {
        return await this.cryptoService.getHistoricalData(id);
    }

    // Endpoint to get detailed information about a cryptocurrency
    @Get('info/:id')
    async getCoinInfo(@Param('id') id: string) {
        return await this.cryptoService.getCoinInfo(id);
    }

    // Endpoint to get global market data (total market cap, volume, etc.)
    @Get('global')
    async getGlobalMarketData() {
        return await this.cryptoService.getGlobalMarketData();
    }
}
