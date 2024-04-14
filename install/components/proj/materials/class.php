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
		$this->arResult['CLASS'] = $data['class'];
		$this->arResult['SUBJECT'] = $data['subject'];
	}
}