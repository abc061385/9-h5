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

### TODO

- 稳健基金 = fund_no_2 === fundType:1
- 策略基金 = fund_no_1 === fundType: 2
