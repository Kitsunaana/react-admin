import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { FetchTranslateResponse, Locale, TranslateBody } from "../../domain/alt-name"
import { useAltNameStore } from "../../model/alt-name/use-alt-name-store"

export type GetAllTranslateAltNameBody = { locales: Locale[], payload: TranslateBody }

export type AltNameApi = {
  translate: (locale: Locale, category: TranslateBody) => Promise<FetchTranslateResponse>
}

export const useGetAllTranslateAltName = (altNameApi: AltNameApi) => {
  const addTranslateAltNames = useAltNameStore((store) => store.addTranslateAltNames)

  const mutation = useMutation({
    mutationKey: [],
    mutationFn: (body: GetAllTranslateAltNameBody) => (
      Promise
        .all(body.locales.map((locale) => altNameApi.translate(locale, body.payload)))
    ),
    onSuccess: addTranslateAltNames,
    onError: (error) => toast.error(error?.message),
  })

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isPending,
  }
}
