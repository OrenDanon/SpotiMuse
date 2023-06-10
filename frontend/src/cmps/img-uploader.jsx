import { useState } from 'react'
import { uploadService } from '../services/upload.service'

export function ImgUploader({ onUploaded = null }) {
  const [imgData, setImgData] = useState({
    imgUrl: null,
    height: 500,
    width: 500,
  })
  const [isUploading, setIsUploading] = useState(false)

  async function uploadImg(ev) {
    setIsUploading(true)
    const { secure_url, height, width } = await uploadService.uploadImg(ev)
    setImgData({ imgUrl: secure_url, width, height })
    setIsUploading(false)
    onUploaded && onUploaded(secure_url)
  }



  function getUploadLabel() {
    if (imgData.imgUrl) return 'Upload a new one?'
    return isUploading ? 'Uploading....' : 'Upload Image'
  }

  return (
    <div className="upload-preview">
      <label className="file-input-label" htmlFor="imgUpload">{getUploadLabel()}</label>
      <input type="file" className="upload-file" onChange={uploadImg} accept="img/*" id="imgUpload" />
    </div>
  )
}