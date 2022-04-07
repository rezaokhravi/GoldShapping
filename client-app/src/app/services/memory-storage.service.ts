import {Injectable} from '@angular/core';
import {EncodeService} from "./encode.service";


@Injectable({
  providedIn: 'root'
})

export class MemoryStorageService {

  constructor(public enCode:EncodeService) {}

  setLocalStorage(key: string, data: any): void {
    try {
      localStorage.setItem(key, this.enCode.encryptData(data));
    } catch (e) {}
  }

  getLocalStorage(key: string) {
    try {
      return this.enCode.decryptData(localStorage.getItem(key));
    } catch (e) {
      return null;
    }
  }

  removeLocalStorage(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (e) {}
  }

  removeAllLocalStorage() {
    try {
      localStorage.clear();
    } catch (e) {}
  }

  setSessionStorage(key: string, data: any): void {
    try {

      sessionStorage.setItem(key, this.enCode.encryptData(data));
    } catch (e) {}
  }
  setSessionStorageWithOutEncryptData(key: string, data: any): void {
    try {
      sessionStorage.setItem(key, data);
    } catch (e) {}
  }

  getSessionStorage(key: string) {
    try {
      return this.enCode.decryptData(sessionStorage.getItem(key));
    } catch (e) {
      return null;
    }
  }

  getSessionStorageWithOutDecryptData(key: string) {
    try {
      return sessionStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  removeSessionStorage(key: string) {
    try {
      sessionStorage.removeItem(key);
    } catch (e) {}
  }

  removeAllSessionStorage() {
    try {
      sessionStorage.clear();
    } catch (e) {}
  }

  removeAllStorage() {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {}
  }

}
