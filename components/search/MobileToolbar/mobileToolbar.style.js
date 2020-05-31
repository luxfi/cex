export default (theme) => ({
  mobileToolbarContainer: {
    background: '#000',
    width: '100%',
    display: 'flex',
    position: 'fixed',
    zIndex: 2147483647,
    bottom: 0,
    left: 0,
    right: 0,
    '& .MuiTabs-root': {
      width: '100%',
    },
  },

  modal: {
    background: 'rgba(10, 10, 10, 0.85)',
    height: 'calc(100vh - 60px)',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    bottom: 64,
    top: 0,
  },

  modalHeader: {
    display: 'flex',
    padding: `0 ${theme.spacing(2)}`,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  doneButton: {
    color: theme.palette.secondary.main,
    marginRight: theme.spacing(1),
    border: `1px solid ${theme.palette.secondary.main}`,
  },

  modalContent: {
    flex: 1,
    overflowY: 'scroll',
  },

  modalFooter: {
    background: '#000',
  },

  facetName: {
    marginBottom: 5,
    borderBottom: `1px solid ${theme.palette.background.paper}`,
  },

  selectedFacetContainer: {
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    borderBottom: `1px solid ${theme.palette.background.paper}`,
  },

  selectedFacets: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    '& > div': {
      marginBottom: 5,
    },
  },
})
