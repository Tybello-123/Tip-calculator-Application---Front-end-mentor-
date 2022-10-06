//get all input elements by Id including custom tip percentage
const billInput = document.getElementById('bill-input')
const peopleInput = document.getElementById('nop')
const perPersonTip = document.getElementById('tip-amount-per-person')
const perPersonTotal = document.getElementById('total-amount-per-person')
const customTip = document.getElementById('custom-input')
const reset = document.getElementById('reset')
const error = document.getElementById('errorText')
//get tip buttons by their class
const tips = document.querySelectorAll('.tip-per')



//Add event listensers to all inputs
billInput.addEventListener('input', billInputFun)

peopleInput.addEventListener('input', peopleInputFun)

customTip.addEventListener('input', customTipFun)
//add an event listener to the button
reset.addEventListener('click', resetFun)

//add an event listener for each tip button
tips.forEach(function(val){
  val.addEventListener('click',handleClick)
})


peopleInput.value = '1';

let billValue = 0; //set default bill
let peopleValue = 1; // set default number of people
let tipValue = 0.15; // set default tip value;

// set default total and tip per person value
perPersonTip.innerHTML =   `$${(0.0).toFixed(2)}`
perPersonTotal.innerHTML = `$${(0.0).toFixed(2)}`


 




function validateFloat(s){
  let billRegex = /^\d*\.?\d*$/;
   return s.match(billRegex)
}
//declare a function to validate bill input

function validateInt(s){
  let tipRegex = /^\d*$/
  return s.match(tipRegex)
}
//decalre a function to validate custom tip input and number of people input

function billInputFun () {
//check for leading zeros in input 
  if(billInput.value.startsWith('0')) {
   billInput.value =  billInput.value.replace('0', '')
  
  }
//check for commas in bill input
   if(billInput.value.includes(',')) {

     billInput.value =  billInput.value.replace(',', '.')
  }

  //disable all characters that arent di
  if(!validateFloat(billInput.value)){
    
    billInput.value = billInput.value.substring(0, billInput.value.length - 1);
  }

//get the bill value
  billValue = parseFloat(billInput.value)

calculateBill()
}

function peopleInputFun () {

  //   if(peopleInput.value.startsWith('0')) {
  //  peopleInput.value =  peopleInput.value.replace('0', '')
  
  // }
    //check for leading zeros in people Input
  
  if(!validateInt(peopleInput.value)){
    peopleInput.value = peopleInput.value.substring(0, peopleInput.value.length-1)
  }
  //validate if the number is an integer 
  //if the validate function is false 
  //custom tip value should be nothing

  peopleValue = parseFloat(peopleInput.value)



  //When people value of zero is entered 

  if(peopleValue < 1){
    error.style.display = 'block'; 
    peopleInput.style.border = '2px solid red'
  }
  else{
    error.style.display = 'none';
    peopleInput.style.border = 'none';
      // calculateBill()
  }
}

function handleClick(event) {
  tips.forEach(function(val){
    //remove active from default and add it to the on ethat is clicked
     val.classList.remove('active');
      if(event.target.innerHTML == val.innerHTML){
      val.classList.add('active');
       tipValue = parseFloat(val.innerHTML)/100
       
     }
    //empty custom tip when a button is clicked
   customTip.value = '';
  })
  calculateBill()
}

function customTipFun () {

  // if(customTip.value.startsWith('0')) {
  //  customTip.value =  customTip.value.replace('0', '');
  
  // }
    //check for leading zeros in custom tip
  
  if(!validateInt(customTip.value)){
    customTip.value = customTip.value.substring(0,customTip.value.length-1);
  }
  //validate if the number is an integer 
  //if the validate function is false 
  //custom tip value should be nothing

  //get the tip value
 
  tipValue = parseInt(customTip.value) / 100

 
//remove active from the tip buttons
  tips.forEach(function(val){
    val.classList.remove('active');
  })

  
  calculateBill();
}


function calculateBill () {

  if(peopleValue >= 1){
   //calcualte tip and total if number of people is equal to or greater than one
   tipAmount = (billValue * tipValue) / peopleValue
   total = (billValue + tipAmount) / peopleValue
    
   perPersonTip.innerHTML = `$${tipAmount.toFixed(2)}`
   perPersonTotal.innerHTML = `$${total.toFixed(2)}`


    //Prevent tip and total from being equal to NAN
    if (isNaN(tipAmount) && isNaN(total)) {
    let tipAmount = 0;
     let total = 0;
   
    perPersonTip.innerHTML = `$${tipAmount.toFixed(2)}`
   perPersonTotal.innerHTML = `$${total.toFixed(2)}`
  }
    
}


}


function resetFun() {
  //reset all the input field values on reset
  billInput.value = ''
  billInputFun()
  
  peopleInput.value = "1"
  peopleInputFun()
  
  customTip.value = ''
  customTipFun()
  //set default tip percentage back to 15%
  tips[2].click()


  perPersonTip.innerHTML = `$${(0.0).toFixed(2)}`
    perPersonTotal.innerHTML = `$${(0.0).toFixed(2)}`
  
  
}

calculateBill()