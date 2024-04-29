import {Operator} from "./Operator";

export class RootOperator extends Operator{
	constructor(options = {}) {
		super(options);
		this.RootStyle = ['collapsed', 'true', 'checked="true"', 'show', ''];
		this.parameters.RootType = ['Precision', 2];
		this.RootExp = 2;
	}
	save()
	{
		let rootArea = document.querySelector(`[id^="textArea_${this.id}"]`);
		let buttonWithText = document.getElementById("RootSetting_1");
		let buttonWithoutText = document.getElementById("RootSetting_2");
		if (buttonWithText.getAttribute('checked') === 'true')
		{
			if (rootArea.value !== null)
			{
				this.RootExp = rootArea.value;
				this.parameters.RootType = [buttonWithText.getAttribute('value'), rootArea.value];
			}
			else
			{
				this.RootExp = 2;
				this.parameters.RootType = [buttonWithText.getAttribute('value'), 2];
			}
		}
		if (buttonWithoutText.getAttribute('checked') === 'true')
		{
			this.parameters.RootType = buttonWithoutText.getAttribute('value');
		}
		if (buttonWithText.getAttribute('checked') === 'true'
			&& buttonWithoutText.getAttribute('checked') === 'true')
		{
			if (rootArea.value !== null)
			{
				this.RootExp = rootArea.value;
				this.parameters.RootType = [buttonWithText.getAttribute('value'), rootArea.value];
			}
			else
			{
				this.RootExp = 2;
				this.parameters.RootType = [buttonWithText.getAttribute('value'), 2];
			}
		}
		this.unregisterEvents();
	}
	postUpdate()
	{
		document.querySelector(`[id^="textArea_${this.id}"]`).value = this.RootExp;
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
						Взятие корня - позволяет взять корень из правого элемента.
					</span>
					<span>
						Это - оператор, предоставляющий операцию взятия корня выражению.
					</span>
					<span>
						Поддерживает два режима использования:
					</span>
					<span>
						1) Степень корня прописывается точно и вручную в настройках оператора (по умолчанию [2])
					</span>
					<span>
						2) В качестве степени корня - берётся значение слева от оператора
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
				</div>
				<div id="settings_${this.id}" class="d-flex flex-column">
					<p>Настройка оператора</p>
					<div class="form-check">
						<input class="form-check-input ${this.RootStyle[0]}" type="checkbox" value="Precision" id="RootSetting_1" role="button" data-bs-toggle="collapse" href="#DegCollapse" role="button" aria-expanded="${this.RootStyle[1]}" aria-controls="DegCollapse" ${this.RootStyle[2]}>
						<label class="form-check-label" for="RootSetting_1">
							Степень прописывается точно и вручную в настройках оператора (по умолчанию)
						</label>
					</div>
					<div class="collapse ${this.RootStyle[3]}" id="DegCollapse" style="width:100%;">
						<div class="d-flex border" style="width:100%;">
							<div class="d-flex flex-column" style="margin-left:2%; width:100%;">
								<a>Укажите степень</a>
								<div class="d-flex flex-column col-12">
									<div class="d-flex">
										<input class="form-control" id="textArea_${this.id}" placeholder="Формат: 0<'целое число'<10">
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="form-check">
						<input class="form-check-input" type="checkbox" value="Root-left" id="RootSetting_2" role="button" ${this.RootStyle[4]}>
						<label class="form-check-label" for="RootSetting_2">
							В качестве степени корня - берётся значение слева от оператора
						</label>
					</div>
					<i>При выборе обеих настроек, будет выбрана настройка по умолчанию!</i>
				</div>`
		return html;
	}
	updateParameters()
	{
		if (Array.isArray(this.parameters.RootType))
		{
			this.RootStyle = ['collapsed', 'true', 'checked="true"', 'show', ''];
		}
		else
		{
			this.RootStyle = ['', 'false', '', '', 'checked="true"'];
		}
	}
	registerEvents()
	{
		if (this.areEventsRegistered === 0)
		{
			this.areEventsRegistered = 1;
			let buttons = document.querySelectorAll('.form-check-input[type="checkbox"]')
			buttons.forEach(element => {
				element.addEventListener('click', function(event){
					if (event.target.getAttribute('checked') === 'false')
					{
						event.target.setAttribute('checked', "true")
					}
					else if (event.target.getAttribute('checked') === 'true')
					{
						event.target.setAttribute('checked', "false")
					}
					else
					{
						event.target.setAttribute('checked', "true")
					}
				});
			});
		}
	}
	unregisterEvents()
	{
		if (this.areEventsRegistered === 1)
		{
			this.areEventsRegistered = 0;
			let buttons = document.querySelectorAll('.form-check-input[type="checkbox"]')
			buttons.forEach(element => {
				element.removeEventListener('click', function(event){});
			});
		}
	}
}