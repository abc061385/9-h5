import { ApiCustom } from "./ApiCustom";

export class AppApi {
  private static _instance: InstanceType<typeof ApiCustom>;

  static init(): InstanceType<typeof ApiCustom> {
    if (this._instance) {
      return this._instance;
    }
    this._instance = new ApiCustom();
    return this._instance;
  }

  static get instance() {
    return this._instance;
  }
}

export const api = AppApi.init();
