import ViewSection from './ViewSection'

const data = {
	name: 'Zach Kelling',
	address: "12345 Main St., Santa Monica, CA, 90402",
	phone: "(213) 555-1234",
	dayTradeProtection: true,
	account: {
		APEX: "5P75152",
		RHS: "1000744308"
	},
	employment: "employed",
	maritalStatus: "single",
	dependants: 0,
	liquid: "$50,000 to $99,999",
	netWorth: "$200,000 to $249,999",
	yearlyIncome: "$100,000 to $199,999",
	goal: "Growth",
	timeLine: "Less than 4 years",
	experience: "very little",
	riskTolerence: "Keep all or buy more",
	liquidity: "not important"
}

const FieldRow = ({ label, contents, classes }) => {
	return (<tr><td className={classes.tableLabelColumn}>{label}</td><td className={classes.tableContentsColumn}>{contents}</td></tr>)
}

const SectionTitle = ({ label, classes }) => {
	return (<tr><td colSpan="2" className={classes.tableSectionRow}>{label}</td></tr>)
}

export default (props) => {
	const {classes} = props
	return (
		<ViewSection title={data.name} >
			<table className={classes.investorInfoTable}><tbody>
				<FieldRow label='Address' contents={data.address} classes={classes} />
				<FieldRow label='Phone' contents={data.phone} classes={classes} />
				<FieldRow label='Pattern Day Trade Protection' contents={data.dayTradeProtection ? "yes" : "no"} classes={classes} />
				<FieldRow label='Account Numbers' contents={`[APEX] ${data.account.APEX} [RHS]: ${data.account.RHS}`} classes={classes} />
				<SectionTitle label='Personal Details' classes={classes} />
				<FieldRow label='Employment' contents={data.employment} classes={classes} />
				<FieldRow label='Marital Status' contents={data.maritalStatus} classes={classes} />
				<FieldRow label='Dependants' contents={data.dependants} classes={classes} />
				<SectionTitle label='Assets' classes={classes} />
				<FieldRow label='Liquid' contents={data.liquid} classes={classes} />
				<FieldRow label='Net Worth' contents={data.netWorth} classes={classes} />
				<FieldRow label='Yearly Income' contents={data.yearlyIncome} classes={classes} />
				<SectionTitle label='Investment' classes={classes} />
				<FieldRow label='Goal' contents={data.goal} classes={classes} />
				<FieldRow label='Timeline' contents={data.timeLine} classes={classes} />
				<FieldRow label='Experience' contents={data.experience} classes={classes} />
				<FieldRow label='Risk Tolerence' contents={data.riskTolerence} classes={classes} />
				<FieldRow label='Liquidity' contents={data.liquidity} classes={classes} />
			</tbody></table>
		</ViewSection>
	)
}