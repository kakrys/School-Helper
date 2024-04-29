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
}