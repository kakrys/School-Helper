import {Loc} from 'main.core';

export class Option{
	constructor(options = {})
	{
		this.parameters = {};
		this.parameters.id = options.id;
		this.parameters.Type = options.type;
		this.id = options.id;
		this.type = options.type;
		this.color = options.color;
		this.areEventsRegistered = 0;
		this.errors = {};
		this.errorRender = [''];
		this.optionName = Loc.getMessage(options.type);
		this.html = `<span id="instruction_${this.id}" data-instruction="${this.id}" onclick="generator.showOption(${this.id})" class="border btn" style="padding: 1%; margin:1%; background:${this.color};">${this.optionName}</span>`;
	}
	updateParameters()
	{

	}
	render()
	{
		return this.html;
	}
	save()
	{
		return true;
	}
	showOption()
	{
		return '';
	}

	registerEvents()
	{
		this.areEventsRegistered = 1;
	}
	unregisterEvents()
	{
		this.areEventsRegistered = 0;
	}
	postUpdate()
	{

	}

	getGeneratorData()
	{
		return this.parameters;
	}

	errorHandler(): boolean
	{
		if (Object.keys(this.errors).length === 0) return true;
		let check = 0;
		let position = 0;
		for (let key in this.errors)
		{
			if (this.errors[key] === false)
			{
				this.errorRender[position] = '';
			}
			else
			{
				this.errorRender[position] = this.errors[key];
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