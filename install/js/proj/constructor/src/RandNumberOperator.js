import {Operator} from "./Operator";
import {RandNumberOption as RNO} from "proj.operators";
const RandNumberOption = BX.Proj.Independent.RandNumberOption;

export class RandNumberOperator extends RandNumberOption{
	constructor(options = {}) {
		super(options);
		if (options.textView === undefined)
		{
			this.textView = '[X]';
		}
		this.textView = options.textView;
		this.isOperator = false;
		this.isDelitable = true;
		this.isPair = false;
		this.PairId = null;
		this.html = `<span id="${this.id}" data-instruction="${this.id}" onclick="generator.showOption(${this.id})" class="border btn" style="padding: 1%; margin:1%; background:${this.color};">${this.optionName}</span>`;
	}
	render(mode)
	{
		switch (mode){
			case 'text':
				return `<span id="instruction_${this.id}" data-instruction="${this.id}" onclick="generator.showOption(${this.id})" class="border btn" style="padding: 1%; margin:1%; background:${this.color};">${this.textView}</span>`;
			default: return this.html;
		}
	}
}