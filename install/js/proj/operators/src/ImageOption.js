import {Option} from "./Option";

export class ImageOption extends Option{
	constructor(options = {})
	{
		super(options);
	}
	showOption()
	{
		let html = `<p class="d-flex">Редактируемый элемент №${this.id} Тип:[${this.optionName}]</p>`;
		html += '<div class="mb-3"><label for="formFile" class="form-label">Выберите картинку</label> <input class="form-control" type="file" id="formFile"> </div>';
		return html;
	}
}