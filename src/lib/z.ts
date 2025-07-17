import { useTrans } from "@/hooks/useTrans";
import * as z from "zod";

export const useRootReg = () => {
  const t = useTrans();
  return {
    email: z.string().email("请输入有效邮箱"),
    password: z
      .string()
      .min(8, "至少8位")
      .max(30, "最多30位")
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
        message: "必须包含至少一个小写字母、一个大写字母和一个数字",
      }),
  };
};

export default z;
