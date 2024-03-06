(() => {
    "use strict";
    const modules_modules = {};
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let _slideUp = (target, duration = 500, showmore = 0) => {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = `${target.offsetHeight}px`;
            target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            window.setTimeout((() => {
                target.hidden = !showmore ? true : false;
                !showmore ? target.style.removeProperty("height") : null;
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                !showmore ? target.style.removeProperty("overflow") : null;
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
                document.dispatchEvent(new CustomEvent("slideUpDone", {
                    detail: {
                        target
                    }
                }));
            }), duration);
        }
    };
    let _slideDown = (target, duration = 500, showmore = 0) => {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.hidden = target.hidden ? false : null;
            showmore ? target.style.removeProperty("height") : null;
            let height = target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            target.offsetHeight;
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = height + "px";
            target.style.removeProperty("padding-top");
            target.style.removeProperty("padding-bottom");
            target.style.removeProperty("margin-top");
            target.style.removeProperty("margin-bottom");
            window.setTimeout((() => {
                target.style.removeProperty("height");
                target.style.removeProperty("overflow");
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
                document.dispatchEvent(new CustomEvent("slideDownDone", {
                    detail: {
                        target
                    }
                }));
            }), duration);
        }
    };
    let _slideToggle = (target, duration = 500) => {
        if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
    };
    function functions_FLS(message) {
        setTimeout((() => {
            if (window.FLS) console.log(message);
        }), 0);
    }
    let formValidate = {
        getErrors(form) {
            let error = 0;
            let formRequiredItems = form.querySelectorAll("*[data-required]");
            if (formRequiredItems.length) formRequiredItems.forEach((formRequiredItem => {
                if ((null !== formRequiredItem.offsetParent || "SELECT" === formRequiredItem.tagName) && !formRequiredItem.disabled) error += this.validateInput(formRequiredItem);
            }));
            return error;
        },
        validateInput(formRequiredItem) {
            let error = 0;
            const noRequired = formRequiredItem.hasAttribute("data-no-required-empty");
            if ("email" === formRequiredItem.dataset.required) {
                formRequiredItem.value = formRequiredItem.value.replace(" ", "");
                if ((noRequired && "" != formRequiredItem.value || !noRequired) && this.emailTest(formRequiredItem)) {
                    this.addError(formRequiredItem);
                    error++;
                } else this.removeError(formRequiredItem);
            } else if ("checkbox" === formRequiredItem.type && !formRequiredItem.checked) {
                this.addError(formRequiredItem);
                error++;
            } else if (formRequiredItem.classList.contains("checkbox") && formRequiredItem.querySelector('[type="radio"]')) {
                const radioInputs = formRequiredItem.querySelectorAll('[type="radio"]');
                let checked = 0;
                for (const radioInput of radioInputs) if (radioInput.checked) {
                    checked = 1;
                    break;
                }
                if (!checked) {
                    this.addError(formRequiredItem);
                    error++;
                }
            } else if ("tel" === formRequiredItem.dataset.required) if ((noRequired && "" != formRequiredItem.value || !noRequired) && this.telTest(formRequiredItem)) {
                this.addError(formRequiredItem);
                error++;
            } else this.removeError(formRequiredItem); else if ("password" === formRequiredItem.dataset.required) if (this.passwordTest(formRequiredItem)) {
                this.addError(formRequiredItem);
                error++;
            } else this.removeError(formRequiredItem); else if ("month" === formRequiredItem.dataset.required) if ((noRequired && "" != formRequiredItem.value || !noRequired) && this.monthTest(formRequiredItem)) {
                this.addError(formRequiredItem);
                error++;
            } else this.removeError(formRequiredItem); else if ((noRequired && "" != formRequiredItem.value || !noRequired) && "card-num" === formRequiredItem.dataset.required) if (this.cardNumTest(formRequiredItem)) {
                this.addError(formRequiredItem);
                error++;
            } else this.removeError(formRequiredItem); else if (!formRequiredItem.value.trim()) {
                this.addError(formRequiredItem);
                error++;
            } else this.removeError(formRequiredItem);
            return error;
        },
        addError(formRequiredItem) {
            formRequiredItem.classList.add("_form-error");
            if (formRequiredItem.closest(".form__input")) {
                formRequiredItem.closest(".form__input").classList.add("_form-error");
                let inputError = formRequiredItem.closest(".form__input").querySelector(".form__error");
                if (inputError) formRequiredItem.closest(".form__input").removeChild(inputError);
                if (errorText) formRequiredItem.closest(".form__input").insertAdjacentHTML("beforeend", `<div class="form__error">${formRequiredItem.dataset.error}</div>`);
            }
        },
        removeError(formRequiredItem) {
            formRequiredItem.classList.remove("_form-error");
            if (formRequiredItem.closest(".form__input")) {
                formRequiredItem.closest(".form__input").classList.remove("_form-error");
                if (formRequiredItem.closest(".form__input").querySelector(".form__error")) formRequiredItem.closest(".form__input").removeChild(formRequiredItem.closest(".form__input").querySelector(".form__error"));
            }
        },
        formClean(form) {
            form.reset();
            setTimeout((() => {
                let inputs = form.querySelectorAll("input,textarea");
                for (let index = 0; index < inputs.length; index++) {
                    const el = inputs[index];
                    el.parentElement.classList.remove("_form-focus");
                    el.classList.remove("_form-focus");
                    formValidate.removeError(el);
                }
                let checkboxes = form.querySelectorAll(".checkbox__input");
                if (checkboxes.length > 0) for (let index = 0; index < checkboxes.length; index++) {
                    const checkbox = checkboxes[index];
                    checkbox.checked = false;
                }
                if (modules_modules.select) {
                    let selects = form.querySelectorAll(".select");
                    if (selects.length) for (let index = 0; index < selects.length; index++) {
                        const select = selects[index].querySelector("select");
                        modules_modules.select.selectBuild(select);
                    }
                }
            }), 0);
        },
        emailTest(formRequiredItem) {
            return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
        },
        telTest(formRequiredItem) {
            let tel = formRequiredItem.value.replace(/\s+/g, "").split("").filter((e => !isNaN(Number(e)))).join("");
            return 11 != tel.length;
        },
        passwordTest(formRequiredItem) {
            return formRequiredItem.value.length < 6;
        },
        monthTest(formRequiredItem) {
            return parseInt(formRequiredItem.value.match(/\d+/)) != formRequiredItem.value || formRequiredItem.value < 1 || formRequiredItem.value > 12;
        },
        cardNumTest(formRequiredItem) {
            return 16 != formRequiredItem.value.replace(/[^\d]/g, "").length;
        }
    };
    function formQuantity() {
        let quantity = document.querySelectorAll(".quantity");
        for (let i = 0; i < quantity.length; i++) {
            let input = quantity[i].querySelector("input");
            input.setAttribute("oninput", "this.value = this.value.replace(/[^d]/g,'');");
            let value = input.value;
            let buttonMinus = quantity[i].querySelector(".quantity__button_minus");
            if (1 == value) buttonMinus.classList.add("_disabled"); else buttonMinus.classList.remove("_disabled");
            input.addEventListener("change", (() => {
                if (input.value < 1) input.value = 1;
                if (1 == input.value) buttonMinus.classList.add("_disabled"); else buttonMinus.classList.remove("_disabled");
            }));
        }
        document.addEventListener("click", (function(e) {
            let targetElement = e.target;
            if (targetElement.closest(".quantity__button")) {
                const input = targetElement.closest(".quantity").querySelector("input");
                let value = input.value;
                let buttonMinus = targetElement.closest(".quantity").querySelector(".quantity__button_minus");
                if (targetElement.classList.contains("quantity__button_plus")) {
                    value++;
                    buttonMinus.classList.remove("_disabled");
                } else {
                    --value;
                    if (1 == value) buttonMinus.classList.add("_disabled");
                    if (value < 1) value = 1;
                }
                targetElement.closest(".quantity").querySelector("input").value = value;
            }
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    class SelectConstructor {
        constructor(props, data = null) {
            let defaultConfig = {
                init: true,
                logging: true
            };
            this.config = Object.assign(defaultConfig, props);
            this.selectClasses = {
                classSelect: "select",
                classSelectBody: "select__body",
                classSelectTitle: "select__title",
                classSelectValue: "select__value",
                classSelectLabel: "select__label",
                classSelectInput: "select__input",
                classSelectText: "select__text",
                classSelectLink: "select__link",
                classSelectOptions: "select__options",
                classSelectOptionsScroll: "select__scroll",
                classSelectOption: "select__option",
                classSelectContent: "select__content",
                classSelectRow: "select__row",
                classSelectData: "select__asset",
                classSelectDisabled: "_select-disabled",
                classSelectHidden: "_select-hidden",
                classSelectNotHidden: "_select-not-hidden",
                classSelectTag: "_select-tag",
                classSelectOpen: "_select-open",
                classSelectActive: "_select-active",
                classSelectFocus: "_select-focus",
                classSelectMultiple: "_select-multiple",
                classSelectCheckBox: "_select-checkbox",
                classSelectOptionSelected: "_select-selected",
                classSelectPseudoLabel: "_select-pseudo-label"
            };
            this._this = this;
            if (this.config.init) {
                const selectItems = data ? document.querySelectorAll(data) : document.querySelectorAll("select");
                if (selectItems.length) this.selectsInit(selectItems);
            }
        }
        getSelectClass(className) {
            return `.${className}`;
        }
        getSelectElement(selectItem, className) {
            return {
                originalSelect: selectItem.querySelector("select"),
                selectElement: selectItem.querySelector(this.getSelectClass(className))
            };
        }
        selectsInit(selectItems) {
            selectItems.forEach(((originalSelect, index) => {
                this.selectInit(originalSelect, index + 1);
            }));
            document.addEventListener("click", function(e) {
                this.selectsActions(e);
            }.bind(this));
            document.addEventListener("keydown", function(e) {
                this.selectsActions(e);
            }.bind(this));
            document.addEventListener("focusin", function(e) {
                this.selectsActions(e);
            }.bind(this));
            document.addEventListener("focusout", function(e) {
                this.selectsActions(e);
            }.bind(this));
        }
        selectInit(originalSelect, index) {
            const _this = this;
            let selectItem = document.createElement("div");
            selectItem.classList.add(this.selectClasses.classSelect);
            originalSelect.parentNode.insertBefore(selectItem, originalSelect);
            selectItem.appendChild(originalSelect);
            originalSelect.hidden = true;
            index ? originalSelect.dataset.id = index : null;
            if (this.getSelectPlaceholder(originalSelect)) {
                originalSelect.dataset.placeholder = this.getSelectPlaceholder(originalSelect).value;
                if (this.getSelectPlaceholder(originalSelect).label.show) {
                    const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
                    selectItemTitle.insertAdjacentHTML("afterbegin", `<span class="${this.selectClasses.classSelectLabel}">${this.getSelectPlaceholder(originalSelect).label.text ? this.getSelectPlaceholder(originalSelect).label.text : this.getSelectPlaceholder(originalSelect).value}</span>`);
                }
            }
            selectItem.insertAdjacentHTML("beforeend", `<div class="${this.selectClasses.classSelectBody}"><div hidden class="${this.selectClasses.classSelectOptions}"></div></div>`);
            this.selectBuild(originalSelect);
            originalSelect.dataset.speed = originalSelect.dataset.speed ? originalSelect.dataset.speed : "150";
            originalSelect.addEventListener("change", (function(e) {
                _this.selectChange(e);
            }));
        }
        selectBuild(originalSelect) {
            const selectItem = originalSelect.parentElement;
            selectItem.dataset.id = originalSelect.dataset.id;
            originalSelect.dataset.classModif ? selectItem.classList.add(`select_${originalSelect.dataset.classModif}`) : null;
            originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectMultiple) : selectItem.classList.remove(this.selectClasses.classSelectMultiple);
            originalSelect.hasAttribute("data-checkbox") && originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectCheckBox) : selectItem.classList.remove(this.selectClasses.classSelectCheckBox);
            this.setSelectTitleValue(selectItem, originalSelect);
            this.setOptions(selectItem, originalSelect);
            originalSelect.hasAttribute("data-search") ? this.searchActions(selectItem) : null;
            originalSelect.hasAttribute("data-open") ? this.selectAction(selectItem) : null;
            this.selectDisabled(selectItem, originalSelect);
            this.selectHidden(selectItem, originalSelect);
            this.selectNotHidden(selectItem, originalSelect);
        }
        selectsActions(e) {
            const targetElement = e.target;
            const targetType = e.type;
            if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect)) || targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
                const selectItem = targetElement.closest(".select") ? targetElement.closest(".select") : document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag)).dataset.selectId}"]`);
                const originalSelect = this.getSelectElement(selectItem).originalSelect;
                if ("click" === targetType) {
                    if (!originalSelect.disabled) if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
                        const targetTag = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag));
                        const optionItem = document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetTag.dataset.selectId}"] .select__option[data-value="${targetTag.dataset.value}"]`);
                        this.optionAction(selectItem, originalSelect, optionItem);
                    } else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTitle))) this.selectAction(selectItem); else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption))) {
                        const optionItem = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption));
                        this.optionAction(selectItem, originalSelect, optionItem);
                    }
                } else if ("focusin" === targetType || "focusout" === targetType) {
                    if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect))) "focusin" === targetType ? selectItem.classList.add(this.selectClasses.classSelectFocus) : selectItem.classList.remove(this.selectClasses.classSelectFocus);
                } else if ("keydown" === targetType && "Escape" === e.code) this.selectsСlose();
            } else this.selectsСlose();
        }
        selectsСlose(selectOneGroup) {
            const selectsGroup = selectOneGroup ? selectOneGroup : document;
            const selectActiveItems = selectsGroup.querySelectorAll(`${this.getSelectClass(this.selectClasses.classSelect)}${this.getSelectClass(this.selectClasses.classSelectOpen)}`);
            if (selectActiveItems.length) selectActiveItems.forEach((selectActiveItem => {
                this.selectСlose(selectActiveItem);
            }));
        }
        selectСlose(selectItem) {
            const originalSelect = this.getSelectElement(selectItem).originalSelect;
            const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
            if (!selectOptions.classList.contains("_slide")) {
                selectItem.classList.remove(this.selectClasses.classSelectOpen);
                _slideUp(selectOptions, originalSelect.dataset.speed);
            }
        }
        selectAction(selectItem) {
            const originalSelect = this.getSelectElement(selectItem).originalSelect;
            const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
            if (originalSelect.closest("[data-one-select]")) {
                const selectOneGroup = originalSelect.closest("[data-one-select]");
                this.selectsСlose(selectOneGroup);
            }
            if (!selectOptions.classList.contains("_slide")) {
                selectItem.classList.toggle(this.selectClasses.classSelectOpen);
                _slideToggle(selectOptions, originalSelect.dataset.speed);
            }
        }
        setSelectTitleValue(selectItem, originalSelect) {
            const selectItemBody = this.getSelectElement(selectItem, this.selectClasses.classSelectBody).selectElement;
            const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
            if (selectItemTitle) selectItemTitle.remove();
            selectItemBody.insertAdjacentHTML("afterbegin", this.getSelectTitleValue(selectItem, originalSelect));
            if (originalSelect.hasAttribute("data-search")) this.searchActions(selectItem);
        }
        getSelectTitleValue(selectItem, originalSelect) {
            let selectTitleValue = this.getSelectedOptionsData(originalSelect, 2).html;
            if (originalSelect.multiple && originalSelect.hasAttribute("data-tags")) {
                selectTitleValue = this.getSelectedOptionsData(originalSelect).elements.map((option => `<span role="button" data-select-id="${selectItem.dataset.id}" data-value="${option.value}" class="_select-tag">${this.getSelectElementContent(option)}</span>`)).join("");
                if (originalSelect.dataset.tags && document.querySelector(originalSelect.dataset.tags)) {
                    document.querySelector(originalSelect.dataset.tags).innerHTML = selectTitleValue;
                    if (originalSelect.hasAttribute("data-search")) selectTitleValue = false;
                }
            }
            selectTitleValue = selectTitleValue.length ? selectTitleValue : originalSelect.dataset.placeholder ? originalSelect.dataset.placeholder : "";
            let pseudoAttribute = "";
            let pseudoAttributeClass = "";
            if (originalSelect.hasAttribute("data-pseudo-label")) {
                pseudoAttribute = originalSelect.dataset.pseudoLabel ? ` data-pseudo-label="${originalSelect.dataset.pseudoLabel}"` : ` data-pseudo-label="Заполните атрибут"`;
                pseudoAttributeClass = ` ${this.selectClasses.classSelectPseudoLabel}`;
            }
            this.getSelectedOptionsData(originalSelect).values.length ? selectItem.classList.add(this.selectClasses.classSelectActive) : selectItem.classList.remove(this.selectClasses.classSelectActive);
            const customClass = this.getSelectedOptionsData(originalSelect).elements.length && this.getSelectedOptionsData(originalSelect).elements[0].dataset.class ? ` ${this.getSelectedOptionsData(originalSelect).elements[0].dataset.class}` : "";
            if (originalSelect.hasAttribute("data-search")) return `<div class="${this.selectClasses.classSelectTitle} ${this.selectClasses.classSelectTitle}_search"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}"><input autocomplete="off" type="text" placeholder="${selectTitleValue}" data-placeholder="${selectTitleValue}" class="${this.selectClasses.classSelectInput} input_border ${customClass}"></span></div>`; else {
                let result = "";
                if (originalSelect.hasAttribute("data-icon-class")) result = `<button type="button" class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}${pseudoAttributeClass}"><span class="${this.selectClasses.classSelectContent}${customClass}">${selectTitleValue}</span></span><i class="${originalSelect.getAttribute("data-icon-class")}"></i></button>`; else result = `<button type="button" class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}${pseudoAttributeClass}"><span class="${this.selectClasses.classSelectContent}${customClass}">${selectTitleValue}</span></span></button>`;
                return result;
            }
        }
        getSelectElementContent(selectOption) {
            const selectOptionData = selectOption.dataset.asset ? `${selectOption.dataset.asset}` : "";
            const selectOptionDataHTML = selectOptionData.indexOf("img") >= 0 ? `<img src="${selectOptionData}" alt="">` : selectOptionData;
            let selectOptionContentHTML = ``;
            selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectRow}">` : "";
            selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectData}">` : "";
            selectOptionContentHTML += selectOptionData ? selectOptionDataHTML : "";
            selectOptionContentHTML += selectOptionData ? `</span>` : "";
            selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectText}">` : "";
            selectOptionContentHTML += selectOption.textContent;
            selectOptionContentHTML += selectOptionData ? `</span>` : "";
            selectOptionContentHTML += selectOptionData ? `</span>` : "";
            return selectOptionContentHTML;
        }
        getSelectPlaceholder(originalSelect) {
            const selectPlaceholder = Array.from(originalSelect.options).find((option => !option.value));
            if (selectPlaceholder) return {
                value: selectPlaceholder.textContent,
                show: selectPlaceholder.hasAttribute("data-show"),
                label: {
                    show: selectPlaceholder.hasAttribute("data-label"),
                    text: selectPlaceholder.dataset.label
                }
            };
        }
        getSelectedOptionsData(originalSelect, type) {
            let selectedOptions = [];
            if (originalSelect.multiple) selectedOptions = Array.from(originalSelect.options).filter((option => option.value)).filter((option => option.selected)); else selectedOptions.push(originalSelect.options[originalSelect.selectedIndex]);
            return {
                elements: selectedOptions.map((option => option)),
                values: selectedOptions.filter((option => option.value)).map((option => option.value)),
                html: selectedOptions.map((option => this.getSelectElementContent(option)))
            };
        }
        getOptions(originalSelect) {
            let selectOptionsScroll = originalSelect.hasAttribute("data-scroll") ? `data-simplebar` : "";
            let selectOptionsScrollHeight = originalSelect.dataset.scroll ? `style="max-height:${originalSelect.dataset.scroll}px"` : "";
            let selectOptions = Array.from(originalSelect.options);
            if (selectOptions.length > 0) {
                let selectOptionsHTML = ``;
                if (this.getSelectPlaceholder(originalSelect) && !this.getSelectPlaceholder(originalSelect).show || originalSelect.multiple) selectOptions = selectOptions.filter((option => option.value));
                selectOptionsHTML += selectOptionsScroll ? `<div ${selectOptionsScroll} ${selectOptionsScrollHeight} class="${this.selectClasses.classSelectOptionsScroll}">` : "";
                selectOptions.forEach((selectOption => {
                    selectOptionsHTML += this.getOption(selectOption, originalSelect);
                }));
                selectOptionsHTML += selectOptionsScroll ? `</div>` : "";
                return selectOptionsHTML;
            }
        }
        getOption(selectOption, originalSelect) {
            const selectOptionSelected = selectOption.selected && originalSelect.multiple ? ` ${this.selectClasses.classSelectOptionSelected}` : "";
            const selectOptionHide = selectOption.selected && !originalSelect.hasAttribute("data-show-selected") && !originalSelect.multiple ? `hidden` : ``;
            const selectOptionClass = selectOption.dataset.class ? ` ${selectOption.dataset.class}` : "";
            const selectOptionLink = selectOption.dataset.href ? selectOption.dataset.href : false;
            const selectOptionLinkTarget = selectOption.hasAttribute("data-href-blank") ? `target="_blank"` : "";
            let selectOptionHTML = ``;
            selectOptionHTML += selectOptionLink ? `<a ${selectOptionLinkTarget} ${selectOptionHide} href="${selectOptionLink}" data-value="${selectOption.value}" class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}">` : `<button ${selectOptionHide} class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}" data-value="${selectOption.value}" type="button">`;
            selectOptionHTML += this.getSelectElementContent(selectOption);
            selectOptionHTML += selectOptionLink ? `</a>` : `</button>`;
            return selectOptionHTML;
        }
        setOptions(selectItem, originalSelect) {
            const selectItemOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
            selectItemOptions.innerHTML = this.getOptions(originalSelect);
        }
        optionAction(selectItem, originalSelect, optionItem) {
            if (originalSelect.multiple) {
                optionItem.classList.toggle(this.selectClasses.classSelectOptionSelected);
                const originalSelectSelectedItems = this.getSelectedOptionsData(originalSelect).elements;
                originalSelectSelectedItems.forEach((originalSelectSelectedItem => {
                    originalSelectSelectedItem.removeAttribute("selected");
                }));
                const selectSelectedItems = selectItem.querySelectorAll(this.getSelectClass(this.selectClasses.classSelectOptionSelected));
                selectSelectedItems.forEach((selectSelectedItems => {
                    originalSelect.querySelector(`option[value="${selectSelectedItems.dataset.value}"]`).setAttribute("selected", "selected");
                }));
            } else {
                if (!originalSelect.hasAttribute("data-show-selected")) {
                    if (selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`)) selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`).hidden = false;
                    optionItem.hidden = true;
                }
                originalSelect.value = optionItem.hasAttribute("data-value") ? optionItem.dataset.value : optionItem.textContent;
                this.selectAction(selectItem);
            }
            this.setSelectTitleValue(selectItem, originalSelect);
            this.setSelectChange(originalSelect);
        }
        selectChange(e) {
            const originalSelect = e.target;
            this.selectBuild(originalSelect);
            this.setSelectChange(originalSelect);
        }
        setSelectChange(originalSelect) {
            if (originalSelect.hasAttribute("data-validate")) formValidate.validateInput(originalSelect);
            if (originalSelect.hasAttribute("data-submit") && originalSelect.value) {
                let tempButton = document.createElement("button");
                tempButton.type = "submit";
                originalSelect.closest("form").append(tempButton);
                tempButton.click();
                tempButton.remove();
            }
            const selectItem = originalSelect.parentElement;
            this.selectCallback(selectItem, originalSelect);
        }
        selectDisabled(selectItem, originalSelect) {
            if (originalSelect.disabled) {
                selectItem.classList.add(this.selectClasses.classSelectDisabled);
                this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.disabled = true;
            } else {
                selectItem.classList.remove(this.selectClasses.classSelectDisabled);
                this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.disabled = false;
            }
        }
        selectHidden(selectItem, originalSelect) {
            if (originalSelect.hasAttribute("data-hidden")) selectItem.classList.add(this.selectClasses.classSelectHidden); else selectItem.classList.remove(this.selectClasses.classSelectHidden);
        }
        selectNotHidden(selectItem, originalSelect) {
            if (originalSelect.hasAttribute("data-not-hidden")) selectItem.classList.add(this.selectClasses.classSelectNotHidden); else selectItem.classList.remove(this.selectClasses.classSelectNotHidden);
        }
        searchActions(selectItem) {
            this.getSelectElement(selectItem).originalSelect;
            const selectInput = this.getSelectElement(selectItem, this.selectClasses.classSelectInput).selectElement;
            const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
            const selectOptionsItems = selectOptions.querySelectorAll(`.${this.selectClasses.classSelectOption}`);
            const _this = this;
            selectOptionsItems.forEach((selectOptionsItem => {
                selectOptionsItem.hidden = false;
            }));
            selectInput.addEventListener("input", (function() {
                selectOptionsItems.forEach((selectOptionsItem => {
                    if (selectOptionsItem.textContent.toUpperCase().indexOf(selectInput.value.toUpperCase()) >= 0) selectOptionsItem.hidden = false; else selectOptionsItem.hidden = true;
                }));
                true === selectOptions.hidden ? _this.selectAction(selectItem) : null;
            }));
        }
        selectCallback(selectItem, originalSelect) {
            document.dispatchEvent(new CustomEvent("selectCallback", {
                detail: {
                    select: originalSelect
                }
            }));
        }
        setLogging(message) {
            this.config.logging ? functions_FLS(`[select]: ${message}`) : null;
        }
    }
    let stats = {
        "2023/2024": {
            championships: {
                "Регулярный чемпионат": {
                    players: [ {
                        name: "Гамалей",
                        position: "н",
                        goals: 21,
                        assists: 18,
                        games: 12
                    }, {
                        name: "Лосев",
                        position: "н",
                        goals: 14,
                        assists: 15,
                        games: 14
                    }, {
                        name: "Сорокин",
                        position: "н",
                        goals: 21,
                        assists: 14,
                        games: 14
                    }, {
                        name: "Бетькенёв",
                        position: "н",
                        goals: 25,
                        assists: 9,
                        games: 13
                    }, {
                        name: "Лёвкин",
                        position: "н",
                        goals: 10,
                        assists: 19,
                        games: 14
                    }, {
                        name: "Дубовенко",
                        position: "н",
                        goals: 13,
                        assists: 10,
                        games: 12
                    }, {
                        name: "Тюкин",
                        position: "з",
                        goals: 2,
                        assists: 9,
                        games: 14
                    }, {
                        name: "Коновалов",
                        position: "н",
                        goals: 5,
                        assists: 4,
                        games: 14
                    }, {
                        name: "Куличков",
                        position: "н",
                        goals: 7,
                        assists: 7,
                        games: 14
                    }, {
                        name: "Брусницин",
                        position: "н",
                        goals: 5,
                        assists: 4,
                        games: 12
                    }, {
                        name: "Аношин",
                        position: "з",
                        goals: 1,
                        assists: 6,
                        games: 13
                    }, {
                        name: "Зыбин",
                        position: "з",
                        goals: 0,
                        assists: 4,
                        games: 13
                    }, {
                        name: "Крепостин",
                        position: "з",
                        goals: 5,
                        assists: 10,
                        games: 14
                    } ],
                    data: {
                        info: {
                            index: 0
                        }
                    }
                },
                "Отбор на золотую шайбу": {
                    players: [ {
                        name: "Гамалей",
                        position: "н",
                        goals: 2,
                        assists: 2,
                        games: 3
                    }, {
                        name: "Лосев",
                        position: "н",
                        goals: 3,
                        assists: 0,
                        games: 3
                    }, {
                        name: "Сорокин",
                        position: "н",
                        goals: 0,
                        assists: 4,
                        games: 3
                    }, {
                        name: "Бетькенёв",
                        position: "н",
                        goals: 2,
                        assists: 0,
                        games: 3
                    }, {
                        name: "Лёвкин",
                        position: "н",
                        goals: 2,
                        assists: 1,
                        games: 3
                    }, {
                        name: "Дубовенко",
                        position: "н",
                        goals: 0,
                        assists: 0,
                        games: 3
                    }, {
                        name: "Тюкин",
                        position: "з",
                        goals: 0,
                        assists: 1,
                        games: 2
                    }, {
                        name: "Коновалов",
                        position: "н",
                        goals: 1,
                        assists: 0,
                        games: 3
                    }, {
                        name: "Куличков",
                        position: "н",
                        goals: 0,
                        assists: 1,
                        games: 3
                    }, {
                        name: "Брусницин",
                        position: "н",
                        goals: 0,
                        assists: 0,
                        games: 3
                    }, {
                        name: "Аношин",
                        position: "з",
                        goals: 0,
                        assists: 0,
                        games: 3
                    }, {
                        name: "Зыбин",
                        position: "з",
                        goals: 0,
                        assists: 1,
                        games: 3
                    }, {
                        name: "Крепостин",
                        position: "з",
                        goals: 3,
                        assists: 0,
                        games: 3
                    } ],
                    data: {
                        info: {
                            index: 1
                        }
                    }
                }
            },
            data: {
                info: {
                    index: 0
                }
            }
        }
    };
    let sortRules = {
        position: [ [ "points" ], [ "goals" ], [ "games", "<" ] ],
        goals: [ [ "assists" ], [ "games", "<" ] ],
        assists: [ [ "goals" ], [ "games", "<" ] ],
        points: [ [ "goals" ], [ "games", "<" ] ],
        "game-points": [ [ "goals" ] ],
        "game-goals": [ [ "assists" ] ],
        "game-assists": [ [ "goals" ] ]
    };
    let dict = {
        rating: {
            abbreviation: "#"
        },
        name: {
            name: "Игрок",
            abbreviation: "Игрок",
            description: "Фамилия игрока"
        },
        position: {
            name: "Позиция",
            abbreviation: "А",
            description: "Позиция игрока: <nobr>н - нападающий</nobr>, <nobr>з - защитник</nobr>"
        },
        goals: {
            name: "Голы",
            abbreviation: "Г",
            description: "Количество голов игрока"
        },
        assists: {
            name: "Голевые передачи",
            abbreviation: "П",
            description: "Количество голевых передач игрока"
        },
        points: {
            name: "Очки",
            abbreviation: "О",
            description: "Количество очков игрока"
        },
        games: {
            name: "Игры",
            abbreviation: "И",
            description: "Количество игр"
        },
        "game-points": {
            name: "Очков за игру в среднем",
            abbreviation: "О/И",
            description: "Среднее количество очков за 1 игру"
        },
        "game-goals": {
            name: "Голов за игру в среднем",
            abbreviation: "Г/И",
            description: "Среднее количество голов за 1 игру"
        },
        "game-assists": {
            name: "Голевых передач за игру в среднем",
            abbreviation: "П/И",
            description: "Среднее количество голевых передач за 1 игру"
        }
    };
    const contentTable = document.querySelector(".content__table");
    const tableStatNamesAll = [ "rating", "name", "position", "games", "goals", "assists", "points", "game-points", "game-goals", "game-assists" ];
    let tableStatNames = "";
    let styleNode;
    let screenWidthBeforeResize = document.documentElement.clientWidth / +getComputedStyle(document.documentElement).fontSize.slice(0, 2) * 16;
    function rem(px) {
        return `${px / 16}rem`;
    }
    function showStatInTable() {
        const screenWidth = document.documentElement.clientWidth / +getComputedStyle(document.documentElement).fontSize.slice(0, 2) * 16;
        const breakPoints = [ 992, 600, 480, 320, 240 ];
        if (screenWidth >= breakPoints[0] && screenWidthBeforeResize < breakPoints[0] || screenWidth >= breakPoints[1] && screenWidthBeforeResize < breakPoints[1] || screenWidth >= breakPoints[2] && screenWidthBeforeResize < breakPoints[2] || screenWidth >= breakPoints[3] && screenWidthBeforeResize < breakPoints[3] || screenWidth >= breakPoints[4] && screenWidthBeforeResize < breakPoints[4] || screenWidth < breakPoints[0] && screenWidthBeforeResize >= breakPoints[0] || screenWidth < breakPoints[1] && screenWidthBeforeResize >= breakPoints[1] || screenWidth < breakPoints[2] && screenWidthBeforeResize >= breakPoints[2] || screenWidth < breakPoints[3] && screenWidthBeforeResize >= breakPoints[3] || screenWidth < breakPoints[4] && screenWidthBeforeResize >= breakPoints[4] || screenWidthBeforeResize == screenWidth) {
            if (screenWidth >= 600) contentTable.setAttribute("data-stat-names", "rating, name, position, games, goals, assists, points, game-points, game-goals, game-assists"); else if (screenWidth >= 480) contentTable.setAttribute("data-stat-names", "rating, name, position, games, goals, assists, points"); else if (screenWidth >= 320) contentTable.setAttribute("data-stat-names", "rating, name, games, goals, assists, points"); else if (screenWidth >= 240) contentTable.setAttribute("data-stat-names", "rating, name, goals, assists, points"); else contentTable.setAttribute("data-stat-names", "name, goals, assists, points");
            tableStatNames = contentTable.getAttribute("data-stat-names") ? contentTable.getAttribute("data-stat-names").replaceAll(" ", "").split(",") : tableStatNamesAll;
            createTableHead();
            createLine();
            createLegend();
            const tdAll = contentTable.querySelectorAll(".td");
            for (const td of tdAll) td.classList.add("_td-hidden");
            let gridTemplateColumnsStyle = "";
            for (const tableAttribute of tableStatNames) {
                switch (tableAttribute) {
                  case "rating":
                    if (screenWidth >= 480) gridTemplateColumnsStyle += `${rem(50)} `; else gridTemplateColumnsStyle += `${rem(35)} `;
                    break;

                  case "name":
                    if (screenWidth >= 992) gridTemplateColumnsStyle += `minmax(${rem(150)}, auto) `; else if (screenWidth >= 600) gridTemplateColumnsStyle += `minmax(${rem(130)}, auto) `; else gridTemplateColumnsStyle += `minmax(${rem(100)}, auto) `;
                    break;

                  case "position":
                    if (screenWidth >= 480) gridTemplateColumnsStyle += `${rem(50)} `; else gridTemplateColumnsStyle += `${rem(40)} `;
                    break;

                  default:
                    if (screenWidth >= 480) gridTemplateColumnsStyle += `minmax(${rem(50)}, 1fr) `; else gridTemplateColumnsStyle += `minmax(${rem(40)}, 1fr) `;
                }
                const currentTdAll = document.querySelectorAll(`.table-${tableAttribute}`);
                for (const currentTd of currentTdAll) currentTd.classList.remove("_td-hidden");
            }
            contentTable.style.gridTemplateColumns = gridTemplateColumnsStyle;
            const sortSettings = curStats["data"]["sort-settings"];
            if (sortSettings && sortSettings["stat-name"] && -1 == tableStatNames.indexOf(sortSettings["stat-name"])) {
                removeStyle();
                delete curStats["data"]["sort-settings"];
                sorted(defaultSortScore);
                addStyle(defaultSortScore);
                const buttonSorted = document.querySelector("._icon-sorted");
                const targetBlock = document.querySelector(`.th-${defaultSortScore} button`);
                if (buttonSorted) buttonSorted.classList.remove("_icon-sorted", "_increase");
                targetBlock.classList.add("_icon-sorted", "_increase");
                createLine();
            }
        }
        screenWidthBeforeResize = screenWidth;
    }
    addEventListener("resize", showStatInTable);
    function roundDecimal(num, quantSimbols = 1) {
        const auxiliaryNumber = Number("1" + "0".repeat(quantSimbols));
        return Math.round(num * auxiliaryNumber) / auxiliaryNumber;
    }
    function createAdditionalStats(statsPlayer) {
        const statPlayerAssists = statsPlayer["assists"];
        const statPlayerGoals = statsPlayer["goals"];
        const statPlayerGames = statsPlayer["games"];
        const statPlayerPoints = statPlayerGoals + statPlayerAssists;
        statsPlayer["points"] = statPlayerPoints;
        statsPlayer["game-points"] = roundDecimal(statPlayerPoints / statPlayerGames, 2);
        statsPlayer["game-goals"] = roundDecimal(statPlayerGoals / statPlayerGames, 2);
        statsPlayer["game-assists"] = roundDecimal(statPlayerAssists / statPlayerGames, 2);
    }
    function createGeneralStats() {
        const generalStatsInYearName = "За весь сезон";
        const generalStatsName = "За все сезоны";
        const generalStatsPlayersObject = {};
        const sortedChampionshipYears = [];
        for (const year in stats) {
            const sortedChampionshipNames = [];
            const generalStatsInYearPlayersObject = {};
            const statsYear = stats[year]["championships"];
            sortedChampionshipYears.push([ stats[year]["data"]["info"]["index"], year, [] ]);
            for (const championshipName in statsYear) {
                const statsChampionshipName = statsYear[championshipName];
                const statsChampionshipPlayers = statsChampionshipName["players"];
                sortedChampionshipNames.push([ statsChampionshipName["data"]["info"]["index"], championshipName ]);
                for (const player in statsChampionshipPlayers) {
                    const statsPlayer = statsChampionshipPlayers[player];
                    createAdditionalStats(statsPlayer);
                    const playerName = statsPlayer["name"];
                    if (!(playerName in generalStatsInYearPlayersObject)) generalStatsInYearPlayersObject[playerName] = {};
                    if (!(playerName in generalStatsPlayersObject)) generalStatsPlayersObject[playerName] = {};
                    for (const stat in statsPlayer) {
                        if (!(stat in generalStatsInYearPlayersObject[playerName])) generalStatsInYearPlayersObject[playerName][stat] = statsPlayer[stat]; else if ("string" != typeof statsPlayer[stat]) generalStatsInYearPlayersObject[playerName][stat] += statsPlayer[stat];
                        if (!(stat in generalStatsPlayersObject[playerName])) generalStatsPlayersObject[playerName][stat] = statsPlayer[stat]; else if ("string" != typeof statsPlayer[stat]) generalStatsPlayersObject[playerName][stat] += statsPlayer[stat];
                    }
                }
            }
            for (const generalStatsInYearPlayerName in generalStatsInYearPlayersObject) {
                const generalStatsInYearPlayer = generalStatsInYearPlayersObject[generalStatsInYearPlayerName];
                createAdditionalStats(generalStatsInYearPlayer);
            }
            statsYear[generalStatsInYearName] = {
                players: [],
                data: {
                    info: {
                        index: "last"
                    }
                }
            };
            const generalStatsInYearPlayers = statsYear[generalStatsInYearName]["players"];
            for (const generalStatsInYearPlayer in generalStatsInYearPlayersObject) generalStatsInYearPlayers.push(generalStatsInYearPlayersObject[generalStatsInYearPlayer]);
            sortedChampionshipNames.push([ statsYear[generalStatsInYearName]["data"]["info"]["index"], generalStatsInYearName ]);
            sortedChampionshipNames.sort((function(a, b) {
                a = a[0];
                b = b[0];
                if ("first" == b) return 1; else if ("first" == a) return -1; else if ("last" == b) return -1; else if ("last" == a) return 1; else return a - b;
            }));
            sortedChampionshipYears[sortedChampionshipYears.length - 1][2] = sortedChampionshipNames;
        }
        stats[generalStatsName] = {
            championships: {
                0: {
                    players: [],
                    data: {}
                }
            },
            data: {
                info: {
                    index: "last",
                    "show-championships": false
                }
            }
        };
        for (const generalStatsPlayerName in generalStatsPlayersObject) {
            const generalStatsPlayer = generalStatsPlayersObject[generalStatsPlayerName];
            createAdditionalStats(generalStatsPlayer);
        }
        const generalStatsPlayers = stats[generalStatsName]["championships"]["0"]["players"];
        for (const generalStatsPlayer in generalStatsPlayersObject) generalStatsPlayers[generalStatsPlayers.length] = generalStatsPlayersObject[generalStatsPlayer];
        sortedChampionshipYears.push([ stats[generalStatsName]["data"]["info"]["index"], generalStatsName, [ [ 0, "0" ] ] ]);
        sortedChampionshipYears.sort((function(a, b) {
            a = a[0];
            b = b[0];
            if ("first" == b) return 1; else if ("first" == a) return -1; else if ("last" == b) return -1; else if ("last" == a) return 1; else return a - b;
        }));
        return sortedChampionshipYears;
    }
    let sortedChampionships = createGeneralStats();
    let curStatsYear = stats[sortedChampionships[0][1]];
    let curStats = curStatsYear["championships"][sortedChampionships[0][2][0][1]];
    let curPlayers = curStats["players"];
    const defaultSortScore = "points";
    document.addEventListener("selectCallback", (function(e) {
        const currentSelect = e.detail.select;
        const currentSelectValue = currentSelect.value;
        if ("championship-years-select" == currentSelect.id) {
            const championshipNameSelect = document.querySelector(`[data-years="${currentSelectValue}"]`);
            const championshipNameSelectDiv = championshipNameSelect.closest(".select");
            const selectNotHidden = document.querySelector("._select-not-hidden");
            if (selectNotHidden) {
                selectNotHidden.classList.remove("_select-not-hidden");
                selectNotHidden.classList.add("_select-hidden");
            }
            if (false !== stats[currentSelectValue]["data"]["info"]["show-championships"]) {
                championshipNameSelectDiv.classList.add("_select-not-hidden");
                championshipNameSelectDiv.classList.remove("_select-hidden");
            }
            curStatsYear = stats[currentSelectValue];
            curStats = [];
            for (let index = 0; index < sortedChampionships.length; index++) if (sortedChampionships[index][1] == currentSelectValue) curStats = curStatsYear["championships"][sortedChampionships[index][2][0][1]];
        } else if (currentSelect.classList.contains("championship-names-select")) curStats = curStatsYear["championships"][currentSelectValue];
        curPlayers = curStats["players"];
        main();
    }));
    showStatInTable();
    const championshipYearsSelect = document.querySelector("#championship-years-select");
    function createChampionshipYearsSelect() {
        for (let i = 0; i < sortedChampionships.length; i++) {
            const option = document.createElement("option");
            option.value = sortedChampionships[i][1];
            if (0 == i) option.selected = true;
            option.innerHTML = sortedChampionships[i][1];
            championshipYearsSelect.append(option);
        }
    }
    function createChampionshipNamesSelect() {
        const championshipNameSelects = document.querySelector(".championship-select__names");
        for (let index = 0; index < sortedChampionships.length; index++) {
            const championshipNameSelect = document.createElement("select");
            championshipNameSelect.classList.add("form", "championship-names-select");
            championshipNameSelect.setAttribute("data-years", sortedChampionships[index][1]);
            if (sortedChampionships[index][1] != championshipYearsSelect.value || false === stats[sortedChampionships[index][1]]["data"]["info"]["show-championships"]) championshipNameSelect.setAttribute("data-hidden", ""); else championshipNameSelect.setAttribute("data-not-hidden", "");
            const championshipNamesKeys = sortedChampionships[index][2];
            for (let i = 0; i < championshipNamesKeys.length; i++) {
                const option = document.createElement("option");
                option.value = championshipNamesKeys[i][1];
                if (0 == i) option.selected = true;
                option.innerHTML = championshipNamesKeys[i][1];
                championshipNameSelect.append(option);
            }
            championshipNameSelects.append(championshipNameSelect);
        }
    }
    createChampionshipYearsSelect();
    createChampionshipNamesSelect();
    modules_modules.select = new SelectConstructor({});
    function sorted(param) {
        if (!curStats["data"]["sort-settings"]) curStats["data"]["sort-settings"] = {};
        const sortOption = curStats["data"]["sort-settings"];
        if (sortOption["stat-name"] == param) if ("increase" == sortOption["order"]) sortOption["order"] = "declime"; else sortOption["order"] = "increase"; else sortOption["order"] = "increase";
        sortOption["stat-name"] = param;
        function mainSort(type = "increase") {
            if ("name" == param) curPlayers.sort((function(a, b) {
                return +(a[param] > b[param]) - 1;
            })); else curPlayers.sort((function(a, b) {
                function sortWithPar(i = 0) {
                    if (sortRules[param]) {
                        if (i == sortRules[param].length) return 0;
                        if (b[sortRules[param][i][0]] == a[sortRules[param][i][0]]) return sortWithPar(i + 1);
                        if (!sortRules[param][i][1] || "<" != sortRules[param][i][1]) return b[sortRules[param][i][0]] - a[sortRules[param][i][0]]; else return a[sortRules[param][i][0]] - b[sortRules[param][i][0]];
                    }
                }
                if (b[param] == a[param]) {
                    const localResult = sortWithPar();
                    if (0 == localResult) correctPositionNum();
                    return localResult;
                }
                function correctPositionNum() {
                    a["same-values"] = String(a["goals"]) + "," + String(a["assists"]) + "," + String(a["games"]);
                    b["same-values"] = String(b["goals"]) + "," + String(b["assists"]) + "," + String(b["games"]);
                }
                if ("string" == typeof curPlayers[0][param]) if ("increase" == type) return +(a[param] < b[param]) - 1; else return +(a[param] > b[param]) - 1; else return b[param] - a[param];
            }));
        }
        if ("declime" == sortOption["order"]) if ("name" != param && "string" == typeof curPlayers[0][param]) mainSort("declime"); else {
            mainSort();
            curPlayers.reverse();
        } else mainSort();
    }
    function createTableHead() {
        const currentTHead = contentTable.querySelector("thead");
        let tHead = "";
        if (currentTHead) {
            currentTHead.innerHTML = "";
            tHead = currentTHead;
        } else tHead = document.createElement("thead");
        const tr = document.createElement("tr");
        tr.classList.add("content__tr-head");
        for (let statIndex = 0; statIndex < tableStatNames.length; statIndex++) {
            const elementStatName = tableStatNames[statIndex];
            const th = document.createElement("th");
            th.classList.add("content__th", "th", `th-${elementStatName}`, "td", `table-${elementStatName}`);
            const button = document.createElement("button");
            button.classList.add("th__inner");
            if ("rating" == elementStatName) button.setAttribute("data-button-sort", false); else if ("points" == elementStatName) button.classList.add("_icon-sorted", "_increase");
            button.setAttribute("data-stat-name", elementStatName);
            button.innerHTML = dict[elementStatName]["abbreviation"];
            if (dict[elementStatName]["name"]) button.title = dict[elementStatName]["name"];
            th.append(button);
            tr.append(th);
        }
        tHead.append(tr);
        if (contentTable) contentTable.append(tHead);
    }
    function createLine() {
        const tBody = document.createElement("tbody");
        let currentNumber = 1;
        for (let index = 0; index < curPlayers.length; index++) {
            const tr = document.createElement("tr");
            tr.classList.add("content__tr");
            for (let statIndex = 0; statIndex < tableStatNames.length; statIndex++) {
                const elementStatName = tableStatNames[statIndex];
                let elementStatValue = "";
                if ("rating" == elementStatName) if (curPlayers[index - 1] && curPlayers[index - 1]["same-values"] && curPlayers[index - 1]["same-values"] == curPlayers[index]["same-values"]) elementStatValue = currentNumber; else {
                    elementStatValue = index + 1;
                    currentNumber = index + 1;
                } else elementStatValue = curPlayers[index][elementStatName];
                const td = document.createElement("td");
                td.classList.add("content__td", "td", `td-${elementStatName}`, `table-${elementStatName}`);
                if (-1 != statIndex && -1 == tableStatNames.indexOf(elementStatName)) td.classList.add("_td-hidden");
                const span = document.createElement("span");
                span.classList.add("td__inner");
                span.setAttribute("data-stat-name", elementStatName);
                span.innerHTML = elementStatValue;
                td.append(span);
                tr.append(td);
            }
            tBody.append(tr);
        }
        if (contentTable) {
            contentTable.querySelector("tbody") ? contentTable.removeChild(contentTable.querySelector("tbody")) : null;
            contentTable.append(tBody);
        }
    }
    function createLegend() {
        const legendBlock = document.querySelector(".stats-description");
        legendBlock.innerHTML = "";
        let noDescriptions = true;
        for (const statName of tableStatNames) {
            const statNameData = dict[statName];
            if (statNameData && statNameData["description"]) {
                noDescriptions = false;
                const statNameDescription = statNameData["description"];
                const statNameAbbreviation = statNameData["abbreviation"];
                const statsDescriptionItemBlock = document.createElement("div");
                statsDescriptionItemBlock.classList.add("stats-description__item", "item-stats-description");
                const statsDescriptionAbbreviationBlock = document.createElement("div");
                statsDescriptionAbbreviationBlock.classList.add("item-stats-description__abbreviation");
                statsDescriptionAbbreviationBlock.innerHTML = statNameAbbreviation;
                statsDescriptionItemBlock.append(statsDescriptionAbbreviationBlock);
                const statsDescriptionDashBlock = document.createElement("div");
                statsDescriptionDashBlock.classList.add("item-stats-description__dash");
                statsDescriptionDashBlock.innerHTML = "-";
                statsDescriptionItemBlock.append(statsDescriptionDashBlock);
                const statsDescriptionValueBlock = document.createElement("div");
                statsDescriptionValueBlock.classList.add("item-stats-description__value");
                statsDescriptionValueBlock.innerHTML = statNameDescription;
                statsDescriptionItemBlock.append(statsDescriptionValueBlock);
                legendBlock.append(statsDescriptionItemBlock);
            }
        }
        if (noDescriptions) legendBlock.classList.add("_hidden"); else legendBlock.classList.remove("_hidden");
    }
    function addStyle(dataStatNameValue) {
        styleNode = document.createElement("style");
        styleNode.innerText = `.td-${dataStatNameValue}:before, .th-${dataStatNameValue}:before, .th-${dataStatNameValue} button:before {opacity: 0.03 !important; z-index: 5 !important;}`;
        document.body.appendChild(styleNode);
    }
    function removeStyle() {
        if (styleNode && styleNode.parentNode) styleNode.parentNode.removeChild(styleNode);
    }
    function main() {
        contentTable ? contentTable.innerHTML = "" : null;
        removeStyle();
        curStats["data"]["sort-settings"] ? delete curStats["data"]["sort-settings"] : null;
        sorted(defaultSortScore);
        addStyle(defaultSortScore);
        createTableHead();
        createLine();
        showStatInTable();
    }
    main();
    document.addEventListener("click", (function(e) {
        const targetBlock = e.target.closest(".th__inner");
        if (targetBlock && !targetBlock.getAttribute("data-button-sort")) {
            sorted(targetBlock.getAttribute("data-stat-name"));
            const buttonSorted = document.querySelector("._icon-sorted");
            if (buttonSorted && buttonSorted != targetBlock) buttonSorted.classList.remove("_icon-sorted", "_increase");
            removeStyle();
            addStyle(targetBlock.getAttribute("data-stat-name"));
            targetBlock.classList.add("_icon-sorted");
            targetBlock.classList.toggle("_increase");
            createLine();
        }
    }));
    window["FLS"] = true;
    isWebp();
    formQuantity();
    if (true) ;
})();