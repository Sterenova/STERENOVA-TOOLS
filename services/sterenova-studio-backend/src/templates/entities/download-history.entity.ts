import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/user.entity';

@Entity('download_history')
export class DownloadHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  templateName: string;

  @Column({ type: 'varchar', length: 100 })
  templateCategory: 'post' | 'story';

  @Column({ type: 'jsonb', nullable: true })
  templateParameters: Record<string, any>;

  @Column({ type: 'varchar', length: 255, nullable: true })
  fileName: string;

  @Column({ type: 'varchar', length: 50, default: 'svg' })
  fileFormat: string;

  @Column({ type: 'int', nullable: true })
  fileSize: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  ipAddress: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  userAgent: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'uuid', nullable: true })
  userId: string;

  @CreateDateColumn({ type: 'timestamptz' })
  downloadedAt: Date;
} 