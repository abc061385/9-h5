type LocaleParams = Promise<{ locale: string }>;
type RootProps = Readonly<{
  params: LocaleParams;
}>;

type ApiResponse<T> = T;
