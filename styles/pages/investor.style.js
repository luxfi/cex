
export default theme => ({
	root: {
		padding: 0,
		width: "90%",
	},
	apiSectionAddButton: {
		padding: 0,
		paddingRight: theme.spacing(1)
	},
	controlUILabel: {
		fontSize: "0.9rem",
		marginRight: theme.spacing(1)
	},
	controlUIIcon: {
		fontSize: "1.5rem",
	},

	viewSectionBody: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-start"
	},

	apiSectionListInfoIcon: {
		display: "inline",
		float: "left",
		fontSize: "2.5rem",
	},

	apiSectionListNoneOuter: {
		paddingLeft: theme.spacing(3),
		"& p": {
			margin: 0
		}
	},

	apiUpgradeLink: {
		marginLeft: theme.spacing(4)
	},

	investorInfoTable: {
		borderCollapse: "collapse",
		"& td": {
			paddingTop: theme.spacing(1),
			paddingRight: theme.spacing(8),
		}
	},
	sessionsSessionsTable: {
		borderCollapse: "collapse", 
		"& td": {
			paddingTop: theme.spacing(1),
			paddingRight: theme.spacing(8),
		}
	},
	sessionsThirdPartyAppsTable: {
		borderCollapse: "collapse",
		"& td": {
			paddingTop: theme.spacing(1),
			paddingRight: theme.spacing(8),
		}
	},

	sessionsHeaderRow: {
		borderBottom: "1px solid #444",
		marginBottom: theme.spacing(2),
		"& th": {
			textAlign: "left"
		}
	},

	iconInfoAreaOuter: {
		display: "flex",
		flexDirection: "row",
		maxWidth: "800px"
	},
	iconInfoAreaIcon: {
		display: "block",
		fontSize: "2.5rem",
		flexGrow: 0,
		alignSelf: "center",
		marginRight: theme.spacing(2),
	},
	iconInfoAreaMain: {
		flexGrow: 1
	},
	iconInfoAreaButtonOuter: {
		flexGrow: 0
	},


})