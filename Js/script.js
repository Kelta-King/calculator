const buttonWrap = document.getElementById("buttonWrap");
const displayScreen = document.getElementById("displayScreen");
const btnOnOff = document.getElementById("btnOnOff");
const allBtns = document.querySelectorAll(".calculator-btn");

let isCalculatorOn = true;

let numbers = "0123456789";

let mathOperators = "-+*/";

//stores all the symbols that user sees on the calculator display
let currentEquationNum = "";

//will be using this to check if there's already a . in our number sequence
let currentSequence = "";

let previousSymbol = "";

btnOnOff.addEventListener("click", () => {
    //on click toggle calculator on/off animation
    if (allBtns[0].classList.contains("calculator-btn")) {
        allBtns.forEach((btn) => {
            btn.classList.remove("calculator-btn");
            btn.classList.add("box-shadow-none");
        });
        displayScreen.classList.remove("display-screen");
        displayScreen.classList.add("box-shadow-none-display-screen");
    } else {
        allBtns.forEach((btn) => {
            btn.classList.add("calculator-btn");
            btn.classList.remove("box-shadow-none");
            displayScreen.classList.add("display-screen");
            displayScreen.classList.remove("box-shadow-none-display-screen");
        });
    }
    //on click toggle calculator state
    if (isCalculatorOn) {
        displayScreen.innerText = "";
        currentSequence = "";
        currentEquationNum = "";
        previousSymbol = "";
        isCalculatorOn = false;
        clearInterval(x);
    } 
    else {
        isCalculatorOn = true;
        x = setInterval(draw, 33);
    }
});

/////////////////////////////////////////////////
buttonWrap.addEventListener("click", (e) => {
    
    let pressedSymbol = e.target.innerText;

    calculation(pressedSymbol);

});

function calculation(pressedSymbol){

    if (isCalculatorOn) {

        //if the pressed symbol is a number or a math operator
        if (pressedSymbol.length === 1) {
            // we can only add - to the number at the beginning of the number
            if (pressedSymbol === "-" && currentEquationNum === "") {
                currentSequence += pressedSymbol;
                currentEquationNum += pressedSymbol;
                displayScreen.innerText = currentEquationNum;
            }

            //we can only add . once per number and if it's not the first symbol
            else if (
                pressedSymbol === "." &&
                previousSymbol !== "." &&
                currentEquationNum.length >= 1 &&
                !currentSequence.includes(".")
            ) {
                currentSequence += pressedSymbol;
                currentEquationNum += pressedSymbol;
                displayScreen.innerText = currentEquationNum;
            }

            //if the pressed button is a number
            else if (numbers.includes(pressedSymbol)) {
                currentSequence += pressedSymbol;
                currentEquationNum += pressedSymbol;
                displayScreen.innerText = currentEquationNum;
            }

            //if the pressed button is a math operator and number's length is over 1.
            else if (
                mathOperators.includes(pressedSymbol) &&
                currentEquationNum.length >= 1
            ) {
                //we can't add math operators to the number if the beginning of the number contains a combination of . or -
                if (
                    currentEquationNum !== "-" &&
                    currentEquationNum !== "-." &&
                    currentEquationNum !== "."
                ) {
                    //if the user presses a math operator button twice, the math operator starts changing
                    if (previousSymbol !== "" && mathOperators.includes(previousSymbol)) {
                        currentSequence = "";
                        currentEquationNum = currentEquationNum.slice(0, -1);
                        currentEquationNum += pressedSymbol;
                        displayScreen.innerText = currentEquationNum;
                    } else {
                        currentSequence = "";
                        currentEquationNum += pressedSymbol;
                        displayScreen.innerText = currentEquationNum;
                    }
                }
            }
            //if the pressed button is =
            else if (pressedSymbol === "=") {
                currentEquationNum = Function("return " + currentEquationNum)().toString();
                displayScreen.innerText = currentEquationNum;
                currentSequence = currentEquationNum;
            }

            //if the pressed button is C
            else if (pressedSymbol === "C") {
                displayScreen.innerText = "";
                currentSequence = "";
                currentEquationNum = "";
                previousSymbol = "";
            }
        }

        //if the pressed button is Del
        else if (pressedSymbol === "Del") {
            currentEquationNum = currentEquationNum.slice(0, -1);
            displayScreen.innerText = currentEquationNum;
            currentSequence = currentSequence.slice(0, -1);
        }

        //Save previous symbol value if the user pressed on the number or +-*/ operator buttons
        if (
            pressedSymbol.length === 1 &&
            pressedSymbol !== "=" &&
            pressedSymbol !== "C"
        ) {
            previousSymbol = pressedSymbol;
        }
    }

    //if the calculator is turned off, exit the function
    else if (isCalculatorOn === false) {
        return;
    }

}


document.addEventListener("keydown", function (evt) {

    if (evt.key >= 0 && evt.key <= 9) {
        calculation(evt.key);
    } else if (evt.key == "+" || evt.key == "-" || evt.key == "/" || evt.key == "*" || evt.key == ".") {
        calculation(evt.key);
    }
    else if(evt.key == "Enter"){
        calculation("=");
    }

});