import React from "react"
import { ListItem, ListItemText, Fab, Box, Paper } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Backup"
import CameraIcon from "@material-ui/icons/CameraAlt"
import DeleteIcon from "@material-ui/icons/Delete"
import { useDropzone } from "react-dropzone"
import RootRef from "@material-ui/core/RootRef"
import { makeStyles } from "@material-ui/core/styles"

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

const MyDropzone = ({ setValue, name }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: acceptedFiles => {
      console.log(name, acceptedFiles[0])
      setValue(name, acceptedFiles[0].preview)
    }
  })
  const { ref, ...rootProps } = getRootProps()
  return (
    <RootRef rootRef={ref}>
      <Box mr={2} {...rootProps}>
        <Paper>
          <input {...getInputProps()} />
          <p style={{ padding: "32px" }}>Drag 'n' drop image here</p>
        </Paper>
      </Box>
    </RootRef>
  )
}

const PhotoPreview = ({ photo }) => {
  return <img src={photo.dataUri} style={{ maxWidth: "300px" }} />
}

const PhotoUpload = ({ photo, setValue, handleOpenCam, classes }) => {
  return (
    <>
      <MyDropzone setValue={setValue} name={photo.currentDoc} />
      <Fab aria-label="add" className={classes.fab}>
        <AddIcon onClick={open} />
      </Fab>
      <Fab aria-label="camera" className={classes.fab}>
        <CameraIcon onClick={() => handleOpenCam(photo.currentDoc)} />
      </Fab>
    </>
  )
}

const PhotoIDRow = (props) => {
  const { photo, setValue } = props
  const classes = useStyles()
  const rootProps = { classes, ...props}
  return (
    <>
      <ListItem className={classes.listItem}>
        <ListItemText primary={photo.name} secondary={photo.desc} />
        {photo.dataUri ? (
          <PhotoPreview {...rootProps} />
        ) : (
          <PhotoUpload {...rootProps} />
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
    </>
  )
}

export default PhotoIDRow
