# Getting Started

### Install

```bash
pnpm install
```

### Run the development server:

```bash
pnpm dev
```

### Production build:

```bash
pnpm build
```

### Test build:

```bash
pnpm build:test
```

### Gen svg icon types:

```bash
pnpm gen:icontype
```

### Responsive development

- H5 UI design draft: 375px
- PC UI design draft: 1920px
- Default base font-size: 16px
- md-pc screen >= 768 and isPC eg: md-pc:text-sm

```css
/* src/app/globals.css */
html {
  /* NOTE: H5 = 16px/(375px/100vw) */
  font-size: clamp(10px, 4.266666vw, 32.7px);
  /* isPC */
  @media (min-width: 768px) and (hover: hover) and (pointer: fine) {
    font-size: clamp(10px, 4.266666vw, 19.1146px);
  }
}
```

### request

[swr](https://swr.vercel.app/docs/getting-started)
[axios](https://axios-http.com/docs/intro)

```tsx
import { useRequestQuery } from "@/hooks/useRequestQuery";
import { useRequestMutation } from "@/hooks/useRequestMutation";
// 自动请求
const { data: typeData, isLoading } = useRequestQuery(
  api.kline.latestPriceUsingGet,
  {},
);
console.log("typeData", typeData, isLoading);
// 手动
const {
  trigger,
  data: log,
  isMutating: isLogLoading,
} = useRequestMutation(api.cms.pageAnnouncementUsingGet);
```

### 重构中的

```json
[
  {
    "path": "pages/home/index",
    "style": {
      "navigationStyle": "custom",
      "navigationBarTitleText": "首页"
    }
  },
  {
    "path": "pages/login/login",
    "style": {
      "navigationStyle": "custom",
      "navigationBarTitleText": ""
    }
  },
  {
    "path": "pages/home/charts",
    "style": {
      "navigationStyle": "custom",
      "navigationBarTitleText": "币价走势"
    }
  },
  {
    "path": "pages/news/news",
    "style": {
      "navigationBarTitleText": "消息中心",
      "navigationStyle": "custom"
    }
  },
  {
    "path": "pages/fund/fund",
    "style": {
      "navigationBarTitleText": "基金",
      "navigationStyle": "custom"
    }
  },
  {
    "path": "pages/news/detail",
    "style": {
      "navigationBarTitleText": "详情",
      "navigationStyle": "custom"
    }
  },
  {
    "path": "pages/fund/record",
    "style": {
      "navigationBarTitleText": "基金购买记录",
      "navigationStyle": "custom"
    }
  },
  {
    "path": "pages/teams/index",
    "style": {
      "navigationBarTitleText": "我的团队",
      "navigationStyle": "custom"
    }
  },
  {
    "path": "pages/user/vip",
    "style": {
      "navigationBarTitleText": " VIP权益",
      "navigationStyle": "custom"
    }
  },
  {
    "path": "pages/helperAI/helperAI",
    "style": {
      "navigationBarTitleText": "AI助手",
      "navigationStyle": "custom"
    }
  },
  {
    "path": "pages/user/index",
    "style": {
      "navigationStyle": "custom",
      "navigationBarTitleText": "个人中心"
    }
  },
  {
    "path": "pages/wallet/deposit",
    "style": {
      "navigationStyle": "custom",
      "navigationBarTitleText": "充币"
    }
  },
  {
    "path": "pages/assets/index",
    "style": {
      "navigationStyle": "custom",
      "navigationBarTitleText": "我的资产"
    }
  },
  {
    "path": "pages/fund/rule",
    "style": {
      "navigationBarTitleText": "基金规则",
      "navigationStyle": "custom"
    }
  },
  {
    "path": "pages/assets/income",
    "style": {
      "navigationBarTitleText": "投资收益",
      "navigationStyle": "custom"
    }
  },
  {
    "path": "pages/wallet/detail",
    "style": {
      "navigationStyle": "custom",
      "navigationBarTitleText": "交易记录"
    }
  },
  {
    "path": "pages/invite/invite",
    "style": {
      "navigationStyle": "custom",
      "navigationBarTitleText": "邀请好友"
    }
  },
  {
    "path": "pages/assets/upgrade",
    "style": {
      "navigationBarTitleText": "VIP计划",
      "navigationStyle": "custom"
    }
  },
  {
    "path": "pages/textDetail",
    "style": {
      "navigationBarTitleText": "用户协议",
      "navigationStyle": "custom"
    }
  },
  {
    "path": "pages/teams/next",
    "style": {
      "navigationBarTitleText": "下级团队",
      "navigationStyle": "custom"
    }
  },
  {
    "path": "pages/settings/security",
    "style": {
      "navigationStyle": "custom",
      "navigationBarTitleText": "安全设置"
    }
  },
  {
    "path": "pages/settings/editPassword",
    "style": {
      "navigationStyle": "custom",
      "navigationBarTitleText": "修改登录密码"
    }
  },
  {
    "path": "pages/settings/googleVerify",
    "style": {
      "navigationStyle": "custom",
      "navigationBarTitleText": "谷歌验证"
    }
  },
  {
    "path": "pages/settings/bindEmail",
    "style": {
      "navigationBarTitleText": "绑定邮箱",
      "navigationStyle": "custom"
    }
  },
  {
    "path": "pages/assets/exchange",
    "style": {
      "navigationBarTitleText": "闪兑",
      "navigationStyle": "custom"
    }
  },
  {
    "path": "pages/withdraw/index",
    "style": {
      "navigationStyle": "custom",
      "navigationBarTitleText": "提币"
    }
  }
]
```

### 要重构的页面

```json
[
  {
    "path": "pages/index/index",
    "style": {
      "navigationStyle": "custom",
      "navigationBarTitleText": ""
    }
  },
  {
    "path": "pages/forgot-password/index",
    "style": {
      "navigationStyle": "custom",
      "navigationBarTitleText": ""
    }
  },
  {
    "path": "pages/verify/verify",
    "style": {
      "navigationStyle": "custom",
      "navigationBarTitleText": "安全验证"
    }
  },
  {
    "path": "pages/demo/alert-dialog-demo",
    "style": {
      "navigationBarTitleText": "弹框组件演示"
    }
  },

  {
    "path": "pages/wallet/transaction-detail",
    "style": {
      "navigationStyle": "custom",
      "navigationBarTitleText": "交易详情"
    }
  },
  {
    "path": "pages/settings/address",
    "style": {
      "navigationStyle": "custom",
      "navigationBarTitleText": "地址簿"
    }
  },
  {
    "path": "pages/settings/addressAdd",
    "style": {
      "navigationStyle": "custom",
      "navigationBarTitleText": "地址簿"
    }
  },
  {
    "path": "pages/nodes/nodes",
    "style": {
      "navigationStyle": "custom",
      "navigationBarTitleText": "节点购买"
    }
  },

  {
    "path": "pages/fund/buy",
    "style": {
      "navigationBarTitleText": "买入",
      "navigationStyle": "custom"
    }
  },
  {
    "path": "pages/fund/success",
    "style": {
      "navigationBarTitleText": "",
      "navigationStyle": "custom"
    }
  },
  {
    "path": "pages/fund/detail",
    "style": {
      "navigationBarTitleText": "",
      "navigationStyle": "custom"
    }
  },
  {
    "path": "pages/teams/detail",
    "style": {
      "navigationBarTitleText": "",
      "navigationStyle": "custom"
    }
  },
  {
    "path": "pages/launchPage",
    "style": {
      "navigationBarTitleText": "",
      "navigationStyle": "custom"
    }
  }
]
```
