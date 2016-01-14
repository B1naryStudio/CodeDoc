const postal = require('postal');

export class EvtListeners {
	
	constructor(){
		console.log(postal);
		postal.subscribe({
			channel: "files",
			topic: "newFile",
			callback: function(data, envelope) {
				console.log('Event received');
			}
		});
	}

}