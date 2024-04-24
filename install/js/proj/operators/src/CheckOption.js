import {Option} from "./Option";

export class CheckOption extends Option{
	constructor(options = {})
	{
		super(options);
		this.text = '';
	}
	showOption()
	{
		let html = `<p class="d-flex">Редактируемый элемент №${this.id} Тип:[${this.optionName}]</p>`;
		html += `<div class="form-group col-12">
					<textarea class="form-control" id="textArea_${this.id}" rows="3" placeholder="Ввведите текст задания">${this.text}</textarea>
				</div>`;
		return html;
	}
	save()
	{
		this.textElement = document.getElementById(`textArea_${this.id}`);
		let self = this;
		this.textElement.addEventListener('input', function() {
			if (self.textElement.value !== null)
			{
				self.text = self.textElement.value;
			}
		});
		this.textElement.removeEventListener('input', function(){});
	}
}