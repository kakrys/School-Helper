import {Operator} from "./Operator";
import {RandNumberOption as RNO} from "proj.operators";
const RandNumberOption = BX.Proj.Independent.RandNumberOption;

export class RandNumberOperator extends RandNumberOption{
	constructor(options = {}) {
		super(options);
		if (options.textView !== undefined)
		{
			this.textView = options.textView;
		}
		else
		{
			this.textView = '[X]';
		}
		this.parameters.id = this.id;
		this.parameters.Type = this.Type;
		this.isOperator = false;
		this.isDelitable = true;
		this.isPair = false;
		this.PairId = null;
		this.html = `<span id="${this.id}" data-instruction="${this.id}" onclick="generator.showOption(${this.id})" class="border btn" style="padding: 1%; margin:1%; background:${this.color};">${this.optionName}</span>`;
	}
	showOption()
	{
		let html = super.showOption();
		html += `
				<div id="description_${this.id}" class="d-flex flex-column">
					<p>
						Описание оператора '${this.optionName}'
					</p>
					<span>
						Случайное число - позволяет задать выбор случайного числа для выражения.
					</span>
					<span>
						Это - объект, предоставляющий вычисляемый элемент (число) выражению.
					</span>
					<p>
						Правила внутри генератора
					</p>
					<span>
						Случайное число - одиночный элемент.
					</span>
					<span>
						Внимание: Расположение двух таких элементов подряд - Автоматически проставит между ними знак умножения!
					</span>
				</div>`
		return html;

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