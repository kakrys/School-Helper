import {Type} from 'main.core';

export class GeneratorBlock
{
	constructor(options = {name: 'GeneratorBlock'})
	{
		this.name = options.name;
	}

	setName(name)
	{
		if (Type.isString(name))
		{
			this.name = name;
		}
	}

	getName()
	{
		return this.name;
	}
}
