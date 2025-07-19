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
        baseURL: axiosConfig.baseURL || "https://www.9mc.one/app/nine-index",
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
 * @title OpenAPI definition
 * @version v0
 * @baseUrl https://www.9mc.one/app/nine-index
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  internal = {
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
}
