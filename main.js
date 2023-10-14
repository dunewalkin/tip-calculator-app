const billInput = document.getElementById ('bill');
const numberInput = document.getElementById ('number-input');
const tipInput = document.getElementById ('custom-tip');

const totalOutput = document.getElementById ('total-amount');
const amountOutput = document.getElementById ('tip-amount');

const errorMessage = document.querySelector ('.error-message');

const tipButtons = document.querySelectorAll ('.tip-btn');
const resetButton = document.querySelector('.reset-btn');

let tipPercentage = 0; // Variable to store the active tip percentage

// Add input event listeners to both input fields
billInput.addEventListener("input", calculateTotal);
numberInput.addEventListener("input", calculateTotal);
tipInput.addEventListener("input", calculateTotal);

tipButtons.forEach(button => {
   button.addEventListener('click', event => {
      tipPercentage = parseFloat(event.target.id.replace("tip-", ""));
      calculateTotal(event);
      calculateTip(event); 

       // Remove the 'button-active' class from all buttons
       tipButtons.forEach(btn => {
           btn.classList.remove('button-active');
       });

       // Add the 'button-active' class to the clicked button
       button.classList.add('button-active');
   });
});


// Function to update the result when input fields change
function calculateTotal() {
   // Get the values from the input fields
   const billValue = parseFloat(billInput.value);
   const numberValue = parseInt(numberInput.value);
   const customTipPercentage = parseFloat(tipInput.value);

   // const result = (billValue / numberValue).toFixed(2);

   // Check if the division is valid (avoid division by zero)
   if (isNaN(billValue) || isNaN(numberValue)) {
      // Display "Invalid input" if either input is not a number
      totalOutput.textContent = '$0.00';
      amountOutput.textContent = '$0.00';
      return;
   } else if (numberValue === 0) {
      // Display "Invalid input" if the integer input is 0
      errorMessage.classList.add('hidden');
      numberInput.value = '';
      totalOutput.textContent = '$0.00';
      amountOutput.textContent = '$0.00';
      return;
   } else {
      // Calculate the division result and display it in the span
      const result = (billValue / numberValue).toFixed(2);
      totalOutput.textContent = '$' + result;
      errorMessage.classList.remove('hidden');
   }

      // Calculate and display the tip amount based on the custom tip percentage
      if (!isNaN(customTipPercentage)) {
      const customTipAmount = (billValue / numberValue) * (customTipPercentage / 100);
      amountOutput.textContent = '$' + customTipAmount.toFixed(2);    
      } else {
         // Tip input is empty, set amountOutput to '$0.00'
         amountOutput.textContent = '$0.00';
      }
}

// Function to calculate and display the tip amount
function calculateTip(event) {
   // const tipPercentage = parseFloat(event.target.id.replace("tip-", ""));
   const billValue = parseFloat(billInput.value);
   const numberValue = parseInt(numberInput.value);
   
   if(!isNaN(billValue) && !isNaN(numberValue) && numberValue !== 0 && tipPercentage > 0) {
      // Calculate the tip amount
      const tipAmount = ((billValue / numberValue) * (tipPercentage / 100));
      amountOutput.textContent = '$' + tipAmount.toFixed(2);
      
      // Calculate the updated result
      const updatedResult = (billValue / numberValue + tipAmount).toFixed(2);
      totalOutput.textContent = "$" + updatedResult;
   }
   
   }

tipInput.addEventListener('click', () => {
   // Remove the 'clicked' class from all buttons when input is filled
   tipButtons.forEach(button => {
       button.classList.remove('button-active');
       amountOutput.textContent = '$0.00';
   });
});

resetButton.addEventListener('click', function() {
    // Clear all input fields
    billInput.value = '';
    numberInput.value = '';
    tipInput.value = '';
    
    // Reset the result outputs to their initial values
    totalOutput.textContent = '$0.00';
    amountOutput.textContent = '$0.00';
    
    // Remove the "button-active" class from tip buttons
    tipButtons.forEach(button => {
        button.classList.remove('button-active');
    });
});




