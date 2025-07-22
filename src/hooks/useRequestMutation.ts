import useSWRMutation, {
  SWRMutationConfiguration,
  SWRMutationResponse,
} from "swr/mutation";

type FetcherFn<Data, Params> = (params: Params) => Promise<Data>;

export function useRequestMutation<Data, Params, ErrorType = Error>(
  fetcher: FetcherFn<Data, Params>,
  key?: string,
  config?: SWRMutationConfiguration<Data, ErrorType, string, Params>,
): SWRMutationResponse<Data, ErrorType, string, Params> {
  const mutationKey = key ?? fetcher.name;
  return useSWRMutation<Data, ErrorType, string, Params>(
    mutationKey,
    (_key, { arg }) => fetcher(arg as Params),
    {
      revalidate: true,
      rollbackOnError: true,
      ...config,
    },
  );
}
