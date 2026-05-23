import { useQuery } from '@tanstack/react-query';
import { FetchAppInfo } from '@/processes/api/info';
import AppHeader from './components/AppHeader';
import KVSetForm from './components/KVSetForm';
import KVGetForm from './components/KVGetForm';
import s from './HomePage.module.scss';

export default function HomePage() {
  const infoQuery = useQuery({
    queryKey: ['appInfo'],
    queryFn: FetchAppInfo,
  });

  return (
    <div className={s.HomeContainer}>
      <AppHeader info={infoQuery.data} isLoading={infoQuery.isLoading} />
      <main className={s.MainWrapper}>
        <KVSetForm />
        <KVGetForm />
      </main>
    </div>
  );
}
