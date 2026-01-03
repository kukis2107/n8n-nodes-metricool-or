import {
    INodeProperties,
} from 'n8n-workflow';

export const youtubeOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['youtube'],
            },
        },
        options: [
            {
                name: 'Get YouTube Videos',
                value: 'getYouTubeVideos',
                description: 'Get YouTube videos from your Metricool account',
                action: 'Get you tube videos',
            },
        ],
        default: 'getYouTubeVideos',
    },
];

export const youtubeFields: INodeProperties[] = [
    {
        displayName: 'Blog ID',
        name: 'blogId',
        type: 'number',
        required: true,
        displayOptions: {
            show: {
                resource: ['youtube'],
            },
        },
        default: 0,
        description: 'The blog ID of the Metricool brand account',
    },
    {
        displayName: 'Start Date',
        name: 'startDate',
        type: 'dateTime',
        required: true,
        displayOptions: {
            show: {
                resource: ['youtube'],
            },
        },
        default: '',
        description: 'Start date for retrieving content (format: YYYY-MM-DD)',
    },
    {
        displayName: 'End Date',
        name: 'endDate',
        type: 'dateTime',
        required: true,
        displayOptions: {
            show: {
                resource: ['youtube'],
            },
        },
        default: '',
        description: 'End date for retrieving content (format: YYYY-MM-DD)',
    },
];
