<?php

require_once 'MathFunctions.php';
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
	public function __construct(int|float $numerator, int|float $denominator = 1, int $mode = Fraction::SHORTENED)
	{
		$this->mode = match($mode)
		{
			Fraction::NOT_SHORTENED => Fraction::NOT_SHORTENED,
			default => Fraction::SHORTENED,
		};

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
		$denominatorDivisors = array_unique(getDivisors($denominator));
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
			$gcd = gcd($numerator, $denominator);
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
		$gcd = gcd($numerator, $denominator);
		return new Fraction($numerator/$gcd, $denominator/$gcd);
	}
	public static function lcm(Fraction $a, Fraction $b):int
	{
		$denomA = $a->denominator;
		$denomB = $b->denominator;
		return lcm($denomA, $denomB);
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
		return "$this->numerator/$this->denominator";
	}
}

$frac1 = Fraction::divide(new Fraction(12,3.2),new Fraction(3.8,4));
$frac2 = Fraction::power(new Fraction(2,3),-2);
var_dump($frac1);
var_dump($frac2);
var_dump(Fraction::multiply($frac1, $frac2));
var_dump(new Fraction(33,27, mode:Fraction::NOT_SHORTENED));
var_dump(Fraction::simplify(new Fraction(33,27, mode:Fraction::NOT_SHORTENED)));
echo new Fraction(6,2);