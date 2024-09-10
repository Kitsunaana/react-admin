import * as React from "react"
import Box from "@mui/material/Box"
import Menu from "@mui/material/Menu"
import Divider from "@mui/material/Divider"
import { ButtonGroup } from "shared/ui/buttons/toggle-button"
import { IconButton } from "shared/ui/buttons/icon-button"
import { Text } from "shared/ui/text"
import { Icon } from "shared/ui/icon"
import { useState } from "react"
import { Tab } from "shared/ui/tabs/tab"
import { Tabs } from "shared/ui/tabs/tabs"
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material"

interface AccountMenuProps {
  onChangeSettings: (name: string, value: string) => void
  onChangeSettingInput: (name: string, value: boolean) => void
  buttonGroups: string[]
  settings: Record<string, string>
  settingInputs: Record<string, boolean>
}

export function CopySettings(props: AccountMenuProps) {
  const {
    buttonGroups, onChangeSettings, onChangeSettingInput, settings, settingInputs,
  } = props

  // console.log(JSON.parse(JSON.stringify(settingInputs)))

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const [selectedTab, setSelectedTab] = useState(0)

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <IconButton name="settings_v2" onClick={handleClick} />
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              backgroundColor: ({ palette }) => (palette.mode === "dark"
                ? palette.grey[900]
                : palette.common.white),
              backgroundImage: ({ background }) => background.sectionBackground,
              px: 0.5,
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              borderRadius: 3,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: "\"\"",
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                backgroundColor: ({ palette }) => (palette.mode === "dark"
                  ? palette.grey[900]
                  : palette.common.white),
                backgroundImage: ({ background }) => background.sectionBackground,
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Tabs
          hasError={false}
          tab={selectedTab}
          tabs={[{ id: 0, caption: "rows" }, { id: 1, caption: "inputs" }].map((tab) => (
            <Tab
              key={tab.id}
              id={tab.id}
              caption={tab.caption}
              icon={tab.caption}
              isActive={tab.id === selectedTab}
              changeTab={setSelectedTab}
              sx={{ width: "50%" }}
            />
          ))}
        />

        <Box sx={{ mt: 1 }}>
          {selectedTab === 0 && (
            buttonGroups.map((groups) => (
              <div key={groups}>
                <Divider sx={{ fontSize: 12, textTransform: "lowercase" }}>
                  <Text name={groups} />
                </Divider>
                <ButtonGroup
                  name={groups}
                  onChangeSettings={onChangeSettings}
                  defaultValue={settings[groups]}
                />
              </div>
            ))
          )}
          {selectedTab === 1 && (
            <FormGroup sx={{ mx: 1 }}>
              {Object.entries(settingInputs).map(([key, value]) => (
                <FormControlLabel
                  key={key}
                  label={key}
                  control={(
                    <Checkbox
                      size="small"
                      checked={value}
                      onChange={(_, checked) => onChangeSettingInput(key, checked)}
                    />
                  )}
                />
              ))}
            </FormGroup>
          )}
        </Box>
      </Menu>
    </>
  )
}
