import {Option} from "./Option";
import {Validator} from "./Validator";

export class ImageOption extends Option{
	constructor(options = {})
	{
		super(options);
		this.parameters.url = '';
		this.errors = {
			invalidUrl: false,
		}
		this.errorRender = [''];
	}
	postUpdate()
	{
		document.getElementById(`textArea_${this.id}_0`).value = this.parameters.url;
	}

	save()
	{
		let imageTextArea = document.getElementById(`textArea_${this.id}_0`);
		let url = '';
		if (imageTextArea.value !== '')
		{
			url = imageTextArea.value;
			this.errors.invalidUrl = Validator.regExpMatch(url,/^(https?|ftp):\/\/\S*\.(jpg|png)$/g, 'http://[example].(jpg|png)');
		}
		this.parameters.url = url;
		return this.errorHandler();
	}
	showOption()
	{
		let html = `<p class="d-flex">Редактируемый элемент №${this.id} Тип:[${this.optionName}]</p>`;
		html += '<div class="mb-3"><label for="formFile" class="form-label">Выберите картинку (локальное сохранение не реализовано)</label> <input class="form-control" type="file" id="formFile" disabled> </div>';
		html += `<div class="d-flex flex-column col-12" style="width: 100%;">
			<label>Ссылка на картинку</label>
			<div class="d-flex">
				<input class="form-control" id="textArea_${this.id}_0" placeholder="Запишите валидный URL">
			</div>
			<span style="color:orangered">${this.errorRender[0]}</span>
			<i>Исключение работает для целых чисел, отрицательных чисел и десятичных дробей</i>
		</div>`
		return html;
	}
}