import {Operator} from "./Operator";

export class MinusOperator extends Operator{
	constructor(options = {}) {
		super(options);
	}

	showOption(): string {
		let html = `<p class="d-flex">Редактируемый элемент №${this.id} Тип:[${this.optionName}]</p>`;
		html += `
				<div id="description_${this.id}" class="d-flex flex-column">
					<p>
						Описание оператора '${this.optionName}'
					</p>
					<span>
						Вычитаение - позволяет вычесть из левого эемента правый.
					</span>
					<span>
						Это - оператор, предоставляющий оператор вычитания выражению.
					</span>
					<p>
						Правила внутри генератора
					</p>
					<span>
						Вычитание - одиночный оператор.
					</span>
					<span>
						Внимание: Расположение двух операторов подряд - вызовет ошибку!
					</span>
				</div>`
		return html;
	}
}