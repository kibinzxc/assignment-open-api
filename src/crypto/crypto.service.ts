import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CryptoService {
    private readonly apiUrl = 'https://api.coingecko.com/api/v3';

    constructor(private readonly httpService: HttpService) { }

    // Fetch cryptocurrency data (e.g., prices)
    async getCryptoData(cryptoId: string): Promise<any> {
        try {
            const url = `${this.apiUrl}/coins/${cryptoId}`;
            const response = await firstValueFrom(
                this.httpService.get(url, {
                    headers: {
                        'x-api-key': process.env.COINGECKO_API_KEY,
                    },
                }),
            );
            return response.data;
        } catch (error) {
            throw new HttpException(
                error.response?.data?.message || 'Error fetching cryptocurrency data',
                error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    // Fetch market data for a specific cryptocurrency
    async getMarketData(cryptoId: string): Promise<any> {
        try {
            const url = `${this.apiUrl}/coins/markets`;
            const response = await firstValueFrom(
                this.httpService.get(url, {
                    params: {
                        vs_currency: 'usd',  // You can modify the currency here
                        ids: cryptoId,
                    },
                    headers: {
                        'x-api-key': process.env.COINGECKO_API_KEY,
                    },
                }),
            );
            return response.data;
        } catch (error) {
            throw new HttpException(
                error.response?.data?.message || 'Error fetching market data',
                error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    // Fetch historical market data for a specific cryptocurrency
    async getHistoricalData(cryptoId: string): Promise<any> {
        try {
            const url = `${this.apiUrl}/coins/${cryptoId}/market_chart`;
            const response = await firstValueFrom(
                this.httpService.get(url, {
                    params: {
                        vs_currency: 'usd',
                        days: '30',  // Adjust this as needed
                        interval: 'daily',  // You can change this to `minute`, `hourly`, etc.
                    },
                    headers: {
                        'x-api-key': process.env.COINGECKO_API_KEY,
                    },
                }),
            );
            return response.data;
        } catch (error) {
            throw new HttpException(
                error.response?.data?.message || 'Error fetching historical data',
                error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    // Fetch detailed information (description, links) about a cryptocurrency
    async getCoinInfo(cryptoId: string): Promise<any> {
        try {
            const url = `${this.apiUrl}/coins/${cryptoId}`;
            const response = await firstValueFrom(
                this.httpService.get(url, {
                    headers: {
                        'x-api-key': process.env.COINGECKO_API_KEY,
                    },
                }),
            );
            return response.data;
        } catch (error) {
            throw new HttpException(
                error.response?.data?.message || 'Error fetching coin info',
                error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    // Fetch global market data (total market cap, volume, etc.)
    async getGlobalMarketData(): Promise<any> {
        try {
            const url = `${this.apiUrl}/global`;
            const response = await firstValueFrom(
                this.httpService.get(url, {
                    headers: {
                        'x-api-key': process.env.COINGECKO_API_KEY,
                    },
                }),
            );
            return response.data;
        } catch (error) {
            throw new HttpException(
                error.response?.data?.message || 'Error fetching global market data',
                error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
