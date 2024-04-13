<?php

class MaterialsComponent extends CBitrixComponent
{
	public function executeComponent()
	{
		$this->getGrades();
		$this->includeComponentTemplate();
	}

	protected function getGrades()
	{
		$request = \Bitrix\Main\Context::getCurrent()->getRequest();
		$this->arResult['CLASS'] = $request->getQueryList()->toArray()['class'];
		$this->arResult['SUBJECT'] = $request->getQueryList()->toArray()['subject'];
	}
}