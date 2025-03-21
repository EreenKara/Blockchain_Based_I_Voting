// hooks/useAsync.ts
import {useState, useCallback, useRef} from 'react';
import {parseApiError} from '@utility/error.handler';

type AsyncFunction<T> = (...args: any[]) => Promise<T>;

interface UseAsyncOptions<T> {
  onSuccess?: (result: T) => void;
  onError?: (errorMessage: string) => void;
  manual?: boolean;
}

export function useAsync<T>(
  asyncFunction: AsyncFunction<T>,
  options?: UseAsyncOptions<T>,
) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);
  const lastArgsRef = useRef<any[]>([]); // Retry için son parametreleri sakla

  const execute = useCallback(
    async (...args: any[]) => {
      setLoading(true);
      setError(null);
      lastArgsRef.current = args;

      try {
        const result = await asyncFunction(...args);
        setData(result);
        options?.onSuccess?.(result);
        return result;
      } catch (err) {
        const message = parseApiError(err);
        setError(message);
        options?.onError?.(message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [asyncFunction],
  );

  const retry = useCallback(() => {
    if (lastArgsRef.current.length > 0) {
      execute(...lastArgsRef.current);
    }
  }, [execute]);

  return {
    execute,
    retry,
    loading,
    error,
    data,
  };
}
