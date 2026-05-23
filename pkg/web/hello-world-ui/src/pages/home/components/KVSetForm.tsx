import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { SetValues } from '@/processes/api/kv';
import s from './KVSetForm.module.scss';

export default function KVSetForm() {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  const mutation = useMutation({
    mutationFn: () => SetValues([{ key: key.trim(), value: value.trim() }]),
    onSuccess: () => {
      setKey('');
      setValue('');
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!key.trim()) return;
    mutation.mutate();
  }

  return (
    <section className={s.KVSetFormContainer}>
      <h2 className={s.SectionTitle}>Set value</h2>
      <form className={s.FormWrapper} onSubmit={handleSubmit}>
        <div className={s.FieldWrapper}>
          <label className={s.Label} htmlFor="set-key">Key</label>
          <input
            id="set-key"
            className={s.Input}
            type="text"
            placeholder="e.g. greeting"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
        </div>
        <div className={s.FieldWrapper}>
          <label className={s.Label} htmlFor="set-value">Value</label>
          <input
            id="set-value"
            className={s.Input}
            type="text"
            placeholder="e.g. hello, world"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <button
          className={s.Button}
          type="submit"
          disabled={mutation.isPending || !key.trim()}
        >
          {mutation.isPending ? 'Saving…' : 'Set'}
        </button>
      </form>
      {mutation.isSuccess && (
        <p className={s.StatusSuccess}>Saved successfully.</p>
      )}
      {mutation.isError && (
        <p className={s.StatusError}>Error: {String(mutation.error)}</p>
      )}
    </section>
  );
}
