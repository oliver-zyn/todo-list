import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { PlusCircle } from "phosphor-react";
import { EmptyMessage } from "./EmptyMessage";
import { Task } from "./Task";

import styles from "./Tasks.module.css";

export interface TaskType {
  id: number;
  description: string;
  isCompleted: boolean;
}

export function Tasks() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [scoreTasks, setScoreTasks] = useState(0);
  const [scoreCompletedTasks, setScoreCompletedTasks] = useState(0);

  useEffect(() => {
    setScoreTasks(tasks.length);

    const completedTasks = tasks.filter((task) => {
      return task.isCompleted === true;
    });

    setScoreCompletedTasks(completedTasks.length);
  }, [tasks]);

  function handleCreateTask(e: FormEvent) {
    e.preventDefault();

    const newTask = {
      id: Math.floor(1000 * Math.random()),
      description: newTaskDescription,
      isCompleted: false,
    };

    setTasks((state) => {
      return [...state, newTask];
    });
    setNewTaskDescription("");
  }

  function handleNewTaskChange(e: ChangeEvent<HTMLInputElement>) {
    setNewTaskDescription(e.target.value);
  }

  function deleteTask(id: number) {
    const newTasks = tasks.filter((task) => {
      return task.id !== id;
    });

    setTasks(newTasks);
  }

  function completeTask(id: number) {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        task.isCompleted = !task.isCompleted;
      }
      return task;
    });

    setTasks(newTasks);
  }

  const isNewTaskEmpty = newTaskDescription.length === 0;

  return (
    <section className={styles.tasks}>
      <form onSubmit={handleCreateTask}>
        <input
          type="text"
          placeholder="Adicione uma nova tarefa"
          onChange={handleNewTaskChange}
          value={newTaskDescription}
          required
        />
        <button
          type="submit"
          className={styles.addButton}
          disabled={isNewTaskEmpty}
        >
          Criar <PlusCircle size={19} weight="bold" />
        </button>
      </form>
      <div className={styles.listTasks}>
        <header>
          <div>
            Tarefas Criadas <span>{scoreTasks}</span>
          </div>
          <div>
            Concluídas{" "}
            <span>
              {scoreCompletedTasks} de {scoreTasks}
            </span>
          </div>
        </header>
        <div>
          {tasks.length === 0 ? (
            <EmptyMessage />
          ) : (
            tasks.map((task) => {
              return (
                <Task
                  key={task.id}
                  task={task}
                  onCompleteTask={completeTask}
                  onDeleteTask={deleteTask}
                />
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
