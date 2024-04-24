import {Operator} from "./Operator";

export class Pointer extends Operator
{
	constructor() {
		super();
		this.optionName = '↑';
		this.type = 'pointer';
		this.html =this.html = `<span id="instruction_${this.id}" data-instruction="${this.id}" onclick="generator.showOption(${this.id})" 
								style="color: blue; 
								max-height: 5%;
								margin-top: 25px; 
								text-decoration: overline blue; 
								padding: 1%;
								text-align: start; 
								background:${this.color};">${this.optionName}</span>`;
		this.isDelitable = false;
		this.id = -1;
		this.pos = 0;
		this.textView = '|<'
	}
	showOption()
	{
		return '';
	}
}