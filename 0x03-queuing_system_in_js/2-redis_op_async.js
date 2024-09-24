#!/usr/bin/env node
import { promisify } from 'util';
import { createClient, print } from 'redis';

// Create a Redis client
const client = createClient();

// Handle connection errors
client.on('error', (err) => {
	console.log('Redis client not connected to the server:', err.toString());
});

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
		const value = await promisify(client.get).bind(client)(schoolName);
		console.log(value);
	} catch (err) {
		console.log('Error retrieviing value:', err);
	}
};

async function main() {
	await displaySchoolValue('Holberton');
	setNewSchool('HolbertonSanFrancisco', '100');
	await displaySchoolValue('HolbertonSanFrancisco');
}

client.on('connect', async () => {
	console.log('Redis client connected to the server');
	await main();
});
