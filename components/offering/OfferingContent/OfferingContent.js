import React from 'react'
import { Tabs, Tab, Grid, Box, Typography } from '@material-ui/core'
import {
  DealTermsSection,
  Divider,
  DocumentsSection,
  NewsSection,
  RisksDisclosuresSection,
  SummarySection,
} from '../'

const OfferingContent = () => {
  return (
    <Grid justify="center" container spacing={4}>
      <Grid item xs={12} lg={7}>
        <SummarySection />
        <Divider />
        <Grid container>
          <Grid item container justify="space-between" spacing={8}>
            <Grid item lg={7}>
              <DealTermsSection />
            </Grid>
            <Grid item lg={5}>
              <DocumentsSection />
            </Grid>
          </Grid>
        </Grid>
        <Divider />
        <NewsSection />
        <RisksDisclosuresSection />
      </Grid>
      <Grid item lg={3} md={4} sm={6} xs={12}></Grid>
    </Grid>
  )
}

export default OfferingContent
