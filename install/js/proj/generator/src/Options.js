import {Type} from 'main.core';
export class Optionator {
	constructor(options = {})
	{
		if (Type.isStringFilled(options.rootNodeId))
		{
			this.rootNodeId = options.rootNodeId;
		}
		else
		{
			throw new Error('Generator: options.rootNodeId required');
		}

		this.rootNodeId = document.getElementById(this.rootNodeId);
		if (!this.rootNodeId)
		{
			throw new Error(`Generator: element with id "${this.rootNodeId}" not found`);
		}

		this.instructionsContainer = document.getElementById('instructionsContainer');
		this.parametersContainer = document.getElementById('parametersContainer');
		this.addedInstructions = 0;
	}
	showOptions(element)
	{
		let html = `<p class="d-flex">Редактируемый элемент №${element.getAttribute('data-instruction')} Тип:[${element.innerText}]</p>`;
		if (element.innerText === 'image')
		{
			html += '<div class="mb-3"><label for="formFile" class="form-label">Выберите картинку</label> <input class="form-control" type="file" id="formFile"> </div>';
		}
		if (element.innerText === 'rand.Number')
		{
			html += `<div class="form-check">
				<input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
				<label class="form-check-label" for="flexRadioDefault1">
					Default radio
				</label>
			</div>
			<div class="form-check">
			<input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
			<label class="form-check-label" for="flexRadioDefault2">
				Default checked radio
			</label>
			</div>`;
		}
		html += '<div></div>';
		this.parametersContainer.innerHTML = html;
	}
	closeOption()
	{
		this.parametersContainer.innerHTML = '<i>Щёлкните на любой добавленный элемент в поле инструкции генератора, чтобы изменить его свойства!</i>';
	}
}