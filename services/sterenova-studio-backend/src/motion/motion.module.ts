import { Module } from '@nestjs/common';
import { MotionService } from './motion.service';
import { MotionController } from './motion.controller';

@Module({
	providers: [MotionService],
	controllers: [MotionController],
	exports: [MotionService],
})
export class MotionModule {} 