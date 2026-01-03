import {
    INodeProperties,
} from 'n8n-workflow';

export const twitchOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['twitch'],
            },
        },
        options: [
            {
                name: 'Get Twitch Videos',
                value: 'getTwitchVideos',
                description: 'Get Twitch videos from your Metricool account',
                action: 'Get twitch videos',
            },
        ],
        default: 'getTwitchVideos',
    },
];

export const twitchFields: INodeProperties[] = [
    {
        displayName: 'Blog ID',
        name: 'blogId',
        type: 'number',
        required: true,
        displayOptions: {
            show: {
                resource: ['twitch'],
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
                resource: ['twitch'],
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
                resource: ['twitch'],
            },
        },
        default: '',
        description: 'End date for retrieving content (format: YYYY-MM-DD)',
    },
];
