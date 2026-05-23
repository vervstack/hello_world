import { helloWorldAPI } from '@/app/api/hello_world_api.pb';
import type { AppInfo, DbMode } from '@/model/types';

export async function FetchAppInfo(): Promise<AppInfo> {
  const [versionRes, infoRes] = await Promise.all([
    helloWorldAPI.Version({}),
    fetch('/info').then((r) => r.json() as Promise<{ dbMode: DbMode }>),
  ]);

  return {
    version: versionRes.version ?? 'unknown',
    dbMode: infoRes.dbMode,
  };
}
