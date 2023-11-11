const express = require('express');
const {join, resolve} = require('path');
const service = require('./service')('tasks.json');
const PORT = process.env.PORT || 8080;
express()
	.use(express.static(join(resolve('..'), 'client')))
	.get('/tasks', (request, response) => {
		console.log("Requesting GET...");
		const tasks = service.getTasksByStatus();
		if (Object.keys(tasks).length > 0) {
			response.json(tasks);
		} else {
			response.sendStatus(204);
		}
	})
	.put('/tasks', (request, response) => {
		console.log("Requesting PUT...");
		const {task, oldStatus, newStatus} = request.query;
		if (oldStatus !== newStatus) {
			service.changeTaskStatus(task, oldStatus, newStatus);
			response.sendStatus(204);
		} else {
			response.sendStatus(400);
		}
			
	})
	.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));