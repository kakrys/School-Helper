import {Operator} from "./Operator";

export class AnswerOperator extends Operator{
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
						Ответ - позволяет задать произвольный порядок вычислений для выражения. В случае, если идёт работа с многочленами, к примеру
					</span>
					<span>
						Это - оператор, предоставляющий возможность переопределить ответ или правила его вычисления.
					</span>
					<p>
						Правила внутри генератора
					</p>
					<span>
						Ответ - одиночный оператор.
					</span>
					<span>
						Внимание: при использовании оператора ответа - он будет обрабатываться в последнюю очередь вне зависимости от того, где расположен!.
					</span>
				</div>`
		return html;
	}
}