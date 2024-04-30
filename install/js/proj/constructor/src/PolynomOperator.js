import {RandNumberOption as RNO} from "proj.operators";
const RandNumberOption = BX.Proj.Independent.RandNumberOption;

export class PolynomOperator extends RandNumberOption{
	constructor(options = {}) {
		super(options);
		this.parameters.PolynomLitera = '';
		if (options.textView !== undefined)
		{
			this.textView = options.textView;
		}
		else
		{
			this.textView = '{xyz}';
		}
		this.isOperator = false;
		this.isDelitable = true;
		this.isPair = false;
		this.PairId = null;
		this.html = `<span id="${this.id}" data-instruction="${this.id}" onclick="generator.showOption(${this.id})" class="border btn" style="padding: 1%; margin:1%; background:${this.color};">${this.optionName}</span>`;
	}
	save()
	{
		super.save();
		let textArea = document.getElementById(`textArea_${this.id}`);
		if (textArea.value !== null && textArea.value !== '' && textArea.value.length <2)
		{
			this.parameters.PolynomLitera = textArea.value;
		}
	}
	postUpdate()
	{
		super.postUpdate();
		let textArea = document.getElementById(`textArea_${this.id}`);
		if (this.parameters.PolynomLitera !== undefined)
		{
			textArea.value = this.parameters.PolynomLitera
		}
		else
		{
			textArea.value = '';
		}
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
						Полином - Реорганизует выражение в уравнение. Наличие оператора полинома определяет является ли конечное выражение уравнением.
					</span>
					<span>
						Этот оператор предоставляет возможность создавать буквенные выражения. Требуется для задач подстановки.
					</span>
					<span>
						Позволяет назначить буквенный символ для случайного числа
					</span>
					<p>
						Правила внутри генератора
					</p>
					<span>
						Полином - одиночный оператор.
					</span>
					<span>
						Внимание: расположение двух операторов полинома подряд - позволяет делать сложное выражение на несколько неизвестных.
					</span>
					<span>
						Внимание: если два оператора полинома привязаны к одной букве, то настройки возьмутся от первого слева из операторов
					</span>
				</div>
				<div class="d-flex" style="width:100%;">
					<input class="form-control" id="textArea_${this.id}" placeholder="Введите букву для замещения">
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