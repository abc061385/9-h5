/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CardKycUpdateReqDTO {
  firstName?: string;
  lastName?: string;
  /** @format date */
  birthDate?: string;
  country?: string;
  address?: string;
  contact?: string;
  postalCode?: string;
  idType?: string;
  currencies?: string;
  cardType?: string;
  idFrontUrl?: string;
  idBackUrl?: string;
  selfieWithIdUrl?: string;
}

export interface CommonResultBoolean {
  /** @format int32 */
  code: number;
  data: boolean;
  msg?: string;
}

export interface CommonResultPageResultMemberWalletSnapshot {
  /** @format int32 */
  code: number;
  /** 分页结果 */
  data: PageResultMemberWalletSnapshot;
  msg?: string;
}

/** 数据 */
export interface MemberWalletSnapshot {
  /** @format int64 */
  id?: number;
  /** @format int64 */
  walletId?: number;
  /** @format int64 */
  memberId?: number;
  coin?: string;
  balance?: number;
  frozenBalance?: number;
  /** @format date-time */
  snapshotTime?: string;
}

/** 分页结果 */
export interface PageResultMemberWalletSnapshot {
  /** 数据 */
  list: MemberWalletSnapshot[];
  /**
   * 总量
   * @format int64
   */
  total: number;
}

export interface AppVersionCheckReqDTO {
  /**
   * 内部版本号build，只会自增
   * @format int32
   */
  build: number;
  /** 平台，ios/android */
  platform: string;
  /** 渠道，TestFlight/AppStore/Enterprise/GooglePlay/Apk */
  channel: string;
  language?: string;
}

export interface AppVersionCheckRespDTO {
  /**
   * 最新版本号
   * @example "1.1.0"
   */
  version?: string;
  /**
   * 最新内部build
   * @format int32
   * @example 80
   */
  build?: number;
  /** 更新内容标题 */
  title?: string;
  /** 更新日志 */
  desc?: string;
  /** 是否强制 */
  isForce?: boolean;
  /** 是否存在可升级版本 */
  hasUpdate?: boolean;
  /** 下载链接、跳转链接 */
  downloadUrl?: string;
}

export interface CommonResultAppVersionCheckRespDTO {
  /** @format int32 */
  code: number;
  data: AppVersionCheckRespDTO;
  msg?: string;
}

export interface PopupCloseDTO {
  /**
   * 弹屏ID
   * @format int64
   * @example 1
   */
  popupId: number;
  /**
   * 用户ID
   * @format int64
   * @example 123
   */
  userId?: number;
  /**
   * 设备ID
   * @example "device_123"
   */
  deviceId?: string;
  /**
   * 平台：ios/android
   * @example "ios"
   */
  platform: string;
  /**
   * 语言
   * @example "zh-cn"
   */
  language?: string;
}

export interface PopupClickDTO {
  /**
   * 弹屏ID
   * @format int64
   * @example 1
   */
  popupId: number;
  /**
   * 用户ID
   * @format int64
   * @example 123
   */
  userId?: number;
  /**
   * 设备ID
   * @example "device_123"
   */
  deviceId?: string;
  /**
   * 平台：ios/android
   * @example "ios"
   */
  platform: string;
  /**
   * 语言
   * @example "zh-cn"
   */
  language?: string;
}

export interface CommonResultObject {
  /** @format int32 */
  code: number;
  data: { [key in string]?: any };
  msg?: string;
}

export interface CommonResultLoginUser {
  /** @format int32 */
  code: number;
  data: LoginUser;
  msg?: string;
}

export interface LoginUser {
  /** @format int64 */
  id?: number;
}

export interface CommonResultUploadRespDTO {
  /** @format int32 */
  code: number;
  data: UploadRespDTO;
  msg?: string;
}

export interface UploadRespDTO {
  /** 原图URL */
  originalUrl?: string;
  /** 缩略图URL */
  thumbnailUrl?: string;
  /** 文件名 */
  fileName?: string;
  /**
   * 文件大小（字节）
   * @format int64
   */
  fileSize?: number;
  /** 图片类型 */
  contentType?: string;
  /**
   * 图片宽度
   * @format int32
   */
  width?: number;
  /**
   * 图片高度
   * @format int32
   */
  height?: number;
  /** 上传时间 */
  uploadTime?: string;
}

export interface CaptchaValidateReqDTO {
  certificate?: string;
}

export interface CaptchaValidateRespDTO {
  passed?: boolean;
}

export interface CommonResultCaptchaValidateRespDTO {
  /** @format int32 */
  code: number;
  data: CaptchaValidateRespDTO;
  msg?: string;
}

export interface CardKycSubmitReqDTO {
  /**
   * @minLength 0
   * @maxLength 30
   */
  firstName: string;
  /**
   * @minLength 0
   * @maxLength 30
   */
  lastName: string;
  /** @format date */
  birthDate: string;
  country: string;
  /**
   * @minLength 0
   * @maxLength 80
   */
  address: string;
  contact: string;
  postalCode: string;
  idType: string;
  currencies: string;
  cardType: string;
  idFrontUrl: string;
  idBackUrl: string;
  selfieWithIdUrl: string;
}

export interface BehaviorValidateReqDTO {
  bizType?: string;
  lotNumber?: string;
  captchaOutput?: string;
  passToken?: string;
  genTime?: string;
}

export interface BehaviorValidateRespDTO {
  /** 是否通过验证 */
  isPassed?: boolean;
  /** 凭证（用于后续提交业务接口的参数） */
  certificate?: string;
}

export interface CommonResultBehaviorValidateRespDTO {
  /** @format int32 */
  code: number;
  data: BehaviorValidateRespDTO;
  msg?: string;
}

export interface BehaviorApplyRespDTO {
  /** 是否开启验证 */
  enabled?: boolean;
  /** 极验SDK Account */
  sdkKey?: string;
}

export interface CommonResultBehaviorApplyRespDTO {
  /** @format int32 */
  code: number;
  data: BehaviorApplyRespDTO;
  msg?: string;
}

export interface BannerRespDTO {
  /**
   * 轮播ID
   * @format int64
   */
  id?: number;
  /** 轮播标题 */
  title?: string;
  /** 图片链接 */
  imageUrl?: string;
  /** 跳转链接 */
  linkUrl?: string;
  /** app跳转链接 */
  nativeJumpUrl?: string;
  /**
   * 排序
   * @format int32
   */
  sortOrder?: number;
  /** 平台 */
  platform?: string;
  /**
   * 开始时间
   * @format date-time
   */
  startTime?: string;
  /**
   * 结束时间
   * @format date-time
   */
  endTime?: string;
}

export interface CommonResultListBannerRespDTO {
  /** @format int32 */
  code: number;
  data: BannerRespDTO[];
  msg?: string;
}

export interface CommonResultListPopupItem {
  /** @format int32 */
  code: number;
  data: PopupItem[];
  msg?: string;
}

export interface PopupItem {
  /**
   * 弹屏ID
   * @format int64
   */
  id?: number;
  /** 弹屏名称 */
  name?: string;
  /** 弹屏标题 */
  title?: string;
  /** 弹屏内容描述 */
  content?: string;
  /** 弹屏图片URL */
  imageUrl?: string;
  /** H5 跳转链接，当 platform=h5 或 all 时返回 */
  h5JumpUrl?: string;
  /** 原生跳转链接，当 platform=ios/android 或 all 时返回 */
  nativeJumpUrl?: string;
  /**
   * 展示顺序
   * @format int32
   */
  sortOrder?: number;
  /**
   * 开始时间
   * @format date-time
   */
  startTime?: string;
  /**
   * 结束时间
   * @format date-time
   */
  endTime?: string;
}

export interface CommonResultMemberRespDTO {
  /** @format int32 */
  code: number;
  data: MemberRespDTO;
  msg?: string;
}

export interface MemberRespDTO {
  id?: string;
  username?: string;
}

export interface CardKycOptionsRespDTO {
  countries?: OptionItem[];
  idTypes?: OptionItem[];
  currencies?: OptionItem[];
  cardTypes?: OptionItem[];
}

export interface CommonResultCardKycOptionsRespDTO {
  /** @format int32 */
  code: number;
  data: CardKycOptionsRespDTO;
  msg?: string;
}

export interface OptionItem {
  code: string;
  label?: string;
}

export interface CardKyc {
  /** @format int64 */
  id?: number;
  /** @format int64 */
  memberId?: number;
  firstName?: string;
  lastName?: string;
  /** @format date */
  birthDate?: string;
  country?: string;
  address?: string;
  contact?: string;
  postalCode?: string;
  idType?: string;
  currencies?: string;
  topupAmount?: number;
  cardType?: string;
  idFrontUrl?: string;
  idBackUrl?: string;
  selfieWithIdUrl?: string;
  status?: string;
  rejectReason?: string;
}

