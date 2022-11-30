import { lazy } from 'react';
import NoAccess from '../noaccess/NoAccess';

const Error404Page = lazy(() => import('./Error404Page'));

const Error404PageConfig = {
    settings: {
        layout: {
            config: {
                navbar: {
                    display: false,
                },
                toolbar: {
                    display: true,
                },
                footer: {
                    display: false,
                },
                leftSidePanel: {
                    display: false,
                },
                rightSidePanel: {
                    display: false,
                },
            },
        },
    },
    routes: [
        {
            path: '404',
            element: <Error404Page />,
        },
        {
            path: 'no-access',
            element: <NoAccess />,
        },
    ],
};

export default Error404PageConfig;