document.addEventListener('DOMContentLoaded', function()
{
	const menu2 = document.getElementById('subjectDropdownContainer');
	const menu3 = document.getElementById('topicDropdownContainer');
	const instructionsContainer = document.getElementById('instructionsContainer');
	const parametersContainer = document.getElementById('parametersContainer');
	let xhr = new XMLHttpRequest();

	xhr.open('GET', '../install/components/proj/generator/templates/handler.php?action=getData', true);

	xhr.onreadystatechange = function()
	{
		if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200)
		{
			const data = xhr.responseText;
			console.log(data);
		}
	};
	xhr.send();

});


let addedInstructions = 0;
function updateMenu2(value)
{
	let newHtml = '';
	menu2.innerHTML = '';
	newHtml = '<button class="btn btn-secondary dropdown-toggle" data-value="null" type="button" id="subjectDropdown" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">Выберите предмет</button>';
	newHtml += '<ul class="dropdown-menu" aria-labelledby="subjectDropdown" style="overflow-y: auto; max-height: 10vh;">';
	for (let grade in data)
	{
		if (grade === value)
		{
			if (Array.isArray(data[grade]))
			{
				for (let subject of data[grade])
				{
					newHtml += '<li><a class="dropdown-item" data-value="' + subject + '" onclick="changeSubjectValue(this)">' + subject +'</a></li>';
				}
			}
			else
			{
				for (let subject in data[grade])
				{
					newHtml += '<li><a class="dropdown-item" data-value="' + subject + '" onclick="changeSubjectValue(this)">' + subject +'</a></li>';
				}
			}
			newHtml += '</ul>';
			menu2.innerHTML = newHtml;
			menu2.classList.remove("invisible");
			return;
		}
	}
	menu2.classList.add("invisible");
}
function updateMenu3(value)
{
	const grade = document.getElementById('gradeDropdown').getAttribute('data-value');
	let newHtml = '';
	menu3.innerHTML = '';
	newHtml = '<button class="btn btn-secondary dropdown-toggle" data-value="null" type="button" id="topicDropdown" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">Выберите тему</button>';
	newHtml += '<ul class="dropdown-menu" aria-labelledby="topicDropdown" style="overflow-y: auto; max-height: 10vh;">';
	if (Array.isArray(data[grade]))
	{
		for (let subject of data[grade])
		{
			if (subject === value)
			{
				if(data[grade][subject] === undefined)
				{
					menu3.classList.add("invisible");
					return;
				}
				if (Array.isArray(data[grade][subject]))
				{
					for (let topic of data[grade][subject])
					{
						newHtml += '<li><a class="dropdown-item" data-value="' + topic + '" onclick="changeTopicValue(this)">' + topic +'</a></li>';
					}
				}
				else
				{
					if(data[grade][subject] === '')
					{
						menu3.classList.add("invisible");
						return;
					}
					for (let topic in data[grade][subject])
					{
						newHtml += '<li><a class="dropdown-item" data-value="' + topic + '" onclick="changeTopicValue(this)">' + topic +'</a></li>';
					}
				}
				newHtml += '</ul>';
				menu3.innerHTML = newHtml;
				menu3.classList.remove("invisible");
				return;
			}
		}
	}
	else
	{
		for (let subject in data[grade])
		{
			if (subject === value)
			{
				if(data[grade][subject] === undefined)
				{
					menu3.classList.add("invisible");
					return;
				}
				if (Array.isArray(data[grade][subject]))
				{
					for (let topic of data[grade][subject])
					{
						newHtml += '<li><a class="dropdown-item" data-value="' + topic + '" onclick="changeTopicValue(this)">' + topic +'</a></li>';
					}
				}
				else
				{
					if(data[grade][subject] === '')
					{
						menu3.classList.add("invisible");
						return;
					}
					for (let topic in data[grade][subject])
					{
						newHtml += '<li><a class="dropdown-item" data-value="' + topic + '" onclick="changeTopicValue(this)">' + topic +'</a></li>';
					}
				}
				newHtml += '</ul>';
				menu3.innerHTML = newHtml;
				menu3.classList.remove("invisible");
				return;
			}
		}
	}
	menu3.classList.add("invisible");
}
function changeGradeValue(element)
{
	const $mainButton = document.getElementById('gradeDropdown');
	$mainButton.innerText = element.innerText;
	$mainButton.setAttribute('data-value',element.getAttribute('data-value'));
	menu3.classList.add("invisible");
	updateMenu2(element.getAttribute('data-value'));
}
function changeSubjectValue(element)
{
	const $mainButton = document.getElementById('subjectDropdown');
	$mainButton.innerText = element.innerText;
	$mainButton.setAttribute('data-value',element.getAttribute('data-value'));
	updateMenu3(element.getAttribute('data-value'));
}
function changeTopicValue(element)
{
	const $mainButton = document.getElementById('topicDropdown');
	$mainButton.innerText = element.innerText;
	$mainButton.setAttribute('data-value',element.getAttribute('data-value'));
}
function addObjectToInstructions(type, color)
{
	if (instructionsContainer.innerHTML === '<i>Пока тут пусто. Выберите элементы из управления ниже, чтобы начать писать инструкцию!</i>')
	{
	addedInstructions = 1;
	instructionsContainer.innerHTML = '<span id="instruction'  + addedInstructions + '" data-instruction="' + addedInstructions + '" onclick="showOptions(this)" class="border btn" style="padding: 1%; margin:1%; background:' + color + ';">' + type + '</span>';
	}
	else
	{
	addedInstructions += 1;
	instructionsContainer.innerHTML += '<span id="instruction' + addedInstructions + '" data-instruction="' + addedInstructions + '" onclick="showOptions(this)" class="border btn" style="padding: 1%; margin:1%; background:' + color + ';">' + type + '</span>';
	}
}
function clearInstructions()
{
	instructionsContainer.innerHTML = '<i>Пока тут пусто. Выберите элементы из управления ниже, чтобы начать писать инструкцию!</i>';
	addedInstructions = 0;
parametersContainer.innerHTML = '<i>Щёлкните на любой добавленный элемент в поле инструкции генератора, чтобы изменить его свойства!</i>';
}
function deleteLastInstruction()
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
		closeOption();
	});
	addedInstructions -= 1;
	if (addedInstructions === 0)
	{
	instructionsContainer.innerHTML = '<i>Пока тут пусто. Выберите элементы из управления ниже, чтобы начать писать инструкцию!</i>';
	}
}
function showOptions(element)
{
	let html = '<p class="d-flex">Редактируемый элемент [' + element.innerText + '] №' + element.getAttribute('data-instruction') + '</p>';
	if (element.innerText === 'image')
{
	html += '<div class="mb-3"><label for="formFile" class="form-label">Выберите картинку</label> <input class="form-control" type="file" id="formFile"> </div>';
}
	if (element.innerText === 'rand.Number')
{
	html += `<div class="form-check">
				<input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
				<label class="form-check-label" for="flexRadioDefault1">
					Default radio
				</label>
			</div>
			<div class="form-check">
			<input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
			<label class="form-check-label" for="flexRadioDefault2">
				Default checked radio
			</label>
			</div>`;
}
	html += '<div></div>';
	parametersContainer.innerHTML = html;
}
function closeOption()
{
	parametersContainer.innerHTML = '<i>Щёлкните на любой добавленный элемент в поле инструкции генератора, чтобы изменить его свойства!</i>';
}
