document.getElementById('todo-form').addEventListener('submit', function(i){
    i.preventDefault();
    const input = document.getElementById('task-input');
    const task = input.value.trim();
    if (task) {
        addTask(task);
        input.value = ''
            }
        })
function addTask (taskText){
    const list = document.getElementById('task-list');
    const li = document.createElement('li');
    li.textContent = taskText;
    
    const deletebtn = document.createElement("button");
    deletebtn.textContent = "Delet";
    deletebtn.classList.add('button-delet');
    deletebtn.addEventListener('click', () => li.remove());
    li.addEventListener('click', () => li.classList.toggle('done'));
    li.appendChild(deletebtn);
    list.appendChild(li);
}
document.getElementById('clear-all').addEventListener('click', function(){
    const confirmed = confirm('Are you sure you want to delete all tasks?');
    if(confirmed){
        const list = document.getElementById('task-list');
    list.innerHTML = '';}
})
