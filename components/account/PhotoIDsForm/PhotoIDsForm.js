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

const products = [
  { name: 'Face', desc: 'Required', price: 'photo here' },
  { name: 'ID Front', desc: 'Required', price: 'photo here' },
  { name: 'ID Back', desc: 'Required', price: 'photo here' },
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

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CustomModal 
      handleClose={handleClose} 
      open={open}
      >
        <Camera onTakePhoto={(dataUri) => { console.log(dataUri) }} />
      </CustomModal>
      <Typography variant="h6" gutterBottom>
        PhotoIDs
      </Typography>
      <List disablePadding>
        {products.map(product => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Fab aria-label="add" className={classes.fab}>
              <AddIcon />
            </Fab>
            <Fab aria-label="camera" className={classes.fab}>
              <CameraIcon onClick={handleOpen}/>
            </Fab>
            <Fab disabled aria-label="delete" className={classes.fab}>
              <DeleteIcon />
            </Fab>
            {/* <Typography variant="body2">{product.price}</Typography> */}
          </ListItem>
        ))}
      </List>
    </>
  )
}

