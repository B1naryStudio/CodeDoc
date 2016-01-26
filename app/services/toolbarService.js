export var ToolbarService = { 

	prepareData(state) {
		let res = {
			startSelection: state.cursorPosition.start,
			endSelection: state.cursorPosition.end,
			value: state.mainWindowText
		};
		res.selectedText = res.value.substring(res.startSelection, res.endSelection)
		return res;
	},

	isSelectionMarkedUp(data, marks, paired, endMarks) {
		return (data.value.substring(data.startSelection - marks.length, data.startSelection) === marks) && (!paired || (data.value.substring(data.endSelection, data.endSelection + endMarks.length) === endMarks));
	},

	toggleMarkUp(state, marks, placeholder, paired, endMark) {
		let data = this.prepareData(state);
		let selection = data.selectedText || placeholder;
		let result = {};
		let endMarks = paired ? (endMark ? endMark : marks) : '';

		if (this.isSelectionMarkedUp(data, marks, paired, endMarks)) {
			result.value = data.value.substring(0, data.startSelection - marks.length) + selection + data.value.substring(data.endSelection + endMarks.length, data.value.length);
			result.cursorPosition = {
				start: data.startSelection - marks.length,
				end: data.startSelection - marks.length + selection.length
			};
		} else {
			result.value = data.value.substring(0, data.startSelection) + marks + selection + endMarks + data.value.substring(data.endSelection, data.value.length);
			result.cursorPosition = {
				start: data.startSelection + marks.length,
				end: data.startSelection + marks.length + selection.length
			};
		}
		return result;
	},

	addBold(state) {
		let placeholder = 'Bold text';
		let marks = '**';

		return this.toggleMarkUp(state, marks, placeholder, true);
	},

	addItalic(state) {
		let placeholder = 'Italic text';
		let marks = '*';

		return this.toggleMarkUp(state, marks, placeholder, true);
	},

	addHeader(state, header) {
		let placeholder = 'h' + header + ' Heading';
		let marks = '\n###'.substring(0, 1 + header) + ' ';

		return this.toggleMarkUp(state, marks, placeholder, false);
	},

	addCodeStyle(state) {
		let placeholder = 'This is code';
		let marks = '`';

		return this.toggleMarkUp(state, marks, placeholder, true);
	},

	addComment(state) {
		let placeholder = 'This is comment';
		let marks = '\n\n    ';

		return this.toggleMarkUp(state, marks, placeholder, false);
	},

	addBlockQuote(state) {
		let placeholder = 'This is blockquote';
		let marks = '\n>';

		return this.toggleMarkUp(state, marks, placeholder, false);
	},

	addNumList(state) {
		let placeholder = 'Ordered item';
		let marks = '\n1. ';

		return this.toggleMarkUp(state, marks, placeholder, false);
	},

	addSimpleList(state) {
		let placeholder = 'Unordered item';
		let marks = '\n+ ';

		return this.toggleMarkUp(state, marks, placeholder, false);
	},

	addHorizRule(state) {
		let data = this.prepareData(state);
		let result = {};

		result.value = data.value.substring(0, data.startSelection) + '\n***\n' + data.value.substring(data.endSelection, data.value.length);
		result.cursorPosition = {
			start: result.value.length,
			end: result.value.length
		};
		return result;
	},

	addLink(state, address) {
		let placeholder = 'link description';
		let url = address || 'http://example.com/';
		let marks = '[';

		return this.toggleMarkUp(state, marks, placeholder, true, '](' + url + ')');
	},

	addImageLink(state, address){
		let placeholder = 'link description';
		let url = address || 'http://example.com/img.png';
		let marks = '![';

		return this.toggleMarkUp(state, marks, placeholder, true, '](' + url + ')');
	}
};