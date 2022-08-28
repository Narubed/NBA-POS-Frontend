import listReducer from './list'
import loadingReducer from './loading'
import snackbarReducer from './snackbar'

import { combineReducers } from 'redux'

const rootReducers = combineReducers({ list: listReducer, loading: loadingReducer, snackbar: snackbarReducer })

export default rootReducers