export interface CommonResultCardKyc {
  /** @format int32 */
  code: number;
  data: CardKyc;
  msg?: string;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
  axiosInstance?: AxiosInstance;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    axiosInstance,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance =
      axiosInstance ||
      axios.create({
        ...axiosConfig,
        baseURL: axiosConfig.baseURL || "https://www.9mc.one",
      });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<ApiResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Nine APP版本接口文档
 * @version 1.0.0
 * @baseUrl https://www.9mc.one
 * @externalDocs https://your-doc-url.com
 * @contact Nine Team
 *
 * APP版本检测相关接口
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  cardKyc = {
    /**
     * No description
     *
     * @tags Card KYC
     * @name Update
     * @summary 修改KYC（仅拒绝后可修改，修改后置为待审）
     * @request PUT:/card-kyc/update
     */
    update: (data: CardKycUpdateReqDTO, params: RequestParams = {}) =>
      this.request<CommonResultBoolean, any>({
        path: `/card-kyc/update`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Card KYC
     * @name UploadImage1
     * @summary 上传KYC图片
     * @request POST:/card-kyc/upload
     */
    uploadImage1: (
      query: {
        /**
         * 图片类型：front_id（证件正面照）/back_id（证件反面照）/selfie_with_id（手持证件自拍）
         * @pattern ^(front_id|back_id|selfie_with_id)$
         * @example "front_id"
         */
        type: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<CommonResultUploadRespDTO, any>({
        path: `/card-kyc/upload`,
        method: "POST",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Card KYC
     * @name Submit
     * @summary 提交KYC
     * @request POST:/card-kyc/submit
     */
    submit: (data: CardKycSubmitReqDTO, params: RequestParams = {}) =>
      this.request<CommonResultBoolean, any>({
        path: `/card-kyc/submit`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Card KYC
     * @name Options
     * @summary 下拉选项
     * @request GET:/card-kyc/options
     */
    options: (params: RequestParams = {}) =>
      this.request<CommonResultCardKycOptionsRespDTO, any>({
        path: `/card-kyc/options`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Card KYC
     * @name Mine
     * @summary 查询我的KYC
     * @request GET:/card-kyc/mine
     */
    mine: (params: RequestParams = {}) =>
      this.request<CommonResultCardKyc, any>({
        path: `/card-kyc/mine`,
        method: "GET",
        ...params,
      }),
  };
  wallet = {
    /**
     * No description
     *
     * @tags wallet-snapshot-controller
     * @name QuerySnapshots
     * @request POST:/wallet/page
     */
    querySnapshots: (
      query: {
        /** @format int64 */
        memberId?: number;
        coin?: string;
        /** @format date-time */
        snapshotTime?: string;
        /** 排序字段 */
        sortingFields?: string;
        /**
         * 页码，从 1 开始
         * @min 1
         * @example 1
         */
        pageNo: string;
        /**
         * 每页条数，最大值为 100
         * @min 1
         * @max 100
         * @example 10
         */
        pageSize: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<CommonResultPageResultMemberWalletSnapshot, any>({
        path: `/wallet/page`,
        method: "POST",
        query: query,
        ...params,
      }),
  };
  public = {
    /**
     * No description
     *
     * @tags APP版本
     * @name CheckVersion
     * @summary APP版本检测
     * @request POST:/public/app-version/check
     */
    checkVersion: (data: AppVersionCheckReqDTO, params: RequestParams = {}) =>
      this.request<CommonResultAppVersionCheckRespDTO, any>({
        path: `/public/app-version/check`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
  popup = {
    /**
     * No description
     *
     * @tags 弹屏管理
     * @name RecordPopupClose
     * @summary 记录弹屏关闭
     * @request POST:/popup/close
     */
    recordPopupClose: (data: PopupCloseDTO, params: RequestParams = {}) =>
      this.request<CommonResultBoolean, any>({
        path: `/popup/close`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 弹屏管理
     * @name RecordPopupClick
     * @summary 记录弹屏点击
     * @request POST:/popup/click
     */
    recordPopupClick: (data: PopupClickDTO, params: RequestParams = {}) =>
      this.request<CommonResultBoolean, any>({
        path: `/popup/click`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 弹屏管理
     * @name GetPopups
     * @summary 获取弹屏列表
     * @request GET:/popup/list
     */
    getPopups: (
      query: {
        /**
         * 平台：ios/android/h5
         * @pattern ios|android|h5|all
         * @example "ios"
         */
        platform: string;
        /**
         * 语言
         * @example "zh-cn"
         */
        language?: string;
        /**
         * 用户ID
         * @example 123
         */
        userId?: string;
        /**
         * 设备ID
         * @example "device_123"
         */
        deviceId?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<CommonResultListPopupItem, any>({
        path: `/popup/list`,
        method: "GET",
        query: query,
        ...params,
      }),
  };
  internal = {
    /**
     * No description
     *
     * @tags wallet-snapshot-api
     * @name CreateSnapshot
     * @request POST:/internal/wallet/snapshot/create
     */
    createSnapshot: (params: RequestParams = {}) =>
      this.request<CommonResultObject, any>({
        path: `/internal/wallet/snapshot/create`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags member-api
     * @name GetUserByToken
     * @request POST:/internal/member/getUserByToken
     */
    getUserByToken: (
      query: {
        token: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<CommonResultLoginUser, any>({
        path: `/internal/member/getUserByToken`,
        method: "POST",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags image-upload-api
     * @name UploadImage
     * @summary 上传图片
     * @request POST:/internal/image/upload
     */
    uploadImage: (
      query: {
        /**
         * 图片类型：banner/activity/avatar等
         * @example "banner"
         */
        type: string;
        /**
         * 是否生成缩略图
         * @example false
         */
        generateThumbnail?: string;
        /**
         * 缩略图宽度
         * @example 300
         */
        thumbnailWidth?: string;
        /**
         * 缩略图高度
         * @example 200
         */
        thumbnailHeight?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<CommonResultUploadRespDTO, any>({
        path: `/internal/image/upload`,
        method: "POST",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags image-upload-api
     * @name DeleteImage
     * @summary 删除图片
     * @request POST:/internal/image/delete
     */
    deleteImage: (
      query: {
        imageUrl: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<CommonResultBoolean, any>({
        path: `/internal/image/delete`,
        method: "POST",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags file-upload-api
     * @name UploadFile
     * @summary 上传文件(mp4/pdf)
     * @request POST:/internal/file/upload
     */
    uploadFile: (
      query: {
        /**
         * 图片类型：banner/activity/avatar等
         * @example "banner"
         */
        type: string;
        /**
         * 是否生成缩略图
         * @example false
         */
        generateThumbnail?: string;
        /**
         * 缩略图宽度
         * @example 300
         */
        thumbnailWidth?: string;
        /**
         * 缩略图高度
         * @example 200
         */
        thumbnailHeight?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<CommonResultUploadRespDTO, any>({
        path: `/internal/file/upload`,
        method: "POST",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags file-upload-api
     * @name DeleteImage1
     * @summary 删除文件
     * @request POST:/internal/file/delete
     */
    deleteImage1: (
      query: {
        fileUrl: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<CommonResultBoolean, any>({
        path: `/internal/file/delete`,
        method: "POST",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags captcha-api
     * @name Validate
     * @summary 核实凭证（核实获取到的凭证的正确性）
     * @request POST:/internal/captcha/validate
     */
    validate: (data: CaptchaValidateReqDTO, params: RequestParams = {}) =>
      this.request<CommonResultCaptchaValidateRespDTO, any>({
        path: `/internal/captcha/validate`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags member-api
     * @name GetMemberInfo
     * @summary 获得用户信息
     * @request GET:/internal/member/{id}
     */
    getMemberInfo: (id: number, params: RequestParams = {}) =>
      this.request<CommonResultMemberRespDTO, any>({
        path: `/internal/member/${id}`,
        method: "GET",
        ...params,
      }),
  };
  behavior = {
    /**
     * No description
     *
     * @tags 行为验证
     * @name Validate1
     * @summary 验证结果，获取凭证（客户端将验证数据提交给服务端校验，拿到凭证）
     * @request POST:/behavior/validate
     */
    validate1: (data: BehaviorValidateReqDTO, params: RequestParams = {}) =>
      this.request<CommonResultBehaviorValidateRespDTO, any>({
        path: `/behavior/validate`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 行为验证
     * @name Apply
     * @summary 验证结果，获取凭证（客户端将验证数据提交给服务端校验，拿到凭证）
     * @request POST:/behavior/apply
     */
    apply: (params: RequestParams = {}) =>
      this.request<CommonResultBehaviorApplyRespDTO, any>({
        path: `/behavior/apply`,
        method: "POST",
        ...params,
      }),
  };
  banner = {
    /**
     * No description
     *
     * @tags 轮播图
     * @name GetBanners
     * @summary 获取轮播列表
     * @request POST:/banner/list
     */
    getBanners: (
      query: {
        platform: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<CommonResultListBannerRespDTO, any>({
        path: `/banner/list`,
        method: "POST",
        query: query,
        ...params,
      }),
  };
}
