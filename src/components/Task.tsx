import { Check, Trash } from 'phosphor-react';
import { useState } from 'react';

import { TaskType } from './Tasks';

import styles from './Task.module.css';

interface TaskProps {
  task: TaskType
  onCompleteTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
}

export function Task({task, onCompleteTask, onDeleteTask }: TaskProps) {
  return (
    <div className={[styles.task, task.isCompleted ? styles.taskChecked : ''].join(' ')}>
      <div>
        <label className={styles.checkmarkContainer}>
            <input type="checkbox" onChange={() => onCompleteTask(task.id)} />
            <div className={styles.checkmark}>
              <Check weight="bold" />
            </div>
        </label>
        <p>
          {task.description}
        </p>
      </div>
      <button className={styles.deleteButton} onClick={() => onDeleteTask(task.id)}>
        <Trash size={19} />
      </button>
    </div>
  )
}