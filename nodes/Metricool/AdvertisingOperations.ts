import {
    INodeProperties,
} from 'n8n-workflow';

export const advertisingOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['advertising'],
            },
        },
        options: [
            {
                name: 'Get Facebook Ads Campaigns',
                value: 'getFacebookAdsCampaigns',
                description: 'Get Facebook ads campaigns from your Metricool account',
                action: 'Get facebook ads campaigns',
            },
            {
                name: 'Get Google Ads Campaigns',
                value: 'getGoogleAdsCampaigns',
                description: 'Get Google ads campaigns from your Metricool account',
                action: 'Get google ads campaigns',
            },
            {
                name: 'Get TikTok Ads Campaigns',
                value: 'getTikTokAdsCampaigns',
                description: 'Get TikTok ads campaigns from your Metricool account',
                action: 'Get tik tok ads campaigns',
            },
        ],
        default: 'getFacebookAdsCampaigns',
    },
];

export const advertisingFields: INodeProperties[] = [
    {
        displayName: 'Blog ID',
        name: 'blogId',
        type: 'number',
        required: true,
        displayOptions: {
            show: {
                resource: ['advertising'],
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
                resource: ['advertising'],
            },
        },
        default: '',
        description: 'Start date for retrieving campaigns (format: YYYY-MM-DD)',
    },
    {
        displayName: 'End Date',
        name: 'endDate',
        type: 'dateTime',
        required: true,
        displayOptions: {
            show: {
                resource: ['advertising'],
            },
        },
        default: '',
        description: 'End date for retrieving campaigns (format: YYYY-MM-DD)',
    },
];
