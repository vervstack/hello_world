import type { DbMode } from '@/model/types';
import s from './DbBadge.module.scss';

interface Props {
  mode: DbMode;
}

export default function DbBadge({ mode }: Props) {
  return (
    <span className={`${s.DbBadgeContainer} ${mode === 'postgres' ? s.postgres : s.sqlite}`}>
      {mode === 'postgres' ? 'PostgreSQL' : 'SQLite'}
    </span>
  );
}
