import type { AppInfo } from '@/model/types';
import DbBadge from './DbBadge';
import s from './AppHeader.module.scss';

interface Props {
  info: AppInfo | undefined;
  isLoading: boolean;
}

export default function AppHeader({ info, isLoading }: Props) {
  return (
    <header className={s.AppHeaderContainer}>
      <div className={s.TitleWrapper}>
        <h1 className={s.Title}>hello_world</h1>
        <span className={s.Subtitle}>Vervstack demo service</span>
      </div>
      <div className={s.MetaWrapper}>
        {isLoading && <span className={s.Loading}>loading…</span>}
        {info && (
          <>
            <span className={s.Version}>{info.version}</span>
            <DbBadge mode={info.dbMode} />
          </>
        )}
      </div>
    </header>
  );
}
