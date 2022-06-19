import { PlusCircle } from "phosphor-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Task } from "./Task";

import styles from "./Tasks.module.css";

export interface TaskType {
  id: number;
  description: string;
  isCompleted: boolean;
}

export function Tasks() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [taskDescription, setTaskDescription] = useState("");
  const [scoreTasks, setScoreTasks] = useState(0);

  useEffect(() => {
    setScoreTasks(tasks.length);
  }, [tasks]);

  function handleCreateTask(e: FormEvent) {
    e.preventDefault();

    const newTask = {
      id: Math.floor(1000 * Math.random()),
      description: taskDescription,
      isCompleted: false,
    };

    setTasks((state) => {
      return [...state, newTask];
    });
  }

  function deleteTask(id: number) {
    const newTasks = tasks.filter((task) => {
      return task.id !== id;
    });

    setTasks(newTasks);
  }

  function completeTask(id: number) {
    const newTasks = tasks.filter((task) => {
      if (task.id === id) {
        return task.isCompleted = !task.isCompleted
      } else {
        return task
      }
    });

    console.log(newTasks);
    

    setTasks(newTasks)
  }

  function handleNewTaskChange(e: ChangeEvent<HTMLInputElement>) {
    setTaskDescription(e.target.value);
  }

  return (
    <section className={styles.tasks}>
      <form onSubmit={handleCreateTask}>
        <input
          type="text"
          placeholder="Adicione uma nova tarefa"
          onChange={handleNewTaskChange}
        />
        <button type="submit" className={styles.addButton}>
          Criar <PlusCircle size={19} weight="bold" />
        </button>
      </form>
      <div className={styles.listTasks}>
        <header>
          <div>
            Tarefas Criadas <span>{scoreTasks}</span>
          </div>
          <div>
            Concluídas <span>0</span>
          </div>
        </header>
        <div>
          {tasks.map((task) => {
            return (
              <Task
                key={task.id}
                task={task}
                onCompleteTask={completeTask}
                onDeleteTask={deleteTask}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
