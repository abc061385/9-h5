import axiosIn, { createAxiosInstance, spotAxios } from "@/lib/axios";
import { Api, _2 } from "./ApiClient";
import {
  CommonResultCaptchaValidateRespDTO,
  PageResultAnnouncementRespDTO,
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

  getData(response: _2) {
    switch (response.code) {
      case 200:
        return response.data;
    }
  }

  // 获取币种汇率
  // BTCUSDT,ETHUSDT
  getTickerPrice(symbol: string) {
    return spotAxios.get<{ id: number; symbol: string; price: string }[]>(
      `/v1/ticker/price;symbol=${symbol}`,
    );
  }
  // 站内信列表
  getMemberMessageList(params: { pageNo: number; pageSize: number }) {
    return axiosIn.get<PageResultAnnouncementRespDTO>("/member-message/list", {
      params,
    });
  }

  // 根据消息ID，将消息修改为已读状态
  postMemberMessageChangeStatus(body: { id: number }) {
    return axiosIn.post("/member-message/change-status", body);
  }
  getMemberMessageUnreadCount() {
    return axiosIn.get<{ data: number }>("/member-message/unread-count");
  }
}
