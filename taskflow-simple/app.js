// taskflow-simple/app.js
const input = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tf_tasks') || '[]');

function save() {
  localStorage.setItem('tf_tasks', JSON.stringify(tasks));
}

function render() {
  list.innerHTML = '';
  if (tasks.length === 0) {
    const e = document.createElement('div');
    e.className = 'empty';
    e.textContent = '还没有任务，赶紧添加一个吧～';
    list.appendChild(e);
    return;
  }
  tasks.forEach((t, idx) => {
    const li = document.createElement('li');

    const left = document.createElement('div');
    left.className = 'task-left';

    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = t.done;
    cb.addEventListener('change', () => {
      tasks[idx].done = cb.checked;
      save();
      render();
    });

    const span = document.createElement('div');
    span.className = 'task-text' + (t.done ? ' completed' : '');
    span.textContent = t.text;

    left.appendChild(cb);
    left.appendChild(span);

    const btns = document.createElement('div');
    btns.className = 'btns';

    const del = document.createElement('button');
    del.textContent = '删除';
    del.addEventListener('click', () => {
      tasks.splice(idx, 1);
      save();
      render();
    });

    btns.appendChild(del);

    li.appendChild(left);
    li.appendChild(btns);
    list.appendChild(li);
  });
}

function addTask(text) {
  if (!text || !text.trim()) return;
  tasks.unshift({ text: text.trim(), done: false, createdAt: Date.now() });
  save();
  render();
}

addBtn.addEventListener('click', () => {
  addTask(input.value);
  input.value = '';
  input.focus();
});

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addTask(input.value);
    input.value = '';
  }
});

render();
