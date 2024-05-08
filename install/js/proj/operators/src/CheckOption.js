import {Option} from "./Option";
import {Validator} from "./Validator";

export class CheckOption extends Option {
	constructor(options = {})
	{
		super(options);
		this.text = '';
		this.parameters.correctAnswers = 1;
		this.parameters.usedPhrases = 4;
		this.parameters.phrases = [];
		this.inputCounter = 0;
		this.innerContainer = [];
		this.errorRender = [];
		this.errors = [];
		this.additionErrors = {
			answerCount: false,
			correctAnswers: false,
			usedPhrasesCount: false,
			usedPhrases: false,
			answerAndPhrasesCount: false,
		};
		this.additionErrorRenders = ['','','','',''];
		this.correctCountError = '';
		this.buttons = null;
		this.viewParameters = [];
	}
	postUpdate()
	{
		let inputs = document.querySelectorAll(`[id^="form_${this.id}_"]`);
		inputs.forEach(element =>{
			element.querySelector(`[id^="textArea_${this.id}_"]`).value = this.innerContainer[element.id][0];
		});
		document.getElementById(`textArea_${this.id}-correct`).value = this.parameters.correctAnswers;
		document.getElementById(`textArea_${this.id}-all`).value = this.parameters.usedPhrases;
	}

	updateParameters()
	{
		this.viewParameters = [];
		let index = 0;
		for(let element in this.parameters.phrases)
		{

			if (this.parameters.phrases[element][1])
			{
				this.viewParameters[index] = 'checked="true"'
			}
			else
			{
				this.viewParameters[index] = '';
			}
			index++;
		}
	}

