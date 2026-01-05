import {
    INodeProperties,
} from 'n8n-workflow';

export const competitorOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['competitor'],
            },
        },
        options: [
            {
                name: 'Get Network Competitors',
                value: 'getNetworkCompetitors',
                description: 'Get list of competitors for a network',
                action: 'Get network competitors',
            },
            {
                name: 'Get Network Competitors Posts',
                value: 'getNetworkCompetitorsPosts',
                description: 'Get posts from competitors for a network',
                action: 'Get network competitors posts',
            },
        ],
        default: 'getNetworkCompetitors',
    },
];

export const competitorFields: INodeProperties[] = [
    {
        displayName: 'Network',
        name: 'network',
        type: 'options',
        required: true,
        displayOptions: {
            show: {
                resource: ['competitor'],
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
                name: 'Twitch',
                value: 'twitch',
            },
            {
                name: 'Twitter',
                value: 'twitter',
            },
            {
                name: 'YouTube',
                value: 'youtube',
            },
        ],
        default: 'instagram',
        description: 'The social network to get competitors for',
    },
    {
        displayName: 'Start Date',
        name: 'startDate',
        type: 'dateTime',
        required: true,
        displayOptions: {
            show: {
                resource: ['competitor'],
            },
        },
        default: '',
        description: 'Start date for retrieving competitor data (format: YYYY-MM-DD)',
    },
    {
        displayName: 'End Date',
        name: 'endDate',
        type: 'dateTime',
        required: true,
        displayOptions: {
            show: {
                resource: ['competitor'],
            },
        },
        default: '',
        description: 'End date for retrieving competitor data (format: YYYY-MM-DD)',
    },
    {
        displayName: 'Timezone',
        name: 'timezone',
        type: 'string',
        required: false,
        displayOptions: {
            show: {
                resource: ['competitor'],
            },
        },
        default: 'Europe/Madrid',
        description: 'Timezone for the date range',
    },
];
