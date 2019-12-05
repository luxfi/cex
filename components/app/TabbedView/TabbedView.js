import React from "react"
import { Tab, Tabs } from "@material-ui/core"

import { toDashString, isServer } from '../../../util/generic'

/**

@desc Provides a simple tab switching component that includes all default display logic
@example
 	<TabbedView persistenceKey="investor-info">
		<SomeComponent 		tabTitle="first tab" />
		<AnotherComponent tabTitle="second tab" />
		<ThirdComponent 	tabTitle="third tab" />
	</TabbedView>

@param {string} persistenceKey (Optional) Triggers persistence in localStorage 
	of the last used tab index 
@param {string} tabTitle (Required for child components) Title to display on the tab 
	corresponding to this this child's contents

*/

export default class TabbedView extends React.Component {

	state = {
		tabIndex: 0
	}

	constructor(props) {
		super(props)
		this.initTab(props)
	}

	initTab = (props) => {

		let tabIndex = undefined
		if ('currentTab' in props) {
			tabIndex = props.currentTab
		}
		else if (!isServer() && ('persistenceKey' in props)) {
			tabIndex = localStorage.getItem(toDashString(props.persistenceKey))
			if (tabIndex) {
				tabIndex = JSON.parse(tabIndex)
			}
		}
		if (!tabIndex) {
			tabIndex = 0
		}

		this.state = {
			tabIndex: tabIndex
		}
	}

	setTabIndex = (ignore, i) => {
		this.setState({ tabIndex: i })
		if (!isServer() && 'persistenceKey' in this.props) {
			localStorage.setItem(toDashString(this.props.persistenceKey), JSON.stringify(i))
		}
	}

	render() {
		const { children } = this.props
		const { tabIndex } = this.state

		// Only the content associated with the currently Tab
		// is rendered below the <Tabs> component
		return (
			<>
				<Tabs value={tabIndex} onChange={this.setTabIndex} >
					{React.Children.map(children, (child, i) => {
						return (
							<Tab label={child.props.tabTitle} disableFocusRipple key={`${toDashString(child.props.tabTitle)}-tab-key-${i}`} />
						)
					})}
				</Tabs>
				<>{React.Children.map(children, (child, i) => { return (i === tabIndex ? child : null) })}</>
			</>
		)
	}
}
