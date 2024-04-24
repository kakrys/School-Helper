import {Operator} from "./Operator";

export class DivOperator extends Operator{
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
						Деление - позволяет разделить объект слева от него на объект справа от него.
					</span>
					<span>
						Это - оператор, предоставляющий деление выражению.
					</span>
					<span>
						Поддерживает два режима представления:
					</span>
					<span>
						1) Выражение обращается в дробь
					</span>
					<span>
						2) Выражение не обращается в дробь, считается обычным делением
					</span>
					<p>
						Правила внутри генератора
					</p>
					<span>
						Деление - одиночный оператор.
					</span>
					<span>
						Внимание: Расположение двух операторов подряд - вызовет ошибку!
					</span>
				</div>`
		return html;
	}
}