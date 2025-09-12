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
      message: t("validPhone"),
    }),
    studioAddress: z.string().regex(/^.+$/, {
      message: t("enter_venue_address"),
    }),
    studioContactType: z.string().regex(/^.+$/, {
      message: t("enter_contact_info"),
    }),
    studioSiteType: z.string().regex(/^.+$/, {
      message: t("select_venue_type"),
    }),
    studioOperationPlan: z.string().regex(/^.+$/, {
      message: t("enter_operational_plan"),
    }),
    studioParticipantNumber: z.string().regex(/^[1-9]\d*$/, {
      message: t("validTraineeCount"),
    }),
    studioTeachLanguage: z.string().regex(/^.+$/, {
      message: t("enter_language_of_instruction"),
    }),
    studioReceiveAddress: z.string().regex(/^.+$/, {
      message: t("enter_receiving_address"),
    }),
    selectMeetupType: z.string().regex(/^.+$/, {
      message: t("selectMeetupType"),
    }),
  };
};

export default z;
