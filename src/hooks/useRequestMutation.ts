import useSWRMutation, {
  SWRMutationConfiguration,
  SWRMutationResponse,
} from "swr/mutation";

type FetcherFn<Data, Params> = (params: Params) => Promise<Data>;

export function useRequestMutation<Data, Params>(
  fetcher: FetcherFn<Data, Params>,
  key?: string,
  config?: SWRMutationConfiguration<Data, any, string, Params>,
): SWRMutationResponse<Data, any, string, Params> {
  const mutationKey = key ?? fetcher.name;
  return useSWRMutation<Data, any, string, Params>(
    mutationKey,
    (_key, { arg }) => fetcher(arg as Params),
    {
      revalidate: true,
      rollbackOnError: true,
      ...config,
    },
  );
}
