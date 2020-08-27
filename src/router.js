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
                return startProject(request.payload.projectName);
            case 'stop':
                return stopProject(request.payload.projectName);
            case 'create':
                return createProject(request.payload.projectName);
            default:
                return 'No route found';
        }
    }
    return 'No route found';
}
