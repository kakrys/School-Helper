<?php
namespace Proj\Independent\Math\Objects;
use Proj\Independent\Math\Math;
/**
 * Describes methods to create/calculate or manipulate fractions
 */
class Fraction
{
	public int $numerator;
	public int $denominator;
	public int $integerPart;
	public float $value;
	private int $mode;
	public const SHORTENED = 0;
	public const NOT_SHORTENED = 1;

	/**Make a fraction from:
	 *integer or float at numerator/denominator positions
	 *
	 * Has 2 modes: SHORTENED for simplifying fraction by gcd and NOT_SHORTENED to avoid simplifying
	 */
	public function __construct(int|float|Fraction $numerator, int|float|Fraction $denominator = 1, int $mode = Fraction::SHORTENED)
	{
		$this->mode = match($mode)
		{
			Fraction::NOT_SHORTENED => Fraction::NOT_SHORTENED,
			default => Fraction::SHORTENED,
		};

		if ($numerator instanceof Fraction || $denominator instanceof Fraction)
		{
			$solveFraction = Fraction::divide($numerator, $denominator);
			$numerator = $solveFraction->numerator;
			$denominator = $solveFraction->denominator;
		}

		$this->value = $numerator/$denominator;
		$this->integerPart = (int)explode('.',$this->value)[0];
		if(is_float($numerator) || is_float($denominator))
		{
			$this->precisionFraction($numerator, $denominator);
		}
		else
		{
			$this->numerator = $numerator;
			$this->denominator = $denominator;
		}

		$this->precisionValue();
		$this->reduceFraction();

	}
	private function precisionValue():void
	{
		$numerator = $this->numerator;
		$denominator = $this->denominator;
		$denominatorDivisors = array_unique(Math::getDivisors($denominator));
		$periodDivisors = array_diff($denominatorDivisors, [1,2,5]);
		if (count($periodDivisors) == 0)
		{
			$this->value = $numerator/$denominator;
		}
	}
	private function reduceFraction():void
	{
		if($this->numerator == 0) return;
		if($this->mode == Fraction::SHORTENED)
		{
			$numerator = $this->numerator;
			$denominator = $this->denominator;
			$gcd = Math::gcd($numerator, $denominator);
			$this->numerator = $this->numerator / $gcd;
			$this->denominator = $this->denominator / $gcd;
		}
	}
	private function fractionFromFloat(float $a):Fraction
	{
		$degree = 0;
		while (str_contains((string)$a,'.'))
		{
			$a = $a*10;
			$degree++;
		}
		return new Fraction((int)$a, 10**$degree);
	}
	private function precisionFraction(int|float $numerator, int|float $denominator):void
	{
		if(is_float($numerator))
		{
			$numerator = $this->fractionFromFloat($numerator);
		}
		if(is_float($denominator))
		{
			$denominator = $this->fractionFromFloat($denominator);
		}
		$result = Fraction::divide($numerator, $denominator);
		$this->numerator = $result->numerator;
		$this->denominator = $result->denominator;
	}

	public static function divide(int|float|\Fraction $a, int|float|\Fraction $b):Fraction
	{
		if($a instanceof Fraction && $b instanceof Fraction)
		{
			if($b->numerator == 0 || $b->value == 0)
			{
				throw new ValueError('Division by zero');
			}
			$numA = $a->numerator;
			$denomA = $a->denominator;
			$numB = $b->numerator;
			$denomB = $b->denominator;
			return new Fraction($numA*$denomB, $numB*$denomA);
		}
		if($a instanceof Fraction)
		{
			$numA = $a->numerator;
			$denomA = $a->denominator;
			return new Fraction($numA, $denomA*$b);
		}
		if($b instanceof Fraction)
		{
			$numB = $b->numerator;
			$denomB = $b->denominator;
			return new Fraction($a*$denomB, $numB);
		}
		return new Fraction($a, $b);
	}
	public static function multiply(int|float|\Fraction $a, int|float|\Fraction $b):Fraction
	{
		if($a instanceof Fraction && $b instanceof Fraction)
		{
			$numA = $a->numerator;
			$denomA = $a->denominator;
			$numB = $b->numerator;
			$denomB = $b->denominator;
			return new Fraction($numA*$numB, $denomA*$denomB);
		}
		if($a instanceof Fraction)
		{
			$numA = $a->numerator;
			$denomA = $a->denominator;
			return new Fraction($numA*$b, $denomA);
		}
		if($b instanceof Fraction)
		{
			$numB = $b->numerator;
			$denomB = $b->denominator;
			return new Fraction($a*$numB, $denomB);
		}
		return new Fraction($a*$b);
	}
	public static function simplify(Fraction $fraction):Fraction
	{
		$numerator = $fraction->numerator;
		$denominator = $fraction->denominator;
		$gcd = Math::gcd($numerator, $denominator);
		return new Fraction($numerator/$gcd, $denominator/$gcd);
	}
	public static function lcm(Fraction $a, Fraction $b):int
	{
		$denomA = $a->denominator;
		$denomB = $b->denominator;
		return Math::lcm($denomA, $denomB);
	}
	public static function power(Fraction $fraction, int $exponent):Fraction
	{
		$numerator = $fraction->numerator;
		$denominator = $fraction->denominator;
		if($exponent < 0)
		{
			$exponent = abs($exponent);
			return new Fraction(pow($denominator, $exponent), pow($numerator, $exponent));
		}
		return new Fraction(pow($numerator, $exponent), pow($denominator, $exponent));
	}
	public function __toString():string
	{
		if (!str_contains((string)$this->value,'.'))
		{
			return $this->value;
		}
		return $this->numerator+$this->denominator*$this->integerPart . "/$this->denominator";
	}

	public function htmlRender():string
	{
		$html = "
			<div class='d-flex' style='justify-content: center; align-items: center;'>";
		if ($this->integerPart!=0)
		{
			$html .= $this->integerPart;
		}
		$html .="<div class='d-flex flex-column'>
					<div style='border-bottom: 1px solid black;align-self: center;'>
						".$this->numerator%$this->denominator."
					</div>
					<div style='align-self: center;'>
						$this->denominator
					</div>
				</div>
			</div>
		";
		return $html;
	}
}