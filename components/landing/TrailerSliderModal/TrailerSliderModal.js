import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import { Modal, Fade, Backdrop } from "@material-ui/core/"
const { useImperativeHandle } = React

const SliderModal = React.forwardRef((props, ref) => {
  const { movie } = props
  const [open, setOpen] = React.useState(false)

  // window.open = open
  // window.setOpen = setOpen
  const handleClose = () => {
    // not sure why setOpen was getting lost in event loop, hack fix
    // todo: clean this up
    setTimeout(() => { setOpen(false) }, 1)
    // alert("getAlert from Child")
  }

  // https://stackoverflow.com/questions/37949981/call-child-method-from-parent
  // The component instance will be extended
  // with whatever you return from the callback passed
  // as the second argument
  useImperativeHandle(ref, () => ({
    handleOpen() {
      setOpen(true)
    }
  }));

  return (
    <>
      <div style={{ display: "none" }}> // 
        <TransitionsModal handleClose={handleClose} open={open}>
          <div className="videoWrapper">
            <iframe width="560" height="349" src={movie.trailer + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0"} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
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
})

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
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

export default SliderModal