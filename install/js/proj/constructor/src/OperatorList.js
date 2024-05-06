import {OptionList as OL} from "proj.operators";
import {Operator} from "./Operator";
import {Pointer} from "./Pointer";
import {AbsoluteOperator} from "./AbsoluteOperator";
import {BracketOperator} from "./BracketOperator";
import {DivOperator} from  "./DivOperator"
import {RandomOperator} from "./RandomOperator";
import {MultiplyOperator} from "./MultiplyOperator";
import {EqualOperator} from "./EqualOperator";
import {MinusOperator} from "./MinusOperator";
import {PlusOperator} from "./PlusOperator";
import {PowerOperator} from "./PowerOperator";
import {RootOperator} from "./RootOperator";
import {RandNumberOperator} from "./RandNumberOperator";
import {AnswerOperator} from "./AnswerOperator";
import {PolynomOperator} from "./PolynomOperator";
const OptionList = BX.Proj.Independent.OptionList;

export class OperatorList extends OptionList{
	constructor() {
		super();
		this.list.push(new Pointer({type: 'pointer', color: 'lightblue'}));
		this.addedInstructions = 1;
		this.idCounter = 0;
		this.pointerPosition = 0;
	}

	checkPointerPosition(newOperator)
	{
		if (this.pointerPosition !== this.addedInstructions - 1)
		{
			let listPart = Array.from(this.list);
			this.list.splice(this.pointerPosition + 1);
			listPart = listPart.splice(this.pointerPosition + 1);
			this.list.push(newOperator);
			this.list = this.list.concat(listPart);
		}
		else
		{
			this.list.push(newOperator);
		}
		this.addedInstructions += 1;
		this.idCounter += 1;
	}
	addInstruction(type, color)
	{
		let newOperator = '';
		switch (type){
			case 'ABS':
				newOperator = new AbsoluteOperator({id: this.idCounter, type: type, color: color, textView: '|', PairId: this.idCounter + 1, isOperator: false});
				this.checkPointerPosition(newOperator);
				this.movePointer('right');
				newOperator = new AbsoluteOperator({id: this.idCounter, type: type, color: color, textView: '|', PairId: this.idCounter - 1, isOperator: false});
				break;
			case 'Bracket':
				newOperator = new BracketOperator({id: this.idCounter, type: type, color: color, textView: '(', PairId: this.idCounter + 1, isOperator: false});
				this.checkPointerPosition(newOperator);
				this.movePointer('right');
				newOperator = new BracketOperator({id: this.idCounter, type: type, color: color, textView: ')', PairId: this.idCounter - 1, isOperator: false});
				break;
			case 'Div':
				newOperator = new DivOperator({id: this.idCounter, type: type, color: color, textView: ':'});
				break;
			case 'Equal':
				newOperator = new EqualOperator({id: this.idCounter, type: type, color: color, textView: '='});
				break;
			case 'Minus':
				newOperator = new MinusOperator({id: this.idCounter, type: type, color: color, textView: '-'});
				break;
			case 'Multiply':
				newOperator = new MultiplyOperator({id: this.idCounter, type: type, color: color, textView: '*'});
				break;
			case 'Plus':
				newOperator = new PlusOperator({id: this.idCounter, type: type, color: color, textView: '+'});
				break;
			case 'Power':
				newOperator = new PowerOperator({id: this.idCounter, type: type, color: color, textView: '^'});
				break;
			case 'rand.Number':
				newOperator = new RandNumberOperator({id: this.idCounter, type: type, color: color, textView: '[X]', isOperator: false});
				break;
			case 'Rand.Operation':
				newOperator = new RandomOperator({id: this.idCounter, type: type, color: color, textView: '?¿'});
				break;
			case 'Root':
				newOperator = new RootOperator({id: this.idCounter, type: type, color: color, textView: '√¯'});
				break;
			case 'Answer':
				newOperator = new AnswerOperator({id: this.idCounter, type: type, color: color, textView: '<==>'});
				break;
			case 'Polynom':
				newOperator = new PolynomOperator({id: this.idCounter, type: type, color: color, textView: '{xyz}'});
				break;
			default:
				newOperator = new Operator({id: this.idCounter, type: type, color: color, textView: 'null'});
				break;
		}
		this.checkPointerPosition(newOperator);
		this.movePointer('right');
		if (newOperator.isPair)
		{
			this.movePointer('left');
		}
	}

