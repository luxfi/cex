import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Backup'
import CameraIcon from '@material-ui/icons/CameraAlt'
import DeleteIcon from '@material-ui/icons/Delete'
import { CustomModal } from "../../app"
import 'react-html5-camera-photo/build/css/index.css'
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo'

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
  },
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: '700',
  },
  title: {
    marginTop: theme.spacing(2),
  },
}))

export default function PhotoIDs({ documents0, documents1, documents2, setValue }) {
  const classes = useStyles()

  const [open, setOpen] = React.useState(false)
  const [dataUri, setDataUri] = React.useState(false)
  const [currentDocument, setCurrentDocument] = React.useState(false)

  const handleOpen = (currentDoc) => {
    setCurrentDocument(currentDoc)
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const onTakePhoto = ( dataUri) => {
    setValue(currentDocument, dataUri)
  }

  const photos = [
    { name: 'Face', desc: 'Required', price: 'photo here', dataUri: documents0, currentDoc: "documents0" },
    { name: 'ID Front', desc: 'Required', price: 'photo here', dataUri: documents1, currentDoc: "documents1"  },
    { name: 'ID Back', desc: 'Required', price: 'photo here', dataUri: documents2, currentDoc: "documents2"  },
  ]  
  return (
    <>
      <CustomModal 
        handleClose={handleClose} 
        open={open}
      >
        <Camera
          idealFacingMode={FACING_MODES.USER} 
          onTakePhoto={(dataUri) => { onTakePhoto(dataUri) }}
          onTakePhotoAnimationDone={handleClose}
          onCameraError={(error) => { console.log(error)}}
          idealResolution={{ width: 640, height: 480 }}
          imageType={IMAGE_TYPES.JPG}
          imageCompression={0.97}
          // isMaxResolution={true}
          isImageMirror={false} 
        />
      </CustomModal>
      <Typography variant="h6" gutterBottom>
        PhotoIDs
      </Typography>
      <List disablePadding>
        {photos.map(photo => (
          <ListItem className={classes.listItem} key={photo.name}>
            <ListItemText primary={photo.name} secondary={photo.desc} />
            {!photo.dataUri ?
              <>
                <Fab aria-label="add" className={classes.fab}>
                  <AddIcon />
                </Fab>
                <Fab aria-label="camera" className={classes.fab}>
                  <CameraIcon onClick={() => handleOpen(photo.currentDoc)}/>
                </Fab>
              </>
              :
              <img 
                src={photo.dataUri} 
                style={{
                  maxWidth: "300px",
                  padding: "24px"
                }} 
              />
            }
            <Fab 
              disabled={photo.dataUri ? false : true} 
              aria-label="delete" 
              className={classes.fab}
              onClick={() => setValue(currentDocument, "")}
            >
              <DeleteIcon />
            </Fab>
          </ListItem>
        ))}
      </List>
    </>
  )
}

