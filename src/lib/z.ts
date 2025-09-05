import { useTrans } from "@/hooks/useTrans";
import * as z from "zod";

export const useRootReg = () => {
  const t = useTrans();
  return {
    email: z.string().email(t("alerts.checkEmailTip")),
    password: z
      .string()
      .min(8, t("alerts.passwordInvalid"))
      .max(30, t("alerts.passwordInvalid"))
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
        message: t("alerts.passwordInvalid"),
      }),
    googleVerifyCode: z.string().regex(/^\d{6}$/, {
      message: t("editPassword.enterSixDigit"),
    }),
    countryPhone: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
      message: "请输入正确的电话号码",
    }),
    studioAddress: z.string().regex(/^.+$/, {
      message: "请输入详细地址",
    }),
    studioContactType: z.string().regex(/^.+$/, {
      message: "请输入联系方式",
    }),
    studioSiteType: z.string().regex(/^.+$/, {
      message: "请选择申请类型",
    }),
    studioOperationPlan: z.string().regex(/^.+$/, {
      message: "请输入运营计划",
    }),
    studioParticipantNumber: z.string().regex(/^.+$/, {
      message: "请输入参训人数",
    }),
    studioTeachLanguage: z.string().regex(/^.+$/, {
      message: "请输入授课语言",
    }),
    studioReceiveAddress: z.string().regex(/^.+$/, {
      message: "请输入收款地址",
    }),
  };
};

export default z;
