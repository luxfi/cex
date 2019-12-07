import React, { useState } from 'react'
import { Tab, Tabs, makeStyles } from "@material-ui/core"

import { toDashString } from '../../../util/generic'

/**

@desc Provides a simple tab switching component that includes all default display logic
@example
 	<TabbedView>
		<SomeComponent 		tabTitle="first tab" />
		<AnotherComponent tabTitle="second tab" />
		<ThirdComponent 	tabTitle="third tab" />
	</TabbedView>

@param {string} tabTitle (Required for child components) Title to display on the tab 
	corresponding to this this child's contents

*/


const useStyles = makeStyles({
	indicator: {
		width: "140px !important"
	},
	root: {
		paddingLeft: 0
	},
	wrapper: {
		alignItems: "flex-start"
	},
});


export default (props) => {

	const [tabIndex, setTabIndex] = useState(('currentTab' in props) ? props.currentTab : 0)
	const { children } = props

	const classes = useStyles();

		// https://material-ui.com/customization/components/
	const tabsClasses = {
		indicator: classes.indicator
	}

	const tabClasses = {
		root: classes.root,
		wrapper: classes.wrapper
	}

	// Only the content associated with the currently Tab
	// is rendered below the <Tabs> component
	return (
		<>
			<Tabs value={tabIndex} onChange={(ignore, i) => { setTabIndex(i) }} classes={tabsClasses}>
			{React.Children.map(children, (child, i) => {
				return (
					<Tab
						label={child.props.tabTitle}
						disableFocusRipple
						key={`${toDashString(child.props.tabTitle)}-tab-key-${i}`}
						classes={tabClasses}
					/>
				)
			})}
		</Tabs>
		<>{React.Children.map(children, (child, i) => { return (i === tabIndex ? child : null) })}</>
		</>
	)
}
