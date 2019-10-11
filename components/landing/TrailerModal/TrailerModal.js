import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import { Button, Modal, Fade, Backdrop, Typography } from "@material-ui/core/"

export default ({ movie }) => {
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <>
      <Button
        onClick={handleOpen}
        className="watch-trailer-button button"
        variant="outlined"
        size="large"
        startIcon={<PlayArrowIcon />}
      >
        <Typography variant="body2">
          <i className="fas fa-play" />
            Play Trailer
          </Typography>
      </Button>
      <div style={{ display: "none" }}> // 
        <TransitionsModal handleClose={handleClose} open={open}>
          <div className="videoWrapper">
            <iframe width="560" height="349" src="https://www.youtube.com/embed/o-3_aTo8sTM?autoplay=1&amp;modestbranding=1&amp;showinfo=0" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>
        </TransitionsModal>
      </div>
      <style jsx>{`
        .videoWrapper {
          position: relative;
          padding-bottom: 56.25%; /* 16:9 */
          padding-top: 25px;
          height: 0;
        }
        .videoWrapper iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </>
  )
}

import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

  },
  paper: {
    maxWidth: "800px",
    margin: "30px auto",
    width: "100%",
    // removes blue border on chrome
    "&:focus": {
      outline: "none"
    }
  },
  modalBody: {
  }
}))

const TransitionsModal = ({
  open,
  handleClose,
  children,
  title
}) => {
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
