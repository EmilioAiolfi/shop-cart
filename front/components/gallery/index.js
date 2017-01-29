import template from './template.jsx'
import store 	from 'store/cart'

import 'jails-components/submitter'

export default ( component, element, props )=>{

	const {url}  = props('data')
	const render = template( element )

	component.init = ()=>{

		store.subscribe( update )
		store.dispatch('FETCH', { url })

		component.on('submitter:post', add)
	}

	const update = ( state = store.get() )=>{
		render( state.products )
	}

	const add = ( e, {params} )=>{
		store.dispatch( 'ADD', params )
	}
}
