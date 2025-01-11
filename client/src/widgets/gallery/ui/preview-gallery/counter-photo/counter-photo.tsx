import { observer } from "mobx-react-lite"
import { galleryStore } from "../../../model/gallery-store"
import { CounterImage } from "./styles"

export const CounterPhoto = observer(() => <CounterImage>{galleryStore.counterImage}</CounterImage>)
