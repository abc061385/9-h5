import axiosIn from "@/lib/axios";
import { Api } from "./ApiClient";

export class CustomApi extends Api<any> {
  constructor() {
    super({ axiosInstance: axiosIn });
  }
}
