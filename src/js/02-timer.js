// Описаний в документації
import flatpickr from 'flatpickr';

// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // Отримуємо від плагіна
    const chosenDate = selectedDates[0];

    // Отримуємо поточну дату та час
    const currentDate = new Date();

    // Перевіряємо, чи обрана дата в майбутньому
    if (chosenDate.getTime() <= currentDate.getTime()) {
      window.alert('Please choose a date in the future');
      return;
    }

    // Активуємо кнопку "Start"
    startButton.disabled = false;

    // Обробник події кліку на кнопку "Start"
    startButton.addEventListener('click', () => {
      // Робимо кнопку не активною
      startButton.disabled = true;

      // Відлік часу до обраної дати
      const countdownInterval = setInterval(() => {
        const timeDifference = chosenDate.getTime() - new Date().getTime();

        if (timeDifference <= 0) {
          clearInterval(countdownInterval);
          body.style.backgroundColor = '#f44336'; // Змінюємо фон на червоний
          return;
        }

        // Отримуємо об'єкт з розрахованим часом
        const { days, hours, minutes, seconds } = convertMs(timeDifference);

        daysSpan.textContent = addLeadingZero(days);
        hoursSpan.textContent = addLeadingZero(hours);
        minutesSpan.textContent = addLeadingZero(minutes);
        secondsSpan.textContent = addLeadingZero(seconds);
      }, 1000);
    });
  },
};

flatpickr('#datetime-picker', options);

// Aорматування числових значень з додаванням ведучого нуля:
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// Отримуємо елементи для відображення відліку
const startButton = document.querySelector('[data-start]');
const body = document.body;
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
