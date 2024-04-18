<?php

class GeneratorComponent extends CBitrixComponent
{
	public function executeComponent()
	{
		$this->setData();
		$this->includeComponentTemplate();

	}
	private function setData():void
	{
		$data = \Proj\Independent\Repository\GeneratorRepository::getThemesByClassAndSubject();
		$this->arResult['CST_DATA'] = $data;
	}
}