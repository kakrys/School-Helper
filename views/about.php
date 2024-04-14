<?php
/**
 * @var CMain $APPLICATION
 */
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Independent");
?>
<div class="container" style="margin-top: 1%; flex-grow: 1; width: 100%;">
	<div class="container-fluid main-content d-flex flex-column border bg-light" style="flex-grow: 1; min-width:100%;">
		<p style="align-self: center;">
			О проекте
		</p>
		<div>
			Проект <strong>Independent work trainer(c)</strong> - проект, нацеленный на то, чтобы у всех учеников была возможность хорошо освоить школьный материал.
		</div>
		<div>
			В вашем распоряжении <i>бесчисленное</i> множество автоматически генерируемых заданий, чтобы вы могли с полной уверенностью сказать, что отработали ту или иную тему по предмету.
		</div>
		<div>
			С нашей базой материалов при поддержке ваших наставников и проводников (<i>учителей</i>) вы сможете достичь больших высот в освоении того или иного материала.
		</div>
		<div>
			Не сдавайтесь и постигайте новые вершины! Хорошего изучения!
		</div>
		<p style="align-self: center; margin-top: 1%;">
			Доступные возможности
		</p>
		<div>
			Для отработки заданий по определённой теме - воспользуйтесь левым меню главной страницы. Выберите интересующий вас класс и предмет, затем перейдите по вкладке.
		</div>
		<div>
			Помимо генерации вариантов по конкретной теме - вы вполне можете сгенерировать вариант, подходящий под ваши цели. Если не понимаете какие-то конкретные темы - составьте вариант лишь из них!
		</div>
		<div>
			В конце, после того, как все задачи завершены - сохраните вариант себе на устройство и принесите учителю результаты, чтобы он помог вам проработать проблемные места в изучении материала
		</div>
		<div>
			Авторизируйтесь для сохранения статистики решённых вариантов, чтобы всегда можно было отследить прогресс изучения и то, насколько вы стали лучше в той или иной области!
		</div>
		<p style="align-self: center; margin-top: 1%;">
			Учителю
		</p>
		<div>
			Эта платформа является хорошим подспорьем для вас, чтобы централизованно отрабатывать с учениками западающие темы.
		</div>
		<div>
			Помните, что <i>Вы</i>, как проводник к новым знаниям, можете помочь и направить ваших учеников к новым, ещё неизведанным горизонтам!
			Выдавайте варианты, просите учеников отработать определённые темы, а затем с их вариантами задач - помогите им в совершенстве овладеть новой темой!
		</div>
		<p style="align-self: center; margin-top: 1%;">
			Послесловие
		</p>
		<div>
			Надеемся, что эта платформа поможет многим из вас улучшить свои навыки, а также сподвигнет каждого двигаться только вперёд!
		</div>
		<div>
			Удачи! Надеемся, что сотрудничество выйдет на славу и станет действительно громким!
		</div>
		<div style="align-self: center; margin-top: 3%;">
			<i>С уважением, команда разработчиков проекта <strong>Independent work trainer(c)</strong></i>
		</div>
		<p style="align-self: center; margin-top: 1%;">
			Контактная информация
		</p>
		<div>
			Для обсуждения сотрудничества используйте следующую почту:
			<a href="" onclick="copyToClipboard('independent.partnership@domain.com')" data-bs-toggle="tooltip" data-bs-placement="top" title="Скопировать в буфер обмена"><i>independent.partnership@domain.com</i></a>
		</div>
		<div>
			Для предложений (о новых функциях или обновлении старых) используйте следующую почту:
			<a href="" onclick="copyToClipboard('independent.suggest@domain.com')" data-bs-toggle="tooltip" data-bs-placement="top" title="Скопировать в буфер обмена"><i>independent.suggest@domain.com</i></a>
		</div>
	</div>
	<div class="d-flex justify-content-center" style="width: 100%; padding: 3%;">
		<a class="btn btn-primary align-self-center" role="button" href="/">На главную</a>
	</div>
</div>
<script>
	function copyToClipboard(text) {
		var dummy = document.createElement("textarea");
		document.body.appendChild(dummy);
		dummy.value = text;
		dummy.select();
		document.execCommand("copy");
		document.body.removeChild(dummy);
	}
</script>
<?php require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php"); ?>
