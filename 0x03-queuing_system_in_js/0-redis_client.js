#!/usr/bin/env node
import { createClient } from 'redis';

// Create a Redis client
const client = createClient();

// Handle connection errors
client.on('error', (err) => {
	console.log('Redis client not connected to the server:', err.toString());
});

// Handle successful connection
client.on('connect', () => {
	console.log('Redis client connected to the server');
});
