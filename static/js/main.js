 const buttons = {
  submitChar: document.querySelector('#addChar'),
  revealUpdateForm: document.getElementsByClassName('updateFormBtn'),
  updateChar: document.querySelector('#updateCharBtn')
}

const domElements = {
  updateForm: document.querySelector('#updateChar')
}

const characterVariables = {
  currentId: ""
}

buttons.submitChar.addEventListener('click', addChar);

for(let i = 0; i < buttons.revealUpdateForm.length; i++){
  buttons.revealUpdateForm[i].onclick = charId;
}

buttons.updateChar.addEventListener('click', updateChar);



async function addChar(){
  try{
    const response = await fetch('addChar', {
      method: 'post',
    })
    const data = await response.json();
  }
  catch(err){
    console.log(`Something went wrong! ${err}`);
  }
}

async function updateChar(){
  try{
    const response = await fetch('updateChar', {
      method: 'put'
    })
    const data = await response.json(); 
    characterVariables.currentId = "";
  }
  catch(err){
    console.log(`Something went wrong! ${err}`);
  }
}

function hideIt(element){
  element.classList.add('hidden');
}

function unhide(element){
  element.classList.remove('hidden');
}

function charId(){
  characterVariables.currentId = buttons.revealUpdateForm.id;
  console.log(characterVariables.currentId);
}