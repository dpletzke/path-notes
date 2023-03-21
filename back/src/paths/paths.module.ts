import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PathsService } from './paths.service';
import { PathsController } from './paths.controller';
import { Path } from './entities/path.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Path])],
  providers: [PathsService],
  controllers: [PathsController],
})
export class PathsModule {}
