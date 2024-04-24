/* eslint-disable */
this.BX = this.BX || {};
this.BX.Proj = this.BX.Proj || {};
(function (exports,proj_operators) {
	'use strict';

	var Option = BX.Proj.Independent.Option;
	var Operator = /*#__PURE__*/function (_Option) {
	  babelHelpers.inherits(Operator, _Option);
	  function Operator() {
	    var _this;
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, Operator);
	    _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Operator).call(this, options));
	    if (options.textView === undefined) {
	      _this.textView = 'null';
	    }
	    _this.textView = options.textView;
	    _this.isOperator = true;
	    _this.isDelitable = true;
	    _this.isPair = false;
	    _this.PairId = null;
	    _this.html = "<span id=\"".concat(_this.id, "\" data-instruction=\"").concat(_this.id, "\" onclick=\"generator.showOption(").concat(_this.id, ")\" class=\"border btn\" style=\"padding: 1%; margin:1%; background:").concat(_this.color, ";\">").concat(_this.optionName, "</span>");
	    return _this;
	  }
	  babelHelpers.createClass(Operator, [{
	    key: "render",
	    value: function render(mode) {
	      switch (mode) {
	        case 'text':
	          return "<span id=\"".concat(this.id, "\" data-instruction=\"").concat(this.id, "\" onclick=\"generator.showOption(").concat(this.id, ")\" class=\"border btn\" style=\"padding: 1%; margin:1%; background:").concat(this.color, ";\">").concat(this.textView, "</span>");
	        default:
	          return this.html;
	      }
	    }
	  }, {
	    key: "showOption",
	    value: function showOption() {
	      var html = "<p class=\"d-flex\">\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0430 c id=".concat(this.id, " \u0422\u0438\u043F:[").concat(this.optionName, "]</p>");
	      html += "<div class=\"form-group col-12\">\n\t\t\t\t\t<textarea class=\"form-control\" id=\"textArea_".concat(this.id, "\" rows=\"3\" placeholder=\"\u0412\u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u0442\u0435\u043A\u0441\u0442 \u0437\u0430\u0434\u0430\u043D\u0438\u044F\">").concat(this.text, "</textarea>\n\t\t\t\t</div>");
	      return html;
	    }
	  }]);
	  return Operator;
	}(Option);

	var Pointer = /*#__PURE__*/function (_Operator) {
	  babelHelpers.inherits(Pointer, _Operator);
	  function Pointer() {
	    var _this;
	    babelHelpers.classCallCheck(this, Pointer);
	    _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Pointer).call(this));
	    _this.optionName = '↑';
	    _this.type = 'pointer';
	    _this.html = _this.html = "<span id=\"instruction_".concat(_this.id, "\" data-instruction=\"").concat(_this.id, "\" onclick=\"generator.showOption(").concat(_this.id, ")\" \n\t\t\t\t\t\t\t\tstyle=\"color: blue; \n\t\t\t\t\t\t\t\tmax-height: 5%;\n\t\t\t\t\t\t\t\tmargin-top: 25px; \n\t\t\t\t\t\t\t\ttext-decoration: overline blue; \n\t\t\t\t\t\t\t\tpadding: 1%;\n\t\t\t\t\t\t\t\ttext-align: start; \n\t\t\t\t\t\t\t\tbackground:").concat(_this.color, ";\">").concat(_this.optionName, "</span>");
	    _this.isDelitable = false;
	    _this.id = -1;
	    _this.pos = 0;
	    _this.textView = '>|<';
	    return _this;
	  }
	  babelHelpers.createClass(Pointer, [{
	    key: "showOption",
	    value: function showOption() {
	      return '';
	    }
	  }]);
	  return Pointer;
	}(Operator);

	var AbsoluteOperator = /*#__PURE__*/function (_Operator) {
	  babelHelpers.inherits(AbsoluteOperator, _Operator);
	  function AbsoluteOperator() {
	    var _this;
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, AbsoluteOperator);
	    _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(AbsoluteOperator).call(this, options));
	    _this.isPair = true;
	    _this.PairId = options.PairId;
	    return _this;
	  }
	  return AbsoluteOperator;
	}(Operator);

	var BracketOperator = /*#__PURE__*/function (_Operator) {
	  babelHelpers.inherits(BracketOperator, _Operator);
	  function BracketOperator() {
	    var _this;
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, BracketOperator);
	    _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(BracketOperator).call(this, options));
	    _this.isPair = true;
	    _this.PairId = options.PairId;
	    return _this;
	  }
	  return BracketOperator;
	}(Operator);

	var DivOperator = /*#__PURE__*/function (_Operator) {
	  babelHelpers.inherits(DivOperator, _Operator);
	  function DivOperator() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, DivOperator);
	    return babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(DivOperator).call(this, options));
	  }
	  return DivOperator;
	}(Operator);

	var RandomOperator = /*#__PURE__*/function (_Operator) {
	  babelHelpers.inherits(RandomOperator, _Operator);
	  function RandomOperator() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, RandomOperator);
	    return babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(RandomOperator).call(this, options));
	  }
	  return RandomOperator;
	}(Operator);

	var MultiplyOperator = /*#__PURE__*/function (_Operator) {
	  babelHelpers.inherits(MultiplyOperator, _Operator);
	  function MultiplyOperator() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, MultiplyOperator);
	    return babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(MultiplyOperator).call(this, options));
	  }
	  return MultiplyOperator;
	}(Operator);

	var EqualOperator = /*#__PURE__*/function (_Operator) {
	  babelHelpers.inherits(EqualOperator, _Operator);
	  function EqualOperator() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, EqualOperator);
	    return babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(EqualOperator).call(this, options));
	  }
	  return EqualOperator;
	}(Operator);

	var MinusOperator = /*#__PURE__*/function (_Operator) {
	  babelHelpers.inherits(MinusOperator, _Operator);
	  function MinusOperator() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, MinusOperator);
	    return babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(MinusOperator).call(this, options));
	  }
	  return MinusOperator;
	}(Operator);

	var PlusOperator = /*#__PURE__*/function (_Operator) {
	  babelHelpers.inherits(PlusOperator, _Operator);
	  function PlusOperator() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, PlusOperator);
	    return babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(PlusOperator).call(this, options));
	  }
	  return PlusOperator;
	}(Operator);

	var PowerOperator = /*#__PURE__*/function (_Operator) {
	  babelHelpers.inherits(PowerOperator, _Operator);
	  function PowerOperator() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, PowerOperator);
	    return babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(PowerOperator).call(this, options));
	  }
	  return PowerOperator;
	}(Operator);

	var RootOperator = /*#__PURE__*/function (_Operator) {
	  babelHelpers.inherits(RootOperator, _Operator);
	  function RootOperator() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, RootOperator);
	    return babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(RootOperator).call(this, options));
	  }
	  return RootOperator;
	}(Operator);

	var RandNumberOption = BX.Proj.Independent.RandNumberOption;
	var RandNumberOperator = /*#__PURE__*/function (_RandNumberOption) {
	  babelHelpers.inherits(RandNumberOperator, _RandNumberOption);
	  function RandNumberOperator() {
	    var _this;
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, RandNumberOperator);
	    _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(RandNumberOperator).call(this, options));
	    if (options.textView === undefined) {
	      _this.textView = '[X]';
	    }
	    _this.textView = options.textView;
	    _this.isOperator = false;
	    _this.isDelitable = true;
	    _this.isPair = false;
	    _this.PairId = null;
	    _this.html = "<span id=\"".concat(_this.id, "\" data-instruction=\"").concat(_this.id, "\" onclick=\"generator.showOption(").concat(_this.id, ")\" class=\"border btn\" style=\"padding: 1%; margin:1%; background:").concat(_this.color, ";\">").concat(_this.optionName, "</span>");
	    return _this;
	  }
	  babelHelpers.createClass(RandNumberOperator, [{
	    key: "render",
	    value: function render(mode) {
	      switch (mode) {
	        case 'text':
	          return "<span id=\"instruction_".concat(this.id, "\" data-instruction=\"").concat(this.id, "\" onclick=\"generator.showOption(").concat(this.id, ")\" class=\"border btn\" style=\"padding: 1%; margin:1%; background:").concat(this.color, ";\">").concat(this.textView, "</span>");
	        default:
	          return this.html;
	      }
	    }
	  }]);
	  return RandNumberOperator;
	}(RandNumberOption);

	var AnswerOperator = /*#__PURE__*/function (_Operator) {
	  babelHelpers.inherits(AnswerOperator, _Operator);
	  function AnswerOperator() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, AnswerOperator);
	    return babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(AnswerOperator).call(this, options));
	  }
	  return AnswerOperator;
	}(Operator);

	var OptionList = BX.Proj.Independent.OptionList;
	var OperatorList = /*#__PURE__*/function (_OptionList) {
	  babelHelpers.inherits(OperatorList, _OptionList);
	  function OperatorList() {
	    var _this;
	    babelHelpers.classCallCheck(this, OperatorList);
	    _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(OperatorList).call(this));
	    _this.list.push(new Pointer({
	      type: 'pointer',
	      color: 'lightblue'
	    }));
	    _this.addedInstructions = 1;
	    _this.idCounter = 0;
	    _this.pointerPosition = 0;
	    return _this;
	  }
	  babelHelpers.createClass(OperatorList, [{
	    key: "checkPointerPosition",
	    value: function checkPointerPosition(newOperator) {
	      if (this.pointerPosition !== this.addedInstructions - 1) {
	        var listPart = Array.from(this.list);
	        this.list.splice(this.pointerPosition + 1);
	        listPart = listPart.splice(this.pointerPosition + 1);
	        this.list.push(newOperator);
	        console.log(this.list);
	        console.log(listPart);
	        this.list = this.list.concat(listPart);
	      } else {
	        this.list.push(newOperator);
	      }
	      this.addedInstructions += 1;
	      this.idCounter += 1;
	    }
	  }, {
	    key: "addInstruction",
	    value: function addInstruction(type, color) {
	      var newOperator = '';
	      switch (type) {
	        case 'ABS':
	          newOperator = new AbsoluteOperator({
	            id: this.idCounter,
	            type: type,
	            color: color,
	            textView: '|',
	            PairId: this.idCounter + 1
	          });
	          this.checkPointerPosition(newOperator);
	          this.movePointer('right');
	          newOperator = new AbsoluteOperator({
	            id: this.idCounter,
	            type: type,
	            color: color,
	            textView: '|',
	            PairId: this.idCounter - 1
	          });
	          break;
	        case 'Bracket':
	          newOperator = new BracketOperator({
	            id: this.idCounter,
	            type: type,
	            color: color,
	            textView: '(',
	            PairId: this.idCounter + 1
	          });
	          this.checkPointerPosition(newOperator);
	          this.movePointer('right');
	          newOperator = new BracketOperator({
	            id: this.idCounter,
	            type: type,
	            color: color,
	            textView: ')',
	            PairId: this.idCounter - 1
	          });
	          break;
	        case 'Div':
	          newOperator = new DivOperator({
	            id: this.idCounter,
	            type: type,
	            color: color,
	            textView: ':'
	          });
	          break;
	        case 'Equal':
	          newOperator = new EqualOperator({
	            id: this.idCounter,
	            type: type,
	            color: color,
	            textView: '='
	          });
	          break;
	        case 'Minus':
	          newOperator = new MinusOperator({
	            id: this.idCounter,
	            type: type,
	            color: color,
	            textView: '-'
	          });
	          break;
	        case 'Multiply':
	          newOperator = new MultiplyOperator({
	            id: this.idCounter,
	            type: type,
	            color: color,
	            textView: '*'
	          });
	          break;
	        case 'Plus':
	          newOperator = new PlusOperator({
	            id: this.idCounter,
	            type: type,
	            color: color,
	            textView: '+'
	          });
	          break;
	        case 'Power':
	          newOperator = new PowerOperator({
	            id: this.idCounter,
	            type: type,
	            color: color,
	            textView: '^'
	          });
	          break;
	        case 'rand.Number':
	          newOperator = new RandNumberOperator({
	            id: this.idCounter,
	            type: type,
	            color: color,
	            textView: '[X]'
	          });
	          break;
	        case 'Rand.Operation':
	          newOperator = new RandomOperator({
	            id: this.idCounter,
	            type: type,
	            color: color,
	            textView: '?¿'
	          });
	          break;
	        case 'Root':
	          newOperator = new RootOperator({
	            id: this.idCounter,
	            type: type,
	            color: color,
	            textView: '√¯'
	          });
	          break;
	        case 'Answer':
	          newOperator = new AnswerOperator({
	            id: this.idCounter,
	            type: type,
	            color: color,
	            textView: '=>'
	          });
	          break;
	        default:
	          newOperator = new Operator({
	            id: this.idCounter,
	            type: type,
	            color: color,
	            textView: 'null'
	          });
	          break;
	      }
	      this.checkPointerPosition(newOperator);
	      this.movePointer('right');
	      if (newOperator.isPair) {
	        this.movePointer('left');
	      }
	    }
	  }, {
	    key: "deleteLastInstruction",
	    value: function deleteLastInstruction() {
	      var _this2 = this;
	      if (this.pointerPosition === 0 || this.addedInstructions === 1) {
	        return;
	      }
	      if (this.list[this.pointerPosition - 1].isPair) {
	        var deletedId = this.list[this.pointerPosition - 1].id;
	        var listPart = Array.from(this.list);
	        this.list.splice(this.pointerPosition - 1);
	        listPart = listPart.splice(this.pointerPosition);
	        this.list = this.list.concat(listPart);
	        this.pointerPosition -= 1;
	        this.addedInstructions -= 1;
	        this.list.forEach(function (operator) {
	          if (operator.PairId === deletedId) {
	            var _listPart = Array.from(_this2.list);
	            var pos = _this2.list.indexOf(operator);
	            _this2.list.splice(pos);
	            _listPart = _listPart.splice(pos + 1);
	            _this2.list = _this2.list.concat(_listPart);
	            if (pos < _this2.pointerPosition) {
	              _this2.pointerPosition -= 1;
	            }
	            _this2.addedInstructions -= 1;
	          }
	        });
	      } else {
	        var _listPart2 = Array.from(this.list);
	        this.list.splice(this.pointerPosition - 1);
	        _listPart2 = _listPart2.splice(this.pointerPosition);
	        this.list = this.list.concat(_listPart2);
	        this.pointerPosition -= 1;
	        this.addedInstructions -= 1;
	      }
	    }
	  }, {
	    key: "showOption",
	    value: function showOption(id, container) {
	      var _this3 = this;
	      if (container.innerHTML === '<i>Щёлкните на любой добавленный элемент в поле инструкции генератора, чтобы изменить его свойства!</i>') {
	        this.openedInstruction = -1;
	      }
	      if (id === this.openedInstruction) return;
	      //		this.saveOpenedInstructionData();
	      this.openedInstruction = id;
	      this.list.forEach(function (operator) {
	        if (operator.id === id) {
	          container.innerHTML = operator.showOption();
	          _this3.list[id].registerEvents();
	          _this3.list[id].postUpdate();
	        }
	      });
	    }
	  }, {
	    key: "movePointer",
	    value: function movePointer(direction) {
	      if (this.list.length === 1) {
	        return;
	      }
	      var pointer = this.list[this.pointerPosition];
	      switch (direction) {
	        case 'left':
	          if (this.pointerPosition === 0) {
	            return;
	          }
	          var leftElement = this.list[this.pointerPosition - 1];
	          this.list[this.pointerPosition] = leftElement;
	          this.list[this.pointerPosition - 1] = pointer;
	          this.pointerPosition -= 1;
	          leftElement = undefined;
	          pointer = undefined;
	          break;
	        case 'right':
	          if (this.pointerPosition === this.list.length - 1) {
	            return;
	          }
	          var rightElement = this.list[this.pointerPosition + 1];
	          this.list[this.pointerPosition] = rightElement;
	          this.list[this.pointerPosition + 1] = pointer;
	          this.pointerPosition += 1;
	          rightElement = undefined;
	          pointer = undefined;
	          break;
	      }
	    }
	  }, {
	    key: "renderTextView",
	    value: function renderTextView() {
	      var html = '';
	      this.list.forEach(function (instruction) {
	        html += instruction.render('text');
	      });
	      return html;
	    }
	  }]);
	  return OperatorList;
	}(OptionList);

	exports.Operator = Operator;
	exports.OperatorList = OperatorList;

}((this.BX.Proj.Independent = this.BX.Proj.Independent || {}),BX));
