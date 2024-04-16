<?php

interface Equation
{
	public function getAnswer(): string|array;
	public function solve(): string|array;
	public function __toString():string;
}