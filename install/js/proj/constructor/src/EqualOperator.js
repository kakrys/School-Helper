import {Operator} from "./Operator";

export class EqualOperator extends Operator{
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
						Равенство - позволяет ввести проверку соответствия значений выражений слева и справа от него.
					</span>
					<span>
						Для проверки соответствия берётся всё выражение слева от равенства и всё выражение справа от равенства.
					</span>
					<span>
						Это - оператор, предоставляющий оператор равенства выражению.
					</span>
					<span>
						Необходим, к примеру, для составления уравнений.
					</span>
					<p>
						Правила внутри генератора
					</p>
					<span>
						Равенство - одиночный оператор.
					</span>
					<span>
						Внимание: Расположение двух операторов подряд - вызовет ошибку!
					</span>
					<span>
						Внимание: Наличие двух операторов равенства в выражении - приведёт к ошибке!
					</span>
				</div>`
		return html;
	}
}