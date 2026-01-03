import {
    INodeProperties,
} from 'n8n-workflow';

export const blueskyOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['bluesky'],
            },
        },
        options: [
            {
                name: 'Get Bluesky Posts',
                value: 'getBlueskyPosts',
                description: 'Get Bluesky posts from your Metricool account',
                action: 'Get bluesky posts',
            },
        ],
        default: 'getBlueskyPosts',
    },
];

export const blueskyFields: INodeProperties[] = [
    {
        displayName: 'Blog ID',
        name: 'blogId',
        type: 'number',
        required: true,
        displayOptions: {
            show: {
                resource: ['bluesky'],
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
                resource: ['bluesky'],
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
                resource: ['bluesky'],
            },
        },
        default: '',
        description: 'End date for retrieving content (format: YYYY-MM-DD)',
    },
];
