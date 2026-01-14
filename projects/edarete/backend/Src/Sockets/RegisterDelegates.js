// Sockets.zip/Sockets/RegisterDelegates.js (UPDATED)
const { createSocketService } = require('../../Services/Integrations/Socket/SocketRegistration'); 
const QuizController = require('./Controllers/QuizController/quizController');
const LabController = require('./Controllers/LabController/labController');

/**
 * Register all socket controllers/services by logical key -- this is the only place you touch for adding events!
 * @returns {object}
 */
function initializeSocketDelegates() {
    const socketComponents = {};
    
    // 1. QUIZ - Clean initialization with no constructor arguments
    const quizConfig = { path: '/quiz-socket' };
    const quizSocketService = createSocketService(quizConfig, 'quiz');
    quizSocketService.initializeDelegate(new QuizController());
    socketComponents.quizSocketService = quizSocketService;

    // 2. LAB - Clean initialization with no constructor arguments
    const labConfig = { path: '/lab-socket' };
    const labSocketService = createSocketService(labConfig, 'lab');
    labSocketService.initializeDelegate(new LabController());
    socketComponents.labSocketService = labSocketService;

    return socketComponents;
}

module.exports = { initializeSocketDelegates };