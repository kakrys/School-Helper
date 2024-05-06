import {Operator} from "./Operator";
import {Validator as V} from "proj.operators";
const Validator = BX.Proj.Independent.Validator;

export class PowerOperator extends Operator{
	constructor(options = {}) {
		super(options);
		this.DegStyle = ['collapsed', 'true', 'checked="true"', 'show', ''];
		this.parameters.DegType = ['Precision', 2];
		this.DegExp = 2;
		this.errorRender = [''];
		this.errors = {
			degValue: false,
		};
	}

	save()
	{
		let degArea = document.querySelector(`[id^="textArea_${this.id}"]`);
		let buttonWithText = document.getElementById("DegSetting_1");
		let buttonWithoutText = document.getElementById("DegSetting_2");
		if (buttonWithText.getAttribute('checked') === 'true')
		{
			if (degArea.value !== null)
			{
				this.DegExp = degArea.value;
				this.parameters.DegType = [buttonWithText.getAttribute('value'), degArea.value];
			}
			else
			{
				this.DegExp = 2;
				this.parameters.DegType = [buttonWithText.getAttribute('value'), 2];
			}
		}
		if (buttonWithoutText.getAttribute('checked') === 'true')
		{
			this.parameters.DegType = buttonWithoutText.getAttribute('value');
		}
		if (buttonWithText.getAttribute('checked') === 'true'
			&& buttonWithoutText.getAttribute('checked') === 'true')
		{
			if (degArea.value !== null)
			{
				this.DegExp = degArea.value;
				this.parameters.DegType = [buttonWithText.getAttribute('value'), degArea.value];
			}
			else
			{
				this.DegExp = 2;
				this.parameters.DegType = [buttonWithText.getAttribute('value'), 2];
			}
		}
		this.errors['degValue'] = Validator.isInteger(this.DegExp);
		if (this.errors['degValue'] === false)
		{
			this.errors['degValue'] = Validator.numberBetween(this.DegExp,0,10);
		}

		this.unregisterEvents();
		return this.errorHandler();
	}
	postUpdate()
	{
		document.querySelector(`[id^="textArea_${this.id}"]`).value = this.DegExp;
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
						Возведение в степень - позволяет возвести в степень левый элемент.
					</span>
					<span>
						Это - оператор, предоставляющий оператор возведения в степень выражению.
					</span>
					<span>
						Поддерживает два режима использования:
					</span>
					<span>
						1) Степень прописывается точно и вручную в настройках оператора (по умолчанию [2])
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
				</div>
				<div id="settings_${this.id}" class="d-flex flex-column">
					<p>Настройка оператора</p>
					<div class="form-check">
						<input class="form-check-input ${this.DegStyle[0]}" type="checkbox" value="Precision" id="DegSetting_1" role="button" data-bs-toggle="collapse" href="#DegCollapse" role="button" aria-expanded="${this.DegStyle[1]}" aria-controls="DegCollapse" ${this.DegStyle[2]}>
						<label class="form-check-label" for="DegSetting_1">
							Степень прописывается точно и вручную в настройках оператора (по умолчанию)
						</label>
					</div>
					<div class="collapse ${this.DegStyle[3]}" id="DegCollapse" style="width:100%;">
						<div class="d-flex border" style="width:100%;">
							<div class="d-flex flex-column" style="margin-left:2%; width:100%;">
								<a>Укажите степень</a>
								<div class="d-flex flex-column col-12">
									<div class="d-flex">
										<input class="form-control" id="textArea_${this.id}" placeholder="Формат: 0<'целое число'<10">
									</div>
									<span style="color:orangered">${this.errorRender[0]}</span>
								</div>
							</div>
						</div>
					</div>
					<div class="form-check">
						<input class="form-check-input" type="checkbox" value="Deg-right" id="DegSetting_2" role="button" ${this.DegStyle[4]}>
						<label class="form-check-label" for="DegSetting_2">
							В качестве показателя степени возьмётся элемент справа от оператора
						</label>
					</div>
					<i>При выборе обеих настроек, будет выбрана настройка по умолчанию!</i>
				</div>`
		return html;
	}
	updateParameters()
	{
		if (Array.isArray(this.parameters.DegType))
		{
			this.DegStyle = ['collapsed', 'true', 'checked="true"', 'show', ''];
		}
		else
		{
			this.DegStyle = ['', 'false', '', '', 'checked="true"'];
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