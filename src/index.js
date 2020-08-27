import log from './util/log';
import PostRequest from './models/PostRequest';
import route from './router';

function onGet(e) {
    return errorInterceptor(() => {
        log('onGet', e);
    });
}

function onPost(e) {
    return errorInterceptor(() => {
        const request = new PostRequest(e);
        return route(request, 'post');
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
