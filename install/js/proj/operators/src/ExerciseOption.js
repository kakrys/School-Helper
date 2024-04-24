import {Option} from "./Option";

export class ExerciseOption extends Option{
	constructor(options = {})
	{
		super(options);
		this.text = '';
	}
	showOption()
	{
		let html = `<p class="d-flex">Редактируемый элемент №${this.id} Тип:[${this.optionName}]</p>`;
		html += `
		<p>
			Настроить это выражение
		</p>
		<div class="col d-flex justify-content-center" style="padding: 1%;">
			<a class="btn btn-secondary" onclick="generator.openExerciseMenu(${this.id})" style="width: 100%; margin: 1%;">Редактировать выражение</a>
		</div>
		<p>Подбор ответа</p>
		<div class="form-check">
			<input class="form-check-input" type="checkbox" value="true" id="RadioAnswer" data-bs-toggle="collapse" href="#AnswerCollapse" role="button" aria-expanded="false" aria-controls="AnswerCollapse">
			<label class="form-check-label" for="RadioAnswer">
				Указать ответ вручную 
			</label>
		</div>
		<div class="collapse" id="AnswerCollapse" style="width:100%;">
			<input class="form-control" id="textArea_${this.id}_3" placeholder="Значение">
		</div>
		<div class="form-check">
			<input class="form-check-input" type="checkbox" name="RadioAnswer" id="RadioAnswer2" checked>
			<label class="form-check-label" for="RadioAnswer2">
				Попытаться сгенерировать ответ автоматически (в случае неудачи решение и ответ не будут доступны)
			</label>
		</div>
		<a>Если выбраны оба варианта подбора ответа - приоритет отдаётся автоматическому подбору.</a>`;
		return html;
	}
	save()
	{
		this.textElement = document.getElementById(`textArea_${this.id}`);
		let self = this;
		if (this.textElement !== null)
		{
			this.textElement.addEventListener('input', function() {
				if (self.textElement.value !== null)
				{
					self.text = self.textElement.value;
				}
			});
			this.textElement.removeEventListener('input', function(){});
		}
	}
}