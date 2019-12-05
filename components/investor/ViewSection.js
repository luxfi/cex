import { 
	Typography, 
	Paper, 
	makeStyles 
} from '@material-ui/core'

const styles = theme => {


}

export default (props) => {
	const { title, controlUI } = props
	let { classes } = props

	if (!classes) {
		classes = makeStyles(styles)()
	}

	const control = (!controlUI) ? null :
		<div className={classes.sectionControlUI}>
			{controlUI}
		</div>

	return (
		<Paper className={classes.sectionOuter}>
			<div className={classes.sectionTitleOuter} >
				<Typography variant='h5' color='textPrimary' className={classes.sectionTitle}>{title}</Typography>
				{control}
			</div>
			<div className={classes.sectionBody}>
				{props.children}
			</div>
		</Paper>
	)
}