#!/usr/bin/env node
import { createClient } from 'redis';

const client = createClient();

client.on('error', (err) => {
	console.log('Redis client not connected to the server:', err.toString());
});

// Function to publish message to the Redis channel after a given time
const publishMessage = (message, time) => {
	setTimeout(() => {
		console.log(`About to send ${message}`);
		client.publish('holberton school channel', message);
	}, time);
};

client.on('connect', () => {
	console.log('Redis client connected to the server');

	// Only start publishing messages after the client has connected
	publishMessage('Holberton Student #1 starts course', 100);
	publishMessage('Holberton Student #2 starts course', 200);
	publishMessage('KILL_SERVER', 300);
	publishMessage('Holberton Student #3 starts course', 400);

	// Close the client after all messages are sent
	setTimeout(() => {
		console.log('All messages sent, closing client...');
		client.quit();
	}, 500);     // Adjust this based on the last message delay
});
