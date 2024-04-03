<?php
interface Exercise
{
	public function getExercise(): string;
	public function setExercise(): void;
	public function solve(): mixed;
	public function __toString(): string;
}