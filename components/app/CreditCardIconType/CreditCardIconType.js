import ErrorIcon from '@material-ui/icons/Error'
import React from 'react'

import AmericanExpress from '../../../assets/svg/AmericanExpress.svg'
import DiscoverCard from '../../../assets/svg/DiscoverCard.svg'
import MasterCard from '../../../assets/svg/MasterCard.svg'
import VisaCard from '../../../assets/svg/VisaCard.svg'

export default ({ cardType, ...restProps }) => {
  if (cardType === 'visaCard') {
    return <VisaCard {...restProps} />
  }
  if (cardType === 'masterCard') {
    return <MasterCard {...restProps} />
  }
  if (cardType === 'amexCard') {
    return <AmericanExpress {...restProps} />
  }
  if (cardType === 'discoverCard') {
    return <DiscoverCard {...restProps} />
  }

  return <ErrorIcon fontSize='small' {...restProps} />
}
