import { UPLOAD } from "@/api/datafeed"
import Modal from "@/components/Modal"
import { DatafeedInput, Models } from "@/types/datafeed"
import { classNames, logError } from "@/utils"
import { ApolloError, useMutation } from "@apollo/client"
import { PhotoIcon, PlusIcon, PencilSquareIcon, CameraIcon, ArrowUpTrayIcon} from "@heroicons/react/24/outline"
import { useCallback, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { useParams } from "react-router-dom"

type PhotoProps = {
  url?: string
}

const Photo = (props: PhotoProps) => {

  const { id } = useParams<{ id: string }>()
  const { url } = props
  const [open, setOpen] = useState<boolean>(false)

  const [upload] = useMutation<{ upload: boolean }, { input: DatafeedInput }>(UPLOAD)

  const [preview, setPreview] = useState<string>("")
  const [photo, setPhoto] = useState<string>("")
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

  const onSave = useCallback(async () => {
    try {
      file && id && await upload({ variables: { input: { file, field: "photo", model: Models.PRODUCT, objectId: id } } })
      setPhoto(preview)
      setOpen(false)
    } catch(e) {
      logError(e as ApolloError)
    }
  }, [file, id, preview, setPhoto, setOpen, Models])

  useEffect(()=>{
    url && setPhoto(url)
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

  useEffect(()=>{
    if (!open) {
      setTimeout(()=>{
        setPreview("")
      }, 500)
    }
  }, [open])

  const timeNow = new Date().valueOf()

  return (
    <div
      className={classNames(
      "space-y-2 p-4 rounded-md max-w-lg m-auto flex items-center justify-center h-full relative",
    )}>
      {!photo && <div className="text-center cursor-pointer text-gray-500 hover:text-gray-700" onClick={()=>setOpen(true)}>
        <PhotoIcon className={classNames(
          "h-32",
        )}/>
        <p className="text-sm">Add a photo</p>
      </div>}
        <div className="">
          <img
            src={`${photo}?${timeNow}`}
            className=""
            onLoad={onImageLoad}
          />
        </div>
          <div
            className="absolute bottom-0 right-0 w-12 h-12 cursor-pointer flex items-center justify-center bg-white border border-gray-200 rounded-full shadow-md hover:bg-gray-50"
            onClick={()=>setOpen(true)}
          >
            {photo ? <PencilSquareIcon className="h-6 w-6 text-gray-600"/> : <PlusIcon className="h-6 w-6 text-gray-600"/>}
          </div>
      <Modal
        open={open}
        setOpen={setOpen}
        acceptText="Set photo"
        onAccept={onSave}
      >
        <div
          className={classNames(
            "p-2 text-gray-500 rounded relative",
            preview ? "" : "border-2 border-dashed"
          )}
        >
          {!preview && <div className="flex justify-center space-x-24">
            <div
              className="p-2 flex flex-col justify-center cursor-pointer hover:bg-gray-50 hover:text-gray-700"
              {...getRootProps()}
            >
              <ArrowUpTrayIcon className="h-12"/>
              <p>Upload photo</p>
              <input
                {...getInputProps()}
              />
            </div>
            <div className="p-2 flex flex-col justify-center cursor-pointer hover:bg-gray-50 hover:text-gray-700">
              <CameraIcon className="h-12"/>
              <p>Take a shot</p>
            </div>
          </div>}
          <div>
            <img
              src={preview}
              onLoad={onImageLoad}
            />
          </div>
          {preview && <div
            className="absolute right-0 bottom-0"
          >
            <div
              className="absolute bottom-0 right-0 w-12 h-12 cursor-pointer flex items-center justify-center bg-white border border-gray-300 rounded-full shadow-md hover:bg-gray-300"
              {...getRootProps()}
            >
              <PencilSquareIcon className="h-6 w-6 text-gray-600"/>
            </div>
            <div
              className="absolute bottom-0 right-14 w-12 h-12 cursor-pointer flex items-center justify-center bg-white border border-gray-300 rounded-full shadow-lg hover:bg-gray-300"
            >
              <CameraIcon className="h-6 w-6"/>
            </div>
          </div>}
        </div>
      </Modal>
    </div>
  )
}

export default Photo