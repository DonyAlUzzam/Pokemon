import {combineReducers} from 'redux';

import account from './AccountReducers'
import questions from './QuestionReducers'

export default combineReducers({account, questions })