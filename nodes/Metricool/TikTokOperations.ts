import {
    INodeProperties,
} from 'n8n-workflow';

export const tiktokOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['tiktok'],
            },
        },
        options: [
            {
                name: 'Get TikTok Videos',
                value: 'getTikTokVideos',
                description: 'Get TikTok videos from your Metricool account',
                action: 'Get tik tok videos',
            },
        ],
        default: 'getTikTokVideos',
    },
];

export const tiktokFields: INodeProperties[] = [
    {
        displayName: 'Blog ID',
        name: 'blogId',
        type: 'number',
        required: true,
        displayOptions: {
            show: {
                resource: ['tiktok'],
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
                resource: ['tiktok'],
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
                resource: ['tiktok'],
            },
        },
        default: '',
        description: 'End date for retrieving content (format: YYYY-MM-DD)',
    },
];
