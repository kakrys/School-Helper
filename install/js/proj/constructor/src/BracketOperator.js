import {Operator} from "./Operator";

export class BracketOperator extends Operator{
	constructor(options = {}) {
		super(options);
		this.isPair = true;
		this.PairId = options.PairId;
	}

}