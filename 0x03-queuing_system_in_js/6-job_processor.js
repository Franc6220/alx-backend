#!/usr/bin/env node
import kue from 'kue';

// Create a queue
const queue = kue.createQueue();

// Function to send notifications
const sendNotification = (phoneNumber, message) => {
	console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
};

// Process jobs on the 'push_notification_code' queue
queue.process('push_notification_code', (job, done) => {
	const { phoneNumber, message } = job.data;
	sendNotification(phoneNumber, message);
	done();
});

// Optional: Handle job failures
queue.on('failed', (job, err) => {
	console.error(`Job failed: ${job.id}, error: ${err.message}`);
});
