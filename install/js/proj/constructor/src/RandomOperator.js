import {Operator} from "./Operator";

export class RandomOperator extends Operator {
	constructor(options = {}) {
		super(options);
		this.parameters.OperatorsExclude = ['none'];
		this.parameters.StandartSymbol = '+';
		this.Exclude = [];
		this.ExcludeStyle = ['', 'false', '', '',];
		this.accessibleOperators = ['+', '-', '*', '/', ':', 'root', 'N', '^'];
		this.additionalOperators = ['+', '-', '*', ':'];
	}

	save() {
		let excludeArea = document.querySelector(`[id^="textArea_${this.id}"]`);
		let standartOperator = document.querySelector(`[id^="textArea_${this.id}_2"]`);
		let excludeButton = document.querySelector(`.form-check-input[id="RandomOperator"]`);
		if (excludeButton.getAttribute('checked') === 'true')
		{
			if (excludeArea.value !== null && excludeArea.value !== '')
			{
				let exclude = excludeArea.value.replace(/\s+/g, '');
				if (exclude.includes(':') && exclude.includes('/'))
				{
					exclude = exclude.replace(/\//g, ':');
				}
				if (exclude.includes('N') && exclude.includes('root'))
				{
					exclude = exclude.replace(/root/g, 'N');
				}
				exclude = exclude.split(',');
				exclude = [... new Set(exclude)];
				for (let i = 0; i < exclude.length; i++)
				{
					if (!this.accessibleOperators.includes(`${exclude[i]}`))
					{
						this.Exclude = [];
						return;
					}
				}
				this.Exclude = exclude;
				this.parameters.OperatorsExclude = exclude;
			}
			else
			{
				this.parameters.OperatorsExclude = ['none'];
				this.Exclude = [];
			}
		}
		else
		{
			this.parameters.OperatorsExclude = ['none'];
		}
		if (this.additionalOperators.includes(standartOperator.value))
		{
			this.parameters.StandartSymbol = standartOperator.value;
		}
		this.unregisterEvents();
	}

	postUpdate() {
		document.querySelector(`[id="textArea_${this.id}"]`).value = this.Exclude.join(', ');
		document.querySelector(`[id="textArea_${this.id}_2"]`).value = this.parameters.StandartSymbol;
	}
	updateParameters()
	{
		if (this.parameters.OperatorsExclude === [])
		{
			this.ExcludeStyle = ['', 'false', '', '',];
		}
		else
		{
			this.ExcludeStyle = ['collapsed', 'true', 'checked="true"', 'show'];
		}
	}
	showOption(): string {
		this.updateParameters();
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
					<span>
						По умолчанию к генерации доступны все операторы (сложение, вычитание, умножение, деление, корень, степень)
					</span>
					<p>
						Правила внутри генератора
					</p>
					<span>
						Случайный оператор - одиночный оператор.
					</span>
					<span>
						Имейте в виду, что случайные операторы, которые можно получить засчёт этого оператора - всегда используют стандартные настройки!
					</span>
					<span>
						Внимание: Расположение двух операторов подряд - вызовет ошибку!
					</span>
				</div>
				<div id="settings_${this.id}" class="d-flex flex-column" style="width: 100%;">
					<p>Настройка оператора</p>
					<div class="form-check">
						<input class="form-check-input ${this.ExcludeStyle[0]}" type="checkbox" value="Blacklist" id="RandomOperator" role="button" data-bs-toggle="collapse" href="#RandomOperatorCollapse" role="button" aria-expanded="${this.ExcludeStyle[1]}" aria-controls="RandomOperatorCollapse" ${this.ExcludeStyle[2]}>
						<label class="form-check-label" for="RandomOperator">
							Использовать чёрный список
						</label>
					</div>
					<div class="collapse ${this.ExcludeStyle[3]}" id="RandomOperatorCollapse" style="width:100%;">
						<div class="d-flex border" style="width:100%;">
							<div class="d-flex flex-column" style="margin-left:2%; width:100%;">
								<a>Укажите исключаемые операторы</a>
								<div class="d-flex flex-column col-12">
									<div class="d-flex">
										<input class="form-control" id="textArea_${this.id}" placeholder="Перечислите через запятую">
									</div>
									<span>
										Доступные операнды:
									</span>
									<span>
										Сложение: <strong>+</strong> ; Вычитание: <strong>-</strong>
									</span>
									<span>
										Умножение: <strong>*</strong> ; Степень: <strong>^</strong>
									</span>
									<span>
										Деление  <strong>/</strong>  или  <strong>:</strong> 
									</span>
									<span>
										Корень:  <strong>N</strong>  или  <strong>root</strong>
									</span>
								</div>
							</div>
						</div>
					</div>
					<div class="d-flex flex-column">
						<label>Укажите стандартный символ для операторов степени и корня (этот символ применится слева от корня или справа от степени в зависимости от того, какой оператор попадётся)</label>
						<input class="form-control" id="textArea_${this.id}_2" placeholder="Допустимые операторы: +, -, *, :">
						<span>Стандартно берётся сложение</span>
					</div>
				</div>`
		return html;
	}

	updateParameters() {
		if (this.parameters.OperatorsExclude[0] !== 'none')
		{
			this.ExcludeStyle = ['collapsed', 'true', 'checked="true"', 'show', ''];
		}
		else
		{
			this.ExcludeStyle = ['', 'false', '', '', 'checked="true"'];
		}
	}
	registerEvents()
	{
		if (this.areEventsRegistered === 0)
		{
			this.areEventsRegistered = 1;
			let excludeButton = document.querySelector(`.form-check-input[id="RandomOperator"]`);
			excludeButton.addEventListener('click', function(event) {
				if (event.target.getAttribute('checked') === 'true')
				{
					event.target.setAttribute('checked', 'false');
				}
				else
				{
					event.target.setAttribute('checked', 'true');
				}
			});
		}
	}
	unregisterEvents()
	{
		if (this.areEventsRegistered === 1)
		{
			this.areEventsRegistered = 0;
			let excludeButton = document.querySelector(`.form-check-input[id="RandomOperator"]`);
			excludeButton.removeEventListener('click', function(event) {});
		}
	}
}