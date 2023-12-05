import { Injectable } from '@angular/core';

import { LocalStorageKeys } from 'src/app/shared/enums/enums';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  getIsDarkTheme() {
    return localStorage.getItem('isDark');
  }

  setItem(key: string, value: string) {
    return localStorage.setItem(key, value);
  }

  getIconLogout() {
    return localStorage.getItem(LocalStorageKeys.BUTTON);
  }

  removeIconLogout() {
    return localStorage.removeItem(LocalStorageKeys.BUTTON);
  }

  removeItemToken() {
    return localStorage.removeItem(LocalStorageKeys.TOKEN);
  }

  getItemToken() {
    return localStorage.getItem(LocalStorageKeys.TOKEN);
  }

  removeItemUid() {
    return localStorage.removeItem(LocalStorageKeys.UID);
  }

  getItemUid() {
    return localStorage.getItem(LocalStorageKeys.UID);
  }

  removeItemEmail() {
    return localStorage.removeItem(LocalStorageKeys.EMAIL);
  }

  getItemEmail() {
    return localStorage.getItem(LocalStorageKeys.EMAIL);
  }
}
