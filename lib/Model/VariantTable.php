<?php
namespace Proj\Independent\Model;

use Bitrix\Main\Localization\Loc,
	Bitrix\Main\ORM\Data\DataManager,
	Bitrix\Main\ORM\Fields\IntegerField,
	Bitrix\Main\ORM\Fields\StringField,
	Bitrix\Main\ORM\Fields\Validators\LengthValidator;
use Bitrix\Main\ORM\Fields\Relations\ManyToMany;

Loc::loadMessages(__FILE__);

/**
 * Class VariantTable
 *
 * Fields:
 * <ul>
 * <li> ID int mandatory
 * <li> GENERATOR_CODE string(900) optional
 * <li> CLASS_NUMBER string(100) mandatory
 * <li> SUBJECT_NAME string(100) mandatory
 * <li> NAME string(100) optional
 * </ul>
 *
 * @package Bitrix\Variant
 **/

class VariantTable extends DataManager
{
	/**
	 * Returns DB table name for entity.
	 *
	 * @return string
	 */
	public static function getTableName()
	{
		return 'proj_variant';
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
					'title' => Loc::getMessage('VARIANT_ENTITY_ID_FIELD')
				]
			),
			new StringField(
				'GENERATOR_CODE',
				[
					'validation' => [__CLASS__, 'validateGeneratorCode'],
					'title' => Loc::getMessage('VARIANT_ENTITY_GENERATOR_CODE_FIELD')
				]
			),
			new StringField(
				'CLASS_NUMBER',
				[
					'required' => true,
					'validation' => [__CLASS__, 'validateClassNumber'],
					'title' => Loc::getMessage('VARIANT_ENTITY_CLASS_NUMBER_FIELD')
				]
			),
			new StringField(
				'SUBJECT_NAME',
				[
					'required' => true,
					'validation' => [__CLASS__, 'validateSubjectName'],
					'title' => Loc::getMessage('VARIANT_ENTITY_SUBJECT_NAME_FIELD')
				]
			),
			new StringField(
				'NAME',
				[
					'validation' => [__CLASS__, 'validateName'],
					'title' => Loc::getMessage('VARIANT_ENTITY_NAME_FIELD')
				]
			),
			(new ManyToMany(
				'EXERCISES',
				ExerciseTable::class)
			)->configureTableName('proj_exercise_variant'),
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
			new LengthValidator(null, 900),
		];
	}

	/**
	 * Returns validators for CLASS_NUMBER field.
	 *
	 * @return array
	 */
	public static function validateClassNumber()
	{
		return [
			new LengthValidator(null, 100),
		];
	}

	/**
	 * Returns validators for SUBJECT_NAME field.
	 *
	 * @return array
	 */
	public static function validateSubjectName()
	{
		return [
			new LengthValidator(null, 100),
		];
	}

	/**
	 * Returns validators for NAME field.
	 *
	 * @return array
	 */
	public static function validateName()
	{
		return [
			new LengthValidator(null, 100),
		];
	}
}