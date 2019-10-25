import React, { useCallback, createRef } from "react"
import Typography from "@material-ui/core/Typography"
import List from "@material-ui/core/List"
import { CustomModal } from "../../app"
import "react-html5-camera-photo/build/css/index.css"
import Camera, { FACING_MODES, IMAGE_TYPES } from "react-html5-camera-photo"
import { PhotoIDRow } from "../"

const MyModal = ({ handleCloseCam, openCam, onTakePhoto }) => {
  return (
    <CustomModal handleClose={handleCloseCam} open={openCam}>
      <Camera
        idealFacingMode={FACING_MODES.USER}
        onTakePhoto={dataUri => {
          onTakePhoto(dataUri)
        }}
        onTakePhotoAnimationDone={handleCloseCam}
        onCameraError={error => {
          console.log(error)
        }}
        idealResolution={{ width: 640, height: 480 }}
        imageType={IMAGE_TYPES.JPG}
        imageCompression={0.97}
        // isMaxResolution={true}
        isImageMirror={false}
      />
    </CustomModal>
  )
}

export default function PhotoIDs({
  documents0,
  documents1,
  documents2,
  setValue
}) {
  // Todo: Check for memory leaks....
  // React.useEffect(
  //   () => () => {
  //     // Make sure to revoke the data uris to avoid memory leaks
  //     files.forEach(file => URL.revokeObjectURL(file.preview))
  //   },
  //   [files]
  // )

  const [openCam, setOpenCam] = React.useState(false)
  const [currentDocument, setCurrentDocument] = React.useState(false)

  const handleOpenCam = currentDoc => {
    setCurrentDocument(currentDoc)
    setOpenCam(true)
  }

  const handleCloseCam = () => {
    setOpenCam(false)
  }

  const onTakePhoto = dataUri => {
    setValue(currentDocument, dataUri)
  }

  const photos = [
    {
      name: "Face",
      desc: "Required",
      price: "photo here",
      dataUri: documents0,
      currentDoc: "documents0"
    },
    {
      name: "ID Front",
      desc: "Required",
      price: "photo here",
      dataUri: documents1,
      currentDoc: "documents1"
    },
    {
      name: "ID Back",
      desc: "Required",
      price: "photo here",
      dataUri: documents2,
      currentDoc: "documents2"
    }
  ]

  return (
    <>
      <MyModal
        openCam={openCam}
        handleCloseCam={handleCloseCam}
        onTakePhoto={onTakePhoto}
      />
      <Typography variant="h6" gutterBottom>
        PhotoIDs
      </Typography>
      <List disablePadding>
        {photos.map(photo => (
          <PhotoIDRow photo={photo} handleOpenCam={handleOpenCam} />
        ))}
      </List>
    </>
  )
}
