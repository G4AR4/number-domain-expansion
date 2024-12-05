// References to the display and history elements
const display = document.getElementById("display");
const historyContainer = document.getElementById("history");

// Function to update the display
function updateDisplay(value) {
    if (display.textContent === "0" || display.textContent === "Error") {
        display.textContent = value; // Replace default 0 or Error with new input
    } else {
        display.textContent += value; // Append value
    }
}

// Function to append numbers
function appendNumber(number) {
    updateDisplay(number);
}

// Function to append operators
function appendOperator(operator) {
    const lastChar = display.textContent.slice(-1);
    // Prevent adding two consecutive operators
    if (!["+", "-", "*", "/", "%"].includes(lastChar)) {
        display.textContent += operator;
    }
}

// Function to clear the display
function clearAll() {
    display.textContent = "0";
}

// Function to delete the last character
function deleteLast() {
    display.textContent = display.textContent.slice(0, -1) || "0";
}

// Function to calculate the result
function calculate() {
    try {
        // Evaluate the expression and round to 10 decimal places to avoid floating-point errors
        const result = eval(display.textContent).toFixed(10).replace(/\.?0+$/, ""); // Remove trailing zeros
        addToHistory(display.textContent, result);
        display.textContent = result;
    } catch (error) {
        display.textContent = "Error"; // Handle invalid expressions
    }
}

// Function to toggle the sign of the number
function toggleSign() {
    if (display.textContent.startsWith("-")) {
        display.textContent = display.textContent.slice(1); // Remove negative sign
    } else if (display.textContent !== "0" && display.textContent !== "Error") {
        display.textContent = "-" + display.textContent; // Add negative sign
    }
}

// Function to add a decimal point
function appendDecimal() {
    if (!display.textContent.includes(".")) {
        display.textContent += ".";
    }
}

// Function to add a calculation to the history
function addToHistory(expression, result) {
    const entry = document.createElement("div");
    entry.classList.add("history-entry");
    entry.textContent = `${expression} = ${result}`;
    historyContainer.prepend(entry); // Add to the top of the history
}

// Function to clear the calculation history
function clearHistory() {
    historyContainer.innerHTML = ""; // Remove all history entries
}

function addToHistory(expression, result) {
    const entry = document.createElement("div");
    entry.classList.add("history-entry");
    
    const text = document.createElement("span");
    text.textContent = `${expression} = ${result}`;
    
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.classList.add("delete-history");
    deleteButton.onclick = function () {
        entry.remove(); // Remove this history entry
    };
    
    entry.appendChild(text);
    entry.appendChild(deleteButton);
    historyContainer.prepend(entry); // Add to the top of the history
}

;