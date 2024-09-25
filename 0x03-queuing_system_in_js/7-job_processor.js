#!/usr/bin/env node
import kue from 'kue';

// Create an array of blacklisted phone numbers
const BLACKLISTED_NUMBERS = ['4153518780', '4153518781'];
// Create a Kue queue
const queue = kue.createQueue();

/**
 * Sends a push notification to a user.
 * @param {String} phoneNumber - The phone number to send the notification to.
 * @param {String} message - The message to send.
 * @param {Job} job - The Kue job instance.
 * @param {Function} done - Callback to signal completion or error.
 */

const sendNotification = (phoneNumber, message, job, done) => {
	const total = 2;
	let pending = total;
	let jobFailed = false;

	// Interval to simulate the notification process
	const sendInterval = setInterval(() => {
		// Update job progress if at least half of the job is done
		if (total - pending <= total / 2) {
			job.progress(total - pending, total);
		}

		// Check if the phone number is blacklisted
		if (BLACKLISTED_NUMBERS.includes(phoneNumber) && !jobFailed) {
			jobFailed = true;
			done(new Error(`Phone number ${phoneNumber} is blacklisted`));
			clearInterval(sendInterval);
			return;
		}

		// Log the sending notification message
		if (total === pending) {
			console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
		}

		--pending || done();
		pending || clearInterval(sendInterval);
	}, 1000);
};

// Process jobs from the queue
queue.process('push_notification_code_2', 2, (job, done) => {
	sendNotification(job.data.phoneNumber, job.data.message, job, done);
});

// Log when the processor is running
console.log('Job processor is running...');
