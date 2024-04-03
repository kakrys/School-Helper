<?php

abstract class Equation
{
	public string $condition;
	public array $answer;
	public string $mainVariable;
	public function solve():string|array
	{
		return $this->answer;
	}
	public function __toString():string
	{
		return $this->condition;
	}
}