import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CryptoService } from './crypto/crypto.service';
import { CryptoController } from './crypto/crypto.controller';

@Module({
  imports: [HttpModule],  // Import HttpModule here
  providers: [CryptoService],
  controllers: [CryptoController],
})
export class AppModule { }
