#!/usr/bin/env node
import kue from 'kue';

const queue = kue.createQueue();

// Create the job data object
const jobData = {
	phoneNumber: '0114621006',
	message: 'This is a notification message',
};

// Create a job named 'push_notification_code'
const job = queue.create('push_notification_code', jobData).save((err) => {
	if (!err) {
		console.log(`Notification job created: ${job.id}`);
	} else {
		console.error('Error creating job:', err);
	}
});

// Listen for job completion
job.on('complete', () => {
	console.log('Notification job completed');
});

// Listen for job failure
job.on('failed', (errorMessage) => {
	console.log('Notification job failed:', errorMessage);
});
