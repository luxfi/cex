import React from "react"
import { observer } from "mobx-react"
import { withStyles } from "@material-ui/core/styles"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import Fade from "@material-ui/core/Fade"
import 'react-html5-camera-photo/build/css/index.css'
import Camera from 'react-html5-camera-photo'

const styles = (theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
    maxWidth: "600px"
  },
  modalBody: {
    fontSize: "13px",
    lineHeight: "18px",
    overflow: "hidden",
    padding: "16px",
    width: "90%"
  }
}))

@observer
class WebCamModal extends React.Component {

  render() {
    const { open, handleClose, title, body, classes } = this.props
    return (
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <div className={classes.modalBody}>
                <Camera
                  onTakePhoto={(dataUri) => { onTakePhoto(dataUri) }}
                />
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
    )
  }
}

export default withStyles(styles)(WebCamModal)