#!/usr/bin/env node
import sinon from 'sinon';
import { expect } from 'chai';
import { createQueue } from 'kue';
import createPushNotificationsJobs from './8-job.js';

describe('createPushNotificationsJobs', () => {
	const consoleSpy = sinon.spy(console, 'log');
	const queue = createQueue({ name: 'push_notification_code_test' });

	before(() => {
		queue.testMode.enter(true);
	});

	after(() => {
		queue.testMode.clear();
		queue.testMode.exit();
	});

	afterEach(() => {
		consoleSpy.resetHistory();
	});

	it('displays an error message if jobs is not an array', () => {
		expect(() => createPushNotificationsJobs({}, queue)).to.throw('Jobs is not an array');
		expect(consoleSpy.calledWith('Jobs is not an array')).to.be.true; // Expect the log to have been called
	});

	it('adds jobs to the queue with correct type', () => {
		const jobInfos = [
			{
				phoneNumber: '44556677889',
				message: 'Use the code 1982 to verify your account',
			},
			{
				phoneNumber: '98877665544',
				message: 'Use the code 1738 to verify your account',
			},
		];
		createPushNotificationsJobs(jobInfos, queue);
		const jobs = queue.testMode.jobs;
		expect(jobs.length).to.equal(2);
		expect(jobs[0].data).to.deep.equal(jobInfos[0]);
		expect(jobs[0].type).to.equal('push_notification_code_3');
		expect(consoleSpy.calledWith('Notification job created: ${jobs[0].id}')).to.be.true;
	});

	it('registers the progress event handler for a job', (done) => {
		const job = queue.testMode.jobs[0];
		job.on('progress', (progress) => {
			expect(consoleSpy.calledWith(`Notification job ${job.id} ${progress}% complete`)).to.be.true;
			done();
		});
		job.emit('progress', 25);
	});

	it('registers the failed event handler for a job', (done) => {
		const job = queue.testMode.jobs[0];
		job.on('failed', (error) => {
			expect(consoleSpy.calledWith(`Notification job ${job.id} failed: ${error.message}`)).to.be.true;
			done();
		});
		job.emit('failed', new Error('Failed to send'));
	});

	it('registers the complete event handler for a job', (done) => {
		const job = queue.testMode.jobs[0];
		job.on('complete', () => {
			expect(consoleSpy.calledWith(`Notification job ${job.id} completed`)).to.be.true;
			done();
		});
		job.emit('complete');
	});
});
