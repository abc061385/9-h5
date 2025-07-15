import { FC, useEffect } from "react";

type IProps = {
  product?: string;
};

const captcha = {
  instance: null,
};

export const Geetest: FC<IProps> = ({ product }) => {
  async function init() {
    const lang = "zh";
    // const res = await post_captchaApply({params: {type: 2}})
    const { sdkKey } = { sdkKey: "1123" };
    const config: GeetestConfig = {
      captchaId: sdkKey, //验证 id，极验后台申请得到
      product: product || "bind",
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
    const post_captchaValidate = async (p: unknown): Promise<unknown> => {
      return p;
    };
    try {
      /* eslint-disable */
      require("./gt4");
      window.initGeetest4(config, (captchaObj: any) => {
        captcha.instance = captchaObj;
        console.log("【验证码初始化成功】%o", captchaObj);
        captchaObj.appendTo("#geetest"); //将验证按钮插入到宿主页面中captchaBox元素内
        captchaObj.onSuccess(async () => {
          const result = captchaObj.getValidate();
          console.log("【验证码验证成功】", result);
          const res = await post_captchaValidate({
            params: {
              data: JSON.stringify(result),
              type: 2,
            },
          });
          console.log(res);
        });
      });
    } catch (err) {
      console.debug(err);
    }
  }
  useEffect(() => {
    init();
  }, []);
  return <div id={"geetest"} style={{ display: "none" }}></div>;
};
