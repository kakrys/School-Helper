/* eslint-disable */
this.BX = this.BX || {};
this.BX.Proj = this.BX.Proj || {};
(function (exports,main_core) {
	'use strict';

	function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
	function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
	function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
	var ClassSubjectThemeMenu = /*#__PURE__*/function () {
	  function ClassSubjectThemeMenu() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, ClassSubjectThemeMenu);
	    if (main_core.Type.isStringFilled(options.rootNodeId)) {
	      this.rootNodeId = options.rootNodeId;
	    } else {
	      throw new Error('ClassSubjectThemeMenu: options.rootNodeId required');
	    }
	    this.rootNodeId = document.getElementById(this.rootNodeId);
	    if (!this.rootNodeId) {
	      throw new Error("ClassSubjectThemeMenu: element with id \"".concat(this.rootNodeId, "\" not found"));
	    }
	    this.data = options.data;
	    this.menu2 = document.getElementById('subjectDropdownContainer');
	    this.menu3 = document.getElementById('topicDropdownContainer');
	  }
	  babelHelpers.createClass(ClassSubjectThemeMenu, [{
	    key: "updateMenu2",
	    value: function updateMenu2(value) {
	      var newHtml = '';
	      this.menu2.innerHTML = '';
	      newHtml = '<button class="btn btn-secondary dropdown-toggle" data-value="null" type="button" id="subjectDropdown" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">Выберите предмет</button>';
	      newHtml += '<ul class="dropdown-menu" aria-labelledby="subjectDropdown" style="overflow-y: auto; max-height: 10vh;">';
	      for (var grade in this.data) {
	        if (grade === value) {
	          if (Array.isArray(this.data[grade])) {
	            var _iterator = _createForOfIteratorHelper(this.data[grade]),
	              _step;
	            try {
	              for (_iterator.s(); !(_step = _iterator.n()).done;) {
	                var subject = _step.value;
	                newHtml += '<li><a class="dropdown-item" data-value="' + subject + '" onclick="topMenu.changeSubjectValue(this)">' + subject + '</a></li>';
	              }
	            } catch (err) {
	              _iterator.e(err);
	            } finally {
	              _iterator.f();
	            }
	          } else {
	            for (var _subject in this.data[grade]) {
	              newHtml += '<li><a class="dropdown-item" data-value="' + _subject + '" onclick="topMenu.changeSubjectValue(this)">' + _subject + '</a></li>';
	            }
	          }
	          newHtml += '</ul>';
	          this.menu2.innerHTML = newHtml;
	          this.menu2.classList.remove("invisible");
	          return;
	        }
	      }
	      this.menu2.classList.add("invisible");
	    }
	  }, {
	    key: "updateMenu3",
	    value: function updateMenu3(value) {
	      var grade = document.getElementById('gradeDropdown').getAttribute('data-value');
	      var newHtml = '';
	      this.menu3.innerHTML = '';
	      newHtml = '<button class="btn btn-secondary dropdown-toggle" data-value="null" type="button" id="topicDropdown" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">Выберите тему</button>';
	      newHtml += '<ul class="dropdown-menu" aria-labelledby="topicDropdown" style="overflow-y: auto; max-height: 10vh;">';
	      if (Array.isArray(this.data[grade])) {
	        var _iterator2 = _createForOfIteratorHelper(this.data[grade]),
	          _step2;
	        try {
	          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
	            var subject = _step2.value;
	            if (subject === value) {
	              if (this.data[grade][subject] === undefined) {
	                this.menu3.classList.add("invisible");
	                return;
	              }
	              if (Array.isArray(this.data[grade][subject])) {
	                var _iterator3 = _createForOfIteratorHelper(this.data[grade][subject]),
	                  _step3;
	                try {
	                  for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
	                    var topic = _step3.value;
	                    newHtml += '<li><a class="dropdown-item" data-value="' + topic + '" onclick="topMenu.changeTopicValue(this)">' + topic + '</a></li>';
	                  }
	                } catch (err) {
	                  _iterator3.e(err);
	                } finally {
	                  _iterator3.f();
	                }
	              } else {
	                if (this.data[grade][subject] === '') {
	                  this.menu3.classList.add("invisible");
	                  return;
	                }
	                for (var _topic in this.data[grade][subject]) {
	                  newHtml += '<li><a class="dropdown-item" data-value="' + _topic + '" onclick="topMenu.changeTopicValue(this)">' + _topic + '</a></li>';
	                }
	              }
	              newHtml += '</ul>';
	              this.menu3.innerHTML = newHtml;
	              this.menu3.classList.remove("invisible");
	              return;
	            }
	          }
	        } catch (err) {
	          _iterator2.e(err);
	        } finally {
	          _iterator2.f();
	        }
	      } else {
	        for (var _subject2 in this.data[grade]) {
	          if (_subject2 === value) {
	            if (this.data[grade][_subject2] === undefined) {
	              this.menu3.classList.add("invisible");
	              return;
	            }
	            if (Array.isArray(this.data[grade][_subject2])) {
	              var _iterator4 = _createForOfIteratorHelper(this.data[grade][_subject2]),
	                _step4;
	              try {
	                for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
	                  var _topic2 = _step4.value;
	                  newHtml += '<li><a class="dropdown-item" data-value="' + _topic2 + '" onclick="topMenu.changeTopicValue(this)">' + _topic2 + '</a></li>';
	                }
	              } catch (err) {
	                _iterator4.e(err);
	              } finally {
	                _iterator4.f();
	              }
	            } else {
	              if (this.data[grade][_subject2] === '') {
	                this.menu3.classList.add("invisible");
	                return;
	              }
	              for (var _topic3 in this.data[grade][_subject2]) {
	                newHtml += '<li><a class="dropdown-item" data-value="' + _topic3 + '" onclick="topMenu.changeTopicValue(this)">' + _topic3 + '</a></li>';
	              }
	            }
	            newHtml += '</ul>';
	            this.menu3.innerHTML = newHtml;
	            this.menu3.classList.remove("invisible");
	            return;
	          }
	        }
	      }
	      this.menu3.classList.add("invisible");
	    }
	  }, {
	    key: "changeGradeValue",
	    value: function changeGradeValue(element) {
	      var $mainButton = document.getElementById('gradeDropdown');
	      $mainButton.innerText = element.innerText;
	      $mainButton.setAttribute('data-value', element.getAttribute('data-value'));
	      this.menu3.classList.add("invisible");
	      this.updateMenu2(element.getAttribute('data-value'));
	    }
	  }, {
	    key: "changeSubjectValue",
	    value: function changeSubjectValue(element) {
	      var $mainButton = document.getElementById('subjectDropdown');
	      $mainButton.innerText = element.innerText;
	      $mainButton.setAttribute('data-value', element.getAttribute('data-value'));
	      this.updateMenu3(element.getAttribute('data-value'));
	    }
	  }, {
	    key: "changeTopicValue",
	    value: function changeTopicValue(element) {
	      var $mainButton = document.getElementById('topicDropdown');
	      $mainButton.innerText = element.innerText;
	      $mainButton.setAttribute('data-value', element.getAttribute('data-value'));
	    }
	  }]);
	  return ClassSubjectThemeMenu;
	}();

	var Generator = /*#__PURE__*/function () {
	  function Generator() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, Generator);
	    if (main_core.Type.isStringFilled(options.rootNodeId)) {
	      this.rootNodeId = options.rootNodeId;
	    } else {
	      throw new Error('Generator: options.rootNodeId required');
	    }
	    this.rootNodeId = document.getElementById(this.rootNodeId);
	    if (!this.rootNodeId) {
	      throw new Error("Generator: element with id \"".concat(this.rootNodeId, "\" not found"));
	    }
	    this.optionClassName = options.optionClassName;
	    this.instructionsContainer = document.getElementById('instructionsContainer');
	    this.parametersContainer = document.getElementById('parametersContainer');
	    this.addedInstructions = 0;
	  }
	  babelHelpers.createClass(Generator, [{
	    key: "addObjectToInstructions",
	    value: function addObjectToInstructions(type, color) {
	      if (this.instructionsContainer.innerHTML === '<i>Пока тут пусто. Выберите элементы из управления ниже, чтобы начать писать инструкцию!</i>') {
	        this.addedInstructions = 1;
	        this.instructionsContainer.innerHTML = '<span id="instruction' + this.addedInstructions + '" data-instruction="' + this.addedInstructions + '" onclick="' + this.optionClassName + '.showOptions(this)" class="border btn" style="padding: 1%; margin:1%; background:' + color + ';">' + type + '</span>';
	      } else {
	        this.addedInstructions += 1;
	        this.instructionsContainer.innerHTML += '<span id="instruction' + this.addedInstructions + '" data-instruction="' + this.addedInstructions + '" onclick="' + this.optionClassName + '.showOptions(this)" class="border btn" style="padding: 1%; margin:1%; background:' + color + ';">' + type + '</span>';
	      }
	    }
	  }, {
	    key: "clearInstructions",
	    value: function clearInstructions() {
	      this.instructionsContainer.innerHTML = '<i>Пока тут пусто. Выберите элементы из управления ниже, чтобы начать писать инструкцию!</i>';
	      this.addedInstructions = 0;
	      this.parametersContainer.innerHTML = '<i>Щёлкните на любой добавленный элемент в поле инструкции генератора, чтобы изменить его свойства!</i>';
	    }
	  }, {
	    key: "deleteLastInstruction",
	    value: function deleteLastInstruction() {
	      var addedInstruction = document.querySelectorAll('[id^="instruction"]');
	      if (addedInstruction.length === 0) {
	        return;
	      }
	      var presavedInstruction = 0;
	      addedInstruction.forEach(function (element) {
	        if (element.getAttribute('data-instruction') > presavedInstruction) {
	          presavedInstruction = element.getAttribute('data-instruction');
	        }
	      });
	      var elements = document.querySelectorAll('[data-instruction="' + presavedInstruction + '"]');
	      elements.forEach(function (element) {
	        element.remove();
	      });
	      this.parametersContainer.innerHTML = '<i>Щёлкните на любой добавленный элемент в поле инструкции генератора, чтобы изменить его свойства!</i>';
	      this.addedInstructions -= 1;
	      if (this.addedInstructions === 0) {
	        this.instructionsContainer.innerHTML = '<i>Пока тут пусто. Выберите элементы из управления ниже, чтобы начать писать инструкцию!</i>';
	      }
	    }
	  }]);
	  return Generator;
	}();

	var Optionator = /*#__PURE__*/function () {
	  function Optionator() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, Optionator);
	    if (main_core.Type.isStringFilled(options.rootNodeId)) {
	      this.rootNodeId = options.rootNodeId;
	    } else {
	      throw new Error('Generator: options.rootNodeId required');
	    }
	    this.rootNodeId = document.getElementById(this.rootNodeId);
	    if (!this.rootNodeId) {
	      throw new Error("Generator: element with id \"".concat(this.rootNodeId, "\" not found"));
	    }
	    this.instructionsContainer = document.getElementById('instructionsContainer');
	    this.parametersContainer = document.getElementById('parametersContainer');
	    this.addedInstructions = 0;
	  }
	  babelHelpers.createClass(Optionator, [{
	    key: "showOptions",
	    value: function showOptions(element) {
	      var html = "<p class=\"d-flex\">\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u0443\u0435\u043C\u044B\u0439 \u044D\u043B\u0435\u043C\u0435\u043D\u0442 \u2116".concat(element.getAttribute('data-instruction'), " \u0422\u0438\u043F:[").concat(element.innerText, "]</p>");
	      if (element.innerText === 'image') {
	        html += '<div class="mb-3"><label for="formFile" class="form-label">Выберите картинку</label> <input class="form-control" type="file" id="formFile"> </div>';
	      }
	      if (element.innerText === 'rand.Number') {
	        html += "<div class=\"form-check\">\n\t\t\t\t<input class=\"form-check-input\" type=\"radio\" name=\"flexRadioDefault\" id=\"flexRadioDefault1\">\n\t\t\t\t<label class=\"form-check-label\" for=\"flexRadioDefault1\">\n\t\t\t\t\tDefault radio\n\t\t\t\t</label>\n\t\t\t</div>\n\t\t\t<div class=\"form-check\">\n\t\t\t<input class=\"form-check-input\" type=\"radio\" name=\"flexRadioDefault\" id=\"flexRadioDefault2\" checked>\n\t\t\t<label class=\"form-check-label\" for=\"flexRadioDefault2\">\n\t\t\t\tDefault checked radio\n\t\t\t</label>\n\t\t\t</div>";
	      }
	      html += '<div></div>';
	      this.parametersContainer.innerHTML = html;
	    }
	  }, {
	    key: "closeOption",
	    value: function closeOption() {
	      this.parametersContainer.innerHTML = '<i>Щёлкните на любой добавленный элемент в поле инструкции генератора, чтобы изменить его свойства!</i>';
	    }
	  }]);
	  return Optionator;
	}();

	exports.ClassSubjectThemeMenu = ClassSubjectThemeMenu;
	exports.Generator = Generator;
	exports.Optionator = Optionator;

}((this.BX.Proj.Independent = this.BX.Proj.Independent || {}),BX));
