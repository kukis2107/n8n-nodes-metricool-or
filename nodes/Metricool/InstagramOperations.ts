import {
    INodeProperties,
} from 'n8n-workflow';

export const instagramOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['instagram'],
            },
        },
        options: [
            {
                name: 'Get Instagram Posts',
                value: 'getInstagramPosts',
                description: 'Get Instagram posts from your Metricool account',
                action: 'Get instagram posts',
            },
            {
                name: 'Get Instagram Reels',
                value: 'getInstagramReels',
                description: 'Get Instagram reels from your Metricool account',
                action: 'Get instagram reels',
            },
            {
                name: 'Get Instagram Stories',
                value: 'getInstagramStories',
                description: 'Get Instagram stories from your Metricool account',
                action: 'Get instagram stories',
            },
        ],
        default: 'getInstagramPosts',
    },
];

export const instagramFields: INodeProperties[] = [
    {
        displayName: 'Blog ID',
        name: 'blogId',
        type: 'number',
        required: true,
        displayOptions: {
            show: {
                resource: ['instagram'],
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
                resource: ['instagram'],
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
                resource: ['instagram'],
            },
        },
        default: '',
        description: 'End date for retrieving content (format: YYYY-MM-DD)',
    },
];
