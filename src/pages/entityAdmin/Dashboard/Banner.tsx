import { UPLOAD } from "@/api/datafeed"
import { useEntityStore } from "@/stores"
import { DatafeedInput, Models } from "@/types/datafeed"
import { classNames } from "@/utils"
import { useMutation } from "@apollo/client"
import { PlusIcon, PhotoIcon } from "@heroicons/react/24/outline"
import { useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"

type BannerProps = {
  url?: string
}

const Banner = (props: BannerProps) => {
  const { url } = props
  const entity = useEntityStore(state => state.entity)

  const [upload, {error}] = useMutation<{ upload: boolean }, { input: DatafeedInput }>(UPLOAD)

  const [preview, setPreview] = useState<string>("")
  const [file, setFile] = useState<File>()

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": ['.png'],
      "image/jpg": ['.jpg', '.jpeg'],
      "image/jpeg": ['.jpeg', '.jpg'],
    },
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0])
    },
  })

  const onRemove: React.MouseEventHandler<HTMLDivElement> = e => {
    e.stopPropagation()
    setFile(undefined)
    setPreview("")
  }

  const onReset: React.MouseEventHandler<HTMLDivElement> = e => {
    e.stopPropagation()
    url ? setPreview(url) : setPreview("")
    setFile(undefined)
  }

  const onSave: React.MouseEventHandler<HTMLDivElement> = async e => {
    e.stopPropagation()
    file && entity && upload({ variables: { input: { file, field: "banner", model: Models.ENTITY, objectId: entity.id } } })
  }

  useEffect(()=>{
    url && setPreview(url)
  }, [url])

  useEffect(()=>{
    if (!file) {
      return
    }
    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)
    return () => {
      URL.revokeObjectURL(objectUrl)
    }
  }, [file])

  const onImageLoad: React.ReactEventHandler<HTMLImageElement> = (e) => {
    const { naturalHeight, naturalWidth } = e.currentTarget
    console.log(naturalHeight, naturalWidth)
  }

  return <div
      {...getRootProps()}
      className={classNames(
      "space-y-2 p-4 rounded-md max-w-lg m-auto flex flex-col items-center",
      preview ? "" : "border-2 border-dashed"
      // errors?.file ? "border-red-500" : "border-gray-300"
    )}>
      {!preview && <>
        <PhotoIcon className={classNames(
          "h-24 text-gray-500",
          // errors?.file ? "text-red-500" : "text-gray-300"
        )}/>
        <p className="text-sm text-gray-500">Drag and drop file here</p>
        <div
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 cursor-pointer"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          or select file to upload
        </div>
      </>}
        <div className="max-h-32">
          <img
            src={preview}
            className="max-h-28"
            onLoad={onImageLoad}
          />
        </div>
      {(preview) && <>
        <p className="text-sm text-gray-500">{file?.name}</p>
        <div className="flex divide-x-2 divide-gray-300 space-x-1">
          <div 
            className="text-xs text-gray-400 hover:text-blue-500 cursor-pointer"
          >Change</div>
          { url && file && <div 
            className="text-xs text-gray-400 hover:text-blue-500 cursor-pointer pl-1"
            onClick={onReset}
          >Reset</div>}
          { file && <div 
            className={classNames(
              "text-xs hover:text-blue-500 cursor-pointer pl-1",
              file ? "text-green-500" : "text-gray-400"
            )}
            onClick={onSave}
          >Save</div>}
          <div
            className="text-xs text-gray-400 hover:text-red-500 cursor-pointer pl-1"
            onClick={onRemove}
          >Remove</div>
        </div>
      </>}
      <input
        {...getInputProps()}
      />
    </div>
}

export default Banner