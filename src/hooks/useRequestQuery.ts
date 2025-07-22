import useSWR, { SWRConfiguration, SWRResponse } from "swr";

type FetcherFn<Data, Params> = (params: Params) => Promise<Data>;

export function useRequestQuery<Data, Params>(
  fetcher: FetcherFn<Data, Params>,
  params: Params | null,
  key?: string,
  config?: SWRConfiguration<Data, any>,
): SWRResponse<Data, any> {
  const swrKey =
    params == null ? null : ([key ?? fetcher.name, params] as const);
  return useSWR<Data>(swrKey, swrKey ? ([, p]) => fetcher(p as Params) : null, {
    revalidateOnFocus: false,
    ...config,
  });
}
