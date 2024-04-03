<?php
namespace Bitrix\Exercise;

use Bitrix\Main\Localization\Loc,
	Bitrix\Main\ORM\Data\DataManager,
	Bitrix\Main\ORM\Fields\IntegerField,
	Bitrix\Main\ORM\Fields\StringField,
	Bitrix\Main\ORM\Fields\Validators\LengthValidator;

Loc::loadMessages(__FILE__);

/**
 * Class ExerciseTable
 *
 * Fields:
 * <ul>
 * <li> ID int mandatory
 * <li> EXERCISE_CONDITION string(900) mandatory
 * <li> ANSWER string(100) mandatory
 * </ul>
 *
 * @package Bitrix\Exercise
 **/

class ExerciseTable extends DataManager
{
	/**
	 * Returns DB table name for entity.
	 *
	 * @return string
	 */
	public static function getTableName()
	{
		return 'proj_exercise';
	}

	/**
	 * Returns entity map definition.
	 *
	 * @return array
	 */
	public static function getMap()
	{
		return [
			new IntegerField(
				'ID',
				[
					'primary' => true,
					'autocomplete' => true,
					'title' => Loc::getMessage('EXERCISE_ENTITY_ID_FIELD')
				]
			),
			new StringField(
				'EXERCISE_CONDITION',
				[
					'required' => true,
					'validation' => [__CLASS__, 'validateExerciseCondition'],
					'title' => Loc::getMessage('EXERCISE_ENTITY_EXERCISE_CONDITION_FIELD')
				]
			),
			new StringField(
				'ANSWER',
				[
					'required' => true,
					'validation' => [__CLASS__, 'validateAnswer'],
					'title' => Loc::getMessage('EXERCISE_ENTITY_ANSWER_FIELD')
				]
			),
		];
	}

	/**
	 * Returns validators for EXERCISE_CONDITION field.
	 *
	 * @return array
	 */
	public static function validateExerciseCondition()
	{
		return [
			new LengthValidator(null, 900),
		];
	}

	/**
	 * Returns validators for ANSWER field.
	 *
	 * @return array
	 */
	public static function validateAnswer()
	{
		return [
			new LengthValidator(null, 100),
		];
	}
}