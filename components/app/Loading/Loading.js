import {
  CircularProgress,
  Box,
} from '@material-ui/core';

export default ({ loading, children }) => {
  return (
    <div>
      {
        loading
          ? <Box
              justifyContent="center"
              display="flex"
              alignItems="center"
              minHeight={500}
              p={8}
            >
              <CircularProgress size={100} />
            </Box>
          : children
            ? children
            : null
      }
    </div>
  )
}
