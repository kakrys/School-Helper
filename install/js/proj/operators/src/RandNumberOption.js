import {Option} from "./Option";

export class RandNumberOption extends Option{
	constructor(options = {})
	{
		super(options);
		this.FloatDigits = 2;
		this.MinNumber = 1;
		this.MaxNumber = 100;
		this.Exclude = [];
		this.parameters = {
			MinNumber : 1,
			MaxNumber : 100,
			Exclude : [],
			FloatDigits: ['false', 0],
			Fraction: ['AllTypes', 'AnyNumber', 'AnyShortedType'],
			Absolute: ['none'],
			Root: ['none'],
			integer: 'true',
			Combination: 'false',
		};
		this.viewParameters = [['collapsed', 'false', '', ''],['collapsed', 'false', '', ''],['collapsed', 'false', '', ''],['collapsed', 'false', '', ''], 'checked="true"', ''];

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
		let minNumber = this.minNumberContainer.value;
		let maxNumber = this.maxNumberContainer.value;
		if (Number(minNumber) > Number(maxNumber))
		{
			[minNumber, maxNumber] = [maxNumber, minNumber]
		}
		this.parameters = {
			id: this.id,
			Type: this.type,
			MinNumber: minNumber,
			MaxNumber: maxNumber,
			Exclude: this.excludeNumberContainer.value.split(/[,\s]+/),
			FloatDigits: ['false', 0],
			Fraction : ['none'],
			Root : ['none'],
			Absolute : ['none'],
			integer : 'false',
			Combination : 'false',
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
				if(properties.length !== 0)
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
				if(properties.length !== 0)
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
				if(properties.length !== 0 && this.parameters.MinNumber > 0)
				{
					this.parameters.Absolute = properties;
				}
			}

			if(element.getAttribute('aria-controls') === "FloatCollapse")
			{
				if (this.floatCountContainer.value !== null)
				{
					this.parameters.FloatDigits = ['true', this.floatCountContainer.value];
				}
			}
		});
		if (this.parameters.MinNumber.toString().includes('.') || this.parameters.MaxNumber.toString().includes('.'))
		{
			let minNumber = 0;
			let maxNumber = 0;
			if (this.parameters.MinNumber.toString().includes('.'))
			{
				minNumber = this.parameters.MinNumber.toString().split('.')[1].length;
			}
			if (this.parameters.MaxNumber.toString().includes('.'))
			{
				maxNumber = this.parameters.MaxNumber.toString().split('.')[1].length;
			}
			this.parameters.FloatDigits = ['true', Math.max(minNumber, maxNumber)];
		}
		let integerButton = document.getElementById("IntegerCheckDefault");
		if (integerButton.getAttribute('checked') === 'true')
		{
			this.parameters.integer = 'true';
		}
		let typesCount = 0;
		if (this.parameters.Fraction[0] !== 'none') {typesCount++;}
		if (this.parameters.Root[0] !== 'none') {typesCount++;}
		if (this.parameters.Absolute[0] !== 'none') {typesCount++;}
		if (this.parameters.FloatDigits[0] !== 'false') {typesCount++;}
		if (this.parameters.integer !== 'false') {typesCount++;}
		if (typesCount === 0)
		{
			this.parameters.integer = 'true';
		}
		let combinationButton = document.getElementById("CombinationCheckDefault");
		if (combinationButton.getAttribute('checked') === 'true')
		{
			this.parameters.Combination = 'true';
		}
		if (typesCount < 2)
		{
			this.parameters.Combination = 'false';
		}
		this.unregisterEvents();
	}
	updateParameters()
	{
		this.viewParameters = [['collapsed', 'false', '', ''],['collapsed', 'false', '', ''],['collapsed', 'false', '', ''],['collapsed', 'false', '', ''], '',''];
		if ('MinNumber' in this.parameters) {
			this.MinNumber = this.parameters.MinNumber;
		}
		if ('MaxNumber' in this.parameters) {
			this.MaxNumber = this.parameters.MaxNumber;
		}
		if ('FloatDigits' in this.parameters && this.parameters.FloatDigits[0] === 'true') {
			this.viewParameters[1] = ['', 'true', 'checked="true"', 'show'];
			this.FloatDigits = this.parameters.FloatDigits[1];
		}
		if ('Exclude' in this.parameters) {
			this.Exclude = this.parameters.Exclude.join(',');
		}
		if ('Fraction' in this.parameters && this.parameters.Fraction[0] !== 'none')
		{
			this.viewParameters[0] = ['', 'true', 'checked="true"', 'show'];
			this.FractionType = ['','','',''];
			this.FractionNumber = ['','',''];
			this.FractionView = ['','',''];
			this.parameters.Fraction.forEach(param => {
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
		if ('Root' in this.parameters && this.parameters.Root[0] !== 'none') {
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
		if ('Absolute' in this.parameters && this.parameters.Absolute[0] !== 'none') {
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
		if ('integer' in this.parameters && this.parameters.integer === 'true') {
			this.viewParameters[4] = 'checked="true"';
		}
		if ('Combination' in this.parameters && this.parameters.Combination === 'true') {
			this.viewParameters[5] = 'checked="true"';
		}
	}
	showOption()
	{
		this.updateParameters();
		let html = `<p class="d-flex">Редактируемый элемент №${this.id} Тип:[${this.optionName}]</p>`;
		html += `
		<p>Базовая настройка</p>
		<div class="d-flex flex-column col-12">
			<label>Указать диапазон генерации. <i>По умолчанию от 1 до 100.</i></label>
			<span>Укажите одинаковые значения, чтобы получить конкретное число</span>
			<div class="d-flex">
				<input class="form-control" id="textArea_${this.id}_1" placeholder="Мин.Значение (не меньше -2147483647)">
				<input class="form-control" id="textArea_${this.id}_2" placeholder="Макс.Значение (не больше 2147483647)">
			</div>
		</div>
		<div class="d-flex flex-column col-12">
			<label>Исключение чисел. <i>По умолчанию исключений нет</i></label>
			<div class="d-flex">
				<input class="form-control" id="textArea_${this.id}_3" placeholder="Перечислите через запятую">
			</div>
			<i>Исключение работает для целых чисел, отрицательных чисел и десятичных дробей</i>
		</div>
		<a><i>По умолчанию генерируются положительные целые числа и дроби без исключённых значений и без корней</i></a>
		<p>Гибкая настройка</p>
		<a>Допустимые элементы к генерации</a>
		<i>При отсутствии выбранных пунктов. По умолчанию выбираются целые числа!</i>
		<div class="form-check">
			<input class="form-check-input" type="checkbox" value="Integer" id="IntegerCheckDefault" ${this.viewParameters[4]}>
			<label class="form-check-label" for="IntegerCheckDefault">
				Целые числа
			</label>
		</div>
		<div class="form-check">
			<input class="form-check-input ${this.viewParameters[0][0]}" type="checkbox" value="" id="flexCheckDefault" data-bs-toggle="collapse" href="#FractionCollapse" role="button" aria-expanded="${this.viewParameters[0][1]}" aria-controls="FractionCollapse" ${this.viewParameters[0][2]}>
			<label class="form-check-label" for="flexCheckDefault">
				Дроби 
			</label>
		</div>
		<div class="border collapse ${this.viewParameters[0][3]}" id="FractionCollapse" style="width:100%;">
			<div class="d-flex" style="width:100%;">
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
				Десятичные дроби (числа с запятой). Применяется, если в диапазонах есть дроби.
			</label>
		</div>
		<div class="collapse ${this.viewParameters[1][3]}" id="FloatCollapse" style="width:100%;">
			<div class="d-flex border" style="width:100%;">
				<div class="d-flex flex-column" style="margin-left:2%; width:100%;">
					<a>Укажите количество знаков за запятой (Знаков за запятой будет меньше или равно выбранному количеству)</a>
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
		<div class="form-check">
			<input class="form-check-input" type="checkbox" value="Combination" id="CombinationCheckDefault" ${this.viewParameters[5]}>
			<label class="form-check-label" for="CombinationCheckDefault">
				Позволять комбинацию типов ("дробь под корнем", "десятичная дробь в модуле" и так далее)
			</label>
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
			let integerButton = document.getElementById("IntegerCheckDefault");
			integerButton.addEventListener('click', function (event){
				if (event.target.getAttribute('checked') === 'true')
				{
					event.target.setAttribute('checked', 'false');
				}
				else
				{
					event.target.setAttribute('checked', 'true');
				}
			});
			let combinationButton = document.getElementById("CombinationCheckDefault");
			combinationButton.addEventListener('click', function (event){
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
			this.radioButtons = document.querySelectorAll('.form-check-input[type="radio"]')
			this.radioButtons.forEach(element => {
				element.removeEventListener('click', function(event){});
			});
			let integerButton = document.getElementById("IntegerCheckDefault");
			integerButton.removeEventListener('click', function (event){});
			let combinationButton = document.getElementById("CombinationCheckDefault");
			combinationButton.removeEventListener('click', function (event){});
		}
	}
	getGeneratorData()
	{
		return this.parameters;
	}
}