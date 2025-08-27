import axiosIn, { createAxiosInstance } from "@/lib/axios";
import { Api, _ } from "./ApiClient";
import { Api as NineIndexClient } from "./NineIndexClient";
import { AxiosInstance } from "axios";

export class ApiCustom extends Api<string> {
  nineIndex: InstanceType<typeof NineIndexClient>;
  subAccountLogin: InstanceType<typeof NineIndexClient>;
  constructor() {
    super({ axiosInstance: axiosIn });
    this.nineIndex = new NineIndexClient({
      axiosInstance: createAxiosInstance("/app/nine-index/"),
    });
    this.subAccountLogin = new NineIndexClient({
      axiosInstance: createAxiosInstance("/app/auth/loginByFaBeforeCheck"),
    });
  }

  getData(response: _) {
    switch (response.code) {
      case 200:
        return response.data;
    }
  }
}
