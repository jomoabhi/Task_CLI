const fs = require('fs');

const listTasks = () => {
  const notes = loadtasks().trimEnd();

  if (notes.length) {
    const a = notes.split('\n');
    var i = 1;

    if (a.length > 0) {
      a.forEach((note1) => {
        const sub = note1.split(' ');

        console.log(
          i++ +
            '. ' +
            note1.substring(note1.indexOf(' ') + 1) +
            ' [' +
            sub[0] +
            ']'
        );
      });
    }
  } else {
    console.log('There are no pending tasks!');
  }
};
const listTasksCompleted = () => {
  const notes = loadtasksCompleted().trimEnd();

  if (notes.length) {
    const a = notes.split('\n');
    var i = 1;

    if (a.length > 0) {
      a.forEach((note1) => {
        const sub = note1.split(' ');

        console.log(i++ + '. ' + note1.substring(note1.indexOf(' ') + 1));
      });
    }
  } else {
    console.log('There are no pending tasks!');
  }
};
const length_In = () => {
  const notes = loadtasks().trimEnd();

  if (notes.length) {
    const arr = notes.split('\n');
    return arr.length;
  }
  return 0;
};
const length_Com = () => {
  const notes = loadtasksCompleted().trimEnd();

  if (notes.length) {
    const arr = notes.split('\n');
    return arr.length;
  }
  return 0;
};

const doneTask = (index) => {
  const notes = loadtasks().trimEnd();
  var notes1 = loadtasksCompleted().trim();
  if (notes.length) {
    var a = notes.split('\n');
    var mess = '';

    for (var i = 0; i < a.length; i++) {
      if (i + 1 == index) {
        mess = a[i];
        break;
      }
    }

    if (i === a.length) {
      console.log(`Error: no incomplete item with index #${index} exists.`);
    } else {
      mess.trimStart();
      mess.trimEnd();

      if (notes1.length) notes1 += '\n' + mess;
      else notes1 += mess;
      saveCompleted(notes1);
      const d = deleteTask(index);
      if (d === 'success') console.log(`Marked item as done.`);
    }
  } else {
    console.log(`Error: no incomplete item with index #${index} exists.`);
  }
};

const deleteTask = (index) => {
  const notes = loadtasks().trimEnd();

  if (notes.length) {
    const a = notes.split('\n');

    var task = '';
    var k = 0;
    for (var i = 0; i < a.length; i++) {
      if (i + 1 != index) {
        k++;
        task = task + a[i] + '\n';
      }
    }

    task.trimStart();
    task.trimEnd();

    if (k === a.length) {
      console.log(
        `Error: task with index #${index} does not exist. Nothing deleted.`
      );
    } else {
      task.trimStart();
      task.trimEnd();

      save(task);
      return 'success';
    }
  } else {
    console.log(
      `Error: task with index #${index} does not exist. Nothing deleted.`
    );
  }
};
const addTask = (priority, body) => {
  var notes = loadtasks().trimEnd();
  if (notes.length) var a = notes.split('\n');
  else var a = [];
  var task = '';

  var i = 0;
  if (a.length > 0) {
    for (i = 0; i < a.length; i++) {
      const sub = a[i].split(' ');
      const num = Number.parseInt(sub[0]);
      //   console.log(num);
      if (num > priority) {
        break;
      }
      if (a[i] !== '\n') task = task + a[i] + '\n';
    }
  }

  const data = `${priority} ` + `${body}`;
  task += data + '\n';
  while (i < a.length) {
    if (a[i] !== undefined) task = task + a[i] + '\n';
    i++;
  }

  task.trimStart();
  save(task.trimEnd());
  console.log(`Added task: "${body}" with priority ${priority}`);
};

const usage = () => {
  const message =
    'Usage :-\n$ ./task add 2 hello world    # Add a new item with priority 2 and text "hello world" to the list\n$ ./task ls                   # Show incomplete priority list items sorted by priority in ascending order\n$ ./task del INDEX            # Delete the incomplete item with the given index\n$ ./task done INDEX           # Mark the incomplete item with the given index as complete\n$ ./task help                 # Show usage\n$ ./task report               # Statistics';
  console.log(message);
};

const save = (data) => {
  fs.writeFileSync('task.txt', data);
};

const loadtasks = () => {
  try {
    const buffer = fs.readFileSync('task.txt');

    const data = buffer.toString();
    return data;
  } catch (e) {
    return '';
  }
};
const saveCompleted = (data) => {
  fs.writeFileSync('completed.txt', data);
};

const loadtasksCompleted = () => {
  try {
    const buffer = fs.readFileSync('completed.txt');

    const data = buffer.toString();
    return data;
  } catch (e) {
    return '';
  }
};

module.exports = {
  addTask: addTask,
  deleteTask: deleteTask,
  listTasks: listTasks,
  listTasksCompleted: listTasksCompleted,
  length_In: length_In,
  length_Com: length_Com,
  doneTask: doneTask,
  usage: usage,
};
