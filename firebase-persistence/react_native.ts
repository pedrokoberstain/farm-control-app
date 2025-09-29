/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import type { Persistence, ReactNativeAsyncStorage } from 'firebase/auth';
import {
    PersistenceInternal,
    PersistenceType,
    PersistenceValue,
    STORAGE_AVAILABLE_KEY,
    StorageEventListener
} from './index'; // <-- Importação corrigida

export function getReactNativePersistence(
  storage: ReactNativeAsyncStorage
): Persistence {
  return class implements PersistenceInternal {
    static type: 'LOCAL' = 'LOCAL';
    readonly type: PersistenceType = PersistenceType.LOCAL;

    async _isAvailable(): Promise<boolean> {
      try {
        if (!storage) {
          return false;
        }
        await storage.setItem(STORAGE_AVAILABLE_KEY, '1');
        await storage.removeItem(STORAGE_AVAILABLE_KEY);
        return true;
      } catch {
        return false;
      }
    }

    _set(key: string, value: PersistenceValue): Promise<void> {
      return storage.setItem(key, JSON.stringify(value));
    }

    async _get<T extends PersistenceValue>(key: string): Promise<T | null> {
      const json = await storage.getItem(key);
      return json ? JSON.parse(json) : null;
    }

    _remove(key: string): Promise<void> {
      return storage.removeItem(key);
    }

    _addListener(_key: string, _listener: StorageEventListener): void {
      // Listeners are not supported for React Native storage.
      return;
    }

    _removeListener(_key: string, _listener: StorageEventListener): void {
      // Listeners are not supported for React Native storage.
      return;
    }
  };
}