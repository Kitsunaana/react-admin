import { Box } from "shared/ui/box"
import Button from "@mui/material/Button"
import { dispatchEdit } from "shared/lib/event"
import { CharacteristicsDialog } from "features/characteristics/ui/dialog"
import { StoreDialogProvider, useDialogStore } from "shared/ui/dialog/dialog-edit"
import { useStores } from "features/categories/create-and-edit/ui/dialog"
import { observer } from "mobx-react-lite"
import { Divider, Vertical } from "shared/ui/divider"
import { IconButton } from "shared/ui/icon-button"
import { alpha, Tooltip } from "@mui/material"
import { Icon } from "shared/ui/icon"

export const Characteristics = observer(() => {
  const { characteristics } = useStores()
  const { fullScreen } = useDialogStore()

  return (
    <Box flex row grow sx={{ height: 1 }}>
      <Box
        flex
        grow
        sx={{
          mt: 1,
          overflow: "auto",
          height: fullScreen ? "calc(100% - 60px)" : 432,
        }}
      >
        {characteristics.items.map((characteristic) => (
          <Box
            onDoubleClick={() => dispatchEdit("characteristics", {
              id: characteristic.id,
              localData: characteristic,
            } as any)}
            key={characteristic.id}
            flex
            ai
            row
            jc_sp
            sx={{
              px: 1,
              minHeight: 40,
              mb: 0.5,
              border: ({ palette }) => `1px solid ${palette.mode === "dark"
                ? alpha(palette.grey["600"], 0.75)
                : alpha(palette.grey["400"], 0.45)}`,
              borderRadius: 2,
              borderLeft: ({ palette }) => (characteristic.local
                ? `5px solid ${palette.warning.main}`
                : null),
              transition: ".3s",
              "&:hover": {
                backgroundColor: ({ palette }) => palette.grey[800],
              },
            }}
          >
            <Box flex row ai>
              {characteristic.hideClient && (
                <Tooltip arrow title="Скрыть у клиента">
                  <Box flex ai row sx={{ mr: 1 }}>
                    <Icon name="invisible" fontSize="small" color="warning" />
                  </Box>
                </Tooltip>
              )}
              <Box>
                {characteristic.caption}
                {" "}
                {characteristic.value}
                {" "}
                {characteristic.unit}
              </Box>
            </Box>
            <Box flex ai row>
              <Tooltip title="Для категории" arrow>
                <Box flex ai row gap>
                  <Icon
                    name="allowCategory"
                    fontSize="small"
                    sx={{ color: ({ palette }) => palette.success.light }}
                  />
                </Box>
              </Tooltip>
              <Vertical />
              <Tooltip title="Редактировать" arrow>
                <Box flex ai row>
                  <IconButton
                    onClick={() => dispatchEdit("characteristics", {
                      id: characteristic.id,
                      localData: characteristic,
                    } as any)}
                    fontSize={20}
                    color="primary"
                    name="edit"
                  />
                </Box>
              </Tooltip>
              <Tooltip title="Удалить" arrow>
                <Box flex ai row>
                  <IconButton fontSize={20} color="warning" name="delete" />
                </Box>
              </Tooltip>
            </Box>
          </Box>
        ))}
      </Box>
      <Vertical />
      <Box sx={{ pt: 1 }}>
        <IconButton
          name="add"
          onClick={() => dispatchEdit("characteristics", {})}
        />
      </Box>
      <StoreDialogProvider>
        <CharacteristicsDialog />
      </StoreDialogProvider>

    </Box>
  )
})
