export var ToolbarService = { 

	prepareData(state){
		let res = {
			startSelection: state.cursorPosition.start,
			endSelection: state.cursorPosition.end,
			value: state.mainWindowText
		};
		res.selectedText = res.value.substring(res.startSelection, res.endSelection)
		return res;
	}, 
 
	addBold(state){
		let data = this.prepareData(state);
		let result;

		if(data.selectedText){
			result = data.value.substring(0, data.startSelection) + '**' + data.selectedText + '**' + data.value.substring(data.endSelection, data.value.length);
		} else {
			result = data.value.substring(0, data.startSelection) + '**Bold text**' + data.value.substring(data.endSelection, data.value.length);
		}

		return result;
	},

	addItalic(state){
		let data = this.prepareData(state);
		let result;

		if(data.selectedText){
			result = data.value.substring(0, data.startSelection) + '*' + data.selectedText + '*' + data.value.substring(data.endSelection, data.value.length);
		} else {
			result = data.value.substring(0, data.startSelection) + '*Italic text*' + data.value.substring(data.endSelection, data.value.length);
		}

		return result;
	},

	addHeader(state, header){
		let data = this.prepareData(state);
		let result;
		let sharp = '###'.substring(0, header);

		if(data.selectedText){
			result = data.value.substring(0, data.startSelection) + sharp + ' ' + data.selectedText + ' ' 
			sharp + '\n' + data.value.substring(data.endSelection, data.value.length);
			if(data.startSelection > 0) {
				result = data.value.substring(0, data.startSelection) + '\n' + sharp + ' ' + data.selectedText + 
				sharp + ' \n' + data.value.substring(data.endSelection, data.value.length);
			}
		} else {
			result = data.value.substring(0, data.startSelection) + sharp + ' Header ' + header + ' ' + sharp + 
			data.value.substring(data.endSelection, data.value.length) + '\n';
		}

		return result;
	},

	addCodeStyle(state){
		let data = this.prepareData(state);
		let result;

		if(data.selectedText){
			result = data.value.substring(0, data.startSelection) + '`' + data.selectedText + '`' + data.value.substring(data.endSelection, data.value.length);
		} else {
			result = data.value.substring(0, data.startSelection) + '    This is code' + data.value.substring(data.endSelection, data.value.length);
		}

		return result;
	},

	addBlockQuote(state){
		let data = this.prepareData(state);
		let result;

		if(data.selectedText){
			result = data.value.substring(0, data.startSelection) + '>' + data.selectedText + data.value.substring(data.endSelection, data.value.length);
			if(data.startSelection > 0) {
				result = data.value.substring(0, data.startSelection) + '\n' + '>' + data.selectedText + '\n\n' + data.value.substring(data.endSelection, data.value.length);
			}
		} else {
			result = data.value.substring(0, data.startSelection) + '> This is blockquote' + data.value.substring(data.endSelection, data.value.length);
		}

		return result;
	},

	addNumList(state){
		let data = this.prepareData(state);
		let result;

		if(data.selectedText){
			result = data.value.substring(0, data.startSelection) + '1. ' + data.selectedText + data.value.substring(data.endSelection, data.value.length);
			if(data.startSelection > 0) {
				result = data.value.substring(0, data.startSelection) + '\n' + '1. ' + data.selectedText + '\n\n' + data.value.substring(data.endSelection, data.value.length);
			}
		} else {
			result = data.value.substring(0, data.startSelection) + '1. Item list' + 
			data.value.substring(data.endSelection, data.value.length) + '\n';
		}

		return result;
	},

	addSimpleList(state){
		let data = this.prepareData(state);
		let result;

		if(data.selectedText){
			result = data.value.substring(0, data.startSelection) + '- ' + data.selectedText + data.value.substring(data.endSelection, data.value.length);
			if(data.startSelection > 0) {
				result = data.value.substring(0, data.startSelection) + '\n\n' + '- ' + data.selectedText + '\n' + data.value.substring(data.endSelection, data.value.length);
			}
		} else {
			result = data.value.substring(0, data.startSelection) + '- Item list' + data.value.substring(data.endSelection, data.value.length);
		}

		return result;
	},

	addHorizRule(state){
		let data = this.prepareData(state);
		let result;

		if(data.selectedText){
			result = data.value.substring(0, data.startSelection) + '\n\n ----------\n' + 
			data.selectedText + data.value.substring(data.endSelection, data.value.length);
			if(data.startSelection > 0) {
				result = data.value.substring(0, data.startSelection) + '\n\n ----------\n' + 
				data.selectedText + data.value.substring(data.endSelection, data.value.length);
			}
		} else {
			result = data.value.substring(0, data.startSelection) + '\n\n ----------\n' + 
			data.value.substring(data.endSelection, data.value.length);
		}

		return result;
	},

	addLink(state, address){
		let data = this.prepareData(state);
		let url = address;
		let result;

		if(data.selectedText){
			result = data.value.substring(0, data.startSelection) + '[' + data.selectedText + ']' + 
			data.value.substring(data.endSelection, data.value.length) + '(' + url + ')';
		} else {
			result = data.value.substring(0, data.startSelection) + '[enter link description here]' + 
			data.value.substring(data.endSelection, data.value.length) + '(' + url + ')';
		}

		return result;
	},

	addImageLink(state, address){
		let data = this.prepareData(state);
		let url = address;
		let result;

		if(data.selectedText){
			result = data.value.substring(0, data.startSelection) + '![' + data.selectedText + ']' + 
			data.value.substring(data.endSelection, data.value.length) + '(' + url + ')';
		} else {
			result = data.value.substring(0, data.startSelection) + '![enter link description here]' + 
			data.value.substring(data.endSelection, data.value.length) + '(' + url + ')';
		}

		return result;
	}
};