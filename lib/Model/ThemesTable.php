<?php
namespace Proj\Independent\Model;

use Bitrix\Main\Localization\Loc,
	Bitrix\Main\ORM\Data\DataManager,
	Bitrix\Main\ORM\Fields\IntegerField,
	Bitrix\Main\ORM\Fields\StringField,
	Bitrix\Main\ORM\Fields\Validators\LengthValidator;
use Bitrix\Main\ORM\Fields\Relations\Reference;
use Bitrix\Main\ORM\Query\Join;

/**
 * Class ThemesTable
 *
 * Fields:
 * <ul>
 * <li> ID int mandatory
 * <li> NAME string(100) mandatory
 * <li> DESCRIPTION string(500) mandatory
 * <li> VIDEO_LINK string(500) optional
 * <li> LITERATURE_LINK string(500) optional
 * <li> USEFUL_LINK string(500) optional
 * <li> SUMMARY_LINK string(500) optional
 * <li> CLASS_NUMBER string(100) mandatory
 * <li> SUBJECT_NAME string(100) mandatory
 * </ul>
 *
 * @package Bitrix\Themes
 **/

class ThemesTable extends DataManager
{
	/**
	 * Returns DB table name for entity.
	 *
	 * @return string
	 */
	public static function getTableName()
	{
		return 'proj_themes';
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
				]
			),
			new StringField(
				'NAME',
				[
					'required' => true,
					'validation' => [__CLASS__, 'validateName'],
				]
			),
			new StringField(
				'DESCRIPTION',
				[
					'required' => true,
					'validation' => [__CLASS__, 'validateDescription'],
				]
			),
			new StringField(
				'VIDEO_LINK',
				[
					'validation' => [__CLASS__, 'validateVideoLink'],
				]
			),
			new StringField(
				'LITERATURE_LINK',
				[
					'validation' => [__CLASS__, 'validateLiteratureLink'],
				]
			),
			new StringField(
				'USEFUL_LINK',
				[
					'validation' => [__CLASS__, 'validateUsefulLink'],
				]
			),
			new StringField(
				'SUMMARY_LINK',
				[
					'validation' => [__CLASS__, 'validateSummaryLink'],
				]
			),
			new StringField('CLASS_NUMBER'),
			new Reference(
				'CLASS',
				ClassTable::class,
				Join::on('this.CLASS_NUMBER', 'ref.CLASS_NUMBER')
			),

			new StringField('SUBJECT_NAME'),
			new Reference(
				'SUBJECT',
				SubjectTable::class,
				Join::on('this.SUBJECT_NAME', 'ref.SUBJECT_NAME')
			),
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

	/**
	 * Returns validators for DESCRIPTION field.
	 *
	 * @return array
	 */
	public static function validateDescription()
	{
		return [
			new LengthValidator(null, 500),
		];
	}

	/**
	 * Returns validators for VIDEO_LINK field.
	 *
	 * @return array
	 */
	public static function validateVideoLink()
	{
		return [
			new LengthValidator(null, 500),
		];
	}

	/**
	 * Returns validators for LITERATURE_LINK field.
	 *
	 * @return array
	 */
	public static function validateLiteratureLink()
	{
		return [
			new LengthValidator(null, 500),
		];
	}

	/**
	 * Returns validators for USEFUL_LINK field.
	 *
	 * @return array
	 */
	public static function validateUsefulLink()
	{
		return [
			new LengthValidator(null, 500),
		];
	}

	/**
	 * Returns validators for SUMMARY_LINK field.
	 *
	 * @return array
	 */
	public static function validateSummaryLink()
	{
		return [
			new LengthValidator(null, 500),
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
}