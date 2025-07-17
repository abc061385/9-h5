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

/** 统一消息返回对象 */
export interface _ {
  /** @format int32 */
  code: number;
  data: { [key in string]?: any };
  message: string;
}

/** 统一消息返回对象«boolean» */
export interface Boolean {
  /** @format int32 */
  code: number;
  data: boolean;
  message: string;
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
        baseURL: axiosConfig.baseURL || "//www.9mc.one/app",
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
 * @title ECHO后台文档
 * @version 1.0
 * @baseUrl //www.9mc.one/app
 * @contact MU <123@qq.com> (http://www.baidu.com)
 *
 * 第一版
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  auth = {
    /**
     * No description
     *
     * @tags 登录注册
     * @name EditInfoUsingPost
     * @summary 编辑用户头像
     * @request POST:/auth/editHead
     * @secure
     */
    editInfoUsingPost: (
      query?: {
        /** head */
        head?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/auth/editHead`,
        method: "POST",
        query: query,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 登录注册
     * @name EditNiceUsingPost
     * @summary 编辑用户昵称
     * @request POST:/auth/editNice
     * @secure
     */
    editNiceUsingPost: (
      query?: {
        /** nick */
        nick?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/auth/editNice`,
        method: "POST",
        query: query,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 登录注册
     * @name EditTelUsingPost
     * @summary 编辑手机号
     * @request POST:/auth/editTel
     * @secure
     */
    editTelUsingPost: (
      query?: {
        /** @format int32 */
        accountType?: number;
        areaCode?: string;
        /** @format int32 */
        assetPower?: number;
        bindEmail?: string;
        /** @format date-time */
        bindEmailTime?: string;
        /** @format int32 */
        canWithdraw?: number;
        /** @format int32 */
        checkStatus?: number;
        code?: string;
        /** @format date-time */
        createTime?: string;
        emailAccount?: string;
        googleSecretKey?: string;
        /** @format int32 */
        googleVerify?: number;
        /** @format date-time */
        googleVerifyTime?: string;
        headUrl?: string;
        /** @format int64 */
        id?: number;
        /** @format int32 */
        ifNodeTop?: number;
        invitationCode?: string;
        inviteAward?: number;
        isDeleted?: boolean;
        isDisable?: boolean;
        /** @format int32 */
        isTop?: number;
        /** @format date-time */
        lastLoginTime?: string;
        /** @format int32 */
        leftNum?: number;
        /** @format int32 */
        level?: number;
        /** @format int32 */
        newUser?: number;
        nickname?: string;
        /** @format int32 */
        nodeId?: number;
        /** @format int64 */
        nodeTopId?: number;
        /** @format int64 */
        parentId?: number;
        /** @format int32 */
        psdType?: number;
        pswd?: string;
        /** @format int32 */
        pswdLevel?: number;
        qrcodeImg?: string;
        qrcodeUrl?: string;
        registerAddr?: string;
        registerIp?: string;
        remark?: string;
        /** @format int32 */
        rightNum?: number;
        salt?: string;
        /** @format int32 */
        snodeLogin?: number;
        /** @format int32 */
        star?: number;
        tel?: string;
        /** @format date-time */
        timestamp?: string;
        tradePwd?: string;
        username?: string;
        /** @format int32 */
        vipLevel?: number;
        /** @format date-time */
        vipLevelUpTime?: string;
        /** @format int32 */
        vipLock?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/auth/editTel`,
        method: "POST",
        query: query,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 登录注册
     * @name ForgetUpdatePwdUsingPost
     * @summary 修改登录密码
     * @request POST:/auth/forget/updatePwd
     * @secure
     */
    forgetUpdatePwdUsingPost: (
      query?: {
        /**
         * code
         * @format int64
         */
        code?: number;
        /** confirmPswd */
        confirmPswd?: string;
        /** pswd */
        pswd?: string;
        /** tel */
        tel?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/auth/forget/updatePwd`,
        method: "POST",
        query: query,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 登录注册
     * @name ForgetPwdUsingPost
     * @summary 忘记密码
     * @request POST:/auth/forgetPwd
     * @secure
     */
    forgetPwdUsingPost: (
      query: {
        /** 账户类型:0-手机1-邮箱 */
        accountType: ref;
        /** 验证码 */
        code: string;
        /** 有效 */
        emailAccount?: ref;
        /** 密码 */
        password: string;
        /** 手机号 */
        tel: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/auth/forgetPwd`,
        method: "POST",
        query: query,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 登录注册
     * @name JyPasswordUsingPost
     * @summary 全网信息
     * @request POST:/auth/getAllNetData
     * @secure
     */
    jyPasswordUsingPost: (params: RequestParams = {}) =>
      this.request<_, void>({
        path: `/auth/getAllNetData`,
        method: "POST",
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 登录注册
     * @name GetSwarmUsingPost
     * @summary 获取Swarm信息
     * @request POST:/auth/getSwarm
     * @secure
     */
    getSwarmUsingPost: (params: RequestParams = {}) =>
      this.request<_, void>({
        path: `/auth/getSwarm`,
        method: "POST",
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 登录注册
     * @name InfoUsingGet
     * @summary 查询用户详情
     * @request GET:/auth/info
     * @secure
     */
    infoUsingGet: (params: RequestParams = {}) =>
      this.request<_, void>({
        path: `/auth/info`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 登录注册
     * @name JyPasswordUsingPost1
     * @summary 设置编辑交易密码
     * @request POST:/auth/jyPassword
     * @secure
     */
    jyPasswordUsingPost1: (
      query?: {
        /** code */
        code?: string;
        /** jyPswd */
        jyPswd?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/auth/jyPassword`,
        method: "POST",
        query: query,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 登录注册
     * @name LoginUsingPost
     * @summary 登录
     * @request POST:/auth/login
     * @secure
     */
    loginUsingPost: (
      query: {
        /** 账户类型:0-手机1-邮箱 */
        accountType: ref;
        /** 有效 */
        emailAccount?: ref;
        /** 密码 */
        password: string;
        /** 手机号 */
        tel?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/auth/login`,
        method: "POST",
        query: query,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 登录注册
     * @name RegisterUsingPost
     * @summary 注册
     * @request POST:/auth/register
     * @secure
     */
    registerUsingPost: (
      query: {
        /** 账户类型:0-手机1-邮箱 */
        accountType: ref;
        confirmPassword?: string;
        /** 有效 */
        emailAccount: ref;
        globalRoaming?: string;
        /** 邀请码 */
        invitationCode?: string;
        /** 密码 */
        password: string;
        /** 手机号 */
        tel?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/auth/register`,
        method: "POST",
        query: query,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 登录注册
     * @name RegisterH5UsingPost
     * @summary 注册-H5
     * @request POST:/auth/registerH5
     * @secure
     */
    registerH5UsingPost: (
      query: {
        /** 账户类型:0-手机1-邮箱 */
        accountType: ref;
        confirmPassword?: string;
        /** 有效 */
        emailAccount: ref;
        globalRoaming?: string;
        /** 邀请码 */
        invitationCode?: string;
        /** 密码 */
        password: string;
        /** 手机号 */
        tel?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/auth/registerH5`,
        method: "POST",
        query: query,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 登录注册
     * @name TestUsingPost
     * @summary 测试语言的
     * @request POST:/auth/test
     * @secure
     */
    testUsingPost: (params: RequestParams = {}) =>
      this.request<_, void>({
        path: `/auth/test`,
        method: "POST",
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 登录注册
     * @name UpdatePwdUsingPost
     * @summary 修改登录密码
     * @request POST:/auth/updatePwd
     * @secure
     */
    updatePwdUsingPost: (
      query?: {
        /**
         * code
         * @format int64
         */
        code?: number;
        /** confirmPswd */
        confirmPswd?: string;
        /** pswd */
        pswd?: string;
        /** tel */
        tel?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/auth/updatePwd`,
        method: "POST",
        query: query,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  captcha = {
    /**
     * No description
     *
     * @tags 验证码
     * @name GenCaptchaUsingGet
     * @summary genCaptcha
     * @request GET:/captcha
     * @secure
     */
    genCaptchaUsingGet: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/captcha`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  cms = {
    /**
     * No description
     *
     * @tags 内容管理
     * @name AdvisoryUsingGet
     * @summary 咨询详情
     * @request GET:/cms/advisory/{id}
     * @secure
     */
    advisoryUsingGet: (id: number, params: RequestParams = {}) =>
      this.request<_, void>({
        path: `/cms/advisory/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 内容管理
     * @name NoReadUsingGet
     * @summary 获取未阅读消息数
     * @request GET:/cms/announcement-noRead
     * @secure
     */
    noReadUsingGet: (
      query?: {
        /**
         * userId
         * @format int64
         */
        userId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/cms/announcement-noRead`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 内容管理
     * @name AnnouncementUsingGet
     * @summary 公告详情
     * @request GET:/cms/announcement/{id}
     * @secure
     */
    announcementUsingGet: (id: number, params: RequestParams = {}) =>
      this.request<_, void>({
        path: `/cms/announcement/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 内容管理
     * @name CaijinUsingGet
     * @summary 财经消息
     * @request GET:/cms/caijin
     * @secure
     */
    caijinUsingGet: (
      query?: {
        /**
         * id
         * @format int32
         */
        id?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/cms/caijin`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 内容管理
     * @name GetAgreementByIdUsingGet
     * @summary 根据id查询协议
     * @request GET:/cms/getAgreementById/{id}
     * @secure
     */
    getAgreementByIdUsingGet: (id: number, params: RequestParams = {}) =>
      this.request<_, void>({
        path: `/cms/getAgreementById/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 内容管理
     * @name GetAgreementByIdUsingGet1
     * @summary 根据多个id查询协议
     * @request GET:/cms/getAgreementByIds/{ids}
     * @secure
     */
    getAgreementByIdUsingGet1: (ids: string, params: RequestParams = {}) =>
      this.request<_, void>({
        path: `/cms/getAgreementByIds/${ids}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 内容管理
     * @name GetChildMenuUsingGet
     * @summary 获取帮助中心二级列表
     * @request GET:/cms/getChildMenu
     * @secure
     */
    getChildMenuUsingGet: (
      query?: {
        /** title */
        title?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/cms/getChildMenu`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 内容管理
     * @name GetFirstMenuUsingGet
     * @summary 获取帮助中心一个菜单
     * @request GET:/cms/getFirstMenu
     * @secure
     */
    getFirstMenuUsingGet: (params: RequestParams = {}) =>
      this.request<_, void>({
        path: `/cms/getFirstMenu`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 内容管理
     * @name GetOpeningPageUsingGet
     * @summary 获取开屏页
     * @request GET:/cms/getOpenPage
     * @secure
     */
    getOpeningPageUsingGet: (
      query?: {
        /**
         * type
         * @format int32
         */
        type?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/cms/getOpenPage`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 内容管理
     * @name InfoAdvertiseUsingGet
     * @summary 轮播图详细
     * @request GET:/cms/info-advertise
     * @secure
     */
    infoAdvertiseUsingGet: (
      query?: {
        /**
         * id
         * @format int64
         */
        id?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/cms/info-advertise`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 内容管理
     * @name GetByTypeUsingGet
     * @summary 详情内容
     * @request GET:/cms/info-privacy-policy/getByType
     * @secure
     */
    getByTypeUsingGet: (
      query?: {
        /**
         * type
         * @format int32
         */
        type?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/cms/info-privacy-policy/getByType`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 内容管理
     * @name NoticeUsingGet
     * @summary 消息详情
     * @request GET:/cms/notice/{id}
     * @secure
     */
    noticeUsingGet: (id: number, params: RequestParams = {}) =>
      this.request<_, void>({
        path: `/cms/notice/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 内容管理
     * @name PageAdvertiseUsingGet
     * @summary 轮播图
     * @request GET:/cms/page-advertise/{type}
     * @secure
     */
    pageAdvertiseUsingGet: (
      type: number,
      query: {
        /** 排序方式 asc/desc */
        order?: string;
        /**
         * 页号
         * @format int32
         */
        pageNo: number;
        /**
         * 页面大小
         * @format int32
         */
        pageSize: number;
        /** 排序字段 */
        sort?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/cms/page-advertise/${type}`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 内容管理
     * @name AdvisoryListUsingGet
     * @summary 咨询列表
     * @request GET:/cms/page-advisory
     * @secure
     */
    advisoryListUsingGet: (
      query: {
        /** 排序方式 asc/desc */
        order?: string;
        /**
         * 页号
         * @format int32
         */
        pageNo: number;
        /**
         * 页面大小
         * @format int32
         */
        pageSize: number;
        /** 排序字段 */
        sort?: string;
        /**
         * type
         * @format int32
         */
        type?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/cms/page-advisory`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 内容管理
     * @name PageAnnouncementUsingGet
     * @summary 公告列表
     * @request GET:/cms/page-announcement
     * @secure
     */
    pageAnnouncementUsingGet: (
      query: {
        /** 排序方式 asc/desc */
        order?: string;
        /**
         * 页号
         * @format int32
         */
        pageNo: number;
        /**
         * 页面大小
         * @format int32
         */
        pageSize: number;
        /** 排序字段 */
        sort?: string;
        /**
         * type
         * @format int32
         */
        type?: number;
        /**
         * userId
         * @format int64
         */
        userId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/cms/page-announcement`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 内容管理
     * @name PageAnnouncementInfoUsingGet
     * @summary 公告列表-消息
     * @request GET:/cms/page-announcement-info
     * @secure
     */
    pageAnnouncementInfoUsingGet: (
      query: {
        /** 排序方式 asc/desc */
        order?: string;
        /**
         * 页号
         * @format int32
         */
        pageNo: number;
        /**
         * 页面大小
         * @format int32
         */
        pageSize: number;
        /** 排序字段 */
        sort?: string;
        /**
         * type
         * @format int32
         */
        type?: number;
        /**
         * userId
         * @format int64
         */
        userId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/cms/page-announcement-info`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 内容管理
     * @name PageNoticeUsingGet
     * @summary 消息列表
     * @request GET:/cms/page-notice
     * @secure
     */
    pageNoticeUsingGet: (
      query: {
        /** 排序方式 asc/desc */
        order?: string;
        /**
         * 页号
         * @format int32
         */
        pageNo: number;
        /**
         * 页面大小
         * @format int32
         */
        pageSize: number;
        /** 排序字段 */
        sort?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/cms/page-notice`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 内容管理
     * @name TypeUsingGet
     * @summary 查询协议
     * @request GET:/cms/type
     * @secure
     */
    typeUsingGet: (
      query?: {
        /** 1:关于我们 2:用户协议 3:隐私协议 4:独享协议 5:满存协议 */
        type?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/cms/type`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 内容管理
     * @name UpdateNoReadUsingGet
     * @summary 更改阅读状态
     * @request GET:/cms/update-noRead
     * @secure
     */
    updateNoReadUsingGet: (
      query?: {
        /**
         * id
         * @format int64
         */
        id?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/cms/update-noRead`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 内容管理
     * @name VersionUsingGet
     * @summary 查看版本
     * @request GET:/cms/version
     * @secure
     */
    versionUsingGet: (params: RequestParams = {}) =>
      this.request<_, void>({
        path: `/cms/version`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  cobo = {
    /**
     * No description
     *
     * @tags COBO管理
     * @name HandleDoubleConfirmUsingPost
     * @summary handleDoubleConfirm
     * @request POST:/cobo/callback
     * @secure
     */
    handleDoubleConfirmUsingPost: (
      rawBody: string,
      params: RequestParams = {},
    ) =>
      this.request<string, void>({
        path: `/cobo/callback`,
        method: "POST",
        body: rawBody,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags COBO管理
     * @name CreateAddrUsingPost
     * @summary 创建钱包中的地址
     * @request POST:/cobo/create-addr
     * @secure
     */
    createAddrUsingPost: (
      query?: {
        /** chain */
        chain?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/cobo/create-addr`,
        method: "POST",
        query: query,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags COBO管理
     * @name CreateWalletUsingPost
     * @summary 创建钱包
     * @request POST:/cobo/create-wallet
     * @secure
     */
    createWalletUsingPost: (params: RequestParams = {}) =>
      this.request<_, void>({
        path: `/cobo/create-wallet`,
        method: "POST",
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags COBO管理
     * @name EnabledChainsUsingPost
     * @summary 获取启动的链
     * @request POST:/cobo/enabled_chains
     * @secure
     */
    enabledChainsUsingPost: (params: RequestParams = {}) =>
      this.request<_, void>({
        path: `/cobo/enabled_chains`,
        method: "POST",
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags COBO管理
     * @name GetChainAddrUsingGet
     * @summary 链获取地址
     * @request GET:/cobo/getChainAddr
     * @secure
     */
    getChainAddrUsingGet: (
      query?: {
        /** chain */
        chain?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/cobo/getChainAddr`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags COBO管理
     * @name RepairMemoUsingPost
     * @summary 修复地址的memo
     * @request POST:/cobo/repairMemo
     * @secure
     */
    repairMemoUsingPost: (params: RequestParams = {}) =>
      this.request<_, void>({
        path: `/cobo/repairMemo`,
        method: "POST",
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags COBO管理
     * @name HandleWebhookEventUsingPost
     * @summary handleWebhookEvent
     * @request POST:/cobo/webhook
     * @secure
     */
    handleWebhookEventUsingPost: (
      rawBody: string,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/cobo/webhook`,
        method: "POST",
        body: rawBody,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  coin = {
    /**
     * No description
     *
     * @tags 币种管理
     * @name GetCoinUsingGet
     * @summary 币种
     * @request GET:/coin/getCoin
     * @secure
     */
    getCoinUsingGet: (
      query?: {
        /** address */
        address?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/coin/getCoin`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 币种管理
     * @name CoinConfigUsingGet
     * @summary 查询币种配置
     * @request GET:/coin/info
     * @secure
     */
    coinConfigUsingGet: (
      query?: {
        /** unit */
        unit?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/coin/info`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),
  };
  currencySettings = {
    /**
     * No description
     *
     * @tags currency-settings-controller
     * @name PageUsingGet
     * @summary 列表
     * @request GET:/currency-settings/list
     * @secure
     */
    pageUsingGet: (
      query?: {
        /** currencyCode */
        currencyCode?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/currency-settings/list`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags currency-settings-controller
     * @name ProtocolListUsingGet
     * @summary 列表
     * @request GET:/currency-settings/protocol/list
     * @secure
     */
    protocolListUsingGet: (params: RequestParams = {}) =>
      this.request<_, void>({
        path: `/currency-settings/protocol/list`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  deposit = {
    /**
     * No description
     *
     * @tags 充值
     * @name CreateAddrUsingPost1
     * @summary 创建地址
     * @request POST:/deposit/create-addr
     * @secure
     */
    createAddrUsingPost1: (
      query?: {
        /** 0-erc20 1-fil */
        chainEnum?: "ERC20" | "FILECOIN" | "TRC20";
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/deposit/create-addr`,
        method: "POST",
        query: query,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 充值
     * @name CreateAddrTwoUsingPost
     * @summary 创建地址
     * @request POST:/deposit/create-addr_two
     * @secure
     */
    createAddrTwoUsingPost: (
      query?: {
        /** 0-erc20 1-fil */
        chainEnum?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/deposit/create-addr_two`,
        method: "POST",
        query: query,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  fundProductConfig = {
    /**
     * No description
     *
     * @tags fund-product-config-controller
     * @name CalMaxProfitUsingPost
     * @summary calMaxProfit
     * @request POST:/fund-product-config/calMaxProfit
     * @secure
     */
    calMaxProfitUsingPost: (
      query: {
        /** 复投是否开启(0:否,1:是) */
        isReinvestment?: boolean;
        /**
         * 质押计划ID
         * @format int64
         */
        pledgeId: number;
        /**
         * 产品ID
         * @format int64
         */
        productId: number;
        /** 投资总金额(USDT) */
        totalAmount: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/fund-product-config/calMaxProfit`,
        method: "POST",
        query: query,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags fund-product-config-controller
     * @name ClaimedProfitUsingGet
     * @summary claimedProfit
     * @request GET:/fund-product-config/claimedProfit
     * @secure
     */
    claimedProfitUsingGet: (
      query?: {
        /** outputToken */
        outputToken?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/fund-product-config/claimedProfit`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags fund-product-config-controller
     * @name ExtractUsingPost
     * @summary extract
     * @request POST:/fund-product-config/claimedProfit/extract
     * @secure
     */
    extractUsingPost: (
      query?: {
        /** outputToken */
        outputToken?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/fund-product-config/claimedProfit/extract`,
        method: "POST",
        query: query,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags fund-product-config-controller
     * @name ClaimedProfitTransactionUsingGet
     * @summary claimedProfitTransaction
     * @request GET:/fund-product-config/claimedProfit/transaction
     * @secure
     */
    claimedProfitTransactionUsingGet: (
      query: {
        /** 排序方式 asc/desc */
        order?: string;
        /** outputToken */
        outputToken?: string;
        /**
         * 页号
         * @format int32
         */
        pageNo: number;
        /**
         * 页面大小
         * @format int32
         */
        pageSize: number;
        /** 排序字段 */
        sort?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/fund-product-config/claimedProfit/transaction`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags fund-product-config-controller
     * @name DetailUsingGet
     * @summary detail
     * @request GET:/fund-product-config/detail
     * @secure
     */
    detailUsingGet: (
      query?: {
        /**
         * id
         * @format int64
         */
        id?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/fund-product-config/detail`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags fund-product-config-controller
     * @name GetPledgeDaysUsingGet
     * @summary getPledgeDays
     * @request GET:/fund-product-config/getPledgeDays
     * @secure
     */
    getPledgeDaysUsingGet: (
      query?: {
        /**
         * productType
         * @format int32
         */
        productType?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/fund-product-config/getPledgeDays`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags fund-product-config-controller
     * @name PurchaseUsingPost
     * @summary purchase
     * @request POST:/fund-product-config/invest
     * @secure
     */
    purchaseUsingPost: (
      query: {
        /** 复投是否开启(0:否,1:是) */
        isReinvestment?: boolean;
        /**
         * 质押计划ID
         * @format int64
         */
        pledgeId: number;
        /**
         * 产品ID
         * @format int64
         */
        productId: number;
        /** 投资总金额(USDT) */
        totalAmount: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/fund-product-config/invest`,
        method: "POST",
        query: query,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags fund-product-config-controller
     * @name PurchaseDetailUsingGet
     * @summary purchaseDetail
     * @request GET:/fund-product-config/invest/detail
     * @secure
     */
    purchaseDetailUsingGet: (
      query?: {
        /**
         * id
         * @format int64
         */
        id?: number;
        /** orderType */
        orderType?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/fund-product-config/invest/detail`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags fund-product-config-controller
     * @name PurchaseRecordUsingGet
     * @summary purchaseRecord
     * @request GET:/fund-product-config/invest/page
     * @secure
     */
    purchaseRecordUsingGet: (
      query: {
        /** 排序方式 asc/desc */
        order?: string;
        /** outputToken */
        outputToken?: string;
        /**
         * 页号
         * @format int32
         */
        pageNo: number;
        /**
         * 页面大小
         * @format int32
         */
        pageSize: number;
        /** 排序字段 */
        sort?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/fund-product-config/invest/page`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags fund-product-config-controller
     * @name PageUsingGet1
     * @summary page
     * @request GET:/fund-product-config/page
     * @secure
     */
    pageUsingGet1: (
      query: {
        /** 排序方式 asc/desc */
        order?: string;
        /**
         * 页号
         * @format int32
         */
        pageNo: number;
        /**
         * 页面大小
         * @format int32
         */
        pageSize: number;
        /**
         * pledgeDays
         * @format int32
         */
        pledgeDays?: number;
        /**
         * productType
         * @format int32
         */
        productType?: number;
        /** 排序字段 */
        sort?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/fund-product-config/page`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags fund-product-config-controller
     * @name ReinvestmentUsingPost
     * @summary reinvestment
     * @request POST:/fund-product-config/reinvestment
     * @secure
     */
    reinvestmentUsingPost: (
      query?: {
        /**
         * id
         * @format int64
         */
        id?: number;
        /** isReinvestment */
        isReinvestment?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/fund-product-config/reinvestment`,
        method: "POST",
        query: query,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags fund-product-config-controller
     * @name RewardExtractUsingPost
     * @summary rewardExtract
     * @request POST:/fund-product-config/reward/extract
     * @secure
     */
    rewardExtractUsingPost: (
      query?: {
        /** outputToken */
        outputToken?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/fund-product-config/reward/extract`,
        method: "POST",
        query: query,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags fund-product-config-controller
     * @name GetRewardStatsUsingGet
     * @summary getRewardStats
     * @request GET:/fund-product-config/reward/stats
     * @secure
     */
    getRewardStatsUsingGet: (
      query?: {
        /** outputToken */
        outputToken?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/fund-product-config/reward/stats`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags fund-product-config-controller
     * @name RewardTransactionUsingGet
     * @summary rewardTransaction
     * @request GET:/fund-product-config/reward/transaction
     * @secure
     */
    rewardTransactionUsingGet: (
      query: {
        /** 排序方式 asc/desc */
        order?: string;
        /** outputToken */
        outputToken?: string;
        /**
         * 页号
         * @format int32
         */
        pageNo: number;
        /**
         * 页面大小
         * @format int32
         */
        pageSize: number;
        /** 排序字段 */
        sort?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/fund-product-config/reward/transaction`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),
  };
  internal = {
    /**
     * No description
     *
     * @tags 内部接口
     * @name GetStatisticsUsingGet
     * @summary whatsApp统计报表
     * @request GET:/internal/whatsApp/{uid}
     * @secure
     */
    getStatisticsUsingGet: (uid: number, params: RequestParams = {}) =>
      this.request<_, void>({
        path: `/internal/whatsApp/${uid}`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  kline = {
    /**
     * No description
     *
     * @tags K线管理API
     * @name LatestPriceUsingGet
     * @summary 获取最新价格
     * @request GET:/kline/latestPrice
     * @secure
     */
    latestPriceUsingGet: (params: RequestParams = {}) =>
      this.request<_, void>({
        path: `/kline/latestPrice`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags K线管理API
     * @name MarketSituationUsingGet
     * @summary 市场行情
     * @request GET:/kline/marketSituation
     * @secure
     */
    marketSituationUsingGet: (
      query?: {
        /** type */
        type?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/kline/marketSituation`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),
  };
  market = {
    /**
     * No description
     *
     * @tags 行情管理
     * @name ThumbUsingGet
     * @summary 行情查询
     * @request GET:/market/thumb
     * @secure
     */
    thumbUsingGet: (
      query?: {
        /** query */
        query?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/market/thumb`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),
  };
  memberVipLevelConfig = {
    /**
     * No description
     *
     * @tags member-vip-level-config-controller
     * @name EditUsingPost
     * @summary 编辑
     * @request POST:/member-vip-level-config/edit
     * @secure
     */
    editUsingPost: (
      query?: {
        /**
         * AI询问次数
         * @format int32
         */
        aiQueryCount?: number;
        /**
         * 创建时间
         * @format date-time
         */
        createTime?: string;
        /**
         * 主键ID
         * @format int32
         */
        id?: number;
        /** 等级名称 */
        levelName?: string;
        /**
         * 最大收益倍数
         * @format int32
         */
        maxProfitMultiplier?: number;
        /** 平级VIP奖励比例(%) */
        peerVipRewardRatio?: number;
        /** 状态(0:禁用,1:启用) */
        status?: boolean;
        /** 团队投资收益奖励(%) */
        teamInvestmentReward?: number;
        /** 团队投资总额(USDT) */
        teamInvestmentTotal?: number;
        /**
         * 团队VIP人数
         * @format int32
         */
        teamVipCount?: number;
        /**
         * 团队VIP等级
         * @format int32
         */
        teamVipLevel?: number;
        /**
         * 更新时间
         * @format date-time
         */
        updatedTime?: string;
        /**
         * VIP等级
         * @format int32
         */
        vipLevel?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/member-vip-level-config/edit`,
        method: "POST",
        query: query,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags member-vip-level-config-controller
     * @name GetByIdUsingGet
     * @summary 获取详情
     * @request GET:/member-vip-level-config/getById
     * @secure
     */
    getByIdUsingGet: (
      query?: {
        /**
         * id
         * @format int64
         */
        id?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/member-vip-level-config/getById`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags member-vip-level-config-controller
     * @name ListUsingGet
     * @summary 会员列表
     * @request GET:/member-vip-level-config/list
     * @secure
     */
    listUsingGet: (params: RequestParams = {}) =>
      this.request<_, void>({
        path: `/member-vip-level-config/list`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  memberVipLevelStartConfig = {
    /**
     * No description
     *
     * @tags member-vip-level-start-config-controller
     * @name EditUsingPost1
     * @summary 编辑
     * @request POST:/member-vip-level-start-config/edit
     * @secure
     */
    editUsingPost1: (
      query?: {
        /**
         * 币权系数
         * @format int32
         */
        coefficient?: number;
        /**
         * 创建时间
         * @format date-time
         */
        createTime?: string;
        /**
         * 主键ID
         * @format int32
         */
        id?: number;
        /** 等级名称 */
        levelName?: string;
        /**
         * 星级
         * @format int32
         */
        star?: number;
        /** 状态(0:禁用,1:启用) */
        status?: boolean;
        /**
         * 团队VIP人数
         * @format int32
         */
        teamVipCount?: number;
        /**
         * 团队VIP等级
         * @format int32
         */
        teamVipLevel?: number;
        /**
         * 1:直推，2：伞下
         * @format int32
         */
        type?: number;
        /**
         * 更新时间
         * @format date-time
         */
        updatedTime?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/member-vip-level-start-config/edit`,
        method: "POST",
        query: query,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags member-vip-level-start-config-controller
     * @name GetByIdUsingGet1
     * @summary 获取详情
     * @request GET:/member-vip-level-start-config/getById
     * @secure
     */
    getByIdUsingGet1: (
      query?: {
        /**
         * id
         * @format int64
         */
        id?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/member-vip-level-start-config/getById`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags member-vip-level-start-config-controller
     * @name ListUsingGet1
     * @summary 会员列表
     * @request GET:/member-vip-level-start-config/list
     * @secure
     */
    listUsingGet1: (params: RequestParams = {}) =>
      this.request<_, void>({
        path: `/member-vip-level-start-config/list`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  member = {
    /**
     * No description
     *
     * @tags 用户中心
     * @name InvitationUsingGet
     * @summary 认证
     * @request GET:/member/approve
     * @secure
     */
    invitationUsingGet: (
      query?: {
        backCard?: string;
        "backCardUrl.authority"?: string;
        "backCardUrl.content"?: object;
        /** @format int32 */
        "backCardUrl.defaultPort"?: number;
        "backCardUrl.file"?: string;
        "backCardUrl.host"?: string;
        "backCardUrl.path"?: string;
        /** @format int32 */
        "backCardUrl.port"?: number;
        "backCardUrl.protocol"?: string;
        "backCardUrl.query"?: string;
        "backCardUrl.ref"?: string;
        "backCardUrl.userInfo"?: string;
        /** @format date-time */
        createTime?: string;
        frontCard?: string;
        "frontCardUrl.authority"?: string;
        "frontCardUrl.content"?: object;
        /** @format int32 */
        "frontCardUrl.defaultPort"?: number;
        "frontCardUrl.file"?: string;
        "frontCardUrl.host"?: string;
        "frontCardUrl.path"?: string;
        /** @format int32 */
        "frontCardUrl.port"?: number;
        "frontCardUrl.protocol"?: string;
        "frontCardUrl.query"?: string;
        "frontCardUrl.ref"?: string;
        "frontCardUrl.userInfo"?: string;
        /** @format int64 */
        id?: number;
        idCard?: string;
        /** @format int64 */
        memberId?: number;
        memberTel?: string;
        refuse?: string;
        /** @format int32 */
        status?: number;
        userStatus?: string;
        username?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/member/approve`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 用户中心
     * @name CheckApproveUsingGet
     * @summary 检查是否认证
     * @request GET:/member/checkApprove
     * @secure
     */
    checkApproveUsingGet: (params: RequestParams = {}) =>
      this.request<_, void>({
        path: `/member/checkApprove`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 绑定邮箱
     * @name BindEmailUsingPost
     * @summary bindEmail
     * @request POST:/member/email/bind
     * @secure
     */
    bindEmailUsingPost: (
      query?: {
        email?: string;
        emailCode?: string;
        googleCode?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/member/email/bind`,
        method: "POST",
        query: query,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 绑定邮箱
     * @name ChangeEmailUsingPost
     * @summary changeEmail
     * @request POST:/member/email/change
     * @secure
     */
    changeEmailUsingPost: (
      query?: {
        googleCode?: string;
        newEmail?: string;
        newEmailCode?: string;
        oldEmailCode?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/member/email/change`,
        method: "POST",
        query: query,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 绑定邮箱
     * @name SendEmailCodeUsingGet
     * @summary sendEmailCode
     * @request GET:/member/email/send-code
     * @secure
     */
    sendEmailCodeUsingGet: (
      query: {
        /** email */
        email: string;
        /**
         * type
         * @default "BIND"
         */
        type?: "BIND" | "CHANGE";
      },
      params: RequestParams = {},
    ) =>
      this.request<Boolean, void>({
        path: `/member/email/send-code`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 用户中心
     * @name FlashExchangeUsingPost
     * @summary 用户闪兑
     * @request POST:/member/flash-exchange
     * @secure
     */
    flashExchangeUsingPost: (
      query?: {
        /** amount */
        amount?: number;
        /** fromCoin */
        fromCoin?: string;
        /** rate */
        rate?: string;
        /** toCoin */
        toCoin?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/member/flash-exchange`,
        method: "POST",
        query: query,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 用户中心
     * @name BindGoogleUsingPost
     * @summary 绑定google验证
     * @request POST:/member/gg/bindGoogle
     * @secure
     */
    bindGoogleUsingPost: (
      query?: {
        /**
         * code
         * @format int64
         */
        code?: number;
        /** secret */
        secret?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/member/gg/bindGoogle`,
        method: "POST",
        query: query,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 用户中心
     * @name GenerateGoogleSecretUsingPost
     * @summary 生成谷歌秘钥
     * @request POST:/member/gg/generateGoogleSecret
     * @secure
     */
    generateGoogleSecretUsingPost: (params: RequestParams = {}) =>
      this.request<_, void>({
        path: `/member/gg/generateGoogleSecret`,
        method: "POST",
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 用户中心
     * @name GoogleLoginUsingPost
     * @summary google验证验证码
     * @request POST:/member/gg/googleCodeTelVerify
     * @secure
     */
    googleLoginUsingPost: (
      query?: {
        /**
         * code
         * @format int64
         */
        code?: number;
        /** tel */
        tel?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/member/gg/googleCodeTelVerify`,
        method: "POST",
        query: query,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 用户中心
     * @name GoogleLoginUsingPost1
     * @summary google验证验证码
     * @request POST:/member/gg/googleCodeVerify
     * @secure
     */
    googleLoginUsingPost1: (
      query?: {
        /**
         * code
         * @format int64
         */
        code?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/member/gg/googleCodeVerify`,
        method: "POST",
        query: query,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 用户中心
     * @name UserInfoUsingGet
     * @summary 邀请列表
     * @request GET:/member/info
     * @secure
     */
    userInfoUsingGet: (params: RequestParams = {}) =>
      this.request<_, void>({
        path: `/member/info`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 用户中心
     * @name InitInvitationCodeUsingPost
     * @summary 用户钱包地址列表
     * @request POST:/member/init-invitation-code
     * @secure
     */
    initInvitationCodeUsingPost: (
      query?: {
        /** ids */
        ids?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/member/init-invitation-code`,
        method: "POST",
        query: query,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 用户中心
     * @name MemberAddressAddUsingPost
     * @summary 用户钱包地址列表
     * @request POST:/member/member-address-add
     * @secure
     */
    memberAddressAddUsingPost: (
      query?: {
        addr?: string;
        coin?: string;
        protocol?: string;
        remark?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/member/member-address-add`,
        method: "POST",
        query: query,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 用户中心
     * @name MemberAddressAddUsingPost1
     * @summary 用户钱包地址列表
     * @request POST:/member/member-address-del
     * @secure
     */
    memberAddressAddUsingPost1: (
      query?: {
        /** ids */
        ids?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/member/member-address-del`,
        method: "POST",
        query: query,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 用户中心
     * @name MemberAddressListUsingPost
     * @summary 用户钱包地址列表
     * @request POST:/member/member-address-list
     * @secure
     */
    memberAddressListUsingPost: (params: RequestParams = {}) =>
      this.request<_, void>({
        path: `/member/member-address-list`,
        method: "POST",
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 用户中心
     * @name InvitationUsingGet1
     * @summary 邀请列表
     * @request GET:/member/page-invitation
     * @secure
     */
    invitationUsingGet1: (
      query: {
        /** 排序方式 asc/desc */
        order?: string;
        /**
         * 页号
         * @format int32
         */
        pageNo: number;
        /**
         * 页面大小
         * @format int32
         */
        pageSize: number;
        /** 排序字段 */
        sort?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/member/page-invitation`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 用户中心
     * @name InvitationUsingGet2
     * @summary 生成邀请二维码
     * @request GET:/member/qrcode
     * @secure
     */
    invitationUsingGet2: (params: RequestParams = {}) =>
      this.request<_, void>({
        path: `/member/qrcode`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 用户中心
     * @name MemberTeamPageQueryUsingGet1
     * @summary 会员列表
     * @request GET:/member/team/page-query
     * @secure
     */
    memberTeamPageQueryUsingGet1: (
      query: {
        /**
         * generation
         * @format int32
         */
        generation?: number;
        /**
         * isInvest
         * @format int32
         */
        isInvest?: number;
        /** 排序方式 asc/desc */
        order?: string;
        /**
         * 页号
         * @format int32
         */
        pageNo: number;
        /**
         * 页面大小
         * @format int32
         */
        pageSize: number;
        /** 排序字段 */
        sort?: string;
        /** tel */
        tel?: string;
        /**
         * userId
         * @format int64
         */
        userId?: number;
        /**
         * vipLevel
         * @format int32
         */
        vipLevel?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/member/team/page-query`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 用户中心
     * @name MemberTeamAreaUsingGet
     * @summary 分区信息
     * @request GET:/member/team/page-query/area
     * @secure
     */
    memberTeamAreaUsingGet: (params: RequestParams = {}) =>
      this.request<_, void>({
        path: `/member/team/page-query/area`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 用户中心
     * @name MemberTeamAreaStatUsingGet
     * @summary 会员列表
     * @request GET:/member/team/page-query/areaStat
     * @secure
     */
    memberTeamAreaStatUsingGet: (
      query?: {
        /**
         * topMemberId
         * @format int64
         */
        topMemberId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/member/team/page-query/areaStat`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 用户中心
     * @name MemberTeamPageQueryUsingGet
     * @summary 会员列表
     * @request GET:/member/team/page-query/generation
     * @secure
     */
    memberTeamPageQueryUsingGet: (
      query?: {
        /**
         * generation
         * @format int32
         */
        generation?: number;
        /**
         * isInvest
         * @format int32
         */
        isInvest?: number;
        /**
         * userId
         * @format int64
         */
        userId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/member/team/page-query/generation`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),
  };
  nodeProductConfig = {
    /**
     * No description
     *
     * @tags node-product-config-controller
     * @name PageUsingPost
     * @summary 列表
     * @request POST:/node-product-config/list
     * @secure
     */
    pageUsingPost: (
      query?: {
        /**
         * nodeType
         * @format int32
         */
        nodeType?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/node-product-config/list`,
        method: "POST",
        query: query,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  nodeProduct = {
    /**
     * No description
     *
     * @tags node-product-purchase-controller
     * @name PurchaseUsingPost1
     * @summary 列表
     * @request POST:/node-product/purchase
     * @secure
     */
    purchaseUsingPost1: (
      query?: {
        /**
         * nodeId
         * @format int64
         */
        nodeId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/node-product/purchase`,
        method: "POST",
        query: query,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags node-product-purchase-controller
     * @name PurchaseCheckUsingPost
     * @summary 列表
     * @request POST:/node-product/purchase/check
     * @secure
     */
    purchaseCheckUsingPost: (
      query?: {
        /**
         * nodeId
         * @format int64
         */
        nodeId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/node-product/purchase/check`,
        method: "POST",
        query: query,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags node-product-purchase-controller
     * @name PurchaseInfoUsingPost
     * @summary 列表
     * @request POST:/node-product/purchase/info
     * @secure
     */
    purchaseInfoUsingPost: (params: RequestParams = {}) =>
      this.request<_, void>({
        path: `/node-product/purchase/info`,
        method: "POST",
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  order = {
    /**
     * No description
     *
     * @tags 订单
     * @name CreateUsingPost1
     * @summary 托管
     * @request POST:/order/create
     * @secure
     */
    createUsingPost1: (
      query?: {
        amount?: number;
        /** @format int64 */
        id?: number;
        /** @format int64 */
        productId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/order/create`,
        method: "POST",
        query: query,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 订单
     * @name DividendsStatisticsUsingGet
     * @summary 分红统计
     * @request GET:/order/dividends-statistics
     * @secure
     */
    dividendsStatisticsUsingGet: (params: RequestParams = {}) =>
      this.request<_, void>({
        path: `/order/dividends-statistics`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 订单
     * @name InfoUsingGet3
     * @summary 详情
     * @request GET:/order/info
     * @secure
     */
    infoUsingGet3: (
      query?: {
        /**
         * id
         * @format int64
         */
        id?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/order/info`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 订单
     * @name PageUsingGet2
     * @summary 托管列表
     * @request GET:/order/page
     * @secure
     */
    pageUsingGet2: (
      query: {
        /** 排序方式 asc/desc */
        order?: string;
        /**
         * 页号
         * @format int32
         */
        pageNo: number;
        /**
         * 页面大小
         * @format int32
         */
        pageSize: number;
        /** 排序字段 */
        sort?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/order/page`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 订单
     * @name UnlockUsingPost
     * @summary 解锁
     * @request POST:/order/unlock
     * @secure
     */
    unlockUsingPost: (
      query?: {
        /**
         * orderId
         * @format int64
         */
        orderId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/order/unlock`,
        method: "POST",
        query: query,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 订单
     * @name UnlockInfoUsingGet
     * @summary 解锁手续费查询
     * @request GET:/order/unlock-info
     * @secure
     */
    unlockInfoUsingGet: (
      query?: {
        /**
         * orderId
         * @format int64
         */
        orderId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/order/unlock-info`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),
  };
  platformConfig = {
    /**
     * No description
     *
     * @tags platform-config-controller
     * @name InfoUsingGet1
     * @summary 详情
     * @request GET:/platform-config/info
     * @secure
     */
    infoUsingGet1: (params: RequestParams = {}) =>
      this.request<_, void>({
        path: `/platform-config/info`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  porder = {
    /**
     * No description
     *
     * @tags 算力订单
     * @name ComputingPowerOutputSwarmUsingGet
     * @summary 算力产出-swarm统计
     * @request GET:/porder/computing-power-output-swarm
     * @secure
     */
    computingPowerOutputSwarmUsingGet: (params: RequestParams = {}) =>
      this.request<_, void>({
        path: `/porder/computing-power-output-swarm`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 算力订单
     * @name CreateUsingPost
     * @summary 下单
     * @request POST:/porder/create
     * @secure
     */
    createUsingPost: (
      query?: {
        agreement?: string;
        allIncome?: number;
        /** @format double */
        amount?: number;
        broadbandCharge?: number;
        /** 购买产品 */
        buyProduct?: string;
        /**
         * 购买产品id
         * @format int64
         */
        buyProductId?: number;
        /** @format int64 */
        childNodeId?: number;
        /** 中文协议 */
        cnAgreement?: string;
        /** @format date-time */
        createTime?: string;
        /** @format int32 */
        cycelDay?: number;
        /** 今日冻结 */
        dayFreeze?: number;
        /** 今日产出 */
        dayIncome?: number;
        /** 今日解冻 */
        dayUnfreeze?: number;
        /**
         * 剩余合约周期
         * @format int32
         */
        downCycelDay?: number;
        /** @format date-time */
        downTime?: string;
        /** @format int64 */
        endTime?: number;
        endTimeT?: string;
        /** 冻结 */
        freeze?: number;
        /** 消耗的gas费fil(独享矿机扣费) */
        gasConsumeFil?: number;
        /** 产品消耗 */
        gasConsumeFilT?: string;
        /** 质押的fil(独享矿机扣费) */
        gasPledgeFil?: number;
        /** 产品质押 */
        gasPledgeFilT?: string;
        gasPledgeFilTemp?: number;
        getRate?: number;
        hostedBroadband?: string;
        /** @format int64 */
        id?: number;
        /** 立即释放 */
        immediatelyRelease?: number;
        /**
         * 0点更改状态标记
         * @format int32
         */
        incomeFlag?: number;
        invalidRelease?: number;
        ipCharge?: number;
        isCheck?: "PROCESSING" | "SUCCESS" | "FAIL";
        /** @format int32 */
        isClosed?: number;
        /** @format int32 */
        isCompute?: number;
        isDisable?: "ACTIVE" | "INVALID";
        jyPassword?: string;
        /** 线性释放 */
        linearRelease?: number;
        /** @format int32 */
        lockDay?: number;
        /** @format int32 */
        lockTime?: number;
        /** @format int64 */
        memberId?: number;
        memberIds?: string;
        memberTel?: string;
        /** 矿工节点 */
        minerNode?: string;
        money?: number;
        /** 用户昵称 */
        nickname?: string;
        /** @format int32 */
        nodeId?: number;
        /** 用户节点名称 */
        nodeName?: string;
        /** @format int32 */
        nodeNum?: number;
        orderNo?: string;
        /** @format int64 */
        orderParent?: number;
        /** 初始存储 */
        originalT?: number;
        /** 父电话 */
        parentTel?: string;
        /** @format int32 */
        pledgeStatus?: number;
        /** @format date-time */
        pledgeTime?: string;
        /** @format double */
        powerAmount?: number;
        /** @format int64 */
        powerId?: number;
        powerName?: string;
        price?: number;
        profit?: number;
        profitMoney?: number;
        /** @format int32 */
        profitTime?: number;
        /**
         * 上架时间
         * @format date-time
         */
        publishTime?: string;
        /** @format int32 */
        releaseNum?: number;
        /** @format double */
        remainderAmount?: number;
        remainderRelease?: number;
        serviceCharge?: number;
        /**
         * 服务费免费天数到期时间
         * @format date-time
         */
        serviceChargeDownTime?: string;
        /**
         * 剩余时间
         * @format int32
         */
        serviceDownTime?: number;
        /** @format int64 */
        startTime?: number;
        startTimeT?: string;
        status?:
          | "WAITINYG"
          | "HAVING"
          | "COMPLETE"
          | "EXPIRING"
          | "DEFAULT"
          | "DISABLED";
        /** @format int32 */
        subsidyNum?: number;
        /** 用户电话 */
        tel?: string;
        /** @format date-time */
        timestamp?: string;
        topTel?: string;
        /** 总产出 */
        totalOutput?: number;
        totalRelease?: number;
        /** 累计解冻 */
        totalUnfreeze?: number;
        /** @format int32 */
        type?: number;
        /** 英问协议 */
        usAgreement?: string;
        yesterdayIncome?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/porder/create`,
        method: "POST",
        query: query,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 算力订单
     * @name InfoUsingGet2
     * @summary 订单详情
     * @request GET:/porder/info
     * @secure
     */
    infoUsingGet2: (
      query?: {
        /**
         * id
         * @format int64
         */
        id?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/porder/info`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 算力订单
     * @name PageDetailMcDxUsingGet
     * @summary 算力产出
     * @request GET:/porder/page-detail-mc-dx
     * @secure
     */
    pageDetailMcDxUsingGet: (
      query: {
        /** 排序方式 asc/desc */
        order?: string;
        /**
         * 页号
         * @format int32
         */
        pageNo: number;
        /**
         * 页面大小
         * @format int32
         */
        pageSize: number;
        /** 排序字段 */
        sort?: string;
        /**
         * type
         * @format int32
         */
        type?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/porder/page-detail-mc-dx`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 算力订单
     * @name ListPageUsingGet
     * @summary 订单列表
     * @request GET:/porder/page-list
     * @secure
     */
    listPageUsingGet: (
      query: {
        /** 排序方式 asc/desc */
        order?: string;
        /**
         * 页号
         * @format int32
         */
        pageNo: number;
        /**
         * 页面大小
         * @format int32
         */
        pageSize: number;
        /** 排序字段 */
        sort?: string;
        /**
         * status
         * @format int32
         */
        status?: number;
        /**
         * type
         * @format int32
         */
        type?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/porder/page-list`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 算力订单
     * @name SumIncomeUsingGet
     * @summary 订单列表-累计产出
     * @request GET:/porder/sumIncome
     * @secure
     */
    sumIncomeUsingGet: (params: RequestParams = {}) =>
      this.request<_, void>({
        path: `/porder/sumIncome`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  power = {
    /**
     * No description
     *
     * @tags 算力产品
     * @name HankUsingGet
     * @summary 产品销量排行
     * @request GET:/power/hank
     * @secure
     */
    hankUsingGet: (params: RequestParams = {}) =>
      this.request<_, void>({
        path: `/power/hank`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 算力产品
     * @name PageListUsingGet
     * @summary 产品列表
     * @request GET:/power/page-list
     * @secure
     */
    pageListUsingGet: (
      query: {
        /**
         * isHold
         * @format int32
         */
        isHold?: number;
        /** 排序方式 asc/desc */
        order?: string;
        /**
         * 页号
         * @format int32
         */
        pageNo: number;
        /**
         * 页面大小
         * @format int32
         */
        pageSize: number;
        /**
         * showHome
         * @format int32
         */
        showHome?: number;
        /** 排序字段 */
        sort?: string;
        /**
         * type
         * @format int32
         */
        type?: number;
        /**
         * userId
         * @format int64
         */
        userId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/power/page-list`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 算力产品
     * @name PageListH5UsingGet
     * @summary 产品列表-H5
     * @request GET:/power/page-list-h5
     * @secure
     */
    pageListH5UsingGet: (
      query: {
        /**
         * isHold
         * @format int32
         */
        isHold?: number;
        /** 排序方式 asc/desc */
        order?: string;
        /**
         * 页号
         * @format int32
         */
        pageNo: number;
        /**
         * 页面大小
         * @format int32
         */
        pageSize: number;
        /**
         * showHome
         * @format int32
         */
        showHome?: number;
        /** 排序字段 */
        sort?: string;
        /**
         * type
         * @format int32
         */
        type?: number;
        /**
         * userId
         * @format int64
         */
        userId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/power/page-list-h5`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 算力产品
     * @name PageListUsingGet1
     * @summary 根据查询产品
     * @request GET:/power/{id}
     * @secure
     */
    pageListUsingGet1: (id?: string, params: RequestParams = {}) =>
      this.request<_, void>({
        path: `/power/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  product = {
    /**
     * No description
     *
     * @tags 产品
     * @name HankUsingGet1
     * @summary 产品销量排行
     * @request GET:/product/hank
     * @secure
     */
    hankUsingGet1: (params: RequestParams = {}) =>
      this.request<_, void>({
        path: `/product/hank`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 产品
     * @name PageListUsingGet2
     * @summary 质押产品列表
     * @request GET:/product/page-list
     * @secure
     */
    pageListUsingGet2: (
      query: {
        /** 排序方式 asc/desc */
        order?: string;
        /**
         * 页号
         * @format int32
         */
        pageNo: number;
        /**
         * 页面大小
         * @format int32
         */
        pageSize: number;
        /**
         * showHome
         * @format int32
         */
        showHome?: number;
        /** 排序字段 */
        sort?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/product/page-list`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 产品
     * @name PageListUsingGet3
     * @summary 根据查询产品
     * @request GET:/product/{id}
     * @secure
     */
    pageListUsingGet3: (id?: string, params: RequestParams = {}) =>
      this.request<_, void>({
        path: `/product/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  sms = {
    /**
     * No description
     *
     * @tags 验证码
     * @name GetCodeUsingGet
     * @summary 验证码
     * @request GET:/sms/get/{type}
     * @secure
     */
    getCodeUsingGet: (
      type:
        | "REGISTER"
        | "FORGET_PASSWORD"
        | "EDIT_PASSWORD"
        | "EDIT_JY_PASSWORD"
        | "UPDATE_TEL"
        | "WITHDRAW",
      query?: {
        /** globalRoaming */
        globalRoaming?: string;
        /** tel */
        tel?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/sms/get/${type}`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 验证码
     * @name SendEmailUsingGet
     * @summary 发送邮箱验证码
     * @request GET:/sms/sendEmail/{type}
     * @secure
     */
    sendEmailUsingGet: (
      type:
        | "REGISTER"
        | "FORGET_PASSWORD"
        | "EDIT_PASSWORD"
        | "EDIT_JY_PASSWORD"
        | "UPDATE_TEL"
        | "WITHDRAW",
      query?: {
        /** emailNo */
        emailNo?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/sms/sendEmail/${type}`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 验证码
     * @name VerificationEmailUsingGet
     * @summary 验证邮箱验证
     * @request GET:/sms/verificationEmail
     * @secure
     */
    verificationEmailUsingGet: (
      query?: {
        /** emailNo */
        emailNo?: string;
        /** verificationCode */
        verificationCode?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/sms/verificationEmail`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),
  };
  upload = {
    /**
     * No description
     *
     * @tags 文件上传
     * @name ApkUploadUsingPost
     * @summary apkUpload
     * @request POST:/upload/apkUpload
     * @secure
     */
    apkUploadUsingPost: (
      data: {
        /**
         * file
         * @format binary
         */
        file: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/upload/apkUpload`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 文件上传
     * @name ImgUploadUsingPost
     * @summary imgUpload
     * @request POST:/upload/imgUpload
     * @secure
     */
    imgUploadUsingPost: (
      data: {
        /**
         * file
         * @format binary
         */
        file: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/upload/imgUpload`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),
  };
  wallet = {
    /**
     * No description
     *
     * @tags 资产
     * @name OutputFreezeAllUsingGet
     * @summary 账户明细-可用余额
     * @request GET:/wallet/account-details-balance
     * @secure
     */
    outputFreezeAllUsingGet: (
      query?: {
        /** coinCode */
        coinCode?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/wallet/account-details-balance`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 资产
     * @name AccountDetailsFreezeUsingGet1
     * @summary 账户明细-产出冻结-总览
     * @request GET:/wallet/account-details-freeze
     * @secure
     */
    accountDetailsFreezeUsingGet1: (
      query?: {
        /** coinCode */
        coinCode?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/wallet/account-details-freeze`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 资产
     * @name AccountDetailsFreezeUsingGet
     * @summary 账户明细-产出冻结-列表
     * @request GET:/wallet/account-details-freeze-list
     * @secure
     */
    accountDetailsFreezeUsingGet: (
      query: {
        /** coinCode */
        coinCode?: string;
        /** 排序方式 asc/desc */
        order?: string;
        /**
         * 页号
         * @format int32
         */
        pageNo: number;
        /**
         * 页面大小
         * @format int32
         */
        pageSize: number;
        /** 排序字段 */
        sort?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/wallet/account-details-freeze-list`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 资产
     * @name OtherPageUsingGet
     * @summary 分页获取其他记录（系统操作）
     * @request GET:/wallet/deposit-other
     * @secure
     */
    otherPageUsingGet: (
      query: {
        /** coinName */
        coinName?: string;
        /** endTime */
        endTime?: string;
        /** 排序方式 asc/desc */
        order?: string;
        /**
         * 页号
         * @format int32
         */
        pageNo: number;
        /**
         * 页面大小
         * @format int32
         */
        pageSize: number;
        /** 排序字段 */
        sort?: string;
        /** startTime */
        startTime?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/wallet/deposit-other`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 资产
     * @name DepositPageUsingGet
     * @summary 分页获取冲币记录
     * @request GET:/wallet/deposit-page
     * @secure
     */
    depositPageUsingGet: (
      query: {
        /** endTime */
        endTime?: string;
        /** 排序方式 asc/desc */
        order?: string;
        /**
         * 页号
         * @format int32
         */
        pageNo: number;
        /**
         * 页面大小
         * @format int32
         */
        pageSize: number;
        /** 排序字段 */
        sort?: string;
        /** startTime */
        startTime?: string;
        /** symbol */
        symbol?: string;
        /** tel */
        tel?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/wallet/deposit-page`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 资产
     * @name GetAccountAvailableBalanceUsingGet
     * @summary 账户可用余额
     * @request GET:/wallet/getAccountAvailableBalance
     * @secure
     */
    getAccountAvailableBalanceUsingGet: (
      query?: {
        /** coinName */
        coinName?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/wallet/getAccountAvailableBalance`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 资产
     * @name GetAccountAvailableBalanceSwarmUsingGet
     * @summary SWARM账户可用余额
     * @request GET:/wallet/getAccountAvailableBalanceSwarm
     * @secure
     */
    getAccountAvailableBalanceSwarmUsingGet: (params: RequestParams = {}) =>
      this.request<_, void>({
        path: `/wallet/getAccountAvailableBalanceSwarm`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 资产
     * @name GetRecordStatisticsUsingGet
     * @summary 资产-充值统计
     * @request GET:/wallet/getRecordStatistics
     * @secure
     */
    getRecordStatisticsUsingGet: (
      query?: {
        /** endTime */
        endTime?: string;
        /** startTime */
        startTime?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/wallet/getRecordStatistics`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 资产
     * @name GetTipsUsingPost
     * @summary 资产-获取温馨提示
     * @request POST:/wallet/getTips
     * @secure
     */
    getTipsUsingPost: (
      query?: {
        /** coinCode */
        coinCode?: string;
        /**
         * type
         * @format int32
         */
        type?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/wallet/getTips`,
        method: "POST",
        query: query,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 资产
     * @name GetTotalInvestmentUsingGet
     * @summary 获取总投资金额
     * @request GET:/wallet/getTotalInvestment
     * @secure
     */
    getTotalInvestmentUsingGet: (params: RequestParams = {}) =>
      this.request<_, void>({
        path: `/wallet/getTotalInvestment`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 资产
     * @name GetWithdrawStatisticsUsingGet
     * @summary 资产-提币统计
     * @request GET:/wallet/getWithdrawStatistics
     * @secure
     */
    getWithdrawStatisticsUsingGet: (
      query?: {
        /** endTime */
        endTime?: string;
        /** startTime */
        startTime?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/wallet/getWithdrawStatistics`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 资产
     * @name InitUsingPost
     * @summary 初始化一下
     * @request POST:/wallet/initEvery
     * @secure
     */
    initUsingPost: (params: RequestParams = {}) =>
      this.request<_, void>({
        path: `/wallet/initEvery`,
        method: "POST",
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 资产
     * @name ListUsingPost
     * @summary 资产列表
     * @request POST:/wallet/list
     * @secure
     */
    listUsingPost: (params: RequestParams = {}) =>
      this.request<_, void>({
        path: `/wallet/list`,
        method: "POST",
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 资产
     * @name PageDetailUsingGet
     * @summary 明细
     * @request GET:/wallet/page-detail
     * @secure
     */
    pageDetailUsingGet: (
      query: {
        /** coinCode */
        coinCode?: string;
        /** 排序方式 asc/desc */
        order?: string;
        /**
         * 页号
         * @format int32
         */
        pageNo: number;
        /**
         * 页面大小
         * @format int32
         */
        pageSize: number;
        /** 排序字段 */
        sort?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/wallet/page-detail`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 资产
     * @name PageDetailListUsingPost
     * @summary 明细-按分类查询
     * @request POST:/wallet/page-detail-list
     * @secure
     */
    pageDetailListUsingPost: (
      query: {
        /** coinCode */
        coinCode?: string;
        /** 排序方式 asc/desc */
        order?: string;
        /**
         * 页号
         * @format int32
         */
        pageNo: number;
        /**
         * 页面大小
         * @format int32
         */
        pageSize: number;
        /** 排序字段 */
        sort?: string;
        /**
         * type
         * @format int32
         */
        type?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/wallet/page-detail-list`,
        method: "POST",
        query: query,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 资产
     * @name PledgeThawingUsingGet
     * @summary 账户明细-质押解冻-总览
     * @request GET:/wallet/pledge-thawing
     * @secure
     */
    pledgeThawingUsingGet: (
      query?: {
        /** coinCode */
        coinCode?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/wallet/pledge-thawing`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 资产
     * @name PledgeThawingListUsingGet
     * @summary 账户明细-质押解冻-列表
     * @request GET:/wallet/pledge-thawing-list
     * @secure
     */
    pledgeThawingListUsingGet: (
      query: {
        /** coinCode */
        coinCode?: string;
        /** 排序方式 asc/desc */
        order?: string;
        /**
         * 页号
         * @format int32
         */
        pageNo: number;
        /**
         * 页面大小
         * @format int32
         */
        pageSize: number;
        /** 排序字段 */
        sort?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/wallet/pledge-thawing-list`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 资产
     * @name RechargeCommitUsingPost
     * @summary 资产-提交充币
     * @request POST:/wallet/rechargeCommit
     * @secure
     */
    rechargeCommitUsingPost: (
      query: {
        /** 凭证 */
        certificate: string;
        /** 充值币种 */
        coinCode: string;
        /** 充值金额 */
        money: number;
        /** 充币协议 */
        protocol: string;
        /** 充值地址 */
        rechargeAddress: string;
        /** 交易hash */
        txid?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/wallet/rechargeCommit`,
        method: "POST",
        query: query,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 资产
     * @name RechargeDetailUsingPost
     * @summary 资产-提交充币
     * @request POST:/wallet/rechargeDetail
     * @secure
     */
    rechargeDetailUsingPost: (
      query?: {
        /**
         * id
         * @format int64
         */
        id?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/wallet/rechargeDetail`,
        method: "POST",
        query: query,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 资产
     * @name InteamInvestmentStatitUsingGet
     * @summary 团队资产统计
     * @request GET:/wallet/team/investmentStat
     * @secure
     */
    inteamInvestmentStatitUsingGet: (params: RequestParams = {}) =>
      this.request<_, void>({
        path: `/wallet/team/investmentStat`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 资产
     * @name TransferUsingPost
     * @summary 转账
     * @request POST:/wallet/transfer
     * @secure
     */
    transferUsingPost: (
      query?: {
        balance?: number;
        jyPassword?: string;
        receiveTel?: string;
        symbol?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/wallet/transfer`,
        method: "POST",
        query: query,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 资产
     * @name TransferPageUsingGet
     * @summary 分页获取转账记录
     * @request GET:/wallet/transfer-page
     * @secure
     */
    transferPageUsingGet: (
      query: {
        /** 排序方式 asc/desc */
        order?: string;
        /**
         * 页号
         * @format int32
         */
        pageNo: number;
        /**
         * 页面大小
         * @format int32
         */
        pageSize: number;
        /** 排序字段 */
        sort?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/wallet/transfer-page`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 资产
     * @name WithdrawUsingPost
     * @summary 提币
     * @request POST:/wallet/withdraw
     * @secure
     */
    withdrawUsingPost: (
      query: {
        /** 提币地址 */
        address: string;
        /** 提币金额 */
        amount: number;
        /** 凭证 */
        certificate: string;
        /**
         * 谷歌验证码
         * @format int64
         */
        code: number;
        /** 充值币种 */
        coinCode: string;
        /** HASH */
        hash: string;
        /** memo */
        memo: string;
        /** 充币协议 */
        protocol: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/wallet/withdraw`,
        method: "POST",
        query: query,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 资产
     * @name WithdrawPageUsingGet
     * @summary 分页获取提币记录
     * @request GET:/wallet/withdraw-page
     * @secure
     */
    withdrawPageUsingGet: (
      query: {
        /** coinName */
        coinName?: string;
        /** 排序方式 asc/desc */
        order?: string;
        /**
         * 页号
         * @format int32
         */
        pageNo: number;
        /**
         * 页面大小
         * @format int32
         */
        pageSize: number;
        /** 排序字段 */
        sort?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<_, void>({
        path: `/wallet/withdraw-page`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),
  };
}
