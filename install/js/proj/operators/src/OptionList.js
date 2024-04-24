import {TextOption} from "./TextOption";
import {RandNumberOption} from "./RandNumberOption";
import {ImageOption} from "./ImageOption";
import {CheckOption} from "./CheckOption";
import {ExerciseOption} from "./ExerciseOption";
import {RandTextOption} from "./RandTextOption";
import {Option} from "./Option";

export class OptionList{
	constructor()
	{
		this.list = [];
		this.addedInstructions = 0;
		this.openedInstruction = -1;
	}
	addInstruction(type, color)
	{
		switch (type){
			case 'text':
				this.list.push(new TextOption({id: this.addedInstructions, type: type, color: color}));
				this.addedInstructions += 1;
				break;
			case 'rand.Number':
				this.list.push(new RandNumberOption({id: this.addedInstructions, type: type, color: color}));
				this.addedInstructions += 1;
				break;
			case 'image':
				this.list.push(new ImageOption({id: this.addedInstructions, type: type, color: color}));
				this.addedInstructions += 1;
				break;
			case 'rand.Text':
				this.list.push(new RandTextOption({id: this.addedInstructions, type: type, color: color}));
				this.addedInstructions += 1;
				break;
			case 'check':
				this.list.push(new CheckOption({id: this.addedInstructions, type: type, color: color}));
				this.addedInstructions += 1;
				break;
			case 'customEx':
				this.list.push(new ExerciseOption({id: this.addedInstructions, type: type, color: color}));
				this.addedInstructions += 1;
				break;
			default:
				this.list.push(new Option({id: this.addedInstructions, type: type, color: color}));
				this.addedInstructions += 1;
				break;
		}
	}
	showOption(id, container)
	{
		if (container.innerHTML === '<i>Щёлкните на любой добавленный элемент в поле инструкции генератора, чтобы изменить его свойства!</i>')
		{
			this.openedInstruction = -1;
		}
		if (id === this.openedInstruction) return;
		this.saveOpenedInstructionData();
		this.openedInstruction = id;
		container.innerHTML = this.list[id].showOption();
		this.list[id].registerEvents();
		this.list[id].postUpdate();
	}
	saveOpenedInstructionData()
	{
		if (this.openedInstruction !==-1)
		{
			this.list[this.openedInstruction].save();
		}
	}

	saveAllData()
	{

	}
	deleteLastInstruction(container = undefined)
	{
		if (this.addedInstructions > 0)
		{
			this.list.pop();
			this.addedInstructions -= 1;
		}
	}
	renderInstructions()
	{
		let html = '';
		this.list.forEach(instruction => {
			html += instruction.render();
		});
		return html;
	}

}