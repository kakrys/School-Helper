<?php

use Bitrix\Main\Context;

class AdminComponent extends CBitrixComponent
{
	public function executeComponent()
	{
		$this->checkRole();
		$this->fetchClassAndSubject();
		$this->fetchBugList();
		$this->fetchClasses();
		$this->addClass();
		$this->addSubject();
		$this->includeComponentTemplate();
	}
	protected function checkRole(): void
	{
		$role = \Proj\Independent\Repository\UserRepository::getCurrentUserWorkPosition();
		if (!isset($role) || $role !== 'admin')
		{
			LocalRedirect('/login');
		}
	}

	protected function fetchBugList()
	{
		$this->arResult['BUG_LIST'] = \Proj\Independent\Repository\BugRepository::getBugListForAdmin();
	}

	protected function fetchClassAndSubject()
	{
		$data = \Proj\Independent\Repository\SubjectRepository::getClassAndSubject();
		$this->arResult['SUBJECTS'] = $data;
	}

	protected function addClass()
	{
		$request = \Bitrix\Main\Context::getCurrent()->getRequest();
		$classNumber = $request->getPostList()->toArray()['CLASS_NUMBER'];
		if (isset($classNumber) && check_bitrix_sessid())
		{
			$pattern = '/[а-яёА-ЯЁa-zA-Z0-9]+/u';
			preg_match($pattern, $classNumber, $matches);
			$duplicateClassNumber = \Proj\Independent\Repository\ClassRepository::getClassIdByClassNumber($classNumber);
			if ($matches[0] === $classNumber && empty($duplicateClassNumber))
			{
				\Proj\Independent\Repository\ClassRepository::addClass($classNumber);
			}
		}
	}

	protected function fetchClasses()
	{
		$result = \Proj\Independent\Model\ClassTable::getList(['select' => ['ID','CLASS_NUMBER']]);
		$this->arResult['CLASSES'] = $result->fetchAll();
	}

	protected function addSubject()
	{
		$request = \Bitrix\Main\Context::getCurrent()->getRequest();
		$data = $request->getPostList()->toArray();
		$subjectName = $data['SUBJECT_NAME'];
		$subjectName = ucfirst(mb_convert_case($subjectName,MB_CASE_LOWER));
		$classID = $data['CLASS_ID'];
		if ($subjectName!=='' && check_bitrix_sessid())
		{
			$pattern = '/[а-яёА-ЯЁa-zA-Z]+\s*[а-яёА-ЯЁa-zA-Z]+/u';
			preg_match($pattern, $subjectName, $matches);
			$subjectID = \Proj\Independent\Repository\SubjectRepository::getSubjectIdBySubjectName($subjectName);
			if ($matches[0] === $subjectName)
			{
				if (!empty($subjectID))
				{
					$subjectNotExistsInClass = empty(\Proj\Independent\Repository\ClassRepository::getClassAndSubjectIDConnections($classID,$subjectID));
					if ($subjectNotExistsInClass)
					{
						\Proj\Independent\Repository\ClassRepository::addSubjectToClass($classID,$subjectID);
					}
				}
				else
				{
					$subjectID = \Proj\Independent\Repository\SubjectRepository::addSubject($subjectName);
					\Proj\Independent\Repository\ClassRepository::addSubjectToClass($classID,$subjectID);
				}
			}
		}
	}

}