import {Option as Op} from 'proj.operators';
const Option = BX.Proj.Independent.Option;

export class Operator extends Option
{
	constructor(options = {})
	{
		super(options);
		if (options.textView === undefined)
		{
			this.textView = 'null';
		}
		this.textView = options.textView;
		this.isOperator = true
		if (options.isOperator !== undefined)
		{
			this.isOperator = options.isOperator;
		}
		this.isDelitable = true;
		this.isPair = false;
		this.PairId = null;
		this.html = `<span id="${this.id}" data-instruction="${this.id}" onclick="generator.showOption(${this.id})" class="border btn" style="padding: 1%; margin:1%; background:${this.color};">${this.optionName}</span>`;
	}
	render(mode)
	{
		switch (mode){
			case 'text':
				return `<span id="${this.id}" data-instruction="${this.id}" onclick="generator.showOption(${this.id})" class="border btn" style="padding: 1%; margin:1%; background:${this.color};">${this.textView}</span>`;
			default:
				return this.html;
		}
	}
	showOption()
	{
		let html = `<p class="d-flex">Описание оператора c id=${this.id} Тип:[${this.optionName}]</p>`;
		html += `<div class="form-group col-12">
					У этого оператора нет особых настроек. Выберите другой оператор для настройки
				</div>`;
		return html;
	}
	getGeneratorData()
	{
		return this.parameters;
	}
	save()
	{
		return true;
	}
}