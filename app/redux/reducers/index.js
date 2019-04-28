import {combineReducers} from 'redux';

import account from './AccountReducers'
import pokemons from './PokemonReducers'

export default combineReducers({account, pokemons })