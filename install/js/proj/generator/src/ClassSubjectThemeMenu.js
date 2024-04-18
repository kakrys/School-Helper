import {Type} from 'main.core';

export class ClassSubjectThemeMenu
{
	constructor(options = {})
	{
		if (Type.isStringFilled(options.rootNodeId))
		{
			this.rootNodeId = options.rootNodeId;
		}
		else
		{
			throw new Error('ClassSubjectThemeMenu: options.rootNodeId required');
		}

		this.rootNodeId = document.getElementById(this.rootNodeId);
		if (!this.rootNodeId)
		{
			throw new Error(`ClassSubjectThemeMenu: element with id "${this.rootNodeId}" not found`);
		}

		this.data = options.data;
		this.menu2 = document.getElementById('subjectDropdownContainer');
		this.menu3 = document.getElementById('topicDropdownContainer');
	}
	updateMenu2(value)
	{
		let newHtml = '';
		this.menu2.innerHTML = '';
		newHtml = '<button class="btn btn-secondary dropdown-toggle" data-value="null" type="button" id="subjectDropdown" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">Выберите предмет</button>';
		newHtml += '<ul class="dropdown-menu" aria-labelledby="subjectDropdown" style="overflow-y: auto; max-height: 10vh;">';
		for (let grade in this.data)
		{
			if (grade === value)
			{
				if (Array.isArray(this.data[grade]))
				{
					for (let subject of this.data[grade])
					{
						newHtml += '<li><a class="dropdown-item" data-value="' + subject + '" onclick="topMenu.changeSubjectValue(this)">' + subject +'</a></li>';
					}
				}
				else
				{
					for (let subject in this.data[grade])
					{
						newHtml += '<li><a class="dropdown-item" data-value="' + subject + '" onclick="topMenu.changeSubjectValue(this)">' + subject +'</a></li>';
					}
				}
				newHtml += '</ul>';
				this.menu2.innerHTML = newHtml;
				this.menu2.classList.remove("invisible");
				return;
			}
		}
		this.menu2.classList.add("invisible");
	}

	updateMenu3(value)
	{
		const grade = document.getElementById('gradeDropdown').getAttribute('data-value');
		let newHtml = '';
		this.menu3.innerHTML = '';
		newHtml = '<button class="btn btn-secondary dropdown-toggle" data-value="null" type="button" id="topicDropdown" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">Выберите тему</button>';
		newHtml += '<ul class="dropdown-menu" aria-labelledby="topicDropdown" style="overflow-y: auto; max-height: 10vh;">';
		if (Array.isArray(this.data[grade]))
		{
			for (let subject of this.data[grade])
			{
				if (subject === value)
				{
					if(this.data[grade][subject] === undefined)
					{
						this.menu3.classList.add("invisible");
						return;
					}
					if (Array.isArray(this.data[grade][subject]))
					{
						for (let topic of this.data[grade][subject])
						{
							newHtml += '<li><a class="dropdown-item" data-value="' + topic + '" onclick="topMenu.changeTopicValue(this)">' + topic +'</a></li>';
						}
					}
					else
					{
						if(this.data[grade][subject] === '')
						{
							this.menu3.classList.add("invisible");
							return;
						}
						for (let topic in this.data[grade][subject])
						{
							newHtml += '<li><a class="dropdown-item" data-value="' + topic + '" onclick="topMenu.changeTopicValue(this)">' + topic +'</a></li>';
						}
					}
					newHtml += '</ul>';
					this.menu3.innerHTML = newHtml;
					this.menu3.classList.remove("invisible");
					return;
				}
			}
		}
		else
		{
			for (let subject in this.data[grade])
			{
				if (subject === value)
				{
					if(this.data[grade][subject] === undefined)
					{
						this.menu3.classList.add("invisible");
						return;
					}
					if (Array.isArray(this.data[grade][subject]))
					{
						for (let topic of this.data[grade][subject])
						{
							newHtml += '<li><a class="dropdown-item" data-value="' + topic + '" onclick="topMenu.changeTopicValue(this)">' + topic +'</a></li>';
						}
					}
					else
					{
						if(this.data[grade][subject] === '')
						{
							this.menu3.classList.add("invisible");
							return;
						}
						for (let topic in this.data[grade][subject])
						{
							newHtml += '<li><a class="dropdown-item" data-value="' + topic + '" onclick="topMenu.changeTopicValue(this)">' + topic +'</a></li>';
						}
					}
					newHtml += '</ul>';
					this.menu3.innerHTML = newHtml;
					this.menu3.classList.remove("invisible");
					return;
				}
			}
		}
		this.menu3.classList.add("invisible");
	}
	changeGradeValue(element)
	{
		const $mainButton = document.getElementById('gradeDropdown');
		$mainButton.innerText = element.innerText;
		$mainButton.setAttribute('data-value',element.getAttribute('data-value'));
		this.menu3.classList.add("invisible");
		this.updateMenu2(element.getAttribute('data-value'));
	}
	changeSubjectValue(element)
	{
		const $mainButton = document.getElementById('subjectDropdown');
		$mainButton.innerText = element.innerText;
		$mainButton.setAttribute('data-value',element.getAttribute('data-value'));
		this.updateMenu3(element.getAttribute('data-value'));
	}
	changeTopicValue(element)
	{
		const $mainButton = document.getElementById('topicDropdown');
		$mainButton.innerText = element.innerText;
		$mainButton.setAttribute('data-value',element.getAttribute('data-value'));
	}
}