import vdom from 'jails-modules/vdom'

export default vdom(( items )=>{

	const keys = Object.keys( items )

	return (
		<ul class="grid-list">
			{ keys.map( name => Product( items[name] ) ) }
		</ul>
	)
})

const Product = ( product )=>{

	return (
		<li>
			<div class="product">
				<img src="//lorempixel.com/180/230/" alt="Produto" />
				<h3 class="product-title">{ product.title } <small>{ product.description }</small></h3>
				{ Price( product ) }
				<form action="#" data-component="submitter">
					<button class="button -primary" type="submit">Add to Cart</button>
					<input type="hidden" name="sku" value={ product.sku } />
				</form>
			</div>
		</li>
	)
}

const Price = ( product )=>{

	let currency 	 = product.currencyFormat
	let price 		 = String( product.price.toFixed(2) ).split(/\./)
	let installment  = String((product.price/(product.installments || 1)).toFixed(2)).split(/\./)
	let installments = String( product.installments || 1 )

	return(
		<div class="price">
			<p class="original">
				<small>{ currency }</small>
				<small class="int">{price[0]}</small>,<span>{price[1]}</span>
			</p>
			<p class="installment">
				<strong>Ou { installments }x de {currency} {installment[0]},{installment[1]}</strong>
			</p>
		</div>
	)

}
