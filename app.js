// Переключение светлого режима на темный

// Переменная для кнопки переключения
const themeToggleButton = document.getElementById("theme-toggle");

// переменная для body
const body = document.body;

// переменная для меню - чтобы при прокрутке
const mainNav = document.querySelector(".main-nav");
const scrollThreshold = 50;

// функция ручной прокрутки
const handleNavScroll = () => {
  if (window.scrollY > scrollThreshold) {
    mainNav.classList.add("scrolled-nav");
  } else {
    mainNav.classList.remove("scrolled-nav");
  }
};

window.addEventListener('scroll', handleNavScroll);
handleNavScroll();

// функция для переключиеня тем к которой нужно добавить класс к тегу body
const toggleTheme = () => {
  //
  let currentTheme = body.classList.contains("dark-mode") ? "dark" : "light";
  const newTheme = currentTheme === "light" ? "dark" : "light";
  applyTheme(newTheme);
  localStorage.setItem("novaTaskTheme", newTheme);
};

const applyTheme = (theme) => {
  if (theme === "dark") {
    body.classList.add("dark-mode");
  } else {
    body.classList.remove("dark-mode");
  }
};

// прослушиватель для кнопки переключения
themeToggleButton.addEventListener("click", toggleTheme);

const savedTheme = localStorage.getItem("novaTaskTheme");

if (savedTheme) {
  applyTheme(savedTheme);
}

/**
 * Мы должны нажать на кнопку с вопросами и должны появиться ответы
 */

// Переменная для каждого блока всех вопросов
const faqItems = document.querySelectorAll(".faq-item");

// Переходим для каждого вопроса
faqItems.forEach((item) => {
  // переменные для кнопки с вопросом
  const questionButton = item.querySelector(".faq-question");
  // переменная для ответа на вопрос
  const answer = item.querySelector(".faq-answer");
  // переменная для иконки возле вопроса (крестика)
  const icon = item.querySelector(".faq-icon");
  // если нет одной из переменной - функция завершает работу
  if (!questionButton || !answer || !icon) return;

  // кликаем по кнопке
  questionButton.addEventListener("click", () => {
    // перейдем по каждому блоку
    faqItems.forEach((faqItem) => {
      // если два блока не равны  и другого есть класс active
      if (faqItem !== item && faqItem.classList.contains("active")) {
        // класс active - удаляется
        faqItem.classList.remove("active");
        // перменная для ответа
        const a = faqItem.querySelector(".faq-answer");
        // переменная для иконки
        const i = faqItem.querySelector(".faq-icon");
        // для закрытия ответов
        // если есть ответ - максимальная высота - ноль (0)
        if (a) a.style.maxHeight = null;
        // если есть иконка - иконка минус удаляется, плюс - добавляется
        if (i) {
          i.classList.remove("fa-minus");
          i.classList.add("fa-plus");
        }
      }
    });
    // Переменная для активного класа - добавление / удаление
    const isActive = item.classList.toggle("active");
    // для ответа добавлем в стиль максимальную высоту
    // если добавлен класс active - добавляется высота - если удален класс active  высота убирается - ноль
    answer.style.maxHeight = isActive ? answer.scrollHeight + "px" : null;
    // для иконок
    // при переключении если класс active - добавлен или нет
    icon.classList.toggle("fa-plus", !isActive);
    icon.classList.toggle("fa-minus", isActive);
  });
});
