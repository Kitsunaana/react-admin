import { CategoryDto } from "shared/types/category"

export interface ITab {
  id: number
  caption: string
  icon: string
  content?: string[]
}

export type TPositionCheckbox = {
  id: number
  content: string
  position: CategoryDto.CategoryDto["captionPosition"]
}

export interface ImageUploadResponse {
  asset_folder: string,
  asset_id: string,
  bytes: number,
  created_at: string,
  display_name: string
  etag: string
  existing: boolean,
  format: string,
  height: number,
  original_filename: string,
  placeholder: boolean,
  public_id: string,
  resource_type: string
  secure_url: string
  signature: string
  tags: string[]
  type: string
  url: string
  version: number
  version_id: string
  width: number
}
