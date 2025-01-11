import { Dialog } from "@mui/material"
import { observer } from "mobx-react-lite"
import { galleryContext, GalleryParams } from "shared/lib/gallery"
import { ReactNode, useMemo } from "react"
import { GalleryContextProvider, useGallery } from "../view-model/use-gallery-store"
import { galleryStore } from "../model/gallery-store"
import { GalleryBody } from "./gallery-body"

export const GalleryModal = observer(({ children }: { children: ReactNode }) => {
  const gallery = useGallery()

  const galleryContextProvider = useMemo(() => ({
    closeGallery: galleryStore.closeGallery,
    getGallery: (params: GalleryParams) => (
      galleryStore
        .openGallery(params, gallery.handleMovingPhoto)
    ),
  }), [])

  return (
    <galleryContext.Provider value={galleryContextProvider}>
      {children}

      <Dialog
        open={galleryStore.open}
        PaperProps={{
          sx: {
            backgroundColor: "transparent",
            backgroundImage: "unset",
            boxShadow: "unset",
            maxWidth: "calc(100% - 64px)",
            maxHeight: "calc(100% - 64px)",
            width: 1,
            height: 1,
            overflow: "hidden",
          },
        }}
      >
        <GalleryBody />
      </Dialog>
    </galleryContext.Provider>
  )
})

export const Gallery = ({ children }: { children: ReactNode }) => (
  <GalleryContextProvider>
    <GalleryModal>
      {children}
    </GalleryModal>
  </GalleryContextProvider>
)
