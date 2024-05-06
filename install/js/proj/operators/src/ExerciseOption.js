import {Option} from "./Option";

export class ExerciseOption extends Option{
	constructor(options = {})
	{
		super(options);
		this.preview = '';
	}
	showOption()
	{
		let html = `<p class="d-flex">Редактируемый элемент №${this.id} Тип:[${this.optionName}]</p>`;
		html += `
		<p>
			Настроить это выражение
		</p>
		<div class="col d-flex justify-content-center" style="padding: 1%; width: 95%;">
			<a class="btn btn-secondary" onclick="generator.openExerciseMenu(${this.id})" style="width: 100%; margin: 1%;">Редактировать выражение</a>
		</div>`;
		if (this.preview !== '')
		{
			html += `
		<p>Это выражение ранее редактировалось</p>
		<a>Схема набранной инструкции:</a>
		<a>${this.preview}</a>`
		}
		else
		{
			html += `<a><i>Это выражение ранее не редактировалось</i></a>
					<a>Настройте, чтобы увидеть схему выражения</a>`
		}
		html +=`<p>Подбор ответа</p>
		<a>Внимание: подбор ответа для генерируемого выражения происходит в автоматическом режиме!</a>`;
		return html;
	}
}