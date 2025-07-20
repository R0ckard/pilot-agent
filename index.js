import 'dotenv/config';
import { pollTasks } from './pollTasks.js';

setInterval(pollTasks, 15000); // Poll every 15s

console.log('🚀 Pilot Agent is running and polling every 15 seconds...');
