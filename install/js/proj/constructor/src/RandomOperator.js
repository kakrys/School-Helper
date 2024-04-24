import {Operator} from "./Operator";

export class RandomOperator extends Operator{
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
						Случайный оператор - позволяет предоставить выбор оператора наугад. При каждом запуске примера - оператор будет случайным.
					</span>
					<span>
						Это - оператор, предоставляющий возможность случайного выбора среди остальных операторов.
					</span>
					<span>
						Этот оператор можно настроить, задав ему чёрный список операторов (тех, что не появятся во время генерации задания)
					</span>
					<p>
						Правила внутри генератора
					</p>
					<span>
						Случайный оператор - одиночный оператор.
					</span>
					<span>
						Внимание: Расположение двух операторов подряд - вызовет ошибку!
					</span>
				</div>`
		return html;
	}
}