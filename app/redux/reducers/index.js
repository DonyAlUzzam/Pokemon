import {combineReducers} from 'redux';

import account from './AccountReducers'
import pokemons from './PokemonReducers'
import type from './TypeReducers'
import categories from './CategoryReducers'

export default combineReducers({account, pokemons, type, categories })