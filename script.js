let taskInput = '';
let codeEditInput = '';
let loading = false;


const taskInputElem = document.getElementById('taskInput');
const generateButtonElem = document.getElementById('generateButton');
const editCodeTextAreaElem = document.getElementById('editCodeTextArea');


taskInputElem.addEventListener('input', function() {
  taskInput = taskInputElem.value;
});


async function createApp() {
  if (taskInput === '') return;
  loading = true;
  generateButtonElem.disabled = true;
  generateButtonElem.textContent = 'Generating...';
  try {
    const response = await fetch('https://codexbackend2.onrender.com/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idea: taskInput })
    });
    const data = await response.text();
    codeEditInput = data.substring(7, data.length - 3); // Clean the response
    console.log(codeEditInput);
    editCodeTextAreaElem.value = codeEditInput;
  } catch (error) {
    console.error('Error generating new app:', error);
  }
  loading = false;
  generateButtonElem.disabled = false;
  generateButtonElem.textContent = 'Generate';
}


function applyChanges() {
  const elementText = document.getElementById('editCodeTextArea');
  if (elementText.value === '') return;
  codeEditInput = elementText.value;
}


function renderCode() {
  if (codeEditInput === '') return;

  const newTab = window.open();
  if (newTab) {
    newTab.document.write(codeEditInput);
    newTab.document.close();
  } else {
    console.log("CAN'T OPEN NEW TAB. MAYBE DISABLE AD-BLOCK");
  }
}
