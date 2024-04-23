<?php

use Proj\Independent\Model\ExerciseTable;
use Proj\Independent\Repository\MaterialsRepository;

class TrainerComponent extends CBitrixComponent
{
	public function executeComponent()
	{
		$this->generateUserVariant();
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
		$this->arResult['THEMES'] = MaterialsRepository::getThemesByClassAndSubject($class, $subject);
	}
	protected function generateUserVariant()
	{
		$request = \Bitrix\Main\Context::getCurrent()->getRequest();
		$isPost = $request->isPost();
		if ($isPost)
		{
			$themes = $request->getPostList()->toArray();
			$this->arResult['DATA'] = $themes;

			$getData = $request->getQueryList()->toArray();
			$generatorCode = md5(time());
			$classNumber = $getData['class'];
			$subject = $getData['subject'];
			$result = \Proj\Independent\Model\VariantTable::add(
				[
					'GENERATOR_CODE' => $generatorCode,
					'CLASS_NUMBER' => $classNumber,
					'SUBJECT_NAME' => $subject,
				]
			);
			//REFACTOR THIS!!!!!!!!!!!!!!!!
			if ($result->isSuccess())
			{
				$variantID = $result->getId();
				foreach ($themes as $themeID => $numberOfExercise)
				{
					if ($numberOfExercise !== '')
					{
						$exercises = ExerciseTable::getList([
																'select' => ['ID','ANSWER'],
																'filter' => ['THEME_ID' => $themeID],
																'runtime' => [
																	'RAND' => [
																		'data_type' => 'float',
																		'expression' => ['RAND()'],
																	],
																],
																'order' => ['RAND' => 'ASC'],
																'limit' => $numberOfExercise,
															]);
						foreach ($exercises as $exercise)
						{
							\Proj\Independent\Model\ExerciseVariantTable::add(
								[
									'EXERCISE_ID' => $exercise['ID'],
									'VARIANT_ID' => $variantID,
								]
							);
							$this->arResult['STUDENT_ANSWERS'][$exercise['ID']] = $exercise['ANSWER'];
						}
					}
				}
			}
			LocalRedirect("/exercises/{$generatorCode}");
		}
	}
}