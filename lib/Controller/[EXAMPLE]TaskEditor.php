<?php

namespace Up\Tasks\Controller;
use Bitrix\Main\Application;
use Bitrix\Main\Engine\Controller;
use Bitrix\Main\Engine\ActionFilter;
class TaskEditor extends Controller
{
	protected function getDefaultPreFilters()
	{
		return [
			new ActionFilter\Csrf(),
			new ActionFilter\HttpMethod([ActionFilter\HttpMethod::METHOD_POST])
		];
	}

	private function getPostValue(string $value):mixed
	{
		return \Bitrix\Main\Application::getInstance()->getContext()->getRequest()->getPost($value);
	}

	private function redirect():void
	{
		header('Location: /');
	}
	public function addAction():void
	{
		$name = $this->getPostValue('task_name');
		\up\tasks\Model\TasksTable::add(['NAME' => $name]);
		$this->redirect();
	}
	public function deleteAction():void
	{
		$id = $this->getPostValue('task_id');
		\up\tasks\Model\TasksTable::delete($id);
		$this->redirect();
	}
}