import React, { useCallback, createRef } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Box from "@material-ui/core/Box"
import Paper from "@material-ui/core/Paper"
import Fab from "@material-ui/core/Fab"
import AddIcon from "@material-ui/icons/Backup"
import CameraIcon from "@material-ui/icons/CameraAlt"
import DeleteIcon from "@material-ui/icons/Delete"
import { CustomModal } from "../../app"
import "react-html5-camera-photo/build/css/index.css"
import Camera, { FACING_MODES, IMAGE_TYPES } from "react-html5-camera-photo"
import { useDropzone } from "react-dropzone"

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1)
  },
  listItem: {
    padding: theme.spacing(1, 0)
  },
  total: {
    fontWeight: "700"
  },
  title: {
    marginTop: theme.spacing(2)
  }
}))

export default function PhotoIDs({
  documents0,
  documents1,
  documents2,
  setValue
}) {
  const classes = useStyles()

  const [openCam, setOpenCam] = React.useState(false)
  const [currentDocument, setCurrentDocument] = React.useState(false)
  const [files, setFiles] = React.useState([])

  
  
  
  
  
  const { getRootProps, getInputProps, open } = useDropzone({
    accept: "image/*",
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      )
    }
  })

    const thumbsContainer = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 16
    }

    const thumb = {
      display: "inline-flex",
      borderRadius: 2,
      border: "1px solid #eaeaea",
      marginBottom: 8,
      marginRight: 8,
      width: 100,
      height: 100,
      padding: 4,
      boxSizing: "border-box"
    }

    const thumbInner = {
      display: "flex",
      minWidth: 0,
      overflow: "hidden"
    }

    const img = {
      display: "block",
      width: "auto",
      height: "100%"
    }

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} />
      </div>
    </div>
  ))

  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles)
  }, [])

  React.useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview))
    },
    [files]
  )

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
      <aside style={thumbsContainer}>{thumbs}</aside>
      <Typography variant="h6" gutterBottom>
        PhotoIDs
      </Typography>
      <List disablePadding>
        {photos.map(photo => (
          <ListItem className={classes.listItem} key={photo.name}>
            <ListItemText primary={photo.name} secondary={photo.desc} />
            {!photo.dataUri ? (
              <>
                <Box mr={2}>
                  <Paper {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} />
                    <p style={{ padding: "32px" }}>Drag 'n' drop image here</p>
                  </Paper>
                </Box>
                <Fab aria-label="add" className={classes.fab}>
                  <AddIcon onClick={open} />
                </Fab>
                <Fab aria-label="camera" className={classes.fab}>
                  <CameraIcon onClick={() => handleOpenCam(photo.currentDoc)} />
                </Fab>
              </>
            ) : (
              <img
                src={photo.dataUri}
                style={{
                  maxWidth: "300px"
                }}
              />
            )}
            <Fab
              disabled={photo.dataUri ? false : true}
              aria-label="delete"
              className={classes.fab}
              onClick={() => setValue(photo.currentDoc, "")}
            >
              <DeleteIcon />
            </Fab>
          </ListItem>
        ))}
      </List>
    </>
  )
}
