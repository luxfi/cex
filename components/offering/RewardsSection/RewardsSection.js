import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { RewardsCard } from '../'

const REWARDS = [
  {
    amount: 5,
    description: [
      "THANK YOU. You've now joined the legion of Saw fans that own a piece of history.",
    ],
    investorsAmount: 8908,
    estimatedDelivery: 'Jun 2020',
    disabled: false,
  },
  {
    amount: 20,
    description: [
      "JIGSAW PIN. You'll get a high quality Jigsaw metal pin badge featuring Jigsaw from the movie.",
    ],
    investorsAmount: 2100,
    estimatedDelivery: 'Jun 2020',
    disabled: false,
  },
  {
    amount: 50,
    description: [
      "DIGITAL DOWNLOAD + SOUNDTRACK. You'll get an HD digital download of the movie when it’s commercially released + Your name on the wall at Twisted Pictures studio to honor your involvement in the film + Production updates and Saw news!",
    ],
    investorsAmount: 3041,
    estimatedDelivery: 'Jun 2020',
    disabled: false,
  },
  {
    amount: 85,
    description: [
      "SAW SHIRT OR BAG. These awesome Saw themed items are designed for us by Horror Enterprises in NYC. You'll get high quality, sweat-shop free coton bag or super-soft American Apparel shirt + Everything from the $45 level.",
    ],
    investorsAmount: 1150,
    estimatedDelivery: 'Jun 2020',
    disabled: false,
  },
  {
    amount: 85,
    description: [
      "NEW! SAW MOVIE POSTER! You’ll get The Organ Donor official film poster! (this will be made for the film’s theatrical release and will be big and pretty damn cool) + Your name in the film’s credits (festival and home video versions) + Everything from our $45 DIGITAL DOWNLOAD level!",
    ],
    investorsAmount: 273,
    estimatedDelivery: 'Jun 2020',
    disabled: false,
  },
  {
    amount: 200,
    description: [
      "OWN A PIECE OF THE FILM. You get a unique 8 x10 frame from the movie individually selected for you! It will be made just for you with a dedication on the reverse from the director + Everything from our $45 DIGITAL DOWNLOAD level!",
    ],
    investorsAmount: 782,
    estimatedDelivery: 'Jun 2020',
    disabled: false,
  },
  {
    amount: 5000,
    investorsAmount: 10,
    description: [
      "WORLD PREMIERE. You get 4 tickets to the film’s World premiere (location TBD, excludes travel and accommodation) + A special thank you credit (theatrical and home video version) + Everything above.",
    ],
    estimatedDelivery: 'Jun 2020',
    disabled: true,
  },
  {
    amount: 10000,
    investorsAmount: 1,
    description: [
      "TOP DOG. Thank you for believing in this film and becoming a key part of the team. You’ll get a special on-screen production credit of Contributing Associate Producer + 2 tickets to the film’s World Premiere (travel and accommodation not included) + Everything else above."
    ],
    estimatedDelivery: 'Jun 2020',
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
