import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { RewardsCard } from '../'

const REWARDS = [
  {
    amount: 100,
    description: [
      "$1 allows you to stay informed on our progress and make a decision before the campaign ends. Plus, you'll receive infinite love + appreciation from our team.",
    ],
    investorsAmount: 78,
    estimatedDelivery: 'Dec 2019',
    disabled: false,
  },
  {
    amount: 500,
    description: [
      "$1 allows you to stay informed on our progress and make a decision before the campaign ends. Plus, you'll receive infinite love + appreciation from our team. $1 allows you to stay informed on our progress and make a decision before the campaign ends. Plus, you'll receive infinite love + appreciation from our team.",
      "Plus, you'll receive infinite love + appreciation from our team. $1 allows you to stay informed on our progress and make a decision before the campaign ends. Plus, you'll receive infinite love + appreciation from.",
    ],
    investorsAmount: 150,
    estimatedDelivery: 'Dec 2019',
    disabled: false,
  },
  {
    amount: 5000,
    investorsAmount: 100,
    description: [
      "$1 allows you to stay informed on our progress and make a decision before the campaign ends. Plus, you'll receive infinite love + appreciation from our team. $1 allows you to stay informed on our progress and make a decision before the campaign ends. Plus, you'll receive infinite love + appreciation from our team.",
      "Plus, you'll receive infinite love + appreciation from our team. $1 allows you to stay informed on our progress and make a decision before the campaign ends. Plus, you'll receive infinite love + appreciation from.",
    ],
    estimatedDelivery: 'Dec 2019',
    disabled: true,
  },
]

const RewardsSection = ({
  funds,
  movie,
  setErrorMessage,
  setSuccessMessage,
  addOfferingInvestment,
  checkIfLoggedIn,
}) => {
  return (
    <>
      <Box mb={4}>
        <Typography variant="h5">
          <Box mb={3} mt={5} fontWeight="fontWeightBold">
            Rewards
          </Box>
        </Typography>
      </Box>
      {REWARDS.map((reward, i) => (
        <Box mb={2} key={i}>
          <RewardsCard
            reward={reward}
            funds={funds}
            movie={movie}
            setErrorMessage={setErrorMessage}
            setSuccessMessage={setSuccessMessage}
            addOfferingInvestment={addOfferingInvestment}
            checkIfLoggedIn={checkIfLoggedIn}
          />
        </Box>
      ))}
    </>
  )
}

export default RewardsSection
