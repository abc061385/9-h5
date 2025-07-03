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
