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
        displayName: 'Blog ID',
        name: 'blogId',
        type: 'number',
        required: true,
        displayOptions: {
            show: {
                resource: ['competitor'],
            },
        },
        default: 0,
        description: 'The blog ID of the Metricool brand account',
    },
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
                name: 'Facebook',
                value: 'facebook',
            },
            {
                name: 'Instagram',
                value: 'instagram',
            },
            {
                name: 'Twitter',
                value: 'twitter',
            },
            {
                name: 'YouTube',
                value: 'youtube',
            },
            {
                name: 'Twitch',
                value: 'twitch',
            },
        ],
        default: 'instagram',
        description: 'The social network to get competitors for',
    },
];
