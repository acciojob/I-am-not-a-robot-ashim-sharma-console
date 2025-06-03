//your code here
const imageClasses = ['img1', 'img2', 'img3', 'img4', 'img5'];

const imagesContainer = document.getElementById('images-container');
const resetBtn = document.getElementById('reset');
const verifyBtn = document.getElementById('verify');
const messageH3 = document.getElementById('h');
const resultPara = document.getElementById('para');

let shuffledClasses = [];
let clickedIndices = [];

function shuffle(array) {
  for(let i = array.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function init() {
  clickedIndices = [];
  resultPara.textContent = '';
  messageH3.textContent = 'Please click on the identical tiles to verify that you are not a robot.';
  resetBtn.style.display = 'none';
  verifyBtn.style.display = 'none';

  // Choose random index to duplicate
  const duplicateIndex = Math.floor(Math.random() * imageClasses.length);

  // Create array with 5 unique classes + 1 duplicate
  shuffledClasses = [...imageClasses];
  shuffledClasses.push(imageClasses[duplicateIndex]);

  shuffle(shuffledClasses);

  // Clear container
  imagesContainer.innerHTML = '';

  // Create image elements
  shuffledClasses.forEach((cls, idx) => {
    const img = document.createElement('img');
    img.classList.add(cls);
    img.dataset.idx = idx;
    img.addEventListener('click', onImageClick);
    imagesContainer.appendChild(img);
  });
}

function onImageClick(e) {
  const img = e.target;
  const idx = parseInt(img.dataset.idx);

  // Prevent selecting same tile twice or selecting more than two tiles
  if(clickedIndices.includes(idx) || clickedIndices.length >= 2) return;

  clickedIndices.push(idx);
  img.classList.add('selected');

  if(clickedIndices.length === 1) {
    resetBtn.style.display = 'inline-block';
  }

  if(clickedIndices.length === 2) {
    verifyBtn.style.display = 'inline-block';
  }
}

resetBtn.addEventListener('click', () => {
  clickedIndices = [];
  resultPara.textContent = '';
  messageH3.textContent = 'Please click on the identical tiles to verify that you are not a robot.';
  resetBtn.style.display = 'none';
  verifyBtn.style.display = 'none';

  // Remove selected highlight
  imagesContainer.querySelectorAll('img.selected').forEach(img => img.classList.remove('selected'));
});

verifyBtn.addEventListener('click', () => {
  if(clickedIndices.length !== 2) return;

  const [firstIdx, secondIdx] = clickedIndices;
  const firstClass = shuffledClasses[firstIdx];
  const secondClass = shuffledClasses[secondIdx];

  verifyBtn.style.display = 'none';

  if(firstClass === secondClass) {
    messageH3.textContent = 'You are a human. Congratulations!';
  } else {
    messageH3.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
  }
});

window.onload = init;
