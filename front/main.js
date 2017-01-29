import jails 	from 'jails'
import scriptjs from 'scriptjs'
import logger 	from 'jails-modules/logger'

let mainscript 	= document.getElementById('main-script')
let app 		= mainscript.getAttribute('data-application')

scriptjs([ app ], ()=>{
	logger( jails )
	jails.start()
})
