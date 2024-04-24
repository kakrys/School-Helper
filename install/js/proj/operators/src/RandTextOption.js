import {Option} from "./Option";

export class RandTextOption extends Option{
	constructor(options = {})
	{
		super(options);
		this.text = '';
		this.inputCounter = 1;
		this.innerContainer = {0: `
				<div class="row row-cols-12">
					<div class="col-10" style="padding:1%;">
						<input class="form-control" id="textArea_${this.id}_1_0" placeholder="Текст для случайного выбора">
					</div>
					<div class="col-2" style="padding:1%;">
						<input class="form-control" id="textArea_${this.id}_2_0" placeholder="Вес" disabled>
					</div>
				</div>`};
	}
	showOption()
	{
		let html = `<p class="d-flex">Редактируемый элемент №${this.id} Тип:[${this.optionName}]</p>`;
		html += `
			<div class="d-flex">
				<a>Разблокировать настройку веса фраз</a>
				<a class="btn btn-primary">Разблокировать</a>
			</div>
			<label>Впишите части, которые будут выбираться случайно</label>
			<div id="inputTextContainer" style="width:100%;">`;
		for (let part in this.innerContainer)
		{
			html += this.innerContainer[part];
		}
			html += `</div>`;
		return html;
	}
	save()
	{
		let inputs = document.querySelectorAll(`[id^="textArea_${this.id}_1_"]`);
		console.log(inputs);
		inputs.forEach(element =>{
			if(element.value === '')
			{
				element.parentElement.parentElement.remove();
				let index = element.id.split('_').length - 1
				this.innerContainer[`${index}`] = '';
			}
		});
		return;
		this.textElement = document.getElementById(`textArea_${this.id}`);
		let self = this;
		this.textElement.addEventListener('input', function() {
			if (self.textElement.value !== null)
			{
				self.text = self.textElement.value;
			}
		});
		this.textElement.removeEventListener('input', function(){});
	}
	registerEvents()
	{
		if (this.areEventsRegistered === 0)
		{
			this.areEventsRegistered = 1;
			let self = this;
			let eventFunction = function (event) {
				if (event.key === 'Enter')
				{
					self.inputCounter++;
					let newMainDiv = document.createElement("div");
					newMainDiv.classList.add("row");
					newMainDiv.classList.add("row-cols-12");
					let newInputDiv = document.createElement("div");
					newInputDiv.classList.add("col-10");
					newInputDiv.style.padding = '1%';
					let newInput = document.createElement("input");
					newInput.classList.add("form-control");
					newInput.id = `textArea_${self.id}_1_` + self.inputCounter;
					newInput.placeholder = "Текст для случайного выбора";
					newInput.addEventListener('keydown',eventFunction)
					newInputDiv.appendChild(newInput);
					let newWeightDiv = document.createElement("div");
					newWeightDiv.classList.add("col-2");
					newWeightDiv.style.padding = '1%';
					let newWeightInput = document.createElement("input");
					newWeightInput.classList.add("form-control");
					newWeightInput.id = `textArea_${self.id}_2_` + self.inputCounter;
					newWeightInput.placeholder = "Вес";
					newWeightInput.disabled = true;
					newWeightDiv.appendChild(newWeightInput);
					newMainDiv.appendChild(newInputDiv);
					newMainDiv.appendChild(newWeightDiv);
					let mainInputContainer = document.getElementById("inputTextContainer");
					mainInputContainer.appendChild(newMainDiv);
					self.innerContainer[self.inputCounter] = mainInputContainer.innerHTML;
					newInput.focus();
				}
			}
			let element = document.getElementById(`textArea_${this.id}_1_0`);
			element.addEventListener('keydown', eventFunction);
		}
	}
}