let display = document.getElementById("display");
let historyContainer = document.getElementById("history");
let expression = "";

// Load history from localStorage only once
function loadHistory() {
    const history = JSON.parse(localStorage.getItem("calcHistory")) || [];
    updateHistoryDisplay(history);
}

// Optimized display update
function updateDisplay(value) {
    display.textContent = value || "0";
}

// Append number/operator directly to the display
function appendNumber(num) {
    expression += num;
    display.textContent = expression;
}

function appendOperator(op) {
    expression += ` ${op} `;
    display.textContent = expression;
}

function appendDecimal() {
    if (!expression.endsWith('.')) {
        expression += '.';
        display.textContent = expression;
    }
}

// Toggle sign of the current input
function toggleSign() {
    if (expression) {
        if (expression.startsWith('-')) {
            expression = expression.slice(1);
        } else {
            expression = '-' + expression;
        }
        display.textContent = expression;
    }
}

// Delete the last character
function deleteLast() {
    expression = expression.slice(0, -1);
    display.textContent = expression || "0";
}

// Clear all input
function clearAll() {
    expression = "";
    display.textContent = "0";
}

// Calculate result on "=" button press only
function calculate() {
    try {
        const result = eval(expression);
        display.textContent = result;
        saveHistory(expression, result);
        expression = result.toString();
    } catch {
        display.textContent = "Error";
        expression = "";
    }
}

// Save calculation to localStorage
function saveHistory(expression, result) {
    const history = JSON.parse(localStorage.getItem("calcHistory")) || [];
    history.push({ expression, result });
    localStorage.setItem("calcHistory", JSON.stringify(history));
    updateHistoryDisplay(history);
}

// Update the history display
function updateHistoryDisplay(history) {
    historyContainer.innerHTML = history.map(entry => `
        <div class="history-entry">
            ${entry.expression} = ${entry.result}
            <button onclick="removeHistoryEntry('${entry.expression}')">X</button>
        </div>`).join("");
}

// Clear all history
function clearHistory() {
    localStorage.removeItem("calcHistory");
    historyContainer.innerHTML = "";
}

// Remove a specific entry from history
function removeHistoryEntry(expr) {
    let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
    history = history.filter(entry => entry.expression !== expr);
    localStorage.setItem("calcHistory", JSON.stringify(history));
    updateHistoryDisplay(history);
}

// Load history when the page loads
window.onload = loadHistory;
