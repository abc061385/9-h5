import { api } from "@/api";
import { FC, forwardRef, useEffect, useImperativeHandle } from "react";
import useSWRImmutable from "swr/immutable";
import "../../../public/js/gt4.js";
import { BehaviorValidateRespDTO } from "@/api/NineIndexClient.js";

type IProps = {
  onSuccess?: (validateData: BehaviorValidateRespDTO) => void;
};

export type GeetestValidateRes = BehaviorValidateRespDTO;
interface GeetestCaptchaResponse {
  captcha_id: string;
  captcha_output: string;
  gen_time: string; // Timestamp，如 "1752910785"
  lot_number: string;
  pass_token: string;
}
type Captcha = {
  instance: {
    getValidate: () => GeetestCaptchaResponse;
    validate: () => void;
    showCaptcha: () => void;
    showBox: () => void;
    onSuccess: (callpack: () => Promise<void>) => void;
  } | null;
};

export type GeetestRef = {
  showCaptcha: () => void;
};
export const captcha: Captcha = {
  instance: null,
};

export const Geetest = forwardRef<GeetestRef, IProps>(({ onSuccess }, ref) => {
  const { data } = useSWRImmutable("behavior/apply", () =>
    api.nineIndex.behavior.apply(),
  );
  async function init() {
    const lang = "cn";
    const config: GeetestConfig = {
      captchaId: data?.data.sdkKey, //验证 id，极验后台申请得到
      product: "bind",
      language: (() => {
        const obj: { [key in string]?: string } = {
          cn: "zho",
          hk: "zho-hk",
          en: "eng",
          ja: "jpn",
          in: "ind",
          ru: "rus",
          es: "spa",
        };
        return obj[lang] || "eng";
      })(),
      protocol: "https://",
      // apiServers: [host + "/geapi/v4"],
    };
    try {
      window.initGeetest4(config, (captchaObj: any) => {
        captcha.instance = captchaObj;
        console.log("【验证码初始化成功】%o", captchaObj);
        captchaObj.appendTo("#geetest"); //将验证按钮插入到宿主页面中captchaBox元素内
        captchaObj.onSuccess(() => {
          const result = captchaObj?.getValidate();
          api.nineIndex.behavior
            .validate1({
              bizType: "",
              lotNumber: result.lot_number,
              captchaOutput: result.captcha_output,
              passToken: result.pass_token,
              genTime: result.gen_time,
            })
            .then((res) => {
              if (res.code === 200) {
                onSuccess?.(res.data);
              }
            })
            .catch(() => {});
        });
      });
    } catch (err) {
      console.debug(err);
    }
  }
  useEffect(() => {
    if (data?.data?.sdkKey) {
      init();
    }
  }, [data]);

  const showCaptcha = () => {
    captcha.instance?.showCaptcha();
  };
  useImperativeHandle(
    ref,
    () => ({
      showCaptcha,
    }),
    [],
  );

  return <div id={"geetest"} className="hidden"></div>;
});
