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
  };
};

export default z;
