/***
 * Small, simple calculator which supports:
 * 
 * addition, subtracting, multiplying, dividing 
 */

/***
 * Function to evaluate the expression to be calculated,
 * gives alert if user tries something non-mathematic
 * 
 * @param {JQuery object} field - field to be evaluated
 */
function equalCLicked(field){
    try {
        let result = Function("return " + field.text());
        if (typeof(result()) === "number"){
            field.text(result())
        }
    } catch (error) {
        alert('Check the input, something is wrong!')
    }
}

/***
 * Alters the screen of the calculator
 * @param {JQuery object} field - field to be changed
 * @param {(string, number)} value 
 */
function additionClick(field, value){
    if (field.text() === '0'){
        field.text(value)
    }
    else {
        field.text(field.text() + value);
    };
};

/**
 * Clears the screen of the calculator
 * @param {JQuery object} field - field to be cleared
*/
function clearClick(field){
    if (field.text().length > 1){
        field.text(cfield.text().slice(0,-1));
    }
    else {
        field.text('0');
    };
};

/**
 * Resets field param to 0
 * @param {JQuery object} field - field to be reset
 */
function clearEverythingClick(field){
    field.text('0');
}

/**
 * Html component(s)
 */
class Button {
    /**
     * Object which build a html component
     * with an onClick function and a value
     * 
     * @param {(string, number)} value - text to be shown in component
     * @param {Function} onClickFunc - Function to be happen if clicked
     * @param {string} className - hmtl className for component  
     */
    constructor(value, onClickFunc, className){
        this.value = value;
        this.element = document.createElement('div');
        this.element.onclick = this.onClick.bind(this);
        this.element.innerHTML = value;
        this.element.className = className;
        this.func = onClickFunc;
    }
    
    onClick(){
        let field = $('#calcField');
        this.func(field, this.value);
    };
};



/**
 * Drawing the calculator, happens onload
 * 
 */
function MakeCalc(){
    // Add container to body
    let container = document.createElement('div');
    container.id = 'container';
    const body = $('body');
    body.append(container);

    // All buttons
    const numButtons = '1234567890.';
    const operators = '+-*/';
    const equals = '=';
    const clear = 'C';
    const clearEverything = 'CE';

    // Add field for calculation (the screen)
    const calcFieldWrapper =  document.createElement('div');
    calcFieldWrapper.className = 'calcFieldWrapper';

    const calcField =  document.createElement('div');
    calcField.id = 'calcField';
    calcField.innerHTML = '0';
    calcFieldWrapper.append(calcField);
    
    // Convert buttons to Arr to map
    const numArr = [...numButtons];
    const operArr = [...operators];

    // Add wrappers for css 
    const operButtonWrapper =  document.createElement('div');
    operButtonWrapper.className = 'operButtonWrapper';
    
    const numButtonWrapper =  document.createElement('div');
    numButtonWrapper.className = 'numButtonWrapper';

    const Wrappers = [calcFieldWrapper, numButtonWrapper, operButtonWrapper];

    // Map buttons to hmtl elements
    const numHtmlElements = numArr.map(x => new Button(x, additionClick, 'Numerical'));
    const equalsHtmlElement = new Button(equals, equalCLicked   , 'Numerical');
    numHtmlElements.push(equalsHtmlElement);

    const operHtmlElements = operArr.map(x => new Button(x, additionClick, 'Operators'));
    const clearElement = new Button(clear, clearClick, 'Operators');
    const clearEverythingElement = new Button(clearEverything, clearEverythingClick, 'Operators');
    operHtmlElements.push(clearElement, clearEverythingElement);

    // Add html elements to wrappers
    numHtmlElements.map(x => numButtonWrapper.append(x.element));
    operHtmlElements.map(x => operButtonWrapper.append(x.element));

    // Add wrappers to html
    Wrappers.map(x => container.append(x));
    };