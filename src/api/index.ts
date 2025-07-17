import { CustomApi } from "./CustomApi";

export class AppApi {
  private static _instance: InstanceType<typeof CustomApi>;

  static init(): InstanceType<typeof CustomApi> {
    if (this._instance) {
      return this._instance;
    }
    this._instance = new CustomApi();
    return this._instance;
  }

  static get instance() {
    return this._instance;
  }
}

export const api = AppApi.init();
