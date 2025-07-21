import axiosIn, { createAxiosInstance } from "@/lib/axios";
import { Api, _ } from "./ApiClient";
import { Api as NineIndexClient } from "./NineIndexClient";

export class ApiCustom extends Api<string> {
  nineIndex: InstanceType<typeof NineIndexClient>;
  constructor() {
    super({ axiosInstance: axiosIn });
    this.nineIndex = new NineIndexClient({
      axiosInstance: createAxiosInstance("/app/nine-index/"),
    });
  }

  getData(response: _) {
    switch (response.code) {
      case 200:
        return response.data;
    }
  }
}
