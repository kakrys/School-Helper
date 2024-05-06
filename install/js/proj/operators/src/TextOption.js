import {Option} from "./Option";
import {Validator} from "./Validator";

export class TextOption extends Option{
	constructor(options = {})
	{
		super(options);
		this.text = '';
		this.parameters.text = '';
		this.errors = {
			maxStringLength: false,
		}
		this.errorRender = [''];
	}
	showOption()
	{
		this.updateParameters();
		let html = `<p class="d-flex">Редактируемый элемент №${this.id} Тип:[${this.optionName}]</p>`;
		html += `<div class="form-group col-12">
					<textarea class="form-control" id="textArea_${this.id}" rows="3" placeholder="Ввведите текст задания (не более 400 символов)"></textarea>
					<span style="color:orangered">${this.errorRender[0]}</span>
				</div>`;
		return html;
	}
	updateParameters()
	{
		this.text = this.parameters.text;
	}
	postUpdate()
	{
		document.getElementById(`textArea_${this.id}`).value = this.text;
	}

	save()
	{
		let textContainer = document.getElementById(`textArea_${this.id}`);
		this.text = textContainer.value;
		this.errors['maxStringLength'] = Validator.maxStringLen(this.text, 400);
		this.parameters.text = this.text;
		return this.errorHandler();
	}

}