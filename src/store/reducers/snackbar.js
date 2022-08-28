const defaultState = {
  notifications: []
}

const snackbarReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ENQUEUE_SNACKBAR':
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            key: action.key,
            ...action.notification
          }
        ]
      }
    default:
      return state
  }
}

export default snackbarReducer
