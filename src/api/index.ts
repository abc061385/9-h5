import axiosIn from "@/lib/axios";
import { Api } from "./ApiClient";

export class AppApi {
  private static _instance: InstanceType<typeof Api>;

  static init(): InstanceType<typeof Api> {
    if (this._instance) {
      return this._instance;
    }
    this._instance = new Api({
      axiosInstance: axiosIn,
    });
    return this._instance;
  }

  static get instance() {
    return this._instance;
  }
}

export const api = AppApi.init();
