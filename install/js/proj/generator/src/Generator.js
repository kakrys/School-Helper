import {Type, Loc} from 'main.core';
import {Controls} from "./Controls";
import {OptionList as OL} from 'proj.operators';
import {OperatorList as OpL} from 'proj.constructor';
const OptionList = BX.Proj.Independent.OptionList;
const OperatorList = BX.Proj.Independent.OperatorList;
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
		this.expressionViewType = 'full';
		this.controlsContainer = document.getElementById(options.controlsContainer);
		this.optionClassName = options.optionClassName;
		this.instructionsContainer = document.getElementById(options.instructionsNodeId);
		this.parametersContainer = document.getElementById(options.settingsNodeId);
		this.previewContainer = document.getElementById(options.previewContainer)
		this.AdditiveContainer = document.getElementById('AdditiveContainer');
		this.instructions = new OptionList();
		this.expressionInstruction = new OperatorList();
		this.expressionList = [];
		this.currentGeneratorWindow = this.instructions;
		this.generatorWindowType = 'task';
		this.controlsContainer.innerHTML = Controls.showTaskControls();
		this.saveAttemptExercise = 0;
		this.saveAttemptTask = 0;
		this.arePreviewGenerated = 0;
		this.saveAttempt = 0;
	}
	backToGenerator()
	{
		if (this.parametersContainer.innerHTML !== '<i>Щёлкните на любой добавленный элемент в поле инструкции генератора, чтобы изменить его свойства!</i>')
		{
			this.showOption(this.currentGeneratorWindow.openedInstruction);
			if (!this.currentGeneratorWindow.saveOpenedInstructionData())
			{
				this.parametersContainer.style.borderColor = "red";
				this.parametersContainer.style.borderWidth = "3px";
				this.showOption(this.currentGeneratorWindow.openedInstruction);
				this.previewContainer.innerHTML = `<div style="color:red;border:red 1px solid; font-size: 125%;">Нельзя сменить тип генератора, пока инструкция содержит ошибки</div>`;
				return;
			}
		}
		let data = this.expressionList[this.instructions.openedInstruction].saveAllData();
		data.arePreviewGenerated = this.expressionList[this.instructions.openedInstruction].arePreviewGenerated;
		if (Object.keys(data).length !==2 && !data.arePreviewGenerated)
		{
			this.previewContainer.innerHTML = `<div style="color:red;border:red 1px solid; font-size: 125%;">Нельзя сменить тип генератора, пока не генерировался рабочий предпросмотр</div>`;
			return;
		}
		this.previewContainer.innerHTML = 'Нажмите кнопку генерации предпросмотра, чтобы посмотреть, как будет выглядеть ваше задание!';
		document.getElementById('ExpressionType').innerHTML='задача';
		this.generatorWindowType = 'task';
		if (data.preview !=='')
		{
			this.instructions.exercisesPreviewList[this.instructions.openedInstruction] = data.preview;
		}
		this.currentGeneratorWindow.openedInstruction = -1;
		this.currentGeneratorWindow = this.instructions;
		this.currentGeneratorWindow.exercisesPreviewList[this.currentGeneratorWindow.openedInstruction] = data.preview;
		this.controlsContainer.innerHTML = Controls.showTaskControls();
		this.renderInstructions(this.instructions.openedInstruction);
	}
	openExerciseMenu(id)
	{
		if (this.parametersContainer.innerHTML !== '<i>Щёлкните на любой добавленный элемент в поле инструкции генератора, чтобы изменить его свойства!</i>')
		{
			this.showOption(this.currentGeneratorWindow.openedInstruction);
			if (!this.currentGeneratorWindow.saveOpenedInstructionData())
			{
				this.parametersContainer.style.borderColor = "red";
				this.parametersContainer.style.borderWidth = "3px";
				this.showOption(this.currentGeneratorWindow.openedInstruction);
				this.previewContainer.innerHTML = `<div style="color:red;border:red 1px solid; font-size: 125%;">Нельзя сменить тип генератора, пока инструкция содержит ошибки</div>`;
				return;
			}
		}
		this.previewContainer.innerHTML = 'Нажмите кнопку генерации предпросмотра, чтобы посмотреть, как будет выглядеть ваше задание!';
		if (this.expressionList[id] === undefined)
		{
			this.expressionList[id] = new OperatorList();
		}
		this.generatorWindowType = 'expression';
		this.currentGeneratorWindow = this.expressionList[id];
		let element = document.getElementById('ExpressionType');
		element.innerHTML = `[объект:Выражение_№${id}]`;
		this.controlsContainer.innerHTML = Controls.showCurrentExerciseControls(id);
		this.parametersContainer.innerHTML = '<i>Щёлкните на любой добавленный элемент в поле инструкции генератора, чтобы изменить его свойства!</i>';
		this.renderInstructions(this.currentGeneratorWindow.openedInstruction);
	}
	changeExpressionType()
	{
		if (this.parametersContainer.innerHTML !== '<i>Щёлкните на любой добавленный элемент в поле инструкции генератора, чтобы изменить его свойства!</i>')
		{
			this.showOption(this.currentGeneratorWindow.openedInstruction);
			if (!this.currentGeneratorWindow.saveOpenedInstructionData())
			{
				this.parametersContainer.style.borderColor = "red";
				this.parametersContainer.style.borderWidth = "3px";
				this.showOption(this.currentGeneratorWindow.openedInstruction);
				this.previewContainer.innerHTML = `<div style="color:red;border:red 1px solid; font-size: 125%;">Нельзя сменить тип генератора, пока инструкция содержит ошибки</div>`;
				return;
			}
		}
		this.previewContainer.innerHTML = 'Нажмите кнопку генерации предпросмотра, чтобы посмотреть, как будет выглядеть ваше задание!';
		let element = document.getElementById('ExpressionType');
		switch(element.innerHTML)
		{
			case 'задача':
				element.innerHTML = 'выражение';
				this.generatorWindowType = 'exercise';
				this.currentGeneratorWindow = this.expressionInstruction;
				this.controlsContainer.innerHTML = Controls.showExerciseControls();
				this.parametersContainer.innerHTML = '<i>Щёлкните на любой добавленный элемент в поле инструкции генератора, чтобы изменить его свойства!</i>';
				this.renderInstructions();
				break;
			case 'выражение':
				element.innerHTML = 'задача';
				this.generatorWindowType = 'task';
				this.currentGeneratorWindow = this.instructions;
				this.controlsContainer.innerHTML = Controls.showTaskControls();
				this.parametersContainer.innerHTML = '<i>Щёлкните на любой добавленный элемент в поле инструкции генератора, чтобы изменить его свойства!</i>';
				this.renderInstructions();
				break;
		}
	}
	dumpAllInstructions()
	{
		console.log('------Task-------');
		console.log(this.instructions)
		this.instructions.list.forEach(instruction => {
			console.log(instruction);
		});
		console.log('------Exercise-------');
		console.log(this.expressionInstruction)
		this.expressionInstruction.list.forEach(instruction => {
			console.log(instruction);
		});
		console.log('------ExerciseList-------');
		console.log(this.expressionList)
		this.expressionList.forEach(expression =>{
			console.log('--ex1--')
			expression.list.forEach(instruction => {
				console.log(instruction);
			});
		});
	}
	dumpSavedData()
	{
		let data = this.currentGeneratorWindow.saveAllData();
		for(let operator in data)
		{
			if (data[operator].Type === 'customEx')
			{
				data[operator].exerciseSettings = this.expressionList[data[operator].id].saveAllData('outside');
			}
		}
		console.log(data)
	}
	showOption(id)
	{
		this.currentGeneratorWindow.showOption(id, this.parametersContainer);
	}
	renderInstructions(lastOpenedId = -1)
	{
		this.AdditiveContainer.innerHTML = ``;
		this.arePreviewGenerated = 0;
		if (this.currentGeneratorWindow instanceof OperatorList && this.expressionViewType === 'text')
		{
			this.instructionsContainer.innerHTML = this.currentGeneratorWindow.renderTextView();
			return;
		}
		this.expressionViewType = 'full';
		if (this.currentGeneratorWindow.addedInstructions === 0)
		{
			this.instructionsContainer.innerHTML = '<i>Пока тут пусто. Выберите элементы из управления ниже, чтобы начать писать инструкцию!</i>';
		}
		else
		{
			this.instructionsContainer.innerHTML = this.currentGeneratorWindow.renderInstructions();
		}
		if (lastOpenedId !== -1)
		{
			this.showOption(lastOpenedId);
		}
	}
	addInstruction(type, color)
	{
		if (this.currentGeneratorWindow.arePreviewGenerated)
		{
			this.previewContainer.innerHTML = 'Инструкция изменилась. Требует повторной генерации предпросмотра!';
		}
		this.currentGeneratorWindow.arePreviewGenerated = false;
		if(type === 'customEx')
		{
			if (this.expressionList[this.currentGeneratorWindow.addedInstructions] === undefined)
			{
				this.expressionList[this.currentGeneratorWindow.addedInstructions] = new OperatorList();
			}
		}
		this.currentGeneratorWindow.addInstruction(type, color);
		this.renderInstructions();
	}
	clearInstructions(id)
	{
		this.currentGeneratorWindow.arePreviewGenerated = false;
		this.AdditiveContainer.innerHTML = ``;
		this.instructionsContainer.innerHTML = '<i>Пока тут пусто. Выберите элементы из управления ниже, чтобы начать писать инструкцию!</i>';
		this.parametersContainer.innerHTML = '<i>Щёлкните на любой добавленный элемент в поле инструкции генератора, чтобы изменить его свойства!</i>';
		this.parametersContainer.style.borderColor = "#dee2e6";
		this.parametersContainer.style.borderWidth = "1px";
		if (id === undefined)
		{
			if (this.generatorWindowType === 'exercise')
			{
				this.expressionInstruction = new OperatorList();
				this.currentGeneratorWindow = this.expressionInstruction;
			}
			else
			{
				this.instructions = new OptionList();
				this.currentGeneratorWindow = this.instructions;
				this.expressionList = Array.from([]);
			}
		}
		else
		{
			this.expressionList[id] = new OperatorList();
			this.currentGeneratorWindow = this.expressionList[id];
		}
		this.previewContainer.innerHTML = 'Нажмите кнопку генерации предпросмотра, чтобы посмотреть, как будет выглядеть ваше задание!';
		this.renderInstructions();

	}
	deleteLastInstruction(id)
	{
		if (this.currentGeneratorWindow.arePreviewGenerated)
		{
			this.previewContainer.innerHTML = 'Инструкция изменилась. Требует повторной генерации предпросмотра!';
		}
		this.currentGeneratorWindow.arePreviewGenerated = false;
		this.AdditiveContainer.innerHTML = ``;
		if (this.currentGeneratorWindow.addedInstructions > 0)
		{
			if (this.currentGeneratorWindow.openedInstruction === this.currentGeneratorWindow.addedInstructions - 1)
			{
				this.parametersContainer.style.borderColor = "#dee2e6";
				this.parametersContainer.style.borderWidth = "1px";
				this.currentGeneratorWindow.openedInstruction = -1;
				this.parametersContainer.innerHTML = '<i>Щёлкните на любой добавленный элемент в поле инструкции генератора, чтобы изменить его свойства!</i>';
			}
			if (this.currentGeneratorWindow.list[this.currentGeneratorWindow.addedInstructions - 1].Type === 'customEx')
			{
				this.expressionList[this.currentGeneratorWindow.addedInstructions - 1] = undefined;
			}
			this.currentGeneratorWindow.deleteLastInstruction(this.parametersContainer);
		}
		if (id === undefined)
		{
			if (this.generatorWindowType === 'exercise')
			{
				this.expressionInstruction = this.currentGeneratorWindow;
				this.currentGeneratorWindow = this.expressionInstruction;
			}
			else
			{
				this.instructions = this.currentGeneratorWindow;

				this.currentGeneratorWindow = this.instructions;
			}
		}
		else
		{
			this.expressionList[id] = this.currentGeneratorWindow;
			this.currentGeneratorWindow = this.expressionList[id];
		}
		this.previewContainer.innerHTML = 'Нажмите кнопку генерации предпросмотра, чтобы посмотреть, как будет выглядеть ваше задание!';
		this.renderInstructions();
	}

	movePointer(direction)
	{
		if(this.currentGeneratorWindow instanceof OperatorList)
		{
			this.currentGeneratorWindow.movePointer(direction);
			this.renderInstructions();
		}
	}
	changeViewType()
	{
		if (this.expressionViewType === 'full')
		{
			this.expressionViewType = 'text'
			if (this.currentGeneratorWindow instanceof OperatorList)
			{
				this.instructionsContainer.innerHTML = this.currentGeneratorWindow.renderTextView();
			}
		}
		else
		{
			this.expressionViewType = 'full'
			this.renderInstructions();
		}
	}
	generatePreview()
	{
		this.parametersContainer.style.borderColor = "#dee2e6";
		this.parametersContainer.style.borderWidth = "1px";
		this.AdditiveContainer.innerHTML = '';
		this.previewContainer.innerHTML = '';
		let data = this.currentGeneratorWindow.saveAllData();
		for(let operator in data)
		{
			if (data[operator].Type === 'customEx')
			{
				data[operator].exerciseSettings = this.expressionList[data[operator].id].saveAllData();
				if (!this.expressionList[data[operator].id].arePreviewGenerated)
				{
					this.previewContainer.innerHTML = `<div style="color:red;border:red 1px solid; font-size: 125%;">Ошибка отображения: Не генерировалось превью для выражения №${data[operator].id}</div>`;
				}
			}
		}
		if (data === false)
		{
			this.parametersContainer.style.borderColor = "red";
			this.parametersContainer.style.borderWidth = "3px";
			this.previewContainer.innerHTML = `<div style="color:red;border:red 1px solid; font-size: 125%;">Ошибка отображения: Инструкция содержит ошибки!</div>`;
			this.arePreviewGenerated = 0;
			this.currentGeneratorWindow.showOption(this.currentGeneratorWindow.openedInstruction, this.parametersContainer)
			return;
		}
		this.currentGeneratorWindow.showOption(this.currentGeneratorWindow.openedInstruction, this.parametersContainer)
		data.mode = this.generatorWindowType;
		if (data.preview === '')
		{
			this.previewContainer.innerHTML = `<i>Нечего отображать: вы не выбрали инструкции!</i>`;
		}
		else
		{
			this.previewContainer.innerHTML = ``;
			BX.ajax.runAction('proj:independent.Generator.getData',
				{
					data:
						{
							genSett: data,
						}
				}).then((response) => {
					this.previewContainer.innerHTML = response.data;
					if (this.previewContainer.innerHTML.includes('Ошибка'))
					{
						this.arePreviewGenerated = 0;
						this.currentGeneratorWindow.arePreviewGenerated = false;
					}
					else
					{
						this.arePreviewGenerated = 1;
						this.currentGeneratorWindow.arePreviewGenerated = true;
					}
				});
		}
	}
	saveExercise()
	{
		this.AdditiveContainer.innerHTML = ``;
		let grade = document.getElementById('gradeDropdown').innerText;
		let subject = document.getElementById('subjectDropdown').innerText;
		let theme = document.getElementById('topicDropdown').innerText;
		let saveButton = document.getElementById("saveButton");
		let data = this.currentGeneratorWindow.saveAllData();
		if (data === false)
		{
			this.AdditiveContainer.innerHTML = `<div style="color:red;border:red 1px solid; font-size: 125%;">Ошибка сохранения: Инструкции операторов содержат ошибки!</div>`;
			this.arePreviewGenerated = 0;
			return;
		}
		data.mode = this.generatorWindowType;
		data.theme = theme;
		data.attempt = this.saveAttempt;
		if (grade === "Выберите класс" || subject === "Выберите предмет" || theme === 'Выберите тему')
		{
			this.AdditiveContainer.innerHTML = `<div style="color:red;border:red 1px solid; font-size: 125%;">Ошибка сохранения: Не выбрана тема</div>`;
			return false;
		}
		if (this.arePreviewGenerated === 0)
		{
			this.AdditiveContainer.innerHTML = `<div style="color:red;border:red 1px solid; font-size: 125%;">Ошибка сохранения: Вы не генерировали рабочий предпросмотр. Системе неизвестно, работает ли ваша инструкция</div>`;
			return false;
		}
		if (this.currentGeneratorWindow === this.instructions && this.expressionInstruction.list.length !== 1 && this.saveAttemptTask === 0)
		{
			this.saveAttemptTask += 1;
			this.saveAttemptExercise = 0;
			this.AdditiveContainer.innerHTML = `<div style="color:darkorange;border:darkorange 1px solid; font-size: 125%;">Предупреждение: У вас есть инструкция, набранная в генераторе выражения. Повторное нажатие на кнопку сохранения затрёт эту настройку</div>`;
		}
		else if (this.currentGeneratorWindow === this.expressionInstruction && this.instructions.list.length !== 0  && this.saveAttemptExercise === 0)
		{
			this.saveAttemptTask = 0;
			this.saveAttemptExercise += 1;
			this.AdditiveContainer.innerHTML = `<div style="color:darkorange;border:darkorange 1px solid; font-size: 125%;">Предупреждение: У вас есть инструкция, набранная в генераторе задачи. Повторное нажатие на кнопку сохранения затрёт эту настройку</div>`;
		}
		else if (this.expressionInstruction.list.length === 1 || this.instructions.list.length === 0 || this.saveAttemptExercise === 1 || this.saveAttemptTask === 1)
		{
			saveButton.removeAttribute('onclick');
			BX.ajax.runAction('proj:independent.Generator.saveExercise',
				{
					data:
						{
							exercise: data,
						}
				}).then((response) => {
					if (response.data[0] === 'false')
					{
						this.saveAttempt = response.data[1];
						this.AdditiveContainer.innerHTML = `<div style="color:darkorange;border:darkorange 1px solid; font-size: 125%;">${response.data[2]}</div>`;
					}
					if(response.data[0] === 'true')
					{
						this.saveAttemptTask = 0;
						this.saveAttemptExercise = 0;
						this.saveAttempt = 0;
						this.AdditiveContainer.innerHTML = `<div style="color:forestgreen;border:forestgreen 1px solid; font-size: 125%;">${response.data[1]}</div>`;
					}
					saveButton.setAttribute('onclick' , 'generator.saveExercise()');
					grade = undefined;
					subject = undefined;
					theme = undefined;
					//Тут надо удалить инструкции!
				});

		}
	}
}