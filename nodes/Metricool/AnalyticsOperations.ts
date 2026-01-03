import {
    INodeProperties,
} from 'n8n-workflow';

export const analyticsOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['analytics'],
            },
        },
        options: [
            {
                name: 'Get Metrics',
                value: 'getMetrics',
                description: 'Get available metrics for a specific network',
                action: 'Get available metrics',
            },
            {
                name: 'Get Analytics',
                value: 'getAnalytics',
                description: 'Get analytics data for a specific network and metrics',
                action: 'Get analytics data',
            },
        ],
        default: 'getMetrics',
    },
];

export const analyticsFields: INodeProperties[] = [
    {
        displayName: 'Network',
        name: 'network',
        type: 'options',
        required: true,
        displayOptions: {
            show: {
                resource: ['analytics'],
                operation: ['getMetrics', 'getAnalytics'],
            },
        },
        options: [
            {
                name: 'Bluesky',
                value: 'bluesky',
            },
            {
                name: 'Facebook',
                value: 'facebook',
            },
            {
                name: 'Instagram',
                value: 'instagram',
            },
            {
                name: 'LinkedIn',
                value: 'linkedin',
            },
            {
                name: 'Pinterest',
                value: 'pinterest',
            },
            {
                name: 'Threads',
                value: 'threads',
            },
            {
                name: 'TikTok',
                value: 'tiktok',
            },
            {
                name: 'Twitch',
                value: 'twitch',
            },
            {
                name: 'Twitter/X',
                value: 'twitter',
            },
            {
                name: 'YouTube',
                value: 'youtube',
            },
        ],
        default: 'instagram',
        description: 'Social media network to get metrics/analytics for',
    },
    {
        displayName: 'Blog ID',
        name: 'blogId',
        type: 'number',
        required: true,
        displayOptions: {
            show: {
                resource: ['analytics'],
                operation: ['getAnalytics'],
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
                resource: ['analytics'],
                operation: ['getAnalytics'],
            },
        },
        default: '',
        description: 'Start date for analytics data (format: YYYY-MM-DD)',
    },
    {
        displayName: 'End Date',
        name: 'endDate',
        type: 'dateTime',
        required: true,
        displayOptions: {
            show: {
                resource: ['analytics'],
                operation: ['getAnalytics'],
            },
        },
        default: '',
        description: 'End date for analytics data (format: YYYY-MM-DD)',
    },
    {
        displayName: 'Timezone',
        name: 'timezone',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['analytics'],
                operation: ['getAnalytics'],
            },
        },
        default: 'Europe/Madrid',
        description: 'Timezone for the date range (format: Europe/Madrid)',
    },
    {
        displayName: 'Metrics',
        name: 'metrics',
        type: 'string',
        typeOptions: {
            multipleValues: true,
        },
        displayOptions: {
            show: {
                resource: ['analytics'],
                operation: ['getAnalytics'],
            },
        },
        default: [],
        description: 'List of metrics to retrieve (use Get Metrics operation to see available options)',
        placeholder: 'followers, likes, comments',
    },
];
