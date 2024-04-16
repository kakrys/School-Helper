<?php

class MaterialsComponent extends CBitrixComponent
{
	public function executeComponent()
	{
		$this->getCurrentClassAndSubject();
		$this->includeComponentTemplate();
	}

	protected function getCurrentClassAndSubject()
	{
		$request = \Bitrix\Main\Context::getCurrent()->getRequest();
		$data = $request->getQueryList()->toArray();
		$class = $data['class'];
		$subject = $data['subject'];
		$this->arResult['CLASS'] = $class;
		$this->arResult['SUBJECT'] = $subject;
		// $result = \Proj\Independent\Model\ClassTable::getList(['select' => ['CLASS_NUMBER']]);
		// $classArray = $result->fetchAll();
		$result = \Proj\Independent\Model\ThemesTable::getList([
			'select' => ['*'],
			'filter' => [
				'=CLASS_NUMBER' => $class,
				'=SUBJECT_NAME' => $subject
				]]);
		$this->arResult['THEMES'] = $result->fetchAll();
	}
}