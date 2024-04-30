import {Operator} from "./Operator";

export class DivOperator extends Operator{
	constructor(options = {}) {
		super(options);
		this.DivStyle = ['', 'checked = "true"'];
		this.parameters.DivStyle = 'Non-fraction-style';
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
						2) Выражение не обращается в дробь, считается обычным делением (по умолчанию)
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
				</div>
				<div id="settings_${this.id}" class="d-flex flex-column">
					<p>Настройка оператора</p>
					<div class="form-check">
						<input class="form-check-input" type="radio" value="Fraction-style" name="DivStyle" id="DivSetting_1" role="button" ${this.DivStyle[0]}>
						<label class="form-check-label" for="DivStyle">
							Выражение обращается в дробь
						</label>
					</div>
					<div class="form-check">
						<input class="form-check-input" type="radio" value="Non-fraction-style" name="DivStyle" id="DivSetting_2" role="button" ${this.DivStyle[1]}>
						<label class="form-check-label" for="DivStyle">
							Выражение не обращается в дробь, считается обычным делением (по умолчанию)
						</label>
					</div>
				</div>`
		return html;
	}
	updateParameters()
	{
		if (this.parameters.DivStyle === 'Fraction-style')
		{
			this.DivStyle = ['checked = "true"', ''];
		}
		else
		{
			this.DivStyle = ['', 'checked = "true"'];
		}

	}
	save()
	{
		let styleButtonFraction = document.getElementById("DivSetting_1");
		let styleButtonNonFraction = document.getElementById("DivSetting_2");
		if (styleButtonFraction.getAttribute('checked') === 'true' &&
		styleButtonNonFraction.getAttribute('checked') !== 'true')
		{
			this.parameters.DivStyle = styleButtonFraction.getAttribute('value');
		}
		else if (styleButtonNonFraction.getAttribute('checked') === 'true' &&
			styleButtonFraction.getAttribute('checked') !== 'true' )
		{
			this.parameters.DivStyle = styleButtonNonFraction.getAttribute('value');
		}
		else
		{
			this.parameters.DivStyle = 'Non-fraction-style';
		}
		this.unregisterEvents();
	}

	registerEvents()
	{
		if (this.areEventsRegistered === 0)
		{
			this.areEventsRegistered = 1;
			this.radioButtons = document.querySelectorAll('.form-check-input[type="radio"]')
			let but = this.radioButtons;
			this.radioButtons.forEach(element => {
				element.addEventListener('click', function(event){
					but.forEach(butt =>{
						if (butt.getAttribute('checked') === 'true')
						{
							butt.removeAttribute('checked');
						}
					});
					event.target.setAttribute('checked', "true")
				});
			});
		}
	}
	unregisterEvents()
	{
		if (this.areEventsRegistered === 1)
		{
			this.areEventsRegistered = 0;
			this.radioButtons = document.querySelectorAll('.form-check-input[type="radio"]')
			this.radioButtons.forEach(element => {
				element.removeEventListener('click', function(event){});
			});
		}
	}
}