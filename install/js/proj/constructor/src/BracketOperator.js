import {Operator} from "./Operator";

export class BracketOperator extends Operator{
	constructor(options = {}) {
		super(options);
		this.isPair = true;
		this.PairId = options.PairId;
	}

	showOption(): string {
		let html = `<p class="d-flex">Редактируемый элемент №${this.id} Тип:[${this.optionName}]</p>`;
		html += `
				<div id="description_${this.id}" class="d-flex flex-column">
					<p>
						Описание оператора '${this.optionName}'
					</p>
					<span>
						Скобки - выделяют порядок вычислений, операции внутри скобок - выше по приоритету.
					</span>
					<span>
						Это - оператор, предоставляющий скобки выражению.
					</span>
					<p>
						Правила внутри генератора
					</p>
					<span>
						Скобки - парный оператор, это значит, что при единоразовом создании скобок, создадутся два элемента в поле инструкций.
					</span>
					<span>
						Внимание: при удалении одного из парных операторов - его пара также удаляется!.
					</span>
				</div>`
		return html;
	}
}