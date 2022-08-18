const inputNovaTarefa = document.querySelector(".input-nova-tarefa");
const buttonNovaTarefa = document.querySelector(".button-nova-tarefa");
const listaDeTarefas = document.querySelector(".lista-de-tarefas");

function criaTarefa(el) {
  const li = criaLi(el);
  listaDeTarefas.appendChild(li);
  limpaInput();
  salvarTarefas();
}

function criaLi(el) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerText = el;

  const button = document.createElement("button");
  button.setAttribute("class", "apagar");
  button.innerText = "Apagar";

  li.appendChild(span);
  li.appendChild(button);

  return li;
}

function limpaInput() {
  inputNovaTarefa.value = "";
  inputNovaTarefa.focus();
}

function salvarTarefas() {
  const liTarefas = listaDeTarefas.querySelectorAll("li");
  const tarefas = [];
  liTarefas.forEach((tarefa) => {
    tarefas.push(tarefa.innerText.replace("\nApagar", ""));
  });

  const tarefasJSON = JSON.stringify(tarefas);
  localStorage.setItem("tarefas", tarefasJSON);
}

function adicionaTarefasSalvas() {
  const tarefas = JSON.parse(localStorage.getItem("tarefas"));
  tarefas.forEach((tarefa) => {
    criaTarefa(tarefa);
  });
}

document.addEventListener("click", (e) => {
  const el = e.target;
  if (el.classList.contains("apagar")) {
    el.parentElement.remove();
  }
  salvarTarefas();
});

inputNovaTarefa.addEventListener("keypress", (e) => {
  if (!inputNovaTarefa.value) return;
  if (e.keyCode === 13) criaTarefa(inputNovaTarefa.value);
});

buttonNovaTarefa.addEventListener("click", (e) => {
  if (!inputNovaTarefa.value) return;
  criaTarefa(inputNovaTarefa.value);
});

adicionaTarefasSalvas();
