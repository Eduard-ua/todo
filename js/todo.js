function onPageLoaded() {
  let list = document.querySelector('.todo-list');
  let input = document.querySelector('.todo-input');
  let form = document.querySelector('.todo-form');
  /* Переменные для уровня срочности */
  let rangeSetting = document.querySelector('.range-setting');
  let todoRange = document.querySelector('.todo-range');
  /* Переменные для кнопок сохранить и очистить */
  let saveButton = document.querySelector('button.save');
  let clearButton = document.querySelector('button.clear');
  /* Справка */
  let showTipsButton = document.querySelector('button.showTips'); // ищем кнопку справки
  let closeTipsButton = document.querySelector('a.closeTips'); //ищем кнопку закрітия справки
  let overlay = document.querySelector('#overlay'); // ищем блок с подсказками (справкой)

  /* Функция для определение уровня срочности */
  rangeSetting.oninput = function () {
    todoRange.textContent = rangeSetting.value;
  };

  form.onsubmit = function (evt) {
    let deleteBtn = document.createElement('span');
    deleteBtn.classList.add('todo-trash');
    let icon = document.createElement('i');
    icon.classList.add('fas', 'fa-trash-alt');
    deleteBtn.appendChild(icon);

    let li = document.createElement('li');
    li.classList.add('all-todo', 'unchecked');
    li.textContent = rangeSetting.value + ' ' + '-' + ' ' + input.value;
    list.appendChild(li).append(deleteBtn);
    input.value = '';
    evt.preventDefault();

    listenDeleteTodo(deleteBtn);
  };

  /* Зачеркиваем ввыполненое событие */
  function onClickTodo(event) {
    if (event.target.tagName === 'LI') {
      event.target.classList.toggle('checked');
      event.target.classList.toggle('unchecked');
      event.target.classList.toggle('todos-checked');
    }
  }

  function listenDeleteTodo(element) {
    //когда пункт to-do создаётся, его иконка корзины получает способность удалять новый пункт по нажатию
    element.addEventListener('click', (event) => {
      element.parentElement.remove();
      event.stopPropagation();
    });
  }
  /*Находим все кнопки удаления и даем им жизнь*/
  let deleteButtons = document.querySelectorAll('span.todo-trash');
  for (let button of deleteButtons) {
    listenDeleteTodo(button);
  }

  /* Загружаем список дел при повторной загрузке страницы */
  function loadTodos() {
    let data = localStorage.getItem('todo-list');
    if (data) {
      list.innerHTML = data;
    }
    let deleteButtons = document.querySelectorAll('span.todo-trash');
    for (let button of deleteButtons) {
      listenDeleteTodo(button);
    }
  }

  /* Прослушиватели событый для кнопок*/
  saveButton.addEventListener('click', () => {
    localStorage.setItem('todo-list', list.innerHTML);
  });
  clearButton.addEventListener('click', () => {
    list.innerHTML = '';
    localStorage.removeItem('todo-list', list.innerHTML);
  });
  showTipsButton.addEventListener('click', () => {
    overlay.style.height = '100%';
  });
  closeTipsButton.addEventListener('click', () => {
    overlay.style.height = '0';
  });

  list.addEventListener('click', onClickTodo); // вызываем функцию зачеркивания
  loadTodos();
}

document.addEventListener('DOMContentLoaded', onPageLoaded);
