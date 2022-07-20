import ZIP from 'jszip'
import { FileType, getTypeByFilename } from './filetypes';

export enum ApkPreviewImageType {
  PNG,
  
  JPEG,
  JPG,

  GIF,
}

class ApkPreview {

  #file: ZIP.JSZipObject

  fileType: FileType

  constructor(file: ZIP.JSZipObject) {
    this.#file = file
    this.fileType = this.#getFileType(file)
  }

  #getFileType(file: ZIP.JSZipObject): FileType {
    const { name } = file
    const fileType = getTypeByFilename(name)
    return fileType
  }

}

export {
  ApkPreview,
}