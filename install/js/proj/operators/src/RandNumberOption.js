import {Option} from "./Option";

export class RandNumberOption extends Option{
	constructor(options = {})
	{
		super(options);
		this.parameters = {};
		this.FloatDigits = '';
		this.MinNumber = '';
		this.MaxNumber = '';
		this.Exclude = '';
		this.viewParameters = [['collapsed', 'false', '', ''],['collapsed', 'false', '', ''],['collapsed', 'false', '', ''],['collapsed', 'false', '', '']];

		this.FractionType = ['','','','checked="true"'];
		this.FractionNumber = ['','','checked="true"'];
		this.FractionView = ['','','checked="true"'];
		this.RootType = ['','','checked="true"'];
		this.AbsoluteModule = ['','','checked="true"'];
	}
	save()
	{
		this.minNumberContainer = document.querySelector(`[id^="textArea_${this.id}_1"]`);
		this.maxNumberContainer = document.querySelector(`[id^="textArea_${this.id}_2"]`);
		this.excludeNumberContainer = document.querySelector(`[id^="textArea_${this.id}_3"]`);
		this.floatCountContainer = document.querySelector(`[id^="textArea_${this.id}_4"]`);
		this.parameters = {
			OptionId: this.id,
			MinNumber: this.minNumberContainer.value,
			MaxNumber: this.maxNumberContainer.value,
			Exclude: this.excludeNumberContainer.value.split(/[,\s]+/),
			FloatDigits: this.floatCountContainer.value,
		};

		this.checkButtonElements = document.querySelectorAll('.form-check-input[aria-expanded="true"]');
		this.checkButtonElements.forEach(element => {
			if(element.getAttribute('aria-controls') === "FractionCollapse")
			{
				let checkButtons = document.querySelector('[id="FractionCollapse"]').querySelectorAll('.form-check-input[checked="true"]');
				let properties = [];
				checkButtons.forEach(button =>{
					properties.push(button.getAttribute('value'))
				});
				if(properties !== [])
				{
					this.parameters.Fraction = properties;
				}
			}
			if(element.getAttribute('aria-controls') === "RootCollapse")
			{
				let checkButtons = document.querySelector('[id="RootCollapse"]').querySelectorAll('.form-check-input[checked="true"]');
				let properties = [];
				checkButtons.forEach(button =>{
					properties.push(button.getAttribute('value'))
				});
				if(properties !== [])
				{
					this.parameters.Root = properties;
				}
			}
			if(element.getAttribute('aria-controls') === "AbsCollapse")
			{
				let checkButtons = document.querySelector('[id="AbsCollapse"]').querySelectorAll('.form-check-input[checked="true"]');
				let properties = [];
				checkButtons.forEach(button =>{
					properties.push(button.getAttribute('value'))
				});
				if(properties !== [])
				{
					this.parameters.Absolute = properties;
				}
			}
			if(element.getAttribute('aria-controls') === "FloatCollapse")
			{
				if (this.floatCountContainer.value !== null)
				{
					this.parameters.FloatDigits = this.floatCountContainer.value;
				}
			}
		});
		this.unregisterEvents();
	}
	updateParameters()
	{
		this.viewParameters = [['collapsed', 'false', '', ''],['collapsed', 'false', '', ''],['collapsed', 'false', '', ''],['collapsed', 'false', '', '']];
		console.log(this.parameters);
		if ('MinNumber' in this.parameters) {
			this.MinNumber = this.parameters.MinNumber;
		}
		if ('MaxNumber' in this.parameters) {
			this.MaxNumber = this.parameters.MaxNumber;
		}
		if ('FloatDigits' in this.parameters && this.parameters.FloatDigits !== '') {
			this.viewParameters[1] = ['', 'true', 'checked="true"', 'show'];
			this.FloatDigits = this.parameters.FloatDigits;
		}
		if ('Exclude' in this.parameters) {
			this.Exclude = this.parameters.Exclude.join(',');
		}
		if ('Fraction' in this.parameters)
		{
			this.viewParameters[0] = ['', 'true', 'checked="true"', 'show'];
			this.FractionType = ['','','',''];
			this.FractionNumber = ['','',''];
			this.FractionView = ['','',''];
			this.parameters.Fraction.forEach(param => {
				console.log(param);
				switch(param){
					case 'Correct': this.FractionType[0] = 'checked="true"'; break;
					case 'Incorrect': this.FractionType[1] = 'checked="true"'; break;
					case 'Complex': this.FractionType[2] = 'checked="true"'; break;
					case 'AllTypes': this.FractionType[3] = 'checked="true"'; break;
					case 'Rational': this.FractionNumber[0] = 'checked="true"'; break;
					case 'Irrational': this.FractionNumber[1] = 'checked="true"'; break;
					case 'AnyNumber': this.FractionNumber[2] = 'checked="true"'; break;
					case 'Not-shortened': this.FractionView[0] = 'checked="true"'; break;
					case 'Shortened': this.FractionView[1] = 'checked="true"'; break;
					case 'AnyShortedType': this.FractionView[2] = 'checked="true"'; break;
				}
			});
		}
		if ('Root' in this.parameters) {
			this.viewParameters[2] = ['', 'true', 'checked="true"', 'show'];
			this.RootType = ['','',''];
			this.parameters.Root.forEach(param => {
				switch(param){
					case 'Irrational': this.RootType[0] = 'checked="true"'; break;
					case 'Rational': this.RootType[1] = 'checked="true"'; break;
					case 'AnyType': this.RootType[2] = 'checked="true"'; break;
				}
			});
		}
		if ('Absolute' in this.parameters) {
			this.viewParameters[3] = ['', 'true', 'checked="true"', 'show'];
			this.AbsoluteModule = ['','',''];
			this.parameters.Absolute.forEach(param => {
				switch(param){
					case 'UseModule': this.AbsoluteModule[0] = 'checked="true"'; break;
					case 'DontUseModule': this.AbsoluteModule[1] = 'checked="true"'; break;
					case 'BothUsingModule': this.AbsoluteModule[2] = 'checked="true"'; break;
				}
			});
		}
	}
	showOption()
	{
		this.updateParameters();
		let html = `<p class="d-flex">Редактируемый элемент №${this.id} Тип:[${this.optionName}]</p>`;
		html += `
		<p>Базовая настройка</p>
		<div class="d-flex flex-column col-12">
			<label>Указать диапазон генерации</label>
			<div class="d-flex">
				<input class="form-control" id="textArea_${this.id}_1" placeholder="Мин.Значение">
				<input class="form-control" id="textArea_${this.id}_2" placeholder="Макс.Значение">
			</div>
		</div>
		<div class="d-flex flex-column col-12">
			<label>Исключение чисел</label>
			<div class="d-flex">
				<input class="form-control" id="textArea_${this.id}_3" placeholder="Перечислите через запятую">
			</div>
		</div>
		<a><i>По умолчанию генерируются положительные целые числа и дроби без исключённых значений и без корней</i></a>
		<p>Гибкая настройка</p>
		<a>Допустимые элементы к генерации</a>
		<div class="form-check">
			<input class="form-check-input ${this.viewParameters[0][0]}" type="checkbox" value="" id="flexCheckDefault" data-bs-toggle="collapse" href="#FractionCollapse" role="button" aria-expanded="${this.viewParameters[0][1]}" aria-controls="FractionCollapse" ${this.viewParameters[0][2]}>
			<label class="form-check-label" for="flexCheckDefault">
				Дроби 
			</label>
		</div>
		<div class="collapse ${this.viewParameters[0][3]}" id="FractionCollapse" style="width:100%;">
			<div class="d-flex border" style="width:100%;">
				<div class="d-flex flex-column" style="margin-left:2%; width:33%;">
					<a>Вид дроби</a>
					<div class="form-check">
						<input class="form-check-input" type="radio" name="RadioFractionType" id="RadioFractionType1" value="Correct" ${this.FractionType[0]}>
						<label class="form-check-label" for="RadioFractionType1">
							Только правильные дроби
						</label>
					</div>
					<div class="form-check">
						<input class="form-check-input" type="radio" name="RadioFractionType" id="RadioFractionType2" value="Incorrect" ${this.FractionType[1]}>
						<label class="form-check-label" for="RadioFractionType2">
							Только неправильные дроби
						</label>
					</div>
					<div class="form-check">
						<input class="form-check-input" type="radio" name="RadioFractionType" id="RadioFractionType3" value="Complex" ${this.FractionType[2]}>
						<label class="form-check-label" for="RadioFractionType3">
							Только смешанные дроби
						</label>
					</div>
					<div class="form-check">
						<input class="form-check-input" type="radio" name="RadioFractionType" id="RadioFractionType4" value="AllTypes" ${this.FractionType[3]}>
						<label class="form-check-label" for="RadioFractionType4">
							Любые дроби
						</label>
					</div>
				</div>
				<div class="d-flex flex-column" style="margin-left:2%; width:33%;">
					<a>Числовые характеристики</a>
					<div class="form-check">
						<input class="form-check-input" type="radio" name="RadioFractionNumber" id="RadioFractionNumber1" value="Rational" ${this.FractionNumber[0]}>
						<label class="form-check-label" for="RadioFractionNumber1">
							Только рациональные дроби
						</label>
					</div>
					<div class="form-check">
						<input class="form-check-input" type="radio" name="RadioFractionNumber" id="RadioFractionNumber2" value="Irrational" ${this.FractionNumber[1]}>
						<label class="form-check-label" for="RadioFractionNumber2">
							Только иррациональные дроби
						</label>
					</div>
					<div class="form-check">
						<input class="form-check-input" type="radio" name="RadioFractionNumber" id="RadioFractionNumber3" value="AnyNumber" ${this.FractionNumber[2]}>
						<label class="form-check-label" for="RadioFractionNumber3">
							Любые дроби
						</label>
					</div>
				</div>
				<div class="d-flex flex-column" style="margin-left:2%; width:33%;">
					<a>Представление дроби</a>
					<div class="form-check">
						<input class="form-check-input" type="radio" name="RadioFractionView" id="RadioFractionView1" value="Not-shortened" ${this.FractionView[0]}>
						<label class="form-check-label" for="RadioFractionView1">
							Требует сокращения
						</label>
					</div>
					<div class="form-check">
						<input class="form-check-input" type="radio" name="RadioFractionView" id="RadioFractionView2" value="Shortened" ${this.FractionView[1]}>
						<label class="form-check-label" for="RadioFractionView2">
							Не требует сокращения
						</label>
					</div>
					<div class="form-check">
						<input class="form-check-input" type="radio" name="RadioFractionView" id="RadioFractionView3" value="AnyShortedType" ${this.FractionView[2]}>
						<label class="form-check-label" for="RadioFractionView3">
							Любые дроби
						</label>
					</div>
				</div>
			</div>
		</div>
		<div class="form-check">
			<input class="form-check-input ${this.viewParameters[1][0]}" type="checkbox" value="" id="flexCheckDefault" data-bs-toggle="collapse" href="#FloatCollapse" role="button" aria-expanded="${this.viewParameters[1][1]}" aria-controls="FloatCollapse" ${this.viewParameters[1][2]}>
			<label class="form-check-label" for="flexCheckDefault">
				Десятичные дроби (числа с запятой)
			</label>
		</div>
		<div class="collapse ${this.viewParameters[1][3]}" id="FloatCollapse" style="width:100%;">
			<div class="d-flex border" style="width:100%;">
				<div class="d-flex flex-column" style="margin-left:2%; width:100%;">
					<a>Укажите количество знаков за запятой</a>
					<div class="d-flex flex-column col-12">
						<div class="d-flex">
							<input class="form-control" id="textArea_${this.id}_4" placeholder="Формат: 0<'целое число'<10">
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="form-check">
			<input class="form-check-input ${this.viewParameters[2][0]}" type="checkbox" value="" id="flexCheckDefault" data-bs-toggle="collapse" href="#RootCollapse" role="button" aria-expanded="${this.viewParameters[2][1]}" aria-controls="RootCollapse" ${this.viewParameters[2][2]}>
			<label class="form-check-label" for="flexCheckDefault">
				Корни
			</label>
		</div>
		<div class="collapse ${this.viewParameters[2][3]}" id="RootCollapse" style="width:100%;">
			<div class="d-flex border" style="width:100%;">
				<div class="d-flex flex-column" style="margin-left:2%; width:100%;">
					<a>Вид корней</a>
					<div class="form-check">
						<input class="form-check-input" type="radio" name="RadioRootType" id="RadioRootType1" value="Irrational" ${this.RootType[0]}>
						<label class="form-check-label" for="RadioRootType1">
							Только иррациональные корни
						</label>
					</div>
					<div class="form-check">
						<input class="form-check-input" type="radio" name="RadioRootType" id="RadioRootType2" value="Rational" ${this.RootType[1]}>
						<label class="form-check-label" for="RadioRootType2">
							Только рациональные корни
						</label>
					</div>
					<div class="form-check">
						<input class="form-check-input" type="radio" name="RadioRootType" id="RadioRootType3" value="AnyType" ${this.RootType[2]}>
						<label class="form-check-label" for="RadioRootType3">
							Любые корни
						</label>
					</div>
				</div>
			</div>
		</div>
		<div class="form-check">
			<input class="form-check-input ${this.viewParameters[3][0]}" type="checkbox" value="" id="flexCheckDefault"  data-bs-toggle="collapse" href="#AbsCollapse" role="button" aria-expanded="${this.viewParameters[3][1]}" aria-controls="AbsCollapse" ${this.viewParameters[3][2]}>
			<label class="form-check-label" for="flexCheckDefault">
				Отрицательные числа (игнорируется, если указан отрицательный диапазон)
			</label>
		</div>
		<div class="collapse ${this.viewParameters[3][3]}" id="AbsCollapse" style="width:100%;">
			<div class="d-flex border" style="width:100%;">
				<div class="d-flex flex-column" style="margin-left:2%; width:100%;">
					<a>Представление отрицательных чисел</a>
					<div class="form-check">
						<input class="form-check-input" type="radio" name="AbsVar" id="AbsVar1" value="UseModule" ${this.AbsoluteModule[0]}>
						<label class="form-check-label" for="AbsVar1">
							Использовать модуль
						</label>
					</div>
					<div class="form-check">
						<input class="form-check-input" type="radio" name="AbsVar" id="AbsVar2" value="DontUseModule" ${this.AbsoluteModule[1]}>
						<label class="form-check-label" for="AbsVar2">
							Не использовать модуль
						</label>
					</div>
					<div class="form-check">
						<input class="form-check-input" type="radio" name="AbsVar" id="AbsVar3" value="BothUsingModule" ${this.AbsoluteModule[2]}>
						<label class="form-check-label" for="AbsVar3">
							Использовать все случаи
						</label>
					</div>
				</div>
			</div>
		</div>
		`;
		return html;
	}
	postUpdate()
	{
		document.querySelector(`[id^="textArea_${this.id}_1"]`).value = this.MinNumber;
		document.querySelector(`[id^="textArea_${this.id}_2"]`).value = this.MaxNumber;
		document.querySelector(`[id^="textArea_${this.id}_3"]`).value = this.Exclude;
		document.querySelector(`[id^="textArea_${this.id}_4"]`).value = this.FloatDigits;
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
						if (butt.parentNode.parentNode === event.target.parentNode.parentNode)
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