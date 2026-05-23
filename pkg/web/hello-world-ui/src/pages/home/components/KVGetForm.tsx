import { useState } from 'react';
import { GetValue } from '@/processes/api/kv';
import type { KVPair } from '@/model/types';
import s from './KVGetForm.module.scss';

export default function KVGetForm() {
  const [key, setKey] = useState('');
  const [result, setResult] = useState<KVPair | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = key.trim();
    if (!trimmed) return;

    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      const pair = await GetValue(trimmed);
      setResult(pair);
    } catch {
      setError('Key not found.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className={s.KVGetFormContainer}>
      <h2 className={s.SectionTitle}>Get value</h2>
      <form className={s.FormWrapper} onSubmit={handleSubmit}>
        <div className={s.FieldWrapper}>
          <label className={s.Label} htmlFor="get-key">Key</label>
          <input
            id="get-key"
            className={s.Input}
            type="text"
            placeholder="e.g. greeting"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
        </div>
        <button
          className={s.Button}
          type="submit"
          disabled={isLoading || !key.trim()}
        >
          {isLoading ? 'Looking up…' : 'Get'}
        </button>
      </form>
      {result && (
        <div className={s.ResultWrapper}>
          <span className={s.ResultKey}>{result.key}</span>
          <span className={s.ResultSeparator}>=</span>
          <span className={s.ResultValue}>{result.value}</span>
        </div>
      )}
      {error && <p className={s.StatusError}>{error}</p>}
    </section>
  );
}
