import { helloWorldAPI } from '@/app/api/hello_world_api.pb';
import type { KVPair } from '@/model/types';

export async function GetValue(key: string): Promise<KVPair> {
  const res = await helloWorldAPI.Get({ key });
  return { key: res.key ?? key, value: res.value ?? '' };
}

export async function SetValues(pairs: KVPair[]): Promise<void> {
  await helloWorldAPI.Set({
    vals: { values: pairs.map((p) => ({ key: p.key, value: p.value })) },
  });
}
