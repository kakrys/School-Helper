import {Type} from 'main.core';

export class ClassSubjectThemeMenu
{
	constructor(options = {name: 'ClassSubjectThemeMenu'})
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