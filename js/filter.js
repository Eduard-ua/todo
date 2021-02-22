/* Filter script */

let filterSelect = document.querySelector('.filter');
let list = document.querySelector('.todo-list');

filterSelect.onchange = function () {
  let items = list.querySelectorAll('li');
  console.log(this.value);
  for (let i = 0; i < items.length; i++) {
    if (items[i].classList.contains(this.value)) {
      items[i].style.display = 'block';
    } else {
      items[i].style.display = 'none';
    }
  }
};

/* Sort by priority */
let checkbox = document.querySelector('.checkbox');

checkbox.onchange = function sortListDir() {
  var list,
    i,
    switching,
    b,
    shouldSwitch,
    dir,
    switchcount = 0;
  list = document.getElementById('todoList');
  switching = true;
  // Задать направление сортировки по возрастанию:
  dir = 'asc';
  // Сделайте цикл, который будет продолжаться до тех пор, пока переключение не будет сделано:
  while (switching) {
    // начните с того, что скажите: никакого переключения не происходит:
    switching = false;
    b = list.getElementsByTagName('LI');
    // Цикл по всем элементам списка:
    for (i = 0; i < b.length - 1; i++) {
      // начните с того, что не должно быть никакого переключения:
      shouldSwitch = false;
      /* проверьте, должен ли следующий элемент поменяться местами с текущим элементом,
        на основе направления сортировки (asc или desc): */
      if (dir == 'asc') {
        if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
          /* если следующий элемент находится в алфавитном порядке ниже текущего элемента,
            отметьте как переключатель и разорвите петлю: */
          shouldSwitch = true;
          break;
        }
      } else if (dir == 'desc') {
        if (b[i].innerHTML.toLowerCase() < b[i + 1].innerHTML.toLowerCase()) {
          /* если следующий элемент находится в алфавитном порядке выше текущего элемента,
            отметьте как переключатель и разорвите петлю: */
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* Если переключатель был отмечен, сделайте переключатель
        и отметьте, что переключение было сделано: */
      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;
      // Каждый раз, когда выполняется переключение, увеличьте количество переключателей на 1:
      switchcount++;
    } else {
      /* Если переключение не было сделано и направление "asc",
        установите направление на "desc" и снова запустите цикл while. */
      if (switchcount == 0 && dir == 'asc') {
        dir = 'desc';
        switching = true;
      }
    }
  }
  let priority = document.querySelector('.priority');
  let faEleventArrows = document.querySelectorAll('.fa-element-arrow');
  // priority.classList.toggle("fa-active");
  if (checkbox.checked) {
    for (let faEleventArrow of faEleventArrows) {
      faEleventArrow.style.transform = 'rotateX(180deg)';
      faEleventArrow.style.transition = '0.7s';
    }
  } else {
    for (let faEleventArrow of faEleventArrows) {
      faEleventArrow.style.transform = 'rotateX(360deg)';
      faEleventArrow.style.transition = '0.7s';
    }
  }
};
