<?php
namespace Proj\Independent\Model;

use Bitrix\Main\Localization\Loc,
	Bitrix\Main\ORM\Data\DataManager,
	Bitrix\Main\ORM\Fields\IntegerField,
	Bitrix\Main\ORM\Fields\StringField,
	Bitrix\Main\ORM\Fields\Validators\LengthValidator;
use Bitrix\Main\ORM\Fields\Relations\Reference;
use Bitrix\Main\ORM\Query\Join;
use Bitrix\Main\UserTable;

Loc::loadMessages(__FILE__);

/**
 * Class UserTable
 *
 * Fields:
 * <ul>
 * <li> GENERATOR_CODE string(900) mandatory
 * <li> USER_ID int mandatory
 * </ul>
 *
 * @package Bitrix\Variant
 **/

class VariantUserTable extends DataManager
{
	/**
	 * Returns DB table name for entity.
	 *
	 * @return string
	 */
	public static function getTableName()
	{
		return 'proj_variant_user';
	}

	/**
	 * Returns entity map definition.
	 *
	 * @return array
	 */
	public static function getMap()
	{
		return [
			new StringField(
				'GENERATOR_CODE',
				[
					'primary' => true,
					'validation' => [__CLASS__, 'validateGeneratorCode'],
					'title' => Loc::getMessage('USER_ENTITY_GENERATOR_CODE_FIELD')
				]
			),
			new Reference(
				'GENERATOR_CODE',
				VariantUserTable::class,
				Join::on('this.GENERATOR_CODE','ref.GENERATOR_CODE')
			),
			new IntegerField(
				'USER_ID',
				[
					'primary' => true,
					'title' => Loc::getMessage('USER_ENTITY_USER_ID_FIELD')
				]
			),
			new Reference(
				'USER_ID',
				UserTable::class,
				Join::on('this.USER_ID','ref.ID')
			),
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
}
