/* eslint-disable */
this.BX = this.BX || {};
this.BX.Proj = this.BX.Proj || {};
(function (exports,main_core,proj_operators,proj_constructor) {
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

	var Controls = /*#__PURE__*/function () {
	  function Controls() {
	    babelHelpers.classCallCheck(this, Controls);
	  }
	  babelHelpers.createClass(Controls, null, [{
	    key: "showTaskControls",
	    value: function showTaskControls() {
	      return "\n\t\t<div class=\"row row-cols-4\" style=\"width: 100%;\">\n\t\t\t<div class=\"col d-flex justify-content-center\" style=\"padding: 1%;\">\n\t\t\t\t<a class=\"btn btn-secondary\" onclick=\"generator.addInstruction('text', 'lightgreen')\" style=\"width: 100%; margin: 1%;\">\u0422\u0435\u043A\u0441\u0442</a>\n\t\t\t</div>\n\t\t\t<div class=\"col d-flex justify-content-center\" style=\"padding: 1%;\">\n\t\t\t\t<a class=\"btn btn-secondary\" onclick=\"generator.addInstruction('rand.Number' , 'lightblue')\" style=\"width: 100%; margin: 1%;\">\u0421\u043B\u0443\u0447\u0430\u0439\u043D\u043E\u0435 \u0447\u0438\u0441\u043B\u043E</a>\n\t\t\t</div>\n\t\t\t<div class=\"col d-flex justify-content-center\" style=\"padding: 1%;\">\n\t\t\t\t<a class=\"btn btn-secondary\" onclick=\"generator.addInstruction('image' , 'lightcoral')\" style=\"width: 100%; margin: 1%;\">\u041A\u0430\u0440\u0442\u0438\u043D\u043A\u0430</a>\n\t\t\t</div>\n\t\t\t<div class=\"col d-flex justify-content-center\" style=\"padding: 1%;\">\n\t\t\t\t<a class=\"btn btn-secondary\" onclick=\"generator.addInstruction('rand.Text' , 'lightcyan')\" style=\"width: 100%; margin: 1%;\">\u0421\u043B\u0443\u0447\u0430\u0439\u043D\u044B\u0439 \u0442\u0435\u043A\u0441\u0442</a>\n\t\t\t</div>\n\t\t\t<div class=\"col d-flex justify-content-center\" style=\"padding: 1%;\">\n\t\t\t\t<a class=\"btn btn-secondary\" onclick=\"generator.addInstruction('check' , 'lightsalmon')\" style=\"width: 100%; margin: 1%;\">\u0412\u044B\u0431\u043E\u0440 \u0432\u0430\u0440\u0438\u0430\u043D\u0442\u0430</a>\n\t\t\t</div>\n\t\t\t<div class=\"col d-flex justify-content-center\" style=\"padding: 1%;\">\n\t\t\t\t<a class=\"btn btn-secondary\" onclick=\"generator.addInstruction('customEx' , 'lightsalmon')\" style=\"width: 100%; margin: 1%;\">\u0412\u044B\u0440\u0430\u0436\u0435\u043D\u0438\u0435</a>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"row row-cols-4\" style=\"width: 100%;\">\n\t\t\t<div class=\"col d-flex justify-content-center\" style=\"padding: 1%;\">\n\t\t\t\t<a class=\"btn btn-secondary\" onclick=\"generator.deleteLastInstruction()\" style=\"width: 100%; margin: 1%;\">\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0439 \u044D\u043B\u0435\u043C\u0435\u043D\u0442</a>\n\t\t\t</div>\n\t\t\t<div class=\"col d-flex justify-content-center\" style=\"padding: 1%;\">\n\t\t\t\t<a class=\"btn btn-secondary\" onclick=\"generator.clearInstructions()\" style=\"width: 100%; margin: 1%;\">\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u043F\u043E\u043B\u0435 \u0438\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u0439</a>\n\t\t\t</div>\n\t\t\t<div class=\"col d-flex justify-content-center\" style=\"padding: 1%;\">\n\t\t\t\t<a class=\"btn btn-secondary\" onclick=\"generator.changeExpressionType()\" style=\"width: 100%; margin: 1%; background:lightcoral;\">\u0421\u043C\u0435\u043D\u0430 \u0440\u0435\u0436\u0438\u043C\u0430</a>\n\t\t\t</div>\n\t\t\t<div class=\"col d-flex justify-content-center\" style=\"padding: 1%;\">\n\t\t\t\t<a class=\"btn btn-secondary\" onclick=\"generator.addInstruction('Answer' , 'lightsalmon')\" style=\"width: 100%; margin: 1%;\">\u0413\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u044F \u043E\u0442\u0432\u0435\u0442\u0430</a>\n\t\t\t</div>\n\t\t</div>";
	    }
	  }, {
	    key: "showExerciseControls",
	    value: function showExerciseControls() {
	      return "\n\t\t<div class=\"row row-cols-4\" style=\"width: 100%;\">\n\t\t\t<div class=\"col d-flex justify-content-center\" style=\"padding: 1%;\">\n\t\t\t\t<a id=\"draggableElement\" class=\"btn btn-secondary\" onclick=\"generator.addInstruction('Bracket', 'lightgreen')\" style=\"width: 100%; margin: 1%;\">\u0421\u043A\u043E\u0431\u043A\u0430</a>\n\t\t\t</div>\n\t\t\t<div class=\"col d-flex justify-content-center\" style=\"padding: 1%;\">\n\t\t\t\t<a id=\"draggableElement\" class=\"btn btn-secondary\" onclick=\"generator.addInstruction('ABS' , 'lightblue')\" style=\"width: 100%; margin: 1%;\">\u041C\u043E\u0434\u0443\u043B\u044C</a>\n\t\t\t</div>\n\t\t\t<div class=\"col d-flex justify-content-center\" style=\"padding: 1%;\">\n\t\t\t\t<a id=\"draggableElement\" class=\"btn btn-secondary\" onclick=\"generator.addInstruction('rand.Number' , 'lightcoral')\" style=\"width: 100%; margin: 1%;\">\u0427\u0438\u0441\u043B\u043E</a>\n\t\t\t</div>\n\t\t\t<div class=\"col d-flex justify-content-center\" style=\"padding: 1%;\">\n\t\t\t\t<a id=\"draggableElement\" class=\"btn btn-secondary\" onclick=\"generator.addInstruction('Div' , 'lightcyan')\" style=\"width: 100%; margin: 1%;\">\u0414\u0435\u043B\u0435\u043D\u0438\u0435</a>\n\t\t\t</div>\n\t\t\t<div class=\"col d-flex justify-content-center\" style=\"padding: 1%;\">\n\t\t\t\t<a id=\"draggableElement\" class=\"btn btn-secondary\" onclick=\"generator.addInstruction('Multiply' , 'lightsalmon')\" style=\"width: 100%; margin: 1%;\">\u0423\u043C\u043D\u043E\u0436\u0435\u043D\u0438\u0435</a>\n\t\t\t</div>\n\t\t\t<div class=\"col d-flex justify-content-center\" style=\"padding: 1%;\">\n\t\t\t\t<a id=\"draggableElement\" class=\"btn btn-secondary\" onclick=\"generator.addInstruction('Minus' , 'skyblue')\" style=\"width: 100%; margin: 1%;\">\u0412\u044B\u0447\u0438\u0442\u0430\u043D\u0438\u0435</a>\n\t\t\t</div>\n\t\t\t<div class=\"col d-flex justify-content-center\" style=\"padding: 1%;\">\n\t\t\t\t<a id=\"draggableElement\" class=\"btn btn-secondary\" onclick=\"generator.addInstruction('Plus' , 'lightpink')\" style=\"width: 100%; margin: 1%;\">\u0421\u043B\u043E\u0436\u0435\u043D\u0438\u0435</a>\n\t\t\t</div>\n\t\t\t<div class=\"col d-flex justify-content-center\" style=\"padding: 1%;\">\n\t\t\t\t<a id=\"draggableElement\" class=\"btn btn-secondary\" onclick=\"generator.addInstruction('Power' , 'lightseagreen')\" style=\"width: 100%; margin: 1%;\">\u0412\u043E\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u0435 \u0432 \u0441\u0442\u0435\u043F\u0435\u043D\u044C</a>\n\t\t\t</div>\n\t\t\t<div class=\"col d-flex justify-content-center\" style=\"padding: 1%;\">\n\t\t\t\t<a id=\"draggableElement\" class=\"btn btn-secondary\" onclick=\"generator.addInstruction('Root' , 'lightcyan')\" style=\"width: 100%; margin: 1%;\">\u041A\u043E\u0440\u0435\u043D\u044C</a>\n\t\t\t</div>\n\t\t\t<div class=\"col d-flex justify-content-center\" style=\"padding: 1%;\">\n\t\t\t\t<a id=\"draggableElement\" class=\"btn btn-secondary\" onclick=\"generator.addInstruction('Equal' , 'olivedrab')\" style=\"width: 100%; margin: 1%;\">\u0420\u0430\u0432\u0435\u043D\u0441\u0442\u0432\u043E</a>\n\t\t\t</div>\n\t\t\t<div class=\"col d-flex justify-content-center\" style=\"padding: 1%;\">\n\t\t\t\t<a id=\"draggableElement\" class=\"btn btn-secondary\" onclick=\"generator.addInstruction('Rand.Operation' , 'lightslategray')\" style=\"width: 100%; margin: 1%;\">\u0421\u043B\u0443\u0447\u0430\u0439\u043D\u044B\u0439 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440</a>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"row row-cols-4\" style=\"width: 100%;\">\n\t\t\t<div class=\"col d-flex justify-content-center\" style=\"padding: 1%;\">\n\t\t\t\t<a class=\"btn btn-secondary\" onclick=\"generator.deleteLastInstruction()\" style=\"width: 100%; margin: 1%;\">\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u044D\u043B\u0435\u043C\u0435\u043D\u0442 \u0441\u043B\u0435\u0432\u0430</a>\n\t\t\t</div>\n\t\t\t<div class=\"col d-flex justify-content-center\" style=\"padding: 1%;\">\n\t\t\t\t<a class=\"btn btn-secondary\" onclick=\"generator.clearInstructions()\" style=\"width: 100%; margin: 1%;\">\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u043F\u043E\u043B\u0435 \u0438\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u0439</a>\n\t\t\t</div>\n\t\t\t<div class=\"col d-flex justify-content-center\" style=\"padding: 1%;\">\n\t\t\t\t<a class=\"btn btn-secondary\" onclick=\"generator.changeExpressionType()\" style=\"width: 100%; margin: 1%; background:lightcoral;\">\u0421\u043C\u0435\u043D\u0430 \u0440\u0435\u0436\u0438\u043C\u0430</a>\n\t\t\t</div>\n\t\t\t<div class=\"col d-flex justify-content-center\" style=\"padding: 1%;\">\n\t\t\t\t<a class=\"btn btn-secondary\" onclick=\"generator.addInstruction('Answer' , 'lightsalmon')\" style=\"width: 100%; margin: 1%;\">\u0413\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u044F \u043E\u0442\u0432\u0435\u0442\u0430</a>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"row row-cols-4\" style=\"width: 100%;\">\n\t\t\t<div class=\"col d-flex justify-content-center\" style=\"padding: 1%;\">\n\t\t\t\t<a class=\"btn btn-secondary\" onclick=\"generator.renderTextView()\" style=\"width: 100%; margin: 1%; background:lightsteelblue;\">\u0421\u0438\u043C\u0432\u043E\u043B\u044C\u043D\u043E\u0435 \u043F\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u0438\u0435</a>\n\t\t\t</div>\n\t\t\t<div class=\"col d-flex justify-content-center\" style=\"padding: 1%;\">\n\t\t\t\t\n\t\t\t</div>\n\t\t\t<div class=\"col d-flex justify-content-center\" style=\"padding: 1%;\">\n\t\t\t\t<a class=\"btn btn-secondary\" onclick=\"generator.movePointer('left')\" style=\"width: 100%; margin: 1%; background:lightsteelblue;\">\u2190</a>\n\t\t\t</div>\n\t\t\t<div class=\"col d-flex justify-content-center\" style=\"padding: 1%;\">\n\t\t\t\t<a class=\"btn btn-secondary\" onclick=\"generator.movePointer('right')\" style=\"width: 100%; margin: 1%; background:lightsteelblue;\">\u2192</a>\n\t\t\t</div>\n\t\t</div>";
	    }
	  }, {
	    key: "showCurrentExerciseControls",
	    value: function showCurrentExerciseControls(id) {
	      return "\n\t\t<div class=\"row row-cols-4\" style=\"width: 100%;\">\n\t\t\t<div class=\"col d-flex justify-content-center\" style=\"padding: 1%;\">\n\t\t\t\t<a id=\"draggableElement\" class=\"btn btn-secondary\" onclick=\"generator.addInstruction('Bracket', 'lightgreen')\" style=\"width: 100%; margin: 1%;\">\u0421\u043A\u043E\u0431\u043A\u0430</a>\n\t\t\t</div>\n\t\t\t<div class=\"col d-flex justify-content-center\" style=\"padding: 1%;\">\n\t\t\t\t<a id=\"draggableElement\" class=\"btn btn-secondary\" onclick=\"generator.addInstruction('ABS' , 'lightblue')\" style=\"width: 100%; margin: 1%;\">\u041C\u043E\u0434\u0443\u043B\u044C</a>\n\t\t\t</div>\n\t\t\t<div class=\"col d-flex justify-content-center\" style=\"padding: 1%;\">\n\t\t\t\t<a id=\"draggableElement\" class=\"btn btn-secondary\" onclick=\"generator.addInstruction('rand.Number' , 'lightcoral')\" style=\"width: 100%; margin: 1%;\">\u0427\u0438\u0441\u043B\u043E</a>\n\t\t\t</div>\n\t\t\t<div class=\"col d-flex justify-content-center\" style=\"padding: 1%;\">\n\t\t\t\t<a id=\"draggableElement\" class=\"btn btn-secondary\" onclick=\"generator.addInstruction('Div' , 'lightcyan')\" style=\"width: 100%; margin: 1%;\">\u0414\u0435\u043B\u0435\u043D\u0438\u0435</a>\n\t\t\t</div>\n\t\t\t<div class=\"col d-flex justify-content-center\" style=\"padding: 1%;\">\n\t\t\t\t<a id=\"draggableElement\" class=\"btn btn-secondary\" onclick=\"generator.addInstruction('Multiply' , 'lightsalmon')\" style=\"width: 100%; margin: 1%;\">\u0423\u043C\u043D\u043E\u0436\u0435\u043D\u0438\u0435</a>\n\t\t\t</div>\n\t\t\t<div class=\"col d-flex justify-content-center\" style=\"padding: 1%;\">\n\t\t\t\t<a id=\"draggableElement\" class=\"btn btn-secondary\" onclick=\"generator.addInstruction('Minus' , 'skyblue')\" style=\"width: 100%; margin: 1%;\">\u0412\u044B\u0447\u0438\u0442\u0430\u043D\u0438\u0435</a>\n\t\t\t</div>\n\t\t\t<div class=\"col d-flex justify-content-center\" style=\"padding: 1%;\">\n\t\t\t\t<a id=\"draggableElement\" class=\"btn btn-secondary\" onclick=\"generator.addInstruction('Plus' , 'lightpink')\" style=\"width: 100%; margin: 1%;\">\u0421\u043B\u043E\u0436\u0435\u043D\u0438\u0435</a>\n\t\t\t</div>\n\t\t\t<div class=\"col d-flex justify-content-center\" style=\"padding: 1%;\">\n\t\t\t\t<a id=\"draggableElement\" class=\"btn btn-secondary\" onclick=\"generator.addInstruction('Power' , 'lightseagreen')\" style=\"width: 100%; margin: 1%;\">\u0412\u043E\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u0435 \u0432 \u0441\u0442\u0435\u043F\u0435\u043D\u044C</a>\n\t\t\t</div>\n\t\t\t<div class=\"col d-flex justify-content-center\" style=\"padding: 1%;\">\n\t\t\t\t<a id=\"draggableElement\" class=\"btn btn-secondary\" onclick=\"generator.addInstruction('Root' , 'lightcyan')\" style=\"width: 100%; margin: 1%;\">\u041A\u043E\u0440\u0435\u043D\u044C</a>\n\t\t\t</div>\n\t\t\t<div class=\"col d-flex justify-content-center\" style=\"padding: 1%;\">\n\t\t\t\t<a id=\"draggableElement\" class=\"btn btn-secondary\" onclick=\"generator.addInstruction('Equal' , 'olivedrab')\" style=\"width: 100%; margin: 1%;\">\u0420\u0430\u0432\u0435\u043D\u0441\u0442\u0432\u043E</a>\n\t\t\t</div>\n\t\t\t<div class=\"col d-flex justify-content-center\" style=\"padding: 1%;\">\n\t\t\t\t<a id=\"draggableElement\" class=\"btn btn-secondary\" onclick=\"generator.addInstruction('Rand.Operation' , 'lightslategray')\" style=\"width: 100%; margin: 1%;\">\u0421\u043B\u0443\u0447\u0430\u0439\u043D\u044B\u0439 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440</a>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"row row-cols-4\" style=\"width: 100%;\">\n\t\t\t<div class=\"col d-flex justify-content-center\" style=\"padding: 1%;\">\n\t\t\t\t<a class=\"btn btn-secondary\" onclick=\"generator.deleteLastInstruction(".concat(id, ")\" style=\"width: 100%; margin: 1%;\">\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u044D\u043B\u0435\u043C\u0435\u043D\u0442 \u0441\u043B\u0435\u0432\u0430</a>\n\t\t\t</div>\n\t\t\t<div class=\"col d-flex justify-content-center\" style=\"padding: 1%;\">\n\t\t\t\t<a class=\"btn btn-secondary\" onclick=\"generator.clearInstructions(").concat(id, ")\" style=\"width: 100%; margin: 1%;\">\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u043F\u043E\u043B\u0435 \u0438\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u0439</a>\n\t\t\t</div>\n\t\t\t<div class=\"col d-flex justify-content-center\" style=\"padding: 1%;\">\n\t\t\t\t<a class=\"btn btn-secondary\" onclick=\"generator.backToGenerator()\" style=\"width: 100%; margin: 1%; background:lightcoral;\">\u0412\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F</a>\n\t\t\t</div>\n\t\t\t<div class=\"col d-flex justify-content-center\" style=\"padding: 1%;\">\n\t\t\t\t<a class=\"btn btn-secondary\" onclick=\"generator.addInstruction('Answer' , 'lightsalmon')\" style=\"width: 100%; margin: 1%;\">\u0413\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u044F \u043E\u0442\u0432\u0435\u0442\u0430</a>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"row row-cols-4\" style=\"width: 100%;\">\n\t\t\t<div class=\"col d-flex justify-content-center\" style=\"padding: 1%;\">\n\t\t\t\t<a class=\"btn btn-secondary\" onclick=\"generator.renderTextView()\" style=\"width: 100%; margin: 1%; background:lightsteelblue;\">\u0421\u0438\u043C\u0432\u043E\u043B\u044C\u043D\u043E\u0435 \u043F\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u0438\u0435</a>\n\t\t\t</div>\n\t\t\t<div class=\"col d-flex justify-content-center\" style=\"padding: 1%;\">\n\t\t\t\t\n\t\t\t</div>\n\t\t\t<div class=\"col d-flex justify-content-center\" style=\"padding: 1%;\">\n\t\t\t\t<a class=\"btn btn-secondary\" onclick=\"generator.movePointer('left')\" style=\"width: 100%; margin: 1%; background:lightsteelblue;\">\u2190</a>\n\t\t\t</div>\n\t\t\t<div class=\"col d-flex justify-content-center\" style=\"padding: 1%;\">\n\t\t\t\t<a class=\"btn btn-secondary\" onclick=\"generator.movePointer('right')\" style=\"width: 100%; margin: 1%; background:lightsteelblue;\">\u2192</a>\n\t\t\t</div>\n\t\t</div>");
	    }
	  }]);
	  return Controls;
	}();

	var OptionList = BX.Proj.Independent.OptionList;
	var OperatorList = BX.Proj.Independent.OperatorList;
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
	    this.expressionViewType = 'full';
	    this.controlsContainer = document.getElementById(options.controlsContainer);
	    this.optionClassName = options.optionClassName;
	    this.instructionsContainer = document.getElementById(options.instructionsNodeId);
	    this.parametersContainer = document.getElementById(options.settingsNodeId);
	    this.instructions = new OptionList();
	    this.expressionInstruction = new OperatorList();
	    this.expressionList = [];
	    this.currentGeneratorWindow = this.instructions;
	    this.generatorWindowType = 'task';
	    this.controlsContainer.innerHTML = Controls.showTaskControls();
	  }
	  babelHelpers.createClass(Generator, [{
	    key: "backToGenerator",
	    value: function backToGenerator() {
	      document.getElementById('ExpressionType').innerHTML = 'задача';
	      this.generatorWindowType = 'task';
	      this.currentGeneratorWindow = this.instructions;
	      this.controlsContainer.innerHTML = Controls.showTaskControls();
	      this.renderInstructions();
	    }
	  }, {
	    key: "openExerciseMenu",
	    value: function openExerciseMenu(id) {
	      if (this.expressionList[id] === undefined) {
	        this.expressionList[id] = new OperatorList();
	      }
	      this.generatorWindowType = 'expression';
	      this.currentGeneratorWindow = this.expressionList[id];
	      var element = document.getElementById('ExpressionType');
	      element.innerHTML = "[\u043E\u0431\u044A\u0435\u043A\u0442:\u0412\u044B\u0440\u0430\u0436\u0435\u043D\u0438\u0435_\u2116".concat(id, "]");
	      this.controlsContainer.innerHTML = Controls.showCurrentExerciseControls(id);
	      this.parametersContainer.innerHTML = '<i>Щёлкните на любой добавленный элемент в поле инструкции генератора, чтобы изменить его свойства!</i>';
	      this.renderInstructions();
	    }
	  }, {
	    key: "changeExpressionType",
	    value: function changeExpressionType() {
	      var element = document.getElementById('ExpressionType');
	      switch (element.innerHTML) {
	        case 'задача':
	          element.innerHTML = 'выражение';
	          this.generatorWindowType = 'exercise';
	          this.currentGeneratorWindow = this.expressionInstruction;
	          this.controlsContainer.innerHTML = Controls.showExerciseControls();
	          this.parametersContainer.innerHTML = '<i>Щёлкните на любой добавленный элемент в поле инструкции генератора, чтобы изменить его свойства!</i>';
	          this.renderInstructions();
	          break;
	        case 'выражение':
	          element.innerHTML = 'задача';
	          this.generatorWindowType = 'task';
	          this.currentGeneratorWindow = this.instructions;
	          this.controlsContainer.innerHTML = Controls.showTaskControls();
	          this.parametersContainer.innerHTML = '<i>Щёлкните на любой добавленный элемент в поле инструкции генератора, чтобы изменить его свойства!</i>';
	          this.renderInstructions();
	          break;
	      }
	    }
	  }, {
	    key: "dumpInstructions",
	    value: function dumpInstructions() {
	      console.log(this.instructions);
	      this.instructions.list.forEach(function (instruction) {
	        console.log(instruction);
	      });
	    }
	  }, {
	    key: "showOption",
	    value: function showOption(id) {
	      this.currentGeneratorWindow.showOption(id, this.parametersContainer);
	    }
	  }, {
	    key: "renderInstructions",
	    value: function renderInstructions() {
	      this.expressionViewType = 'full';
	      if (this.currentGeneratorWindow.addedInstructions === 0) {
	        this.instructionsContainer.innerHTML = '<i>Пока тут пусто. Выберите элементы из управления ниже, чтобы начать писать инструкцию!</i>';
	      } else {
	        this.instructionsContainer.innerHTML = this.currentGeneratorWindow.renderInstructions();
	      }
	    }
	  }, {
	    key: "addInstruction",
	    value: function addInstruction(type, color) {
	      this.currentGeneratorWindow.addInstruction(type, color);
	      this.renderInstructions();
	    }
	  }, {
	    key: "clearInstructions",
	    value: function clearInstructions(id) {
	      this.instructionsContainer.innerHTML = '<i>Пока тут пусто. Выберите элементы из управления ниже, чтобы начать писать инструкцию!</i>';
	      this.parametersContainer.innerHTML = '<i>Щёлкните на любой добавленный элемент в поле инструкции генератора, чтобы изменить его свойства!</i>';
	      if (id === undefined) {
	        if (this.generatorWindowType === 'exercise') {
	          this.expressionInstruction = new OperatorList();
	          this.currentGeneratorWindow = this.expressionInstruction;
	        } else {
	          this.instructions = new OptionList();
	          this.currentGeneratorWindow = this.instructions;
	        }
	      } else {
	        this.expressionList[id] = new OperatorList();
	        this.currentGeneratorWindow = this.expressionList[id];
	      }
	      this.renderInstructions();
	    }
	  }, {
	    key: "deleteLastInstruction",
	    value: function deleteLastInstruction(id) {
	      if (this.currentGeneratorWindow.addedInstructions > 0) {
	        if (this.currentGeneratorWindow.openedInstruction === this.currentGeneratorWindow.addedInstructions - 1) {
	          this.currentGeneratorWindow.openedInstruction = -1;
	          this.parametersContainer.innerHTML = '<i>Щёлкните на любой добавленный элемент в поле инструкции генератора, чтобы изменить его свойства!</i>';
	        }
	        if (this.currentGeneratorWindow.list[this.currentGeneratorWindow.addedInstructions - 1].type === 'customEx') {
	          this.expressionList[this.currentGeneratorWindow.addedInstructions - 1] = undefined;
	        }
	        this.currentGeneratorWindow.deleteLastInstruction();
	      }
	      if (id === undefined) {
	        if (this.generatorWindowType === 'exercise') {
	          this.expressionInstruction = this.currentGeneratorWindow;
	          this.currentGeneratorWindow = this.expressionInstruction;
	        } else {
	          this.instructions = this.currentGeneratorWindow;
	          this.currentGeneratorWindow = this.instructions;
	        }
	      } else {
	        this.expressionList[id] = this.currentGeneratorWindow;
	        this.currentGeneratorWindow = this.expressionList[id];
	      }
	      this.renderInstructions();
	    }
	  }, {
	    key: "movePointer",
	    value: function movePointer(direction) {
	      if (this.currentGeneratorWindow instanceof OperatorList) {
	        this.currentGeneratorWindow.movePointer(direction);
	        this.renderInstructions();
	      }
	    }
	  }, {
	    key: "renderTextView",
	    value: function renderTextView() {
	      if (this.expressionViewType === 'full') {
	        this.expressionViewType = 'text';
	        if (this.currentGeneratorWindow instanceof OperatorList) {
	          this.instructionsContainer.innerHTML = this.currentGeneratorWindow.renderTextView();
	        }
	      } else {
	        this.expressionViewType = 'full';
	        this.renderInstructions();
	      }
	    }
	  }]);
	  return Generator;
	}();

	exports.ClassSubjectThemeMenu = ClassSubjectThemeMenu;
	exports.Generator = Generator;

}((this.BX.Proj.Independent = this.BX.Proj.Independent || {}),BX,BX,BX));
