import vdom from 'jails-modules/vdom'

export default vdom(( items )=>{

	const values = Object.values( items )
	return values.length? List( values ) : Empty()
})

const Empty = ()=>{
	return (
		<h3 class="subtitle"> Sem items </h3>
	)
}

const List = ( values )=>{
	return (
		<ul class="items">
			{values.map( items => Item( items ) )}
		</ul>
	)
}

const Item = ( products )=>{

	let total   = String( products.length )
	let product = products[0]

	return (
		<li>
			<p>{product.title}</p>
			<small class="qtd">( {total} )</small>
			<form class="form-remove" data-component="submitter">
				<button class="button" type="submit">Remover</button>
				<input type="hidden" name="sku" value={product.sku} />
			</form>
		</li>
	)
}
