import React, { useCallback, createRef, useState, useEffect } from "react"
import Typography from "@material-ui/core/Typography"
import List from "@material-ui/core/List"
import { CustomModal } from "../../app"
import Camera, { FACING_MODES, IMAGE_TYPES } from "react-html5-camera-photo"

import PhotoIDRow from "./PhotoIDRow"

const MyModal = ({ handleCloseCam, openCam, onTakePhoto }) => {
  const [isRemoveCamera, setIsRemoveCamera] = useState(false)

  const handleClose = () => {
    setIsRemoveCamera(true)
    handleCloseCam()
  }

  useEffect(() => {
    setIsRemoveCamera(false)
  }, [openCam])

  return isRemoveCamera ? null : (
    <CustomModal handleClose={handleClose} open={openCam}>
      <Camera
        idealFacingMode={FACING_MODES.USER}
        onTakePhoto={dataUri => {
          onTakePhoto(dataUri)
        }}
        onTakePhotoAnimationDone={handleClose}
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

export default ({
  documents0,
  documents1,
  documents2,
  setValue
}) => {

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
      currentDoc: "documents0",
      className: 'faceUpload',
    },
    {
      name: "ID Front",
      desc: "Required",
      price: "photo here",
      dataUri: documents1,
      currentDoc: "documents1",
      className: 'idFrontUpload',
    },
    {
      name: "ID Back",
      desc: "Required",
      price: "photo here",
      dataUri: documents2,
      currentDoc: "documents2",
      className: 'idBackUpload',
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
          <PhotoIDRow
            photo={photo}
            handleOpenCam={handleOpenCam}
            key={photo.currentDoc}
            setValue={setValue}
            className={photo.className}
          />
        ))}
      </List>
    </>
  )
}
