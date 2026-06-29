import { useEffect, useState } from 'react';

export interface QueryState<T> {
  data: T | undefined;
  loading: boolean;
  error: Error | null;
  /** Re-run the fetcher. */
  refetch: () => void;
}

/**
 * Minimal data-fetching hook for the mock API layer.
 *
 * @param fetcher  Function returning a Promise of the data.
 * @param deps     Dependency list — the fetcher re-runs when these change.
 */
export function useQuery<T>(fetcher: () => Promise<T>, deps: unknown[] = []): QueryState<T> {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetcher()
      .then((result) => {
        if (!cancelled) {
          setData(result);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error(String(err)));
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, tick]);

  return { data, loading, error, refetch: () => setTick((t) => t + 1) };
}
