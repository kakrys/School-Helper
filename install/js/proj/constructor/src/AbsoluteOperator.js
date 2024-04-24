import {Operator} from "./Operator";

export class AbsoluteOperator extends Operator{
	constructor(options = {}) {
		super(options);
		this.isPair = true;
		this.PairId = options.PairId;
	}

}