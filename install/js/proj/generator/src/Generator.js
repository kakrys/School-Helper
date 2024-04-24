import {Type, Loc} from 'main.core';
import {OptionList as OL} from 'proj.operators';
import {OperatorList as OpL} from 'proj.constructor';
import {Controls} from "./Controls";
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
		this.instructions = new OptionList();
		this.expressionInstruction = new OperatorList();
		this.expressionList = [];
		this.currentGeneratorWindow = this.instructions;
		this.generatorWindowType = 'task';
		this.controlsContainer.innerHTML = Controls.showTaskControls();
	}
	backToGenerator()
	{
		document.getElementById('ExpressionType').innerHTML='задача';
		this.generatorWindowType = 'task';
		this.currentGeneratorWindow = this.instructions;
		this.controlsContainer.innerHTML = Controls.showTaskControls();
		this.renderInstructions();
	}
	openExerciseMenu(id)
	{
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
		this.renderInstructions();
	}
	changeExpressionType()
	{
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
	dumpInstructions()
	{
		console.log(this.instructions);
		this.instructions.list.forEach(instruction => {
			console.log(instruction);
		})
	}
	showOption(id)
	{
		this.currentGeneratorWindow.showOption(id, this.parametersContainer);
	}
	renderInstructions()
	{
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
	}
	addInstruction(type, color)
	{
		this.currentGeneratorWindow.addInstruction(type, color);
		this.renderInstructions();
	}
	clearInstructions(id)
	{
		this.instructionsContainer.innerHTML = '<i>Пока тут пусто. Выберите элементы из управления ниже, чтобы начать писать инструкцию!</i>';
		this.parametersContainer.innerHTML = '<i>Щёлкните на любой добавленный элемент в поле инструкции генератора, чтобы изменить его свойства!</i>';
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
			}
		}
		else
		{
			this.expressionList[id] = new OperatorList();
			this.currentGeneratorWindow = this.expressionList[id];
		}
		this.renderInstructions();

	}
	deleteLastInstruction(id)
	{
		if (this.currentGeneratorWindow.addedInstructions > 0)
		{
			if (this.currentGeneratorWindow.openedInstruction === this.currentGeneratorWindow.addedInstructions - 1)
			{
				this.currentGeneratorWindow.openedInstruction = -1;
				this.parametersContainer.innerHTML = '<i>Щёлкните на любой добавленный элемент в поле инструкции генератора, чтобы изменить его свойства!</i>';
			}
			if (this.currentGeneratorWindow.list[this.currentGeneratorWindow.addedInstructions - 1].type === 'customEx')
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
		this.renderInstructions(this.parametersContainer);
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
		let data = this.currentGeneratorWindow.saveAllData();
		BX.ajax.runAction('proj:independent.Generator.getData',
			{
				data:
					{
					genSett: data,
				}
			}).then((response) => {this.previewContainer.innerHTML = response.data});

	}
}


//BX.ajax.runAction('proj:independent.Generator.getData')
//BX.ajax.runAction('proj:independent.Контроллер.Действие')