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
import Camera from 'react-html5-camera-photo'

const photos = [
  { name: 'Face', desc: 'Required', price: 'photo here', id: "face" },
  { name: 'ID Front', desc: 'Required', price: 'photo here', id: "id-front" },
  { name: 'ID Back', desc: 'Required', price: 'photo here', id: "id-back" },
]
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

export default function PhotoIDs() {
  const classes = useStyles()

  const [open, setOpen] = React.useState(false)
  const [currentModal, setCurrentModal] = React.useState(false)
  const [dataUri, setDataUri] = React.useState(false)

  const handleOpen = (id) => {
    setCurrentModal(id)
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const onTakePhoto = (dataUri) => {
    setDataUri(dataUri)
    setTimeout(function () { handleClose() }, 1500);
  }

  return (
    <>
      <CustomModal 
      handleClose={handleClose} 
      open={open}
      >
        <Camera onTakePhoto={(dataUri) => { onTakePhoto(dataUri) }} />
      </CustomModal>
      <Typography variant="h6" gutterBottom>
        PhotoIDs
      </Typography>
      <List disablePadding>
        {photos.map(photo => (
          <ListItem className={classes.listItem} key={photo.name}>
            <ListItemText primary={photo.name} secondary={photo.desc} />
            {dataUri ? <img src={dataUri} style={{
              maxWidth: "300px",
              padding: "24px"
            }}/> :
            <>
            <Fab aria-label="add" className={classes.fab}>
              <AddIcon />
            </Fab>
            <Fab aria-label="camera" className={classes.fab}>
              <CameraIcon onClick={() => handleOpen(photo.id)}/>
            </Fab>
            </>
            }
            <Fab 
              disabled={dataUri ? false : true} 
              aria-label="delete" 
              className={classes.fab}
              onClick={() => setDataUri(false)}
            >
              <DeleteIcon />
            </Fab>
          </ListItem>
        ))}
      </List>
    </>
  )
}

