import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { tmpdir } from 'os';
import { join, resolve } from 'path';
import { spawn } from 'child_process';

async function findPythonCmd(): Promise<string> {
	const candidates = ['/opt/venv/bin/python', '/opt/venv/bin/python3', 'python3'];
	for (const cmd of candidates) {
		try {
			if (cmd.startsWith('/')) {
				await fs.access(cmd);
				return cmd;
			}
			// Non-absolute: rely on PATH; return directly
			return cmd;
		} catch {}
	}
	return 'python3';
}

@Injectable()
export class MotionService {
	async generateVideo(config: any): Promise<string> {
		const tmp = tmpdir();
		const cfgPath = join(tmp, `motion_cfg_${Date.now()}.json`);
		const outPath = join(tmp, `motion_out_${Date.now()}.mp4`);
		await fs.writeFile(cfgPath, JSON.stringify(config, null, 2), 'utf-8');
		const script = resolve(process.cwd(), 'motion', 'generate_video.py');

		const pythonCmd = await findPythonCmd();

		await new Promise<void>((resolvePromise, reject) => {
			const proc = spawn(pythonCmd, [script, cfgPath, outPath], {
				stdio: 'inherit',
				env: { ...process.env, PATH: `/opt/venv/bin:${process.env.PATH ?? ''}` },
			});
			proc.on('exit', (code) => {
				if (code === 0) resolvePromise();
				else reject(new Error(`Generator exited with code ${code}`));
			});
			proc.on('error', (err) => reject(err));
		});
		return outPath;
	}
} 