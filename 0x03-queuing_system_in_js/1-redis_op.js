#!/usr/bin/env node
import { createClient, print } from 'redis';

// Create a Redis client
const client = createClient();

// Handle connection errors
client.on('error', (err) => {
	console.log('Redis client not connected to the server:', err.toString());
});

// Handle successful connection
client.on('connect', () => {
	console.log('Redis client connected to the server');

	// Call the functions here once the client is connected
	displaySchoolValue('Holberton');
	setNewSchool('HolbertonSanFrancisco', '100');
	displaySchoolValue('HolbertonSanFrancisco');
});

// Function to set a new school
const setNewSchool = (schoolName, value) => {
	client.set(schoolName, value, print);
};

// Function to display the value of a school
const displaySchoolValue = (schoolName) => {
	client.get(schoolName, (_err, reply) => {
		console.log(reply);
	});
};
// OOptional: Quit the client if you want to close the connection
// client.quit();
