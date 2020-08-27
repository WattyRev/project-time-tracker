import log from './util/log';

function onGet(e) {
    return errorInterceptor(() => {
        log('onGet', e);
    });
}

function onPost(e) {
    return errorInterceptor(() => {
        log('onPost', e);
    });
}

function onTimedExecution() {
    return errorInterceptor(() => {
        log('onTimedExecution');
    });
}

function errorInterceptor(callback) {
    try {
        return callback();
    } catch (error) {
        log('Error', error.message);
        throw error;
    }
}

export { onGet, onPost, onTimedExecution };
