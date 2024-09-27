#!/usr/bin/env node
import kue from 'kue';

/**
 * Creates push notification jobs from the array of jobs info.
 * @param {Array} jobs - Array of job data objects (phoneNumber and message).
 * @param {Queue} queue - Kue queue instance.
 */

export default function createPushNotificationsJobs = (jobs, queue) => {
	if (!Array.isArray(jobs)) {
		throw new Error('Jobs is not an array');
	}

	// Loop over each job info and create a job in the queue
	for (const jobInfo of jobs) {
		const job = queue.create('push_notification_code_3', jobInfo);

		// Register event handlers for the job
		job.on('enqueue', () => {
			console.log(`Notification job created: ${job.id}`);
		});
		
		job.on('complete', () => {
			console.log(`Notification job ${job.id} completed`);
		});

		job.on('failed', (err) => {
			console.log(`Notification job ${job.id} failed: ${err ? err.message : ''}`);
		});

		job.on('progress', (progress) => {
			console.log(`Notification job ${job.id} ${progress}% complete`);
		});

		// Save the job to the queue
		job.save();
	}
}
