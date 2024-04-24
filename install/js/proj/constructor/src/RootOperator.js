import {Operator} from "./Operator";

export class RootOperator extends Operator{
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
						Взятие корня - позволяет взять корень из правого элемента.
					</span>
					<span>
						Это - оператор, предоставляющий операцию взятия корня выражению.
					</span>
					<span>
						Поддерживает два режима использования:
					</span>
					<span>
						1) Степень корня прописывается точно и вручную в настройках оператора
					</span>
					<span>
						2) Берётся стандартное значение = 2. В таком случае всегда высчитывается квадратный корень
					</span>
					<p>
						Правила внутри генератора
					</p>
					<span>
						Взятие корня - одиночный оператор.
					</span>
					<span>
						Внимание: Расположение двух операторов подряд - вызовет ошибку!
					</span>
				</div>`
		return html;
	}
}