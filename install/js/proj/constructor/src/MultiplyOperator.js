import {Operator} from "./Operator";

export class MultiplyOperator extends Operator{
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
						Умножение - позволяет умножить левый эемент на правый.
					</span>
					<span>
						Это - оператор, предоставляющий оператор умножения выражению.
					</span>
					<p>
						Правила внутри генератора
					</p>
					<span>
						Умножение - одиночный оператор.
					</span>
					<span>
						Внимание: Расположение двух операторов подряд - вызовет ошибку!
					</span>
				</div>`
		return html;
	}
}