import axiosIn, { createAxiosInstance, spotAxios } from "@/lib/axios";
import { Api, _ } from "./ApiClient";
import {
  CommonResultCaptchaValidateRespDTO,
  Api as NineIndexClient,
} from "./NineIndexClient";

export class ApiCustom extends Api<string> {
  nineIndex: InstanceType<typeof NineIndexClient>;
  constructor() {
    super({ axiosInstance: axiosIn });
    this.nineIndex = new NineIndexClient({
      axiosInstance: createAxiosInstance("/app/nine-index/"),
    });
  }

  // 获取平台弹窗
  // nine-index/popup/list?platform=all
  getPopups(params?: { platform?: string }) {
    const request = createAxiosInstance("/app/nine-index/");
    return request.get<CommonResultCaptchaValidateRespDTO>("/popup/list", {
      params,
    });
  }

  getData(response: _) {
    switch (response.code) {
      case 200:
        return response.data;
    }
  }

  // 获取币种汇率
  // BTCUSDT,ETHUSDT
  getTickerPrice(symbol: string) {
    return spotAxios.get<{ id: number; symbol: string; price: string }>(
      `/v1/ticker/price;symbol=${symbol}`,
    );
  }
}
