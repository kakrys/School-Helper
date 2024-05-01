<?php
namespace Proj\Independent\Math\Errors;
abstract class MathError
{
	public const ERROR_WRONG_MATH_EXECUTION = 0;
	public const ERROR_NOT_ENOUGH_ELEMENTS = 1;
	public const ERROR_NOT_ENOUGH_NUMBERS = 2;
	public const ERROR_DOUBLE_OPERATOR = 3;
	private int $code;
	private string $mess;
	private string $htmlCode = '';
	public function __construct(int $code = MathError::ERROR_WRONG_MATH_EXECUTION, string $mess = 'An error occurred during math execution')
	{
		$this->code = $code;
		$this->mess = $mess;
	}
	public function __toString():string
	{
		return $this->htmlCode;
	}

}