<?php
#lcm и gcd

/**Returns array of divisors for number include 1
 * @param int $number
 * @return int[]
 */
function getDivisors(int $number):array
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
function is_prime(int $number):bool
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
function gcd(int $a, int $b):int
{
	$aDivisors = getDivisors($a);
	$bDivisors = getDivisors($b);
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
function lcm(int $a, int $b):int
{
	$gcd = gcd($a, $b);
	return $gcd * ($a/$gcd) * ($b/$gcd);
}