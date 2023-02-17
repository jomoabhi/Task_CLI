const tasksHelper = require('./taskHelper');

if (process.argv[2] === 'add') {
  if (process.argv[3] !== undefined && Number.parseInt(process.argv[3]) >= 0) {
    if (process.argv[4] !== undefined) {
      tasksHelper.addTask(process.argv[3], process.argv[4]);
    } else {
      console.log('Error: Missing tasks string. Nothing added!');
    }
  } else {
    console.log('Error: Missing tasks string. Nothing added!');
  }
}
if (process.argv[2] === 'ls') {
  tasksHelper.listTasks();
}
if (process.argv[2] === 'del') {
  if (process.argv[3] !== undefined && Number.parseInt(process.argv[3]) >= 0) {
    const d = tasksHelper.deleteTask(process.argv[3]);
    if (d === 'success') console.log(`Deleted task #${process.argv[3]}`);
  } else {
    console.log('Error: Missing NUMBER for deleting tasks.');
  }
}
if (process.argv[2] === 'done') {
  if (process.argv[3] !== undefined && Number.parseInt(process.argv[3]) >= 0) {
    tasksHelper.doneTask(process.argv[3]);
  } else {
    console.log('Error: Missing NUMBER for marking tasks as done.');
  }
}
if (process.argv[2] === 'report') {
  console.log(`Pending : ${tasksHelper.length_In()}`);
  tasksHelper.listTasks();

  console.log(`\nCompleted : ${tasksHelper.length_Com()}`);
  tasksHelper.listTasksCompleted();
}
if (process.argv[2] === 'help' || process.argv[2] === undefined) {
  tasksHelper.usage();
}
