#!/usr/bin/env node
import { promisify } from 'util';
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

// Promisfy the get method
const getAsync = promisify(client.get).bind(client);

// Function to set a new school
const setNewSchool = (schoolName, value) => {
	client.set(schoolName, value, (err, reply) => {
		if (err) {
			console.log('Error setting value:', err);
		} else {
			comsole.log('Reply:', reply);
		}
	});
};

// Function to display the value of a school
const displaySchoolValue = async (schoolName) => {
	try {
		const reply = await getAsync(schoolName);
		console.log(reply);
	} catch (err) {
		console.log('Error retrieviing value:', err);
	}
};


// OOptional: Quit the client if you want to close the connection
// client.quit();
