const fs = require('fs');
const { Command } = require('commander');
const program = new Command();

program
  .name('string-util')
  .description('CLI to some JavaScript string utilities')
  .version('0.8.0');

program.command('count_lines')
  .description('Count the number of lines in a file')
  .argument('<file>', 'file to count')
  .action((file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const lines = data.split('\n').length; 
        console.log(`There are ${lines} lines in ${file}`);
      }
    });
  });

program.command('count_words')
  .description('Count the number of words in a file')
  .argument('<file>', 'file to count')
  .action((file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const words = data.split(' ').length;
        console.log(`There are ${words} words in ${file}`);
      }
    });
  });

program.command('add')
  .description('Add new value to a json file')
  .argument('<task>', 'new value to add')
  .argument('<due>', 'new value to add')
  .action((task, due) => {
    let file = "todo.json";
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(data);
        // console.log(JSON.parse(data));
        let tasksData = JSON.parse(data);
        let newTask = {
          id: tasksData.tasks.length+1,
          task: task,
          due_date: due,
        }

        tasksData.tasks.push(newTask);

        fs.writeFile(file, JSON.stringify(tasksData), (err) => {
          if(err) {
            console.log(err);
          } else {
            console.log("successfully added new task");
          }
        });
      }
    });
  });

program.command('delete')
  .description('delete value from json file')
  .argument('<value>', 'file to count')
  .action((value) => {
    let file = "todo.json";
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        let tasksData = JSON.parse(data);
        let newTasks = tasksData.tasks.filter(task => task.task != value);

        fs.writeFile(file, JSON.stringify(newTasks), (err) => {
          if(err) {
            console.log(err);
          } else {
            console.log("successfully deleted task");
          }
        });

      }
    });
  });

program.parse();