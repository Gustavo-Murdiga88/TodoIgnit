import {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  InputHTMLAttributes,
  InvalidEvent,
  useState,
} from "react";

import Styles from "./todoList.module.css";
import { Trash, PlusCircle } from "phosphor-react";
import { NoTask } from "./NoTask";

type TasksProps = {
  id: number;
  task: string;
  isChecked: boolean;
};

export function TodoList() {
  const [tasks, setTasks] = useState<TasksProps[]>([]);
  const [task, setTask] = useState<string>("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setTasks((previusTasks) => {
      return [
        ...previusTasks,
        {
          id: task.length * Math.random(),
          task,
          isChecked: false,
        },
      ];
    });

    setTask("");
    const todo = document.getElementById("todo");
    todo?.focus();
  }

  function onAddNewTask(value: ChangeEvent<HTMLInputElement>) {
    value.target.setCustomValidity("");
    const targetValue = value.target.value;
    setTask(targetValue);
  }

  function onConcluidTask(index: number) {
    const listTask = tasks;
    const data = listTask[index];

    listTask.splice(index, 1, {
      ...data,
      isChecked: !data.isChecked,
    });

    setTasks([...listTask]);
  }

  function onRemoveTask(id: number) {
    const removeTask = tasks.filter((leaveComment) => leaveComment.id !== id);

    setTasks(removeTask);
  }

  const totalTheTasksConcluid = tasks.reduce((acc, item) => {
    if (item.isChecked) {
      return acc + 1;
    }
    return acc;
  }, 0);

  function onInvaliditTask(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity(
      "Por favor preencha a tarefa para que assim possa adicionar a lista."
    );
  }

  return (
    <div className={Styles.Body}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="todo"
          id="todo"
          required
          onInvalid={onInvaliditTask}
          value={task}
          placeholder="Adicione uma nova tarefa."
          onChange={onAddNewTask}
        />
        <button type="submit">
          Criar
          <PlusCircle size={18} />
        </button>
      </form>

      <div className={Styles.List}>
        <header className={Styles.Info}>
          <div className={Styles.TodoCreate}>
            <strong>Tarefas criadas</strong> <span>{tasks.length}</span>
          </div>
          <div className={Styles.TodoConcluid}>
            <strong>Concluídas</strong>
            <span>{`${totalTheTasksConcluid} de ${tasks.length}`}</span>
          </div>
        </header>
        {!tasks.length ? (
          <NoTask />
        ) : (
          <main className={Styles.ListOfTodo}>
            {tasks.map((item, index) => (
              <div key={item.id}>
                <input type="checkbox" onChange={() => onConcluidTask(index)} />
                <strong className={item.isChecked ? Styles.taskConcluid : ""}>
                  {item.task}
                </strong>
                <button
                  className={Styles.buttonTrash}
                  onClick={() => onRemoveTask(item.id)}
                >
                  <Trash size={18} />
                </button>
              </div>
            ))}
          </main>
        )}
      </div>
    </div>
  );
}
