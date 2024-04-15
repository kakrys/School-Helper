<?php
namespace Proj\Independent\Math;
/**
 * Brings standart math operators and methods like is_prime, gcd, lcm and so on
 */
class Math
{
	/**Calculates simple equations from string format like 3+2; 9*4 and so on.
	 *
	 * WITHOUT BRACKETS like '(' or '|' or '['!
	 * @param string $equation
	 * @return int|float
	 */
	public static function calculate(string $equation):int|float
	{
		$equation = str_replace('+-','-', $equation);
		$equation = str_replace('*+','*', $equation);
		$equation = str_replace('--','+', $equation);
		$equation = str_replace('-+','-', $equation);
		$equation = str_replace('++','+', $equation);
		if(str_contains($equation,'sqrt'))
		{
			$equation = str_replace('sqrt','',$equation);
			return pow(Math::calculate($equation), 0.5);
		}
		if(str_contains($equation,'|'))
		{
			$equation = str_replace('|','',$equation);
			return abs(Math::calculate($equation));
		}
		$equation = str_replace(['(',')'],'',$equation);
		$operators = [
			'^' => [
				'regExp' => '/\d+(\.\d+)?\^-?\d+(\.\d+)?/',
				'function' => function ($a, $b) { return pow($a, $b); }
			],
			'*' => [
				'regExp' => '/-?\d+(\.\d+)?\*-?\d+(\.\d+)?/',
				'function' => function ($a, $b) { return $a * $b; }
			],
			':' => [
				'regExp' => '/-?\d+(\.\d+)?\:-?\d+(\.\d+)?/',
				'function' => function ($a, $b) { return $a / $b; }
			],
			'/' => [
				'regExp' => '/-?\d+(\.\d+)?\/-?\d+(\.\d+)?/',
				'function' => function ($a, $b) { return $a / $b; }
			],
			'+' => [
				'regExp' => '/-?\d+(\.\d+)?\+\d+(\.\d+)?/',
				'function' => function ($a, $b) { return $a + $b; }
			],
			'-' => [
				'regExp' => '/-?\d+(\.\d+)?\-\d+(\.\d+)?/',
				'function' => function ($a, $b) { return $a - $b; }
			],
		];
		foreach ($operators as $operator => $arr)
		{
			while (preg_match($arr['regExp'], $equation, $matches))
			{
				#var_dump($matches);
				if (str_split($matches[0])[0] == $operator)
				{
					$values = explode($operator,$matches[0]);
					$result = $arr['function']((float)($operator . $values[1]),(float)$values[2]);
					#echo $result . "res\n";
				}
				else
				{
					$values = explode($operator,$matches[0]);
					$result = $arr['function']((float)$values[0],(float)$values[1]);
				}
				if ((float)($result) > 0)
				{
					$equation = str_replace($matches[0],"+" . $result, $equation);
				}
				else
				{
					$equation = str_replace($matches[0],$result, $equation);
				}
				$equation = str_replace('+-','-', $equation);
				$equation = str_replace('--','+', $equation);
				$equation = str_replace('-+','-', $equation);
				$equation = str_replace('++','+', $equation);
				$equation = str_replace('*+','*', $equation);
				if (str_split($equation)[0] == '+')
				{
					$equation = substr($equation,1);
				}
				#echo $equation . "eq\n";
			}
		}
		return (float)$equation;
	}

	/**Returns array of divisors for number include 1
	 * @param int $number
	 * @return int[]
	 */
	public static function getDivisors(int $number):array
	{
		if($number == 0)
		{
			throw new ValueError('0 has no divisors!');
		}
		$divisors = [1];
		if ($number == 1)
		{
			return $divisors;
		}
		$maxDivisor = (int)(sqrt(abs($number))) + 1;
		for ($i = 2; $i <= $maxDivisor + 1; $i++)
		{
			while ($number % $i == 0)
			{
				$divisors[] = $i;
				$number = $number / $i;
			}
		}
		if($number != 1)
		{
			$divisors[] = $number;
		}
		return $divisors;
	}

	/**Returns true if the number has no divisors except 1 and self
	 * @param int $number
	 * @return bool
	 */
	public static function is_prime(int $number):bool
	{
		if($number < 0)
		{
			throw new ValueError('Prime numbers is not declared to negatives');
		}
		if($number == 0 || $number == 1)
		{
			return false;
		}
		if ($number % 2 == 0)
		{
			return false;
		}
		$maxDivisor = (int)(sqrt(abs($number))) + 1;
		for ($i = 3; $i <= $maxDivisor + 1; $i+=2)
		{
			if ($number % $i == 0)
			{
				return false;
			}
		}
		return true;
	}

	/**Returns Greatest Common Divisor for numbers
	 * @param int $a
	 * @param int $b
	 * @return int gcd
	 */
	public static function gcd(int $a, int $b):int
	{
		$aDivisors = Math::getDivisors($a);
		$bDivisors = Math::getDivisors($b);
		$j = 0;
		$sameDivisors = [];
		while($j < count($bDivisors))
		{
			for ($i = 0; $i < count($aDivisors); $i++)
			{
				if ($aDivisors[$i] == $bDivisors[$j])
				{
					$sameDivisors[] = $aDivisors[$i];
					unset($aDivisors[$i]);
					unset($bDivisors[$j]);
					$j = 0;
					$bDivisors = array_values($bDivisors);
					$aDivisors = array_values($aDivisors);
					continue 2;
				}
			}
			$j++;
		}
		$result = 1;
		foreach ($sameDivisors as $divisor)
		{
			$result = $result * $divisor;
		}
		return $result;
	}

	/**Returns Least Common Multiple for numbers
	 * @param int $a
	 * @param int $b
	 * @return int lcm
	 */
	public static function lcm(int $a, int $b):int
	{
		$gcd = Math::gcd($a, $b);
		return $gcd * ($a/$gcd) * ($b/$gcd);
	}
}