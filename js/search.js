function myFunction() {
  var input, filter, ol, li, a, i;
  input = document.getElementById('mySearch');
  filter = input.value.toUpperCase();
  ol = document.getElementById('todoList');
  li = ol.getElementsByTagName('li');
  for (i = 0; i < li.length; i++) {
    a = li[i].innerHTML;
    if (a.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = '';
    } else {
      li[i].style.display = 'none';
    }
  }
}
