function getHistory(){
  return document.querySelector('.history-value').innerText;
}

function printHistory(num){
  document.querySelector('.history-value').innerText = num;
}

function getOutput(){
  return document.querySelector('.output-value').innerText;
}

function printOutput(num){
  let output = document.querySelector('.output-value');
  output.innerText = (!num)? "" : getFormattedNumber(num);
}

// Formatting the number for readability when number is getting larger.
function getFormattedNumber(num){
  if(num === "-") return "0";
  let n = Number(num);
  let value = n.toLocaleString("en");
  return value;
}

function reverseNumberFormat(num){
  return Number(num.replace(/,/g, ''));
}

// Getting the buttons.
let operators = document.querySelectorAll('.operator');
let numbers = document.querySelectorAll('.number');

// Iterating through the operator buttons and giving eventListener to each of them.
operators.forEach(o =>{
  
  // Adding eventListener
  o.addEventListener('click', function(){

    // Clear button functionality.
    if(this.id === "clear"){
      // Clearing the history.
      printHistory(""); 

      // Clearing the output.
      printOutput("");
    }

    // Backspace button functionality
    else if(this.id === "backspace"){
      // Getting the formatted output.
      let output = reverseNumberFormat(getOutput()).toString();

      // Check if output has value.
      if(output){
        // Using substr to delete the number from ones.
        output = output.substr(0, output.length - 1);

        // Print the output.
        printOutput(output);
      }
    }

    // Other operators functionality.
    else{
      let output = getOutput();
      let history = getHistory();
      if(output == "" && history){
        if(isNaN(history[history.length - 1]))
          history = history.substr(0, history.length-1);
      }
      if(output || history){
        output = (!output)? output : reverseNumberFormat(output);
        history += output;
        if(this.id === "="){
          let result = eval(history);
          printOutput(result);
          printHistory("");
        }
        else{
          history += this.id;
          printHistory(history);
          printOutput("");
        }
      }
    }
  })
})


// Iterating through the number buttons and giving eventListener to each of them.
numbers.forEach(n =>{
  n.addEventListener('click', function(){
    let output = reverseNumberFormat(getOutput());
    if(output != NaN){
      output += this.id;
      printOutput(output);
    }
  })
})

let checkbox = document.querySelector('input.toggler')
checkbox.addEventListener('click', function(){
  document.body.classList.toggle('light-mode');
})