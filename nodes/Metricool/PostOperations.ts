import {
    INodeProperties,
} from 'n8n-workflow';

export const postOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['post'],
            },
        },
        options: [
            {
                name: 'Schedule Post',
                value: 'schedulePost',
                description: 'Schedule a post to social media platforms',
                action: 'Schedule a post',
            },
            {
                name: 'Get Scheduled Posts',
                value: 'getScheduledPosts',
                description: 'Get scheduled posts for a specific date range',
                action: 'Get scheduled posts',
            },
            {
                name: 'Update Scheduled Post',
                value: 'updateScheduledPost',
                description: 'Update an existing scheduled post',
                action: 'Update a scheduled post',
            },
            {
                name: 'Delete Scheduled Post',
                value: 'deleteScheduledPost',
                description: 'Delete an existing scheduled post',
                action: 'Delete a scheduled post',
            },
            {
                name: 'Get Best Time to Post',
                value: 'getBestTimeToPost',
                description: 'Get optimal posting times for a specific platform',
                action: 'Get best time to post',
            },
        ],
        default: 'schedulePost',
    },
];

export const postFields: INodeProperties[] = [
    {
        displayName: 'Blog ID',
        name: 'blogId',
        type: 'number',
        required: true,
        displayOptions: {
            show: {
                resource: ['post'],
                operation: [
                    'schedulePost',
                    'getScheduledPosts',
                    'updateScheduledPost',
                    'deleteScheduledPost',
                    'getBestTimeToPost',
                ],
            },
        },
        default: 0,
        description: 'The blog ID of the Metricool brand account',
    },
    {
        displayName: 'Post Text',
        name: 'text',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['post'],
                operation: ['schedulePost', 'updateScheduledPost'],
            },
        },
        default: '',
        description: 'The text content of the post',
    },
    {
        displayName: 'Platforms',
        name: 'platforms',
        type: 'multiOptions',
        required: true,
        displayOptions: {
            show: {
                resource: ['post'],
                operation: ['schedulePost', 'updateScheduledPost'],
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
                name: 'Twitter/X',
                value: 'twitter',
            },
            {
                name: 'YouTube',
                value: 'youtube',
            },
        ],
        default: [],
        description: 'Select the platforms to post to',
    },
    {
        displayName: 'Instagram Post Type',
        name: 'instagramPostType',
        type: 'multiOptions',
        displayOptions: {
            show: {
                resource: ['post'],
                operation: ['schedulePost', 'updateScheduledPost'],
                platforms: ['instagram'],
            },
        },
        options: [
            {
                name: 'Post (Feed)',
                value: 'feed',
            },
            {
                name: 'Reel',
                value: 'reel',
            },
            {
                name: 'Story',
                value: 'story',
            },
        ],
        default: ['feed'],
        description: 'Type of Instagram post to create',
    },
    {
        displayName: 'Facebook Post Type',
        name: 'facebookPostType',
        type: 'multiOptions',
        displayOptions: {
            show: {
                resource: ['post'],
                operation: ['schedulePost', 'updateScheduledPost'],
                platforms: ['facebook'],
            },
        },
        options: [
            {
                name: 'Post (Feed)',
                value: 'feed',
            },
            {
                name: 'Reel',
                value: 'reel',
            },
            {
                name: 'Story',
                value: 'story',
            },
        ],
        default: ['feed'],
        description: 'Type of Facebook post to create',
    },
    {
        displayName: 'YouTube Post Type',
        name: 'youtubePostType',
        type: 'multiOptions',
        displayOptions: {
            show: {
                resource: ['post'],
                operation: ['schedulePost', 'updateScheduledPost'],
                platforms: ['youtube'],
            },
        },
        options: [
            {
                name: 'Video',
                value: 'video',
            },
            {
                name: 'Short',
                value: 'short',
            },
        ],
        default: ['video'],
        description: 'Type of YouTube post to create',
    },
    {
        displayName: 'Show Reel on Feed',
        name: 'showReelOnFeed',
        type: 'boolean',
        displayOptions: {
            show: {
                resource: ['post'],
                operation: ['schedulePost', 'updateScheduledPost'],
                platforms: ['instagram'],
                instagramPostType: ['reel'],
            },
        },
        default: true,
        description: 'Whether to show the Reel on the main feed',
    },
    {
        displayName: 'Scheduled Date',
        name: 'scheduledDate',
        type: 'dateTime',
        required: true,
        displayOptions: {
            show: {
                resource: ['post'],
                operation: ['schedulePost', 'updateScheduledPost'],
            },
        },
        default: '',
        description: 'Date and time to publish the post (format: YYYY-MM-DDTHH:mm:ss)',
    },
    {
        displayName: 'Media URLs',
        name: 'mediaUrls',
        type: 'string',
        typeOptions: {
            multipleValues: true,
        },
        displayOptions: {
            show: {
                resource: ['post'],
                operation: ['schedulePost', 'updateScheduledPost'],
            },
        },
        default: [],
        description: 'URLs of media files to include in the post',
    },
    {
        displayName: 'Start Date',
        name: 'startDate',
        type: 'dateTime',
        required: true,
        displayOptions: {
            show: {
                resource: ['post'],
                operation: ['getScheduledPosts'],
            },
        },
        default: '',
        description: 'Start date for retrieving scheduled posts (format: YYYY-MM-DD)',
    },
    {
        displayName: 'End Date',
        name: 'endDate',
        type: 'dateTime',
        required: true,
        displayOptions: {
            show: {
                resource: ['post'],
                operation: ['getScheduledPosts'],
            },
        },
        default: '',
        description: 'End date for retrieving scheduled posts (format: YYYY-MM-DD)',
    },
    {
        displayName: 'Timezone',
        name: 'timezone',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['post'],
                operation: ['getScheduledPosts'],
            },
        },
        default: 'Europe/Madrid',
        description: 'Timezone for the date range (format: Europe/Madrid)',
    },
    {
        displayName: 'Post ID',
        name: 'postId',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['post'],
                operation: ['updateScheduledPost', 'deleteScheduledPost'],
            },
        },
        default: '',
        description: 'ID of the scheduled post to update or delete',
    },
    {
        displayName: 'Provider',
        name: 'provider',
        type: 'options',
        required: true,
        displayOptions: {
            show: {
                resource: ['post'],
                operation: ['getBestTimeToPost'],
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
                name: 'LinkedIn',
                value: 'linkedin',
            },
            {
                name: 'TikTok',
                value: 'tiktok',
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
        description: 'Social media platform to get optimal posting times for',
    },
    {
        displayName: 'Start Date',
        name: 'startDate',
        type: 'dateTime',
        required: true,
        displayOptions: {
            show: {
                resource: ['post'],
                operation: ['getBestTimeToPost'],
            },
        },
        default: '',
        description: 'Start date for analysis period (format: YYYY-MM-DD)',
    },
    {
        displayName: 'End Date',
        name: 'endDate',
        type: 'dateTime',
        required: true,
        displayOptions: {
            show: {
                resource: ['post'],
                operation: ['getBestTimeToPost'],
            },
        },
        default: '',
        description: 'End date for analysis period (format: YYYY-MM-DD)',
    },
    {
        displayName: 'Timezone',
        name: 'timezone',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['post'],
                operation: ['getBestTimeToPost'],
            },
        },
        default: 'Europe/Madrid',
        description: 'Timezone for the analysis (format: Europe/Madrid)',
    },
];
