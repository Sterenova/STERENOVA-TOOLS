import { Body, Controller, Post, Res, BadRequestException } from '@nestjs/common';
import type { Response } from 'express';
import { MotionService } from './motion.service';

@Controller('motion')
export class MotionController {
	constructor(private readonly service: MotionService) {}

	@Post('generate')
	async generate(@Body() body: any, @Res() res: Response) {
		if (!body || typeof body !== 'object' || !body.scene) {
			throw new BadRequestException({ message: 'Missing body or scene. Provide a JSON config like in motion/configs examples.' });
		}
		const out = await this.service.generateVideo(body);
		res.download(out, body?.downloadName || 'motion.mp4');
	}
} 