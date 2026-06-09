import {useEffect, useState} from 'react';
import type {Dispatch, SetStateAction} from 'react';
import {loadJSON, saveJSON} from './storage';

export function usePersistentState<T>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>, boolean] {
  const [value, setValue] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let mounted = true;

    loadJSON(key, initialValue).then(storedValue => {
      if (mounted) {
        setValue(storedValue);
        setHydrated(true);
      }
    });

    return () => {
      mounted = false;
    };
  }, [initialValue, key]);

  useEffect(() => {
    if (hydrated) {
      saveJSON(key, value);
    }
  }, [hydrated, key, value]);

  return [value, setValue, hydrated];
}
