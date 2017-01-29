import store 	from 'store/cart'
import template from './template.jsx'

import 'jails-components/submitter'

export default ( component, element, anno )=>{

	const content = element.querySelector('.content')
	const render  = template( content )

	component.init = ()=>{

		component.on('submitter:post', remove )
		component.on( 'click', '.-hamburguer', toggle )

		store.subscribe( update )
	}

	const update = ( state = store.get() )=>{
		render( state.items )
	}

	const toggle = ()=>{
		element.classList.toggle( '-open' )
	}

	const remove = ( e, option )=>{
		store.dispatch('REMOVE', option.params)
	}
}
