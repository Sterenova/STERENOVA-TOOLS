import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { User } from '../../users/user.entity';

@Entity('svg_settings')
@Unique(['userId', 'settingKey'])
export class SvgSettings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  settingKey: string;

  @Column({ type: 'varchar', length: 255 })
  settingName: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'jsonb' })
  value: any;

  @Column({ type: 'varchar', length: 50, default: 'string' })
  valueType: 'string' | 'number' | 'boolean' | 'object' | 'array';

  @Column({ type: 'boolean', default: false })
  isGlobal: boolean;

  @Column({ type: 'varchar', length: 100, nullable: true })
  category: string;

  @Column({ type: 'int', default: 0 })
  priority: number;

  @ManyToOne(() => User, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'uuid', nullable: true })
  userId: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
} 