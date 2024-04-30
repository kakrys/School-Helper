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
	public function __construct(int|float|Fraction|string $numerator, int|float|Fraction|string $denominator = 1, int $mode = Fraction::SHORTENED)
	{
		if (is_string($numerator) && !is_numeric($numerator))
		{
			if (str_contains($numerator,'/'))
			{
				str_replace(' ', '', $numerator);
				$numerator = explode('/',$numerator);
				$numerator = new Fraction($numerator[0], $numerator[1]);
			}
			else
			{
				throw new \Error("Wrong string on fraction's numerator");
			}
		}
		if (is_string($denominator) && !is_numeric($denominator))
		{
			if (str_contains($denominator,'/'))
			{
				str_replace(' ', '', $denominator);
				$denominator = explode('/',$denominator);
				$denominator = new Fraction($denominator[0], $denominator[1]);
			}
			else
			{
				throw new \Error("Wrong string on fraction's denominator");
			}
		}
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

	public static function divide(int|float|Fraction $a, int|float|Fraction $b):Fraction
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
	public static function multiply(int|float|Fraction $a, int|float|Fraction $b):Fraction
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
		return $this->numerator . "/$this->denominator";
	}
	public static function rand_fraction(int $min, int $max, array $fractionPropetries = ['AllTypes', 'AnyNumber', 'AnyShortedType']):Fraction|bool
	{
		$fractionShortType = $fractionPropetries[0];
		$fractionNumberType = $fractionPropetries[1];
		$fractionView = $fractionPropetries[2];
		$numerator = mt_rand($min, $max);
		$denominator = mt_rand($min,$max);
		if ($min === $max)
		{
			return new Fraction($numerator, 1, Fraction::NOT_SHORTENED);
		}
		switch ($fractionView)
		{
			case 'Correct':
				$startTime = microtime();
				$endTime = $startTime + 5;
				while ($numerator >= $denominator)
				{
					$numerator = mt_rand($min, $max);
					$denominator = mt_rand($min,$max);
					if (time()>=$endTime)
					{
						return false;
					}
				}
				break;
			case 'Incorrect':
				$startTime = microtime();
				$endTime = $startTime + 5;
				while ($numerator <= $denominator)
				{
					$numerator = mt_rand($min, $max);
					$denominator = mt_rand($min,$max);
					if (time()>=$endTime)
					{
						return false;
					}
				}
				break;
			default:
				$numerator = mt_rand($min, $max);
				$denominator = mt_rand($min,$max);
				break;
		}
		$rationalDenominator = [1, 2, 5];
		switch ($fractionNumberType)
		{
			case 'Rational':
				$startTime = time();
				$endTime = $startTime + 5;
				while (count(array_diff(Math::getDivisors($denominator), $rationalDenominator)) !== 0)
				{
					$denominator = mt_rand($min,$max);
					if (time()>=$endTime)
					{
						return false;
					}
				}
				if ($fractionView === 'Correct' && $numerator > $denominator)
				{
					$denominator = $denominator * 2;
					$numerator = (int)($numerator / 2);
				}
				break;
			case 'Irrational':
				$startTime = microtime();
				$endTime = $startTime + 5;
				while (count(array_diff($rationalDenominator, Math::getDivisors($denominator))) === 0)
				{
					$denominator = mt_rand($min,$max);
					if (time()>=$endTime)
					{
						return false;
					}
				}
				if ($fractionView === 'Correct' && $numerator > $denominator)
				{
					$denominator = $denominator * 2;
					$numerator = (int)($numerator / 2);
				}
				break;
			default:
				break;
		}
		if ($numerator === $denominator)
		{
			return Fraction::rand_fraction($min, $max, $fractionPropetries);
		}
		switch ($fractionShortType)
		{
			case 0:
				return new Fraction($numerator, $denominator, Fraction::SHORTENED);
			case 1:
				return new Fraction($numerator, $denominator, Fraction::NOT_SHORTENED);
			default:
				$fractionType = array_rand([0,1]);
				return new Fraction($numerator, $denominator, $fractionType);
		}
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