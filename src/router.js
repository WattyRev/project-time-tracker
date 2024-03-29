import completeProject from './actions/completeProject';
import createProject from './actions/createProject';
import startProject from './actions/startProject';
import stopProject from './actions/stopProject';

export default function route(request, method) {
    if (method === 'get') {
        switch (request.action) {
            default:
                return 'No route found';
        }
    }
    if (method === 'post') {
        switch (request.action) {
            case 'start':
                return startProject();
            case 'stop':
                return stopProject();
            case 'create':
                return createProject();
            case 'complete':
                return completeProject();
            default:
                return 'No route found';
        }
    }
    return 'No route found';
}
