import {Option} from "./Option";
import {Validator} from "./Validator";

export class RandTextOption extends Option{
	constructor(options = {})
	{
		super(options);
		this.text = '';
		this.inputCounter = 0;
		this.parameters.areWeightUnlocked = false;
		this.parameters.phrases = [];
		this.innerContainer = [];
		this.errorRender = [];
		this.errors = [];
	}
	postUpdate()
	{
		let inputs = document.querySelectorAll(`[id^="form_${this.id}_"]`);
		inputs.forEach(element => {
			element.querySelector(`[id^="textArea_${this.id}_1_"]`).value = this.innerContainer[element.id][0];
			element.querySelector(`[id^="textArea_${this.id}_2_"]`).value = this.innerContainer[element.id][1];
		});
	}

	showOption()
	{
		let html = `<p class="d-flex">Редактируемый элемент №${this.id} Тип:[${this.optionName}]</p>`;
		html += `
			<div class="d-flex flex-column">
				<a>Сменить настройку веса фраз</a>
				<a id="unblockButton" class="btn btn-primary">Разблокировать</a>
			</div>
			<label>Впишите части, которые будут выбираться случайно</label>
			<div id="inputTextContainer" style="width:95%;">`;
		if (Object.keys(this.innerContainer) !== 0)
		{
			let addition = 'disabled=""';
			if (this.parameters.areWeightUnlocked)
			{
				addition = '';
			}
			this.errors = [];
			let renderCount = 0
			for (let part in this.innerContainer)
			{
				html += `
					<div class="row row-cols-12" id="${part}">
						<div class="col-10" style="padding: 1%;">
							<input class="form-control" id="textArea_${this.id}_1_${renderCount}"placeholder="Текст для случайного выбора (макс 200 символов)">
						</div>
						<div class="col-2" style="padding: 1%;">
							<input class="form-control" id="textArea_${this.id}_2_${renderCount}" placeholder="Вес" ${addition}>
						</div>
						<span style="color:orangered">${this.errorRender[renderCount*2]}</span>
						<span style="color:orangered">${this.errorRender[renderCount*2+1]}</span>
					</div>`;
				this.errors.push(false);
				this.errors.push(false);
				renderCount++;
			}
		}
		html += `</div>`;
		html+= `
				<div class="d-flex flex-column">
					<a>Добавить новую фразу (предел = 10)</a>
					<a id="addButton" class="btn btn-primary">Добавить</a>
					<span id="additiveError" style="color:orangered"></span>
				</div>`;
		return html;
	}
	save()
	{
		let inputs = document.querySelectorAll(`[id^="form_${this.id}_"]`);
		let index = 0;
		inputs.forEach(element =>{
			let input = element.querySelector(`[id^="textArea_${this.id}_1_"]`);
			let weight = element.querySelector(`[id^="textArea_${this.id}_2_"]`);
			if(input.value === '')
			{
				element.remove();
				let elementId = element.id.split('_')[element.id.split('_').length-1]
				delete(this.innerContainer[element.id]);
				this.errorRender.splice(index*2,2);
				this.errors.splice(index*2,2);
			}
			else
			{
				this.innerContainer[element.id] = [input.value, weight.value];
				this.errors[index*2] = Validator.maxStringLen(input.value, 200);
				if (weight.value === '' || weight.disabled === true)
				{
					this.errors[index*2+1] = false;
				}
				else
				{
					this.errors[index*2+1] = Validator.isInteger(weight.value);
				}
			}
			index++;
		});
		this.parameters.phrases = this.innerContainer;
		this.errors = Array.from(this.errors);
		this.errorRender = Array.from(this.errorRender);
		this.unregisterEvents();
		return this.errorHandler();
	}
	registerEvents()
	{
		if (this.areEventsRegistered === 0)
		{
			this.areEventsRegistered = 1;
			let self = this;
			let addFunction = function (event)
			{
				if (Object.keys(self.innerContainer).length < 10)
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
					newInput.id = `textArea_${self.id}_1_` + self.inputCounter;
					newInput.placeholder = "Текст для случайного выбора (макс 200 символов)";
					newInputDiv.appendChild(newInput);
					let newWeightDiv = document.createElement("div");
					newWeightDiv.classList.add("col-2");
					newWeightDiv.style.padding = '1%';
					let newWeightInput = document.createElement("input");
					newWeightInput.classList.add("form-control");
					newWeightInput.id = `textArea_${self.id}_2_` + self.inputCounter;
					newWeightInput.placeholder = "Вес";
					if (!self.parameters.areWeightUnlocked)
					{
						newWeightInput.disabled = true;
					}
					newWeightDiv.appendChild(newWeightInput);
					newMainDiv.appendChild(newInputDiv);
					newMainDiv.appendChild(newWeightDiv);
					let mainInputContainer = document.getElementById("inputTextContainer");
					mainInputContainer.appendChild(newMainDiv);
					self.innerContainer[`form_${self.id}_` + self.inputCounter] = ['', ''];
					self.errors.push(false);
					self.errors.push(false);
					self.errorRender.push('');
					self.errorRender.push('');
					newInput.focus();
				}
				else
				{
					document.getElementById('additiveError').innerHTML = 'Достигнуто максимальное количество фраз!';
				}
			}
			let unblockFunction = function (event)
			{
				let weights = document.querySelectorAll(`[id^="textArea_${self.id}_2_"]`);
				if (!self.parameters.areWeightUnlocked)
				{
					self.parameters.areWeightUnlocked = true;
					event.target.innerText = 'Заблокировать';
					weights.forEach(element =>{
						element.disabled=false;
					});
				}
				else
				{
					self.parameters.areWeightUnlocked = false;
					event.target.innerText = 'Разблокировать';
					weights.forEach(element =>{
						element.disabled = true;
					});
				}
			}
			let addButton = document.getElementById(`addButton`);
			addButton.addEventListener('click', addFunction);
			let unblockButton = document.getElementById(`unblockButton`);
			unblockButton.addEventListener('click', unblockFunction);
		}
	}
	unregisterEvents()
	{
		if (this.areEventsRegistered === 1)
		{
			this.areEventsRegistered = 0;
			let addButton = document.getElementById(`addButton`);
			addButton.removeEventListener('click', function (){});
			let unblockButton = document.getElementById(`unblockButton`);
			unblockButton.removeEventListener('click', function (){});
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
		if (check>0)
		{
			return false;
		}
		return true;
	}
}