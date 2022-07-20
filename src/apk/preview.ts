import fileSize from '@/shared/filesize/filesize';
import ZIP from 'jszip'
import { FileType, getTypeByFilename } from './filetypes';

export interface ApkPreviewAttr {
  size: string
}

class ApkPreview {

  file: ZIP.JSZipObject

  fileType: FileType

  fileAttr: ApkPreviewAttr

  constructor(file: ZIP.JSZipObject) {
    this.file = file
    this.fileAttr = this.#getFileAttr()
    this.fileType = this.#getFileType(file)
  }

  #getFileType(file: ZIP.JSZipObject): FileType {
    const { name } = file
    const fileType = getTypeByFilename(name)
    return fileType
  }

  #getFileAttr(): ApkPreviewAttr {
    let size = (this.file as any)._data.uncompressedSize
    if (typeof size !== 'number') {
      size = 0
    }
    return <ApkPreviewAttr>{
      size: fileSize(size)
    }
  }

}

export {
  ApkPreview,
}