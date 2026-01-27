import { useTrans } from "@/hooks/useTrans";
import z from "@/lib/z";

const useSchema = () => {
  const t = useTrans();
  const Schema = z
    .object({
      currencyCode: z.string().nonempty(),
      // XRPTag: z.string(),
      withdrawAddress: z.string().nonempty({ message: "请输入邀请码" }),
      withdrawAmount: z.string(),
    })
    .check((ctx) => {
      // const data = ctx.value;
      // if (!data.chainEnum?.protocolType) {
      //   ctx.issues.push({
      //     code: "custom",
      //     message: "请选择网络",
      //     path: ["chainEnum"],
      //     input: ctx.value,
      //   });
      // }
      // if (
      //   utils
      //     .toBigNumber(data.withdrawAmount)
      //     .lt(utils.toBigNumber(data.chainEnum.minWithdrawal))
      // ) {
      //   ctx.issues.push({
      //     code: "custom",
      //     message: t("withdraw.minAmountTip", {
      //       min: (data.chainEnum.minWithdrawal as number) + data.currencyCode,
      //     }),
      //     path: ["withdrawAmount"],
      //     input: ctx.value,
      //   });
      // }
      // if (
      //   utils
      //     .toBigNumber(data.withdrawAmount)
      //     .gt(utils.toBigNumber(data.chainEnum.maxWithdrawal))
      // ) {
      //   ctx.issues.push({
      //     code: "custom",
      //     message: t("withdraw.maxAmountTip", {
      //       max: (data.chainEnum.maxWithdrawal as number) + data.currencyCode,
      //     }),
      //     path: ["withdrawAmount"],
      //     input: ctx.value,
      //   });
      // }
      // if (data.currencyCode.toUpperCase() === "XRP" && !data.XRPTag) {
      //   ctx.issues.push({
      //     code: "custom",
      //     message: t("XRP Tag Withdraw"),
      //     path: ["XRPTag"],
      //     input: ctx.value,
      //   });
      // }
    });
  return Schema;
};

export default useSchema;
