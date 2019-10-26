import React, { useState, useEffect } from "react"
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

const MyDropzone = ({ setValue, name, eventArray }) => {
  const { getRootProps, getInputProps, open } = useDropzone({
    accept: "image/*",
    onDrop: acceptedFiles => {
      const firstFile = acceptedFiles[0]
      setValue(name, URL.createObjectURL(firstFile))
    }
  })

  eventArray.push(open)

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
  return <img src={photo.dataUri} style={{ maxWidth: "300px", paddingRight: "16px" }} />
}

const PhotoUpload = ({ photo, setValue, handleOpenCam, classes }) => {
  // TODO find a better way to call a siblings function
  // will reference "open" on useDropzone hook
  const eventArray = []
  const openDialog = e => {
    eventArray.forEach(cb => cb())
  }
  return (
    <>
      <MyDropzone
        setValue={setValue}
        name={photo.currentDoc}
        eventArray={eventArray}
      />
      <Fab aria-label="add" className={classes.fab} onClick={openDialog}>
        <AddIcon />
      </Fab>
      <Fab
        aria-label="camera"
        className={classes.fab}
        onClick={() => handleOpenCam(photo.currentDoc)}
      >
        <CameraIcon />
      </Fab>
    </>
  )
}

const PhotoIDRow = props => {
  const { photo, setValue } = props
  const classes = useStyles()
  const rootProps = { classes, ...props }
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

export default PhotoIDRow