	deleteLastInstruction(container)
	{
		let check = false;
		if (this.pointerPosition === 0 || this.addedInstructions === 1)
		{
			return;
		}
		if(this.list[this.pointerPosition - 1].isPair)
		{
			check = this.openedInstruction === this.list[this.pointerPosition - 1].id;
			let deletedId = this.list[this.pointerPosition - 1].id;
			let listPart = Array.from(this.list);
			this.list.splice(this.pointerPosition - 1);
			listPart = listPart.splice(this.pointerPosition);
			this.list = this.list.concat(listPart);
			this.pointerPosition -= 1;
			this.addedInstructions -= 1;
			this.list.forEach(operator => {
				if (operator.PairId === deletedId)
				{
					let listPart = Array.from(this.list);
					let pos = this.list.indexOf(operator)
					this.list.splice(pos);
					listPart = listPart.splice(pos + 1);
					this.list = this.list.concat(listPart);
					if(pos < this.pointerPosition)
					{
						this.pointerPosition -= 1;
					}
					this.addedInstructions -= 1;
				}
			})
		}
		else
		{
			check = this.openedInstruction === this.list[this.pointerPosition - 1].id;
			let listPart = Array.from(this.list);
			this.list.splice(this.pointerPosition - 1);
			listPart = listPart.splice(this.pointerPosition);
			this.list = this.list.concat(listPart);
			this.pointerPosition -= 1;
			this.addedInstructions -= 1;
		}
		if(this.list.length === 1 || check)
		{
			this.openedInstruction = -1;
			container.innerHTML = '<i>Щёлкните на любой добавленный элемент в поле инструкции генератора, чтобы изменить его свойства!</i>';
			container.style.borderColor = "#dee2e6";
			container.style.borderWidth = "1px";
		}
	}
	showOption(id, container)
	{
		if (container.innerHTML === '<i>Щёлкните на любой добавленный элемент в поле инструкции генератора, чтобы изменить его свойства!</i>')
		{
			this.openedInstruction = -1;
		}
		if (id === this.openedInstruction)
		{
			this.saveOpenedInstructionData();
			this.list.forEach(operator => {
				if (operator.id === id)
				{
					container.innerHTML = operator.showOption();
					this.list[this.list.indexOf(operator)].registerEvents();
					this.list[this.list.indexOf(operator)].postUpdate();
				}
			});
			if (this.saveOpenedInstructionData())
			{
				container.style.borderColor = "#dee2e6";
				container.style.borderWidth = "1px";
			}
			return;
		}
		if (!this.saveOpenedInstructionData())
		{
			container.style.borderColor = "red";
			container.style.borderWidth = "3px";
			this.showOption(this.openedInstruction, container);
			return;
		}
		container.style.borderColor = "#dee2e6";
		container.style.borderWidth = "1px";
		this.openedInstruction = id;
		this.list.forEach(operator => {
			if (operator.id === id)
			{
				container.innerHTML = operator.showOption();
				this.list[this.list.indexOf(operator)].registerEvents();
				this.list[this.list.indexOf(operator)].postUpdate();
			}
		});
	}
	saveOpenedInstructionData()
	{
		if (this.openedInstruction !== -1)
		{
			let operatorToSave;
			this.list.forEach(operator => {
				if(this.openedInstruction === operator.id)
				{
					operatorToSave = operator;
				}
			});
			return operatorToSave.save();
		}
		return true;
	}


	movePointer(direction)
	{
		if (this.list.length === 1)
		{
			return;
		}
		let pointer = this.list[this.pointerPosition];
		switch (direction){
			case 'left':
				if (this.pointerPosition === 0) {return;}
				let leftElement = this.list[this.pointerPosition - 1];
				this.list[this.pointerPosition] = leftElement;
				this.list[this.pointerPosition - 1] = pointer;
				this.pointerPosition -=1;
				leftElement = undefined;
				pointer = undefined;
				break;
			case 'right':
				if (this.pointerPosition === this.list.length - 1) {return;}
				let rightElement = this.list[this.pointerPosition + 1];
				this.list[this.pointerPosition] = rightElement;
				this.list[this.pointerPosition + 1] = pointer;
				this.pointerPosition += 1;
				rightElement = undefined;
				pointer = undefined;
				break;
		}
	}
	renderTextView()
	{
		let html = '';
		this.list.forEach(instruction => {
			html += instruction.render('text');
		});
		return html;
	}

	saveAllData(mode = 'inside')
	{
		if(mode === "inside" && !this.saveOpenedInstructionData())
		{
			return false;
		}
		let symbolicExpression = '';
		let generatorInstruction = [];
		this.list.forEach(operator => {
			if (operator.id === -1) return;
			symbolicExpression += operator.textView;
			generatorInstruction.push(operator.getGeneratorData());
		});
		generatorInstruction.preview = symbolicExpression;
		return generatorInstruction;
	}
}