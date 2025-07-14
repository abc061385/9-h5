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

### Responsive development

- H5 UI design draft: 375px
- PC UI design draft: 1920px
- Default base font-size: 16px

```css
/* src/app/globals.css */
html {
  /* NOTE: PC = 16px/(1920px/100vw) */
  font-size: clamp(12px, 0.833333vw, 48px);
  /* NOTE: H5 = 16px/(375px/100vw) */
  @media screen and (max-width: 767px) {
    font-size: clamp(10px, 4.266666vw, 48px);
  }
}
```

### request

[swr](https://swr.vercel.app/docs/getting-started)
[axios](https://axios-http.com/docs/intro)

```tsx
"use client";
import Roulette from "@/components/roulette";
import useSWR from "swr";
import { useState } from "react";
import { api } from "@/api";
const DemoView = () => {
  const [params, setParams] = useState({ pageNo: 1, pageSize: 20 });
  const { data: user, isLoading } = useSWR(
    params?.pageNo && params.pageSize
      ? ["pageAnnouncementUsingGet", params]
      : null,
    ([, p]) => api.cms.pageAnnouncementUsingGet(p),
  );
  // api.auth.infoUsingGet().then(console.log);
  return (
    <div>
      <div>
        <button
          className="text-4xl"
          onClick={() => {
            setParams({ ...params, pageNo: 2 });
          }}
        >
          Re-request
        </button>
        <span>
          {isLoading ? (
            <span className="inline-block animate-spin">x</span>
          ) : (
            user?.data.size
          )}{" "}
          {user?.message}
        </span>
      </div>
      <Roulette />
    </div>
  );
};

export default DemoView;
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
    "path": "pages/invite/invite",
    "style": {
      "navigationStyle": "custom",
      "navigationBarTitleText": "邀请好友"
    }
  },
  {
    "path": "pages/demo/alert-dialog-demo",
    "style": {
      "navigationBarTitleText": "弹框组件演示"
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
    "path": "pages/assets/index",
    "style": {
      "navigationStyle": "custom",
      "navigationBarTitleText": "我的资产"
    }
  },
  {
    "path": "pages/withdraw/index",
    "style": {
      "navigationStyle": "custom",
      "navigationBarTitleText": "提币"
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
    "path": "pages/wallet/detail",
    "style": {
      "navigationStyle": "custom",
      "navigationBarTitleText": "交易记录"
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
    "path": "pages/home/charts",
    "style": {
      "navigationStyle": "custom",
      "navigationBarTitleText": "币价走势"
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
    "path": "pages/news/news",
    "style": {
      "navigationBarTitleText": "消息中心",
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
    "path": "pages/fund/fund",
    "style": {
      "navigationBarTitleText": "基金",
      "navigationStyle": "custom"
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
    "path": "pages/fund/buy",
    "style": {
      "navigationBarTitleText": "买入",
      "navigationStyle": "custom"
    }
  },
  {
    "path": "pages/fund/record",
    "style": {
      "navigationBarTitleText": "",
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
    "path": "pages/assets/income",
    "style": {
      "navigationBarTitleText": "",
      "navigationStyle": "custom"
    }
  },
  {
    "path": "pages/assets/upgrade",
    "style": {
      "navigationBarTitleText": "",
      "navigationStyle": "custom"
    }
  },
  {
    "path": "pages/textDetail",
    "style": {
      "navigationBarTitleText": "",
      "navigationStyle": "custom"
    }
  },
  {
    "path": "pages/assets/exchange",
    "style": {
      "navigationBarTitleText": "",
      "navigationStyle": "custom"
    }
  },
  {
    "path": "pages/teams/index",
    "style": {
      "navigationBarTitleText": "",
      "navigationStyle": "custom"
    }
  },
  {
    "path": "pages/teams/next",
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
  },
  {
    "path": "pages/settings/bindEmail",
    "style": {
      "navigationBarTitleText": "",
      "navigationStyle": "custom"
    }
  }
]
```
