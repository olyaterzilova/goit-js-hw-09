// Функція для створення промісів
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    // Генеруємо випадкове число, щоб вирішити, чи буде проміс виконаний
    const shouldResolve = Math.random() > 0.3;

    // Встановлюємо таймер, який виконається після затримки
    setTimeout(() => {
      if (shouldResolve) {
        // Викликаємо resolve, якщо проміс має бути виконаний
        resolve({ position, delay });
      } else {
        // Викликаємо reject, якщо проміс має бути відхилений
        reject({ position, delay });
      }
    }, delay);
  });
}

// Обробник події сабміту форми
document.querySelector('.form').addEventListener('submit', function (event) {
  event.preventDefault(); // Зупиняємо перезавантаження сторінки

  const startingDelay = parseInt(event.target.delay.value); // Початкова затримка
  const step = parseInt(event.target.step.value); // Крок збільшення затримки
  const amount = parseInt(event.target.amount.value); // Кількість промісів

  // Перевырка на пустоту
  if (startingDelay > 0 && step > 0 && amount > 0) {
    // Оголошуємо функцію, яка буде рекурсивно викликати createPromise
    function processPromise(position) {
      if (position <= amount) {
        const delay = startingDelay + (position - 1) * step;
        createPromise(position, delay)
          .then(result => {
            console.log(
              `✅ Fulfilled promise ${result.position} in ${result.delay}ms`
            );
            processPromise(position + 1); // Виклик для наступного промісу
          })
          .catch(error => {
            console.log(
              `❌ Rejected promise ${error.position} in ${error.delay}ms`
            );
            processPromise(position + 1); // Виклик для наступного промісу
          });
      }
    }

    // Виклик першого промісу
    processPromise(1);
  } else {
    console.log('Запус не можливий з мінусовими значеннями');
  }
});
