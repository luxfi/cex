import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import Fade from "@material-ui/core/Fade"

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    // border: "2px solid #000",
    // boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxWidth: "600px"
  },
  modalHeader: {
    borderBottom: "none",
    paddingTop: "16px",
    paddingRight: "16px",
    paddingBottom: "0",
    paddingLeft: "16px",
    minHeight: "16.43px"
  },
  modalTitle: {
    alignSelf: "flex-end",
    color: "inherit",
    display: "flex",
    fontSize: "24px",
    fontWeight: "300",
    lineHeight: "normal",
    overflow: "hidden",
    transformOrigin: "149px 48px",
    margin: "0"
  },
  modalBody: {
    color: "rgba(0,0,0,.54)",
    fontSize: "13px",
    lineHeight: "18px",
    overflow: "hidden",
    padding: "16px",
    width: "90%"
  }
}))

export default function TransitionsModal({
  open,
  handleClose,
  children,
  title
}) {
  const classes = useStyles()

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
            <div className={classes.modalHeader}>
              <div className={classes.modalTitle}>{title}</div>
            </div>
            <div className={classes.modalBody}>{children}</div>
            {/* {children} */}
            {/* <h2 id="transition-modal-title">Transition modal</h2>
            <p id="transition-modal-description">
              react-transiton-group animates me.
            </p> */}
          </div>
        </Fade>
      </Modal>
    </div>
  )
}
