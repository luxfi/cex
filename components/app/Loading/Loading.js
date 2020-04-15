import {
  CircularProgress,
  Box,
} from '@material-ui/core';

export default ({ loading, children }) => {
  return (
    <Box>
      {
        loading
          ? <Box justifyContent="center" display="flex" p={8}><CircularProgress size={100} /></Box>
          : children
            ? children
            : null
      }
    </Box>
  )
}
