<?php

class MainMenuComponent extends CBitrixComponent
{
	public function executeComponent()
	{
		$this->fetchGrades();
		$this->fetchSubjectList();
		$this->includeComponentTemplate();
	}

	protected function fetchSubjectList()
	{
		$selectionResult = \Proj\Independent\Repository\SubjectRepository::getClassAndSubject();
		$subjects = array();
		global $USER;
		foreach ($selectionResult as $item) {
			$class = $item['CLASS'];
			if (!isset($subjects[$class])) {
				$subjects[$class] = array();
			}
			$subjects[$class][] = $item['SUBJECT_NAME'];
		}
		$this->arResult['SUBJECTS'] = $subjects;
	}
	protected function fetchGrades(): void
	{
		$result = \Proj\Independent\Model\ClassTable::getList(['select' => ['CLASS_NUMBER']]);
		$classArray = $result->fetchAll();
		$grades = [];
		foreach ($classArray as $item)
		{
			$grades[] = $item["CLASS_NUMBER"];
		}
		$this->arResult['GRADES'] = $grades;
	}
}