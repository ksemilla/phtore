import { classNames } from "@/utils"
import { ArrowDownIcon, PlusIcon } from "@heroicons/react/24/outline"
import { useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"

type DropzoneProps = {
  url?: string
}

const Dropzone = (props: DropzoneProps) => {
  const { url } = props

  const [preview, setPreview] = useState<string>("")
  const [file, setFile] = useState<File>()
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": ['.png'],
      "image/jpg": ['.jpg', '.jpeg'],
      "image/jpeg": ['.jpeg', '.jpg'],
    },
    onDrop: (acceptedFiles) => {
      console.log("got here", acceptedFiles)
      setFile(acceptedFiles[0])
      // setValue('file', acceptedFiles[0])
      // trigger('file')
    },
    onDropRejected: (files) => {
      console.log("rejected", files)
    },
  })

  const onRemove: React.MouseEventHandler<HTMLDivElement> = e => {
    e.stopPropagation()
    setFile(undefined)
    console.log("remove", url)
    url && setPreview(url)
  }

  useEffect(()=>{
    console.log(url)
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

  return <div
      {...getRootProps()}
      className={classNames(
      "space-y-2 p-4 border-2 border-dashed rounded-md max-w-lg m-auto flex flex-col items-center",
      // errors?.file ? "border-red-500" : "border-gray-300"
    )}>
      {!file && <>
        <ArrowDownIcon className={classNames(
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
      <img
          src={preview}
        />
      {(file?.type === "image/jpg" || file?.type === "image/png" || file?.type === "image/jpeg") && <>
        {/* <FontAwesomeIcon icon={["fas", "file-excel"]} className="h-24 w-24 text-green-600" /> */}
        <p className="text-sm text-gray-500">{file?.name}</p>
        <div
          className="text-xs text-gray-400 hover:text-red-500 cursor-pointer"
          onClick={onRemove}
        >Remove</div>
      </>}
      <input
        {...getInputProps()}
      />
    </div>
}

export default Dropzone