import React from 'react'
import { Tabs, Tab, Grid, Box, Typography } from '@material-ui/core'
import {
  DealTermsSection,
  Divider,
  DocumentsSection,
  NewsSection,
  RisksDisclosuresSection,
  SummarySection,
  UpdatesDiscussionsSection,
} from '../'

const OfferingContent = ({
  summaryRef,
  dealTermsRef,
  documentsRef,
  teamRef,
  newsRef,
  risksDisclosuresRef,
  updatesDiscussionsRef,
}) => {
  return (
    <Grid container justify="center" spacing={4}>
      {/* https://material-ui.com/components/grid/ See negative margin for overflow issue */}
      <Grid item xs={12} lg={7} style={{ overflowX: 'hidden' }}>
        <SummarySection summaryRef={summaryRef} />
        <Divider />
        <Grid container justify="space-between" spacing={8}>
          <Grid item lg={7}>
            <DealTermsSection dealTermsRef={dealTermsRef} />
          </Grid>
          <Grid item lg={5}>
            <DocumentsSection documentsRef={documentsRef} />
          </Grid>
        </Grid>
        <Divider />
        <NewsSection newsRef={newsRef} />
        <RisksDisclosuresSection risksDisclosuresRef={risksDisclosuresRef} />
        <UpdatesDiscussionsSection
          updatesDiscussionsRef={updatesDiscussionsRef}
        />
      </Grid>
      <Grid item lg={3} md={4} sm={6} xs={12}></Grid>
    </Grid>
  )
}

export default OfferingContent
