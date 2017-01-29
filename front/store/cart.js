import axios 	 from 'axios'
import litestore from 'jails-modules/litestore'

let store

export default store = litestore({
	loading :false,
	items 	:{},
	products:[]
})

store.actions({

	ADD( state, payload ){
		state.items = R.add( state.items, { sku: payload.sku, products :state.products } )
		return state
	},

	REMOVE( state, payload ){
		state.items = R.remove( state.items, payload )
		return state
	},

	FETCH( state, payload ){
		axios.get( payload.url )
			 .then( ({data}) => store.dispatch('LOAD', data ) )
		state.loading = true
		return state
	},

	LOAD( state, payload ){
		state.loading = false
		state.products = payload.products
		return state
	}
})

const R = {

	add( state, payload ){
		const sku     = payload.sku
		const product = payload.products.find( item => item.sku == sku )
		state[sku]    = sku in state? state[sku].concat( product ) : [ product ]
		return state
	},

	remove( state, payload ){
		delete state[ payload.sku ]
		return state
	}
}
