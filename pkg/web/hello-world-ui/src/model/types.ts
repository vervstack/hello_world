export type DbMode = 'sqlite' | 'postgres';

export interface AppInfo {
  version: string;
  dbMode: DbMode;
}

export interface KVPair {
  key: string;
  value: string;
}
