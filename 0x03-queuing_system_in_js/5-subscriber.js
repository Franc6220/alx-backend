#!/usr/bin/env node
import { createClient } from 'redis';

const client = createClient();
const EXIT_MSG = 'KILL_SERVER';

client.on('error', (err) => {
	console.log('Redis client not connected to the server:', err.toString());
});

client.on('connect', () => {
	console.log('Redis client connected to the server');
});

// Subscribe to 'holberton school channel'
client.subscribe('holberton school channel');

// When a message is received
client.on('message', (channel, message) => {
	console.log(`Received message: ${message}`);
	if (message === EXIT_MSG) {
		console.log('Received exit command, shutting down...');
		client.unsubscribe();
		client.quit();
	}
});
