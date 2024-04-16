<?php

use Proj\Independent\Repository\MaterialsRepository;

class MaterialsComponent extends CBitrixComponent
{
	public function executeComponent()
	{
		// $this->checkValidUrl();
		$this->fetchThemes();
		$this->includeComponentTemplate();
	}

	protected function fetchThemes(): void
	{
		$request = \Bitrix\Main\Context::getCurrent()->getRequest();
		$data = $request->getQueryList()->toArray();
		$class = $data['class'];
		$subject = $data['subject'];
		$this->arResult['CLASS'] = $class;
		$this->arResult['SUBJECT'] = $subject;
		$this->arResult['THEMES'] = MaterialsRepository::getThemesByClassAndSubject($class,$subject);
	}

	protected function checkValidUrl()
	{
		$request = \Bitrix\Main\Context::getCurrent()->getRequest();
		$data = $request->getQueryList()->toArray();
		$class = $data['class'];
		$subject = $data['subject'];
		$result = \Proj\Independent\Model\ClassTable::getList([
																   'select' => ['ID'],
																   'filter' => [
																	   '=CLASS_NUMBER' => $class,
																   ]]);
		// var_dump($result->fetchAll());
		$classIsset = !empty($result->fetchAll());

		$result = \Proj\Independent\Model\SubjectTable::getList([
																  'select' => ['ID'],
																  'filter' => [
																	  '=SUBJECT_NAME' => $subject,
																  ]]);
		$subjectIsset = !empty($result->fetchAll());

		if (!$subjectIsset || !$classIsset)
		{
			LocalRedirect('/');
		}
	}
}