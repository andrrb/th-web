const { existsSync, readFileSync, writeFileSync, read } = require('fs');
module.exports = function (path) {
	function loadTasks(path) {
		console.log("Loading tasks...");
		if (existsSync(path)) {
			const jsonData = readFileSync(path);
			const stringData = JSON.parse(jsonData);
			// trimTaskText(stringData);
			return stringData;
		} else {
			return {};
		}
	}

	function syncTasks(tasks, path) {
		// trimTaskText(tasks);
		writeFileSync(path, JSON.stringify(tasks));
	}

	function trimTaskText(tasks) {
		Object.keys(tasks).forEach(category => {
			tasks[category] = tasks[category].map(task => task.trim());
		});
	}

	const tasks = loadTasks(path);
	return {
		getTasksByStatus() {
			return tasks;
		},
		changeTaskStatus(task, oldStatus, newStatus) {
			if (!tasks[newStatus].includes(task)) {
				console.log(`${task} - Changing task status from ${oldStatus} to ${newStatus}`);
				const taskIndex = tasks[oldStatus].indexOf(task);
				tasks[oldStatus].splice(taskIndex, 1);
				tasks[newStatus].push(task);
				syncTasks(tasks, path);
			} else {
				console.log(`Cannot move task (${task}). Task already exists in category ${newStatus}`);
			}

		}
	}
};