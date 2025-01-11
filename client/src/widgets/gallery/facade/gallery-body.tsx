import { TransitionPhoto } from "widgets/gallery/ui/transition-photo"
import { Navigation } from "../ui/navigation"
import { Preview } from "../ui/preview-gallery/layout"
import { PhotoList } from "../ui/preview-gallery/photo-list"
import { Actions } from "../ui/actions"
import { CounterPhoto } from "../ui/preview-gallery/counter-photo"

export const GalleryBody = () => (
  <>
    <TransitionPhoto />
    <Navigation />
    <Preview
      counter={<CounterPhoto />}
      photoList={<PhotoList />}
    />
    <Actions />
  </>
)
