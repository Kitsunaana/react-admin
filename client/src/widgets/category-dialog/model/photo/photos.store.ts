import { makeAutoObservable, toJS } from "mobx"
import { RecordEvent } from "../../view-model/history/events"
import { PasteAction } from "../../view-model/setting/settings-types"
import {
  getCaptions,
  getMergePhotos,
  getImagesWithoutRemoved,
  getMediaWithRemoved,
  changeMediaOrder,
  filterByUnusedPhoto,
  filterPhotos,
  filterByDelete,
  recordChangeOrderEvent,
  recordClearImageEvent,
  recordClearMediaEvent,
  recordUploadFiles, findIndexPhoto,
} from "./photo-core"
import { Image, Media, Photo } from "../../domain/photo"

export class PhotosStore {
  public images: Image[] = []
  public media: Media[] = []

  public constructor(private recordEvent: RecordEvent) {
    makeAutoObservable(this, { }, { autoBind: true })
  }

  public get photos() {
    return getMergePhotos(this.filteredMedia, this.images)
  }

  private get filteredMedia() {
    return filterPhotos(this.media, filterByDelete)
  }

  public changeMediaOrder(order: number, id: string) {
    this.media = changeMediaOrder(id, order, this.media)
    recordChangeOrderEvent({ id, order }, this.recordEvent)
  }

  public clearMedia(id: string) {
    this.media = getMediaWithRemoved(id, this.media)
    recordClearMediaEvent(id, this.recordEvent)
  }

  public clearImage(id: string) {
    this.images = getImagesWithoutRemoved(id, this.images)
    recordClearImageEvent(id, this.recordEvent)
  }

  public uploadFiles(files: Image[]) {
    this.images = this.images.concat(files)
    recordUploadFiles(files, this.recordEvent)
  }

  public openGallery(id: string, callback: (params: { index: number, photos: Photo[] }) => void) {
    const index = findIndexPhoto(id, this.photos)

    callback({
      index: index === -1 ? 0 : index,
      photos: this.photos,
    })
  }

  private getFilteredMedia(media: Media[]) {
    const captionMedia = getCaptions(this.media, "originalName")

    return filterPhotos(media, (photo) => (
      filterByUnusedPhoto(photo, "originalName", captionMedia)
    ))
  }

  private getFilteredImages(images: Image[]) {
    const captionImages = getCaptions(this.images, "caption")

    return filterPhotos(images, (photo) => (
      filterByUnusedPhoto(photo, "caption", captionImages)
    ))
  }

  public setCopiedImages(action: PasteAction, images: Image[]) {
    if (action === "replace") return this.replaceCopiedImages(images)

    if (action === "add") return this.addCopiedImages(images)
  }

  public setCopiedMedia(action: PasteAction, media: Media[]) {
    if (action === "replace") return this.replaceCopiedMedia(media)

    if (action === "add") return this.addCopiedMedia(media)
  }

  public setMedia(media: Media[]) {
    this.media = media
  }

  public setImages(images: Image[]) {
    this.images = images
  }

  public get() {
    return {
      media: toJS(this.media),
      images: toJS(this.images),
    }
  }

  private removeAllImages() {
    this.images.forEach((image) => this.clearImage(image.id))
  }

  private removeAllMedia() {
    this.media.forEach((media) => this.clearMedia(media.id))
  }

  private mergeImages(images: Image[]) {
    this.images = this.images.concat(images)
  }

  private mergeMedia(media: Media[]) {
    this.media = this.media.concat(media)
  }

  private replaceCopiedImages(replaceImages: Image[]) {
    this.removeAllImages()
    this.mergeImages(replaceImages)
  }

  private replaceCopiedMedia(replaceMedia: Media[]) {
    this.removeAllMedia()
    this.mergeMedia(replaceMedia)
  }

  private addCopiedImages(addedImages: Image[]) {
    this.mergeImages(
      this.getFilteredImages(addedImages),
    )
  }

  private addCopiedMedia(addedMedia: Media[]) {
    this.mergeMedia(
      this.getFilteredMedia(addedMedia),
    )
  }
}
