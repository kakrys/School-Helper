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
		$result = \Proj\Independent\Model\SubjectTable::getList(['select' => ['SUBJECT_NAME','CLASS' => 'CLASSES.CLASS_NUMBER']]);
		$selectionResult = $result->fetchAll();
		$subjects = array();

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