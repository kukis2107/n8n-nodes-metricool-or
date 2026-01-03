import {
    INodeProperties,
} from 'n8n-workflow';

export const facebookOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['facebook'],
            },
        },
        options: [
            {
                name: 'Get Facebook Posts',
                value: 'getFacebookPosts',
                description: 'Get Facebook posts from your Metricool account',
                action: 'Get facebook posts',
            },
            {
                name: 'Get Facebook Reels',
                value: 'getFacebookReels',
                description: 'Get Facebook reels from your Metricool account',
                action: 'Get facebook reels',
            },
            {
                name: 'Get Facebook Stories',
                value: 'getFacebookStories',
                description: 'Get Facebook stories from your Metricool account',
                action: 'Get facebook stories',
            },
        ],
        default: 'getFacebookPosts',
    },
];

export const facebookFields: INodeProperties[] = [
    {
        displayName: 'Blog ID',
        name: 'blogId',
        type: 'number',
        required: true,
        displayOptions: {
            show: {
                resource: ['facebook'],
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
                resource: ['facebook'],
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
                resource: ['facebook'],
            },
        },
        default: '',
        description: 'End date for retrieving content (format: YYYY-MM-DD)',
    },
];
