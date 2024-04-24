<?php
namespace Proj\Independent\Model;

use Bitrix\Main\Localization\Loc,
	Bitrix\Main\ORM\Data\DataManager,
	Bitrix\Main\ORM\Fields\IntegerField,
	Bitrix\Main\ORM\Fields\StringField,
	Bitrix\Main\ORM\Fields\Validators\LengthValidator;
use Bitrix\Main\ORM\Fields\Relations\ManyToMany;
use Bitrix\Main\ORM\Fields\Relations\Reference;
use Bitrix\Main\ORM\Query\Join;

Loc::loadMessages(__FILE__);

/**
 * Class ExerciseTable
 *
 * Fields:
 * <ul>
 * <li> ID int mandatory
 * <li> EXERCISE_DESCRIPTION string(200) optional
 * <li> EXERCISE_CONDITION string(900) optional
 * <li> EXERCISE_GENERATOR_RULES string(900) optional
 * <li> GENERATOR_CODE string(100) optional
 * <li> ANSWER string(100) mandatory
 * <li> EXERCISE_ADDITION_FILE_PATH string(200) optional
 * <li> THEME_NAME string(100) optional
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
				'EXERCISE_DESCRIPTION',
				[
					'validation' => [__CLASS__, 'validateExerciseDescription'],
					'title' => Loc::getMessage('EXERCISE_ENTITY_EXERCISE_DESCRIPTION_FIELD')
				]
			),
			new StringField(
				'EXERCISE_CONDITION',
				[
					'validation' => [__CLASS__, 'validateExerciseCondition'],
					'title' => Loc::getMessage('EXERCISE_ENTITY_EXERCISE_CONDITION_FIELD')
				]
			),
			new StringField(
				'EXERCISE_GENERATOR_RULES',
				[
					'validation' => [__CLASS__, 'validateExerciseGeneratorRules'],
					'title' => Loc::getMessage('EXERCISE_ENTITY_EXERCISE_GENERATOR_RULES_FIELD')
				]
			),
			new StringField(
				'GENERATOR_CODE',
				[
					'validation' => [__CLASS__, 'validateGeneratorCode'],
					'title' => Loc::getMessage('EXERCISE_ENTITY_GENERATOR_CODE_FIELD')
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
			new StringField(
				'EXERCISE_ADDITION_FILE_PATH',
				[
					'validation' => [__CLASS__, 'validateExerciseAdditionFilePath'],
					'title' => Loc::getMessage('EXERCISE_ENTITY_EXERCISE_ADDITION_FILE_PATH_FIELD')
				]
			),
			new IntegerField(
				'THEME_ID',
				[
					'required' => true,
					'title' => Loc::getMessage('EXERCISE_ENTITY_THEME_ID_FIELD')
				]
			),
			new Reference(
				'THEME',
				ThemesTable::class,
				Join::on('this.THEME_ID','ref.ID')
			),
			(new ManyToMany(
				'VARIANTS',
				VariantTable::class)
			)->configureTableName('proj_exercise_variant'),
		];
	}

	/**
	 * Returns validators for EXERCISE_DESCRIPTION field.
	 *
	 * @return array
	 */
	public static function validateExerciseDescription()
	{
		return [
			new LengthValidator(null, 200),
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
	 * Returns validators for EXERCISE_GENERATOR_RULES field.
	 *
	 * @return array
	 */
	public static function validateExerciseGeneratorRules()
	{
		return [
			new LengthValidator(null, 900),
		];
	}

	/**
	 * Returns validators for GENERATOR_CODE field.
	 *
	 * @return array
	 */
	public static function validateGeneratorCode()
	{
		return [
			new LengthValidator(null, 100),
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

	/**
	 * Returns validators for EXERCISE_ADDITION_FILE_PATH field.
	 *
	 * @return array
	 */
	public static function validateExerciseAdditionFilePath()
	{
		return [
			new LengthValidator(null, 200),
		];
	}

	/**
	 * Returns validators for THEME_NAME field.
	 *
	 * @return array
	 */
	public static function validateThemeName()
	{
		return [
			new LengthValidator(null, 100),
		];
	}
}