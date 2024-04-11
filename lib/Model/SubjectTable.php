<?php
namespace Proj\Independent\Model;


use Bitrix\Main\ORM\Data\DataManager,
	Bitrix\Main\ORM\Fields\IntegerField,
	Bitrix\Main\ORM\Fields\StringField,
	Bitrix\Main\ORM\Fields\Validators\LengthValidator;
use Bitrix\Main\ORM\Fields\Relations\ManyToMany;

/**
 * Class SubjectTable
 *
 * Fields:
 * <ul>
 * <li> ID int mandatory
 * <li> SUBJECT_NAME string(100) mandatory
 * </ul>
 *
 * @package Bitrix\Subject
 **/

class SubjectTable extends DataManager
{
	/**
	 * Returns DB table name for entity.
	 *
	 * @return string
	 */
	public static function getTableName()
	{
		return 'proj_subject';
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
				'SUBJECT_NAME',
				[
					'required' => true,
					'validation' => [__CLASS__, 'validateSubjectName'],
				]
			),
			(new ManyToMany(
				'CLASSES',
				ClassTable::class)
			)->configureTableName('proj_class_subject'),
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