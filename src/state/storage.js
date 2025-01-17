import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV({
  id: 'musify',
  encryptionKey: 'my-super-secret-key',
});

export const mmkvStorage = {
  setItem: (key, value) => storage.set(key, value),
  getItem: key => storage.getString(key),
  removeItem: key => storage.delete(key),
};