	showOption()
	{
		this.updateParameters();
		let html = `<p class="d-flex">Редактируемый элемент №${this.id} Тип:[${this.optionName}]</p>`;
		html += `
			<div>Настройка параметров верных ответов</div>
			<div class="d-flex col-12">
				<div class="d-flex flex-column col-6">
					Количество верных фраз в генерации
					<input class="form-control" id="textArea_${this.id}-correct" placeholder="1<X<верных вариантов">
					<span style="color:orangered">${this.additionErrorRenders[0]}</span>
					<span style="color:orangered">${this.additionErrorRenders[1]}</span>
				</div>
				<div class="d-flex flex-column col-6">
					Количество фраз за генерацию
					<input class="form-control" id="textArea_${this.id}-all" placeholder="1<X<всего вариантов">
					<span style="color:orangered">${this.additionErrorRenders[2]}</span>
					<span style="color:orangered">${this.additionErrorRenders[3]}</span>
				</div>
			</div>
			<span style="color:orangered">${this.additionErrorRenders[4]}</span>
			<label>Впишите утверждения и отметьте верные</label>
			<div id="inputTextContainer" style="width:95%;">`;
		if (Object.keys(this.innerContainer) !== 0)
		{
			this.errors = [];
			let renderCount = 0
			for (let part in this.innerContainer)
			{
				html += `
					<div class="row row-cols-12" id="${part}">
						<div class="col-10" style="padding: 1%;">
							<input class="form-control" id="textArea_${this.id}_${renderCount}"placeholder="Текст для случайного выбора (макс 200 символов)">
						</div>
						<div class="form-check col-2 align-self-center">
							<input class="form-check-input" type="checkbox" value="Correct" id="CorrectCheck_${renderCount}" ${this.viewParameters[renderCount]}>
							<label class="form-check-label" for="CorrectCheck_${renderCount}">
								Верное
							</label>
						</div>
						<span style="color:orangered">${this.errorRender[renderCount]}</span>
					</div>`;
				this.errors.push(false);
				renderCount++;
			}
		}
		html += `</div>`;
		html+= `
				<span style="color:orangered">${this.correctCountError}</span>
				<div class="d-flex flex-column">
					<a>Добавить новую фразу (предел = 20)</a>
					<a id="addButton" class="btn btn-primary">Добавить</a>
					<span id="additiveError" style="color:orangered"></span>
				</div>`;
		return html;
	}
	save()
	{
		this.parameters.correctAnswers = document.getElementById(`textArea_${this.id}-correct`).value;
		this.parameters.usedPhrases = document.getElementById(`textArea_${this.id}-all`).value;
		this.additionErrors = {
			answerCount: false,
			correctAnswers: false,
			usedPhrasesCount: false,
			usedPhrases: false,
			answerAndPhrasesCount: false,
		};
		if (this.parameters.correctAnswers > this.parameters.usedPhrases)
		{
			this.additionErrors.answerAndPhrasesCount = 'Ошибка соответствия: фраз ответов больше, чем генерируемых';
		}
		this.additionErrors.correctAnswers = Validator.isInteger(this.parameters.correctAnswers);
		this.additionErrors.usedPhrases = Validator.isInteger(this.parameters.usedPhrases);
		let inputs = document.querySelectorAll(`[id^="form_${this.id}_"]`);
		let index = 0;
		inputs.forEach(element =>{
			let input = element.querySelector(`[id^="textArea_${this.id}_"]`);
			let check = element.querySelector(`[id^="CorrectCheck_"]`);
			if(input.value === '')
			{
				delete(this.innerContainer[element.id]);
				this.errorRender.splice(index,1);
				this.errors.splice(index,1);
				this.viewParameters.splice(index,1);
				element.remove();
			}
			else
			{
				let checked = !(check.getAttribute("checked") === null);
				this.innerContainer[element.id] = [input.value, checked];
				this.errors[index] = Validator.maxStringLen(input.value, 200);
			}
			index++;
		});
		let count = 0;
		for (let element in this.innerContainer)
		{
			if (this.innerContainer[element][1] === true)
			{
				count++;
			}
		}
		this.correctCountError = '';
		if (count === 0 && Object.keys(this.innerContainer).length !== 0)
		{
			this.correctCountError = 'Нет верных ответов. Задание нерешаемое!'
		}
		let phrasesCount = Object.keys(this.innerContainer).length;
		if (count === phrasesCount)
		{
			this.additionErrors.answerCount = `Количество генерируемых фраз и количество генерируемых ответов совпадает`
		}
		if (this.parameters.correctAnswers < 1 || this.parameters.correctAnswers > count)
		{
			this.additionErrors.answerCount = `Указано неверное количество ответов`
		}
		this.viewParameters = Array.from(this.viewParameters);
		this.parameters.phrases = this.innerContainer;
		this.errors = Array.from(this.errors);
		this.errorRender = Array.from(this.errorRender);
		if (phrasesCount < this.parameters.usedPhrases || this.parameters.usedPhrases < 1)
		{
			this.additionErrors.usedPhrasesCount = 'Указано неверное количество используемых фраз'
		}
		this.unregisterEvents();
		return this.errorHandler();
	}
	registerEvents()
	{
		if (this.areEventsRegistered === 0)
		{
			this.areEventsRegistered = 1;
			let self = this;
			let checkFunction = function (event)
			{
				if (event.target.getAttribute('checked') === 'true')
				{
					event.target.removeAttribute('checked');
				}
				else
				{
					event.target.setAttribute('checked', 'true');
				}
			};
			let addFunction = function (event)
			{
				if (Object.keys(self.innerContainer).length < 20)
				{
					self.inputCounter++;
					let newMainDiv = document.createElement("div");
					newMainDiv.classList.add("row");
					newMainDiv.classList.add("row-cols-12");
					newMainDiv.id = `form_${self.id}_${self.inputCounter}`;
					let newInputDiv = document.createElement("div");
					newInputDiv.classList.add("col-10");
					newInputDiv.style.padding = '1%';
					let newInput = document.createElement("input");
					newInput.classList.add("form-control");
					newInput.id = `textArea_${self.id}_` + self.inputCounter;
					newInput.placeholder = "Текст для случайного выбора (макс 200 символов)";
					newInputDiv.appendChild(newInput);
					let newFormDiv = document.createElement("div");
					newFormDiv.classList.add('form-check', "col-2", "align-self-center");
					let newFormInput = document.createElement("input");
					newFormInput.classList.add("form-check-input");
					newFormInput.type = "checkbox";
					newFormInput.value = "Correct";
					newFormInput.id = `CorrectCheck_${self.inputCounter}`;
					newFormInput.addEventListener('click', checkFunction);
					newFormDiv.appendChild(newFormInput);
					let newFormInputLabel = document.createElement("label");
					newFormInputLabel.classList.add("form-check-label");
					newFormInputLabel.htmlFor = `CorrectCheck_${self.inputCounter}`;
					newFormInputLabel.innerText = 'Верное';
					newFormDiv.appendChild(newFormInputLabel);
					newMainDiv.appendChild(newInputDiv);
					newMainDiv.appendChild(newFormDiv);
					let mainInputContainer = document.getElementById("inputTextContainer");
					mainInputContainer.appendChild(newMainDiv);
					self.innerContainer[`form_${self.id}_` + self.inputCounter] = ['', ''];
					self.viewParameters.push('');
					self.errors.push(false);
					self.errorRender.push('');
					newInput.focus();
				}
				else
				{
					document.getElementById('additiveError').innerHTML = 'Достигнуто максимальное количество фраз!';
				}

			}
			let addButton = document.getElementById(`addButton`);
			addButton.addEventListener('click', addFunction);
			let buttons = document.querySelectorAll(`[id^="CorrectCheck_"]`);
			buttons.forEach(button =>{
				button.addEventListener('click', checkFunction);
			});
		}
	}
	unregisterEvents()
	{
		if (this.areEventsRegistered === 1)
		{
			this.areEventsRegistered = 0;
			let addButton = document.getElementById(`addButton`);
			addButton.removeEventListener('click', function (){});
			let buttons = document.querySelectorAll(`[id^="CorrectCheck_"]`);
			buttons.forEach(button =>{
				button.removeEventListener('click', function (){});
			});
		}
	}
	errorHandler(): boolean {
		this.errorRender = [];
		if (this.errors.length === 0) return true;
		let check = 0;
		for (let i = 0; i<this.errors.length; i++)
		{
			if (this.errors[i] === false)
			{
				this.errorRender[i] = '';
			}
			else
			{
				this.errorRender[i] = this.errors[i];
				check += 1;
			}
		}
		if (this.correctCountError !== '')
		{
			check++;
		}
		let position = 0;
		this.additionErrorRenders = [];
		for (let key in this.additionErrors)
		{
			if (this.additionErrors[key] === false)
			{
				this.additionErrorRenders[position] = '';
			}
			else
			{
				this.additionErrorRenders[position] = this.additionErrors[key];
				check += 1;
			}
			position++;
		}
		if (check>0)
		{
			return false;
		}
		return true;
	}
}