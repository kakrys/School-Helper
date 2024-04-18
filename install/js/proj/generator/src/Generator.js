import {Type} from 'main.core';

export class Generator {
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
		this.optionClassName = options.optionClassName;
		this.instructionsContainer = document.getElementById('instructionsContainer');
		this.parametersContainer = document.getElementById('parametersContainer');
		this.addedInstructions = 0;
	}
	addObjectToInstructions(type, color)
	{
		if (this.instructionsContainer.innerHTML === '<i>Пока тут пусто. Выберите элементы из управления ниже, чтобы начать писать инструкцию!</i>')
		{
			this.addedInstructions = 1;
			this.instructionsContainer.innerHTML = '<span id="instruction'  + this.addedInstructions + '" data-instruction="' + this.addedInstructions + '" onclick="' + this.optionClassName + '.showOptions(this)" class="border btn" style="padding: 1%; margin:1%; background:' + color + ';">' + type + '</span>';
		}
		else
		{
			this.addedInstructions += 1;
			this.instructionsContainer.innerHTML += '<span id="instruction' + this.addedInstructions + '" data-instruction="' + this.addedInstructions + '" onclick="' + this.optionClassName + '.showOptions(this)" class="border btn" style="padding: 1%; margin:1%; background:' + color + ';">' + type + '</span>';
		}
	}
	clearInstructions()
	{
		this.instructionsContainer.innerHTML = '<i>Пока тут пусто. Выберите элементы из управления ниже, чтобы начать писать инструкцию!</i>';
		this.addedInstructions = 0;
		this.parametersContainer.innerHTML = '<i>Щёлкните на любой добавленный элемент в поле инструкции генератора, чтобы изменить его свойства!</i>';
	}
	deleteLastInstruction()
	{
		let addedInstruction = document.querySelectorAll('[id^="instruction"]');
		if (addedInstruction.length === 0)
		{
			return;
		}
		let presavedInstruction = 0;
		addedInstruction.forEach(element =>
		{
			if (element.getAttribute('data-instruction') > presavedInstruction)
			{
				presavedInstruction = element.getAttribute('data-instruction');
			}
		});
		let elements = document.querySelectorAll('[data-instruction="' + presavedInstruction + '"]');
		elements.forEach(function(element)
		{
			element.remove();
		});
		this.parametersContainer.innerHTML = '<i>Щёлкните на любой добавленный элемент в поле инструкции генератора, чтобы изменить его свойства!</i>';
		this.addedInstructions -= 1;
		if (this.addedInstructions === 0)
		{
			this.instructionsContainer.innerHTML = '<i>Пока тут пусто. Выберите элементы из управления ниже, чтобы начать писать инструкцию!</i>';
		}
	}
}