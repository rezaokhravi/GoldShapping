// @ts-ignore
import * as CryptoJS from 'crypto-js';
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class EncodeService {

  private encryptSecretKey:string = 'P@55w0rd:)'

  public encryptData(data:any) {
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), this.encryptSecretKey).toString();
    } catch (e) {
    }
  }

  public decryptData(data:any) {
    try {
      const bytes = CryptoJS.AES.decrypt(data, this.encryptSecretKey);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
    }
  }
}
