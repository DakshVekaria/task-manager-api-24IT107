const taskEvents = require('./event');

taskEvents.on('task-created', (task) => {
    console.log('\n[Notification] Handler started at:',
        new Date().toISOString());

    setTimeout(() => {
        console.log('\n[Notification] New task created');
        console.log('Task Title:', task.title);
        console.log('Timestamp:', new Date().toISOString());
        console.log('---------------------------');
    }, 2000);
});

taskEvents.on('task-deleted', (task) => {
    console.log('\n[Notification] Task deleted:',
        task.title || task._id);
    console.log('Timestamp:', new Date().toISOString());
    console.log('---------------------------');
});

taskEvents.on('error', (error) => {
    console.error('[Notification Error]:', error.message);
});

module.exports = taskEvents;
