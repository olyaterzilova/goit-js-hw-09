// Функція для генерації випадкового кольору в форматі HEX
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

// Отримуємо посилання на кнопки та тіло документа
const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
const body = document.body;

// Змінна для зберігання ідентифікатору інтервалу
let intervalId;

// Додаємо обробник події кліку на кнопку "Start"
startButton.addEventListener('click', () => {

  // Вимикаємо кнопку "Start" та активуємо кнопку "Stop"
  startButton.disabled = true;
  stopButton.disabled = false;

  // Встановлюємо інтервал для зміни кольору кожну 1 секунду
  intervalId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

// Додаємо обробник події кліку на кнопку "Stop"
stopButton.addEventListener('click', () => {
    
  // Активуємо кнопку "Start" та вимикаємо кнопку "Stop"
  startButton.disabled = false;
  stopButton.disabled = true;

  // Зупиняємо інтервал та повертаємо фоновий колір до стандартного
  clearInterval(intervalId);
//   body.style.backgroundColor = '';
});
