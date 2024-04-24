import {Operator} from "./Operator";

export class PowerOperator extends Operator{
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
						Возведение в степень - позволяет возвести в степень левый элемент.
					</span>
					<span>
						Это - оператор, предоставляющий оператор возведения в степень выражению.
					</span>
					<span>
						Поддерживает два режима использования:
					</span>
					<span>
						1) Степень прописывается точно и вручную в настройках оператора
					</span>
					<span>
						2) В качестве показателя степени возьмётся элемент справа от оператора
					</span>
					<p>
						Правила внутри генератора
					</p>
					<span>
						Возведение в степень - одиночный оператор.
					</span>
					<span>
						Внимание: Расположение двух операторов подряд - вызовет ошибку!
					</span>
				</div>`
		return html;
	}
}