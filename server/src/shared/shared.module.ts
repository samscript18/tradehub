import { Module } from '@nestjs/common';
import { UtilService } from 'src/shared/services/utils.service';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { FileService } from './file/file.service';
import { FileProvider } from './file/file.provider';

@Module({
   imports: [ConfigModule, MailModule],
   providers: [UtilService, FileProvider, FileService],
   exports: [MailModule, UtilService, FileService],
})
export class SharedModule {}
