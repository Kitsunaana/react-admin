import { Table } from "shared/ui/table"
import { Box } from "shared/ui/box"
import { Input } from "shared/ui/form/input"
import { useTranslation } from "react-i18next"
import { useLang } from "shared/context/lang"
import { Controller, useForm } from "react-hook-form"
import { useSearchParams } from "react-router-dom"
import { ReactNode } from "react"
import { RefetchButton } from "shared/ui/buttons/refresh-button"
import { BackButton } from "shared/ui/buttons/back-button"
import { Text } from "shared/ui/text"
import { Mark } from "shared/ui/mark"
import { Pagination } from "shared/ui/pagination"
import { RowItem } from "shared/ui/row-item"
import { Icon } from "shared/ui/icon"
import { Vertical } from "shared/ui/divider"
import { IconButtonDelete } from "shared/ui/buttons/icon-button-delete"

export interface SearchForm {
  search: string
}

interface HeaderProps {
  refetchButton: ReactNode
  backButton: ReactNode
}

export const Header = (props: HeaderProps) => {
  const { refetchButton, backButton } = props

  const langBase = useLang()
  const { t } = useTranslation("translation", { keyPrefix: langBase })

  const [searchParams] = useSearchParams()
  const methods = useForm<SearchForm>({
    defaultValues: { search: searchParams.get("search") ?? "" },
  })

  return (
    <Box flex row ai gap>
      <Controller
        name="search"
        control={methods.control}
        render={({ field }) => (
          <Input {...field} fullWidth size="small" label={t("search")} />
        )}
      />
      <Box flex row ai>
        {refetchButton}
        {backButton}
      </Box>
    </Box>
  )
}

interface StopListItemProps {
  type: "category" | "good"
}

export const StopListItem = (props: StopListItemProps) => {
  const { type } = props

  return (
    <RowItem disableMargin height={48} eachRadius={false}>
      <Box flex row ai>
        <Icon
          name={type === "category" ? "allowCategory" : "goods"}
          fontSize="small"
          sx={{ mr: 1 }}
        />
        <Text caption="Какая-то категория" />
        {type === "good" && (
          <>
            <Icon
              fontSize="small"
              name="arrowRight"
              color="primary"
            />
            <Text caption="Название товара" />
          </>
        )}
      </Box>
      <Box flex row ai>
        <Text fontSize={12} caption="02.09.2024 21:31:17" />
        <Vertical />
        <IconButtonDelete />
      </Box>
    </RowItem>
  )
}

const StopListPage = () => (
  <Table
    header={(
      <Header
        refetchButton={<RefetchButton onRefetch={() => {}} />}
        backButton={<BackButton />}
      />
    )}
    content={(
      <>
        <StopListItem type="category" />
        <StopListItem type="good" />
      </>
    )}
    bottom={(
      <Box flex ai row gap sx={{ mr: 0, ml: "auto" }}>
        <Text
          name="rows.count"
          value={`${1}`}
          translateOptions={{
            components: {
              strong: <Mark />,
            },
          }}
        />
        <Pagination count={1} />
      </Box>
    )}
  />
)

export default StopListPage
