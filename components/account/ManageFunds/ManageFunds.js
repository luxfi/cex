import React from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
 } from '@material-ui/core'
import moment from '../../../../../Library/Caches/typescript/3.6/node_modules/moment/moment'

//  import {AddIcon} from "@material-ui/icons/Backup"

export default props => {
  const {
    accountList,
    handleFunds
  } = props

  const [amount, setAmount] = React.useState('')
  const [deposit, setDeposit] = React.useState(true)
  const [fromAccountId, setfromAccountId] = React.useState('')
  const [toAccountId, settoAccountId] =  React.useState('esx')

  React.useEffect(() => {
    if (!fromAccountId && accountList && accountList.length > 1) {
      setfromAccountId(accountList[1].id)
    }
  })

  return (
    <Grid item xs={12} style={{ minWidth: '60%' }}>
      <Card raised>
        <CardContent>
          <Typography variant="h6" gutterBottom>Deposit Funds</Typography>
          <Divider style={{ marginBottom: '10px' }} />
          <Grid container direction="column" spacing={2}>
            <Grid container item>
              <Grid item xs={6}>
                From
              </Grid>
              <Grid item xs={6}>
                <Select
                  value={fromAccountId}
                  onChange={(evt) => {
                    console.log('onChange val', evt.target.value)
                    if (evt.target.value !== 'esx') {
                      settoAccountId('esx')
                      setDeposit(true)
                    } else if ((fromAccountId === 'esx' || evt.target.value === 'esx') && accountList.length > 1) {
                      settoAccountId(accountList[1].id)
                      setDeposit(false)
                    }

                    setfromAccountId(evt.target.value)
                  }}
                >
                  {
                    accountList ? 
                    accountList.map((account, k) =>
                      <MenuItem key={`account_${k}`} value={account.id}>{account.name}</MenuItem>
                    ) : null
                  }
                </Select>
              </Grid>
            </Grid>
            <Grid container item>
              <Grid item xs={6}>
                To
              </Grid>
              <Grid item xs={6}>
                <Select
                  value={toAccountId}
                  onChange={(evt) => {
                    // console.log('onChange val', evt.target.value)
                    if (evt.target.value !== 'esx') {
                      setfromAccountId('esx')
                      setDeposit(false)
                    } else if ((toAccountId === 'esx' || evt.target.value === 'esx') && accountList.length > 1) {
                      setfromAccountId(accountList[1].id)
                      setDeposit(true)
                    }
                      
                    settoAccountId(evt.target.value)
                  }}
                >
                  {
                    accountList ? 
                    accountList.map((account, k) =>
                      <MenuItem key={`account_${k}`} value={account.id}>{account.name}</MenuItem>
                    ) : null
                  }
                </Select>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="newFunds"
                label="Amount ($)"
                id="add-new-funds"
                value={amount}
                onBlur={() => {
                  const newAmount = Number.parseFloat(amount)
                  setAmount(!isNaN(newAmount) ? `${newAmount.toFixed(2)}` : '')
                }}
                onChange={evt => {
                  setAmount(evt.target.value)
                }}
                helperText={deposit ? 'Deposit funds' : 'Withdrawal funds'}
                type="number"
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button 
            variant="outlined" 
            style={{ marginLeft: 'auto' }} 
            onClick={
              () => {
                let a = { id: 'DEFAULT', account: { mask: 'DEFAULT' } }
                if (deposit) {
                  a = accountList.find(i => i.id === fromAccountId)
                } else {
                  a = accountList.find(i => i.id === toAccountId)
                }
                const accountName = `${a.name} - ${a.account.mask}`
                handleFunds(
                  {
                    amount,
                    deposit,
                    name,
                    fromAccountId,
                    toAccountId,
                    accountName,
                    date: moment().format('MMM DD')
                  },
                  () => {
                    setAmount('')
                  }
                )
              }
            }
          >
              {deposit ? 'Deposit' : 'Withdraw'}
            </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}
