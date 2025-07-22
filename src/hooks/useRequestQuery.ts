import useSWR, { SWRConfiguration, SWRResponse } from "swr";

type FetcherFn<Data, Params> = (params: Params) => Promise<Data>;

export function useRequestQuery<Data, Params, ErrorType = Error>(
  fetcher: FetcherFn<Data, Params>,
  params: Params | null,
  key?: string,
  config?: SWRConfiguration<Data, ErrorType>,
): SWRResponse<Data, ErrorType> {
  const swrKey =
    params == null ? null : ([key ?? fetcher.name, params] as const);
  return useSWR<Data>(swrKey, swrKey ? ([, p]) => fetcher(p as Params) : null, {
    revalidateOnFocus: false,
    ...config,
  });
}
