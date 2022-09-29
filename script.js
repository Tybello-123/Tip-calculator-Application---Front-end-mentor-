//get all input elements by Id including custom tip percentage
const billInput = document.getElementById('bill-input')
const peopleInput = document.getElementById('nop')


const tips = document.querySelectorAll('.tip-per')

const perPersonTip = document.getElementById('tip-amount-per-person')

const perPersonTotal = document.getElementById('total-amount-per-person')

const customTip = document.getElementById('custom-input')

const reset = document.getElementById('reset')

const error = document.getElementById('errorText')



billInput.addEventListener('input', billInputFun)

peopleInput.addEventListener('input', peopleInputFun)

customTip.addEventListener('input', customTipFun)

reset.addEventListener('click', resetFun)



tips.forEach(function(val){
  val.addEventListener('click',handleClick)
})



let tipValue = 0.00;
  perPersonTip.innerHTML = `$${(0.0).toFixed(2)}`
    perPersonTotal.innerHTML = `$${(0.0).toFixed(2)}`


function billInputFun () {

  billValue = parseFloat(billInput.value)
calculateBill()
}

function peopleInputFun () {
  peopleValue = parseFloat(peopleInput.value)
  calculateBill()

  if(peopleValue < 1){
    error.style.display = 'block'; 
    peopleInput.style.border = '1px solid red'
  }
  else{
    error.style.display = 'none';
    peopleInput.style.border = 'none';
      calculateBill()
  }
}

function handleClick(event) {
  tips.forEach(function(val){
     val.classList.remove('active');
     if(event.target.innerHTML == val.innerHTML){
      val.classList.add('active');
       tipValue = parseFloat(val.innerHTML)/100
       
     }
  })
  calculateBill()
}

function customTipFun () {
  tipValue = parseFloat(customTip.value) / 100

  tips.forEach(function(val){
    val.classList.remove('active');
  })
  calculateBill();
}


function calculateBill() {
  
  if(peopleValue >= 1){
   
  let tipAmount = (billValue * tipValue) / peopleValue
  let total = (billValue + tipValue)/ peopleValue

    perPersonTip.innerHTML = `$${tipAmount.toFixed(2)}`
    perPersonTotal.innerHTML = `$${total.toFixed(2)}`
  
}
}

function resetFun() {
  billInput.value = ''
  billInputFun()
  peopleInput.value = ""
  peopleInputFun()
  customTip.value = ''
 
  perPersonTip.innerHTML = `$${(0.0).toFixed(2)}`
    perPersonTotal.innerHTML = `$${(0.0).toFixed(2)}`
  
  
}
