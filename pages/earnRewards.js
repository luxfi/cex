import React from "react"
import { inject } from 'mobx-react'
import hashSum from 'hash-sum'

import { Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
	container: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start"
	},
})


// https://stackoverflow.com/questions/43862600/how-to-get-query-string-parameters-from-url-in-next-js
export default inject('store') ((props) => {

  const classes = useStyles()

  const { ticketCheckoutStore, userStore } = props.store


  ticketCheckoutStore.addTransaction(
    "fake",
    "foo",
    "feee",
    "ddd",
    1,
    "fake",
    hashSum(userStore.email)
  )

    console.log("email: " + userStore.email)


	return (
		<div className={classes.container}>
			<Typography variant="body1" color="textPrimary">
        {`referal earned for ${userStore.email}` }
			</Typography>
		</div>
	)
})
