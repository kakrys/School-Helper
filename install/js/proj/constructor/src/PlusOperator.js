import {Operator} from "./Operator";

export class PlusOperator extends Operator{
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
						Сложение - позволяет прибавить к левому эементу правый.
					</span>
					<span>
						Это - оператор, предоставляющий оператор сложения выражению.
					</span>
					<p>
						Правила внутри генератора
					</p>
					<span>
						Сложение - одиночный оператор.
					</span>
					<span>
						Внимание: Расположение двух операторов подряд - вызовет ошибку!
					</span>
				</div>`
		return html;
	}
}