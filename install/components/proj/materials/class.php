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
		$themes = MaterialsRepository::getThemesByClassAndSubject($class,$subject);
		// if (empty($themes))
		// {
		// 	LocalRedirect('/404');
		// }
		$this->arResult['THEMES'] = $themes;
	}
}