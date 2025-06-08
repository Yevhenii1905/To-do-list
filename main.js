// Уникальный код страницы для разных Localstorage
function getPageKey() {
    const pageName = window.location.pathname.split('/').pop().replace('.html', '');
    return `${pageName}_tasks`;
}
// При отправке формы добавляем задачу
document.getElementById('todo-form').addEventListener('submit', function(i){
    i.preventDefault();
    const input = document.getElementById('task-input');
    const task = input.value.trim();
    if (task) {
        addTask(task);
        input.value = ''; 
    }
});

// Функция для добавления задачи
function addTask(taskText) {
    const list = document.getElementById('task-list');
    const li = document.createElement('li');
    li.textContent = taskText;

    // Кнопка для удаления задачи
    const deletebtn = document.createElement("button");
    deletebtn.textContent = "Delet";
    deletebtn.classList.add('button-delet');
    deletebtn.addEventListener('click', () => {
        li.remove();
        updatelocalStorage(); // Обновляем LocalStorage после удаления
    });

    // Слушатель для отметки задачи как выполненной
    li.addEventListener('click', () => {
        li.classList.toggle('done');
        updatelocalStorage(); // Обновляем LocalStorage после изменения статуса
    });

    li.appendChild(deletebtn);
    list.appendChild(li);

    // Обновляем LocalStorage после добавления новой задачи
    updatelocalStorage();
}

// Функция для обновления LocalStorage
function updatelocalStorage() {
    const tasks = []; 
    const listItems = document.querySelectorAll('#task-list li'); 

    listItems.forEach(li => {
        tasks.push({
            text: li.textContent.replace("Delet", "").trim(), 
            done: li.classList.contains('done') 
        });
    });

    // Сохраняем задачи в LocalStorage
    localStorage.setItem(getPageKey(), JSON.stringify(tasks)); // Добавлено сохранение в LocalStorage
}

// Функция для загрузки задач из LocalStorage
function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem(getPageKey())) || []; // Загружаем задачи из LocalStorage или пустой массив
    tasks.forEach(task => {
        addTask(task.text); // Добавляем задачу на страницу
        if (task.done) {
            const listItems = document.querySelectorAll('#task-list li');
            const lastItem = listItems[listItems.length - 1]; // Последняя добавленная задача
            lastItem.classList.add('done'); // Отмечаем её как выполненную
        }
    });
}

// Загружаем задачи при загрузке страницы
window.onload = loadTasksFromLocalStorage; // Добавлена загрузка задач при загрузке страницы

// Очистка всех задач
document.getElementById('clear-all').addEventListener('click', function(){
    const confirmed = confirm('Are you sure you want to delete all tasks?');
    if(confirmed) {
        const list = document.getElementById('task-list');
        list.innerHTML = ''; // Очищаем список на странице
        localStorage.removeItem(getPageKey()); // Удаляем задачи из LocalStorage
    }
});