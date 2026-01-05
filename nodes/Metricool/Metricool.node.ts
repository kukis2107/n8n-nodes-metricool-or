import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
    NodeOperationError,
} from 'n8n-workflow';

import { brandOperations, brandFields } from './BrandOperations';
import { analyticsOperations, analyticsFields } from './AnalyticsOperations';
import { postOperations, postFields } from './PostOperations';
import { instagramOperations, instagramFields } from './InstagramOperations';
import { facebookOperations, facebookFields } from './FacebookOperations';
import { tiktokOperations, tiktokFields } from './TikTokOperations';
import { youtubeOperations, youtubeFields } from './YouTubeOperations';
import { linkedinOperations, linkedinFields } from './LinkedInOperations';
import { pinterestOperations, pinterestFields } from './PinterestOperations';
import { threadsOperations, threadsFields } from './ThreadsOperations';
import { blueskyOperations, blueskyFields } from './BlueskyOperations';
import { twitchOperations, twitchFields } from './TwitchOperations';
import { twitterOperations, twitterFields } from './TwitterOperations';
import { advertisingOperations, advertisingFields } from './AdvertisingOperations';
import { competitorOperations, competitorFields } from './CompetitorOperations';

/**
 * Type definitions for Metricool API structures
 */
interface TaskProvider {
    network: string;
}

interface PostInfo {
    text: string;
    providers: TaskProvider[];
    publicationDate: {
        dateTime: string;
        timezone: string;
    };
    media: Array<{ url: string }>;
    autoPublish: boolean;
    instagramData?: {
        type: string;
        showReelOnFeed?: boolean;
    };
    facebookData?: {
        type: string;
    };
    youtubeData?: {
        type: string;
        title: string;
    };
}

/**
 * Validates that blogId is a positive number
 */
function validateBlogId(blogId: unknown, node: any, itemIndex: number): number {
    const parsed = parseInt(String(blogId), 10);
    if (isNaN(parsed) || parsed <= 0) {
        throw new NodeOperationError(
            node,
            `Blog ID must be a positive number, received: "${blogId}"`,
            { itemIndex }
        );
    }
    return parsed;
}

/**
 * Validates URL format
 */
function validateUrl(url: string, node: any, itemIndex: number): string {
    if (!url || url.trim() === '') return url; // Empty URLs allowed in arrays
    try {
        new URL(url);
        return url;
    } catch {
        throw new NodeOperationError(
            node,
            `Invalid URL: "${url}"`,
            { itemIndex }
        );
    }
}

/**
 * Validates ISO 8601 date format
 */
function validateDate(date: string, fieldName: string, node: any, itemIndex: number): string {
    if (!date || date.trim() === '') {
        throw new NodeOperationError(
            node,
            `${fieldName} is required and cannot be empty`,
            { itemIndex }
        );
    }
    const dateRegex = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2})/;
    if (!dateRegex.test(date)) {
        throw new NodeOperationError(
            node,
            `${fieldName} must be in ISO format (YYYY-MM-DD or YYYY-MM-DDTHH:mm:ss), received: "${date}"`,
            { itemIndex }
        );
    }
    return date;
}

export class Metricool implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Metricool',
        name: 'metricool',
        icon: 'file:logo-amarillo.png',
        group: ['output'],
        version: 1,
        subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
        description: 'Interact with Metricool social media management platform',
        defaults: {
            name: 'Metricool',
        },
        inputs: ['main'],
        outputs: ['main'],
        credentials: [
            {
                name: 'metricoolApi',
                required: true,
            },
        ],
        properties: [
            {
                displayName: 'Resource',
                name: 'resource',
                type: 'options',
                noDataExpression: true,
                options: [
                    { name: 'Advertising', value: 'advertising' },
                    { name: 'Analytics', value: 'analytics' },
                    { name: 'Bluesky', value: 'bluesky' },
                    { name: 'Brand', value: 'brand' },
                    { name: 'Competitor', value: 'competitor' },
                    { name: 'Facebook', value: 'facebook' },
                    { name: 'Instagram', value: 'instagram' },
                    { name: 'LinkedIn', value: 'linkedin' },
                    { name: 'Pinterest', value: 'pinterest' },
                    { name: 'Post', value: 'post' },
                    { name: 'Threads', value: 'threads' },
                    { name: 'TikTok', value: 'tiktok' },
                    { name: 'Twitch', value: 'twitch' },
                    { name: 'Twitter/X', value: 'twitter' },
                    { name: 'YouTube', value: 'youtube' },
                ],
                default: 'post',
                required: true,
            },
            ...advertisingOperations,
            ...advertisingFields,
            ...analyticsOperations,
            ...analyticsFields,
            ...blueskyOperations,
            ...blueskyFields,
            ...brandOperations,
            ...brandFields,
            ...competitorOperations,
            ...competitorFields,
            ...facebookOperations,
            ...facebookFields,
            ...instagramOperations,
            ...instagramFields,
            ...linkedinOperations,
            ...linkedinFields,
            ...pinterestOperations,
            ...pinterestFields,
            ...postOperations,
            ...postFields,
            ...threadsOperations,
            ...threadsFields,
            ...tiktokOperations,
            ...tiktokFields,
            ...twitchOperations,
            ...twitchFields,
            ...twitterOperations,
            ...twitterFields,
            ...youtubeOperations,
            ...youtubeFields,
        ],
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        const returnData: INodeExecutionData[] = [];
        const resource = this.getNodeParameter('resource', 0) as string;
        const operation = this.getNodeParameter('operation', 0) as string;

        /**
         * Helper to get userId from credentials for v2 API endpoints
         */
        const getUserId = async (): Promise<string> => {
            const credentials = await this.getCredentials('metricoolApi');
            return credentials.userId as string;
        };

        /**
         * Helper to format dates correctly for Metricool API.
         * Replaces 'T' with space and removes timezone info if present.
         */
        const formatDate = (date: string) => {
            if (!date) return date;
            return date.split('.')[0].replace('Z', '');
        };

        for (let i = 0; i < items.length; i++) {
            try {
                let responseData;

                if (resource === 'brand') {
                    if (operation === 'getBrands') {
                        responseData = await this.helpers.requestWithAuthentication.call(this, 'metricoolApi', {
                            method: 'GET',
                            url: 'https://app.metricool.com/api/v2/settings/brands',
                            qs: { userId: await getUserId() },
                        });
                    } else if (operation === 'getBrandsComplete') {
                        responseData = await this.helpers.requestWithAuthentication.call(this, 'metricoolApi', {
                            method: 'GET',
                            url: 'https://app.metricool.com/api/admin/profiles-auth',
                            qs: { userId: await getUserId() },
                        });
                    }
                } else if (resource === 'post') {
                    if (operation === 'schedulePost') {
                        const blogId = validateBlogId(this.getNodeParameter('blogId', i), this.getNode(), i);
                        const text = this.getNodeParameter('text', i) as string;
                        const platforms = this.getNodeParameter('platforms', i) as string[];
                        const scheduledDate = validateDate(
                            this.getNodeParameter('scheduledDate', i) as string,
                            'Scheduled Date',
                            this.getNode(),
                            i
                        );
                        const mediaUrls = this.getNodeParameter('mediaUrls', i) as string[];
                        // Validate media URLs
                        mediaUrls.forEach(url => {
                            if (url) validateUrl(url, this.getNode(), i);
                        });

                        const instagramTypes = platforms.includes('instagram') ? (this.getNodeParameter('instagramPostType', i) as string[]) : [];
                        const facebookTypes = platforms.includes('facebook') ? (this.getNodeParameter('facebookPostType', i) as string[]) : [];
                        const youtubeTypes = platforms.includes('youtube') ? (this.getNodeParameter('youtubePostType', i) as string[]) : [];

                        const maxSlices = Math.max(
                            instagramTypes.length || (platforms.includes('instagram') ? 1 : 0),
                            facebookTypes.length || (platforms.includes('facebook') ? 1 : 0),
                            youtubeTypes.length || (platforms.includes('youtube') ? 1 : 0),
                            platforms.length > 0 ? 1 : 0
                        );

                        if (maxSlices === 0) continue;

                        for (let sliceIndex = 0; sliceIndex < maxSlices; sliceIndex++) {
                            const taskProviders: TaskProvider[] = [];
                            let currentInstagramType: string | undefined;
                            let currentFacebookType: string | undefined;
                            let currentYoutubeType: string | undefined;

                            for (const platform of platforms) {
                                let includePlatform = false;
                                if (platform === 'instagram') {
                                    if (sliceIndex < instagramTypes.length) {
                                        currentInstagramType = instagramTypes[sliceIndex];
                                        includePlatform = true;
                                    } else if (instagramTypes.length === 0 && sliceIndex === 0) includePlatform = true;
                                } else if (platform === 'facebook') {
                                    if (sliceIndex < facebookTypes.length) {
                                        currentFacebookType = facebookTypes[sliceIndex];
                                        includePlatform = true;
                                    } else if (facebookTypes.length === 0 && sliceIndex === 0) includePlatform = true;
                                } else if (platform === 'youtube') {
                                    if (sliceIndex < youtubeTypes.length) {
                                        currentYoutubeType = youtubeTypes[sliceIndex];
                                        includePlatform = true;
                                    } else if (youtubeTypes.length === 0 && sliceIndex === 0) includePlatform = true;
                                } else if (sliceIndex === 0) {
                                    includePlatform = true;
                                }

                                if (includePlatform) {
                                    taskProviders.push({ network: platform });
                                }
                            }

                            if (taskProviders.length === 0) continue;

                            const postInfo: PostInfo = {
                                text,
                                providers: taskProviders,
                                publicationDate: { dateTime: formatDate(scheduledDate), timezone: 'Europe/Madrid' },
                                media: mediaUrls.map((url) => ({ url })),
                                autoPublish: true,
                            };

                            if (currentInstagramType) {
                                const typeMap: { [key: string]: string } = { 'feed': 'POST', 'reel': 'REEL', 'story': 'STORY' };
                                postInfo.instagramData = { type: typeMap[currentInstagramType] || currentInstagramType.toUpperCase() };
                                if (currentInstagramType === 'reel') {
                                    try {
                                        postInfo.instagramData.showReelOnFeed = this.getNodeParameter('showReelOnFeed', i) as boolean;
                                    } catch (error) {
                                        // Parameter is optional - use default value if not provided
                                        postInfo.instagramData.showReelOnFeed = true;
                                    }
                                }
                            }
                            if (currentFacebookType) {
                                const typeMap: { [key: string]: string } = { 'feed': 'POST', 'reel': 'REEL', 'story': 'STORY' };
                                postInfo.facebookData = { type: typeMap[currentFacebookType] || currentFacebookType.toUpperCase() };
                            }
                            if (currentYoutubeType) {
                                const typeMap: { [key: string]: string } = { 'video': 'VIDEO', 'short': 'SHORT' };
                                postInfo.youtubeData = { type: typeMap[currentYoutubeType] || currentYoutubeType.toUpperCase(), title: text.substring(0, 97) + '...' };
                            }

                            const response = await this.helpers.requestWithAuthentication.call(this, 'metricoolApi', {
                                method: 'POST',
                                url: 'https://app.metricool.com/api/v2/scheduler/posts',
                                qs: { blogId, userId: await getUserId() },
                                body: postInfo,
                            });

                            let parsedResponse = response;
                            if (typeof response === 'string') {
                                try {
                                    parsedResponse = JSON.parse(response);
                                } catch (error) {
                                    throw new NodeOperationError(
                                        this.getNode(),
                                        `Failed to parse API response: ${(error as Error).message}`,
                                        { itemIndex: i }
                                    );
                                }
                            }
                            const finalData = parsedResponse.data || parsedResponse;

                            // Convert to array format properly
                            const dataArray = Array.isArray(finalData) ? finalData : [finalData];
                            returnData.push(...this.helpers.constructExecutionMetaData(
                                dataArray.map(item => ({ json: item })),
                                { itemData: { item: i } }
                            ));
                        }
                        continue;
                    } else if (operation === 'getScheduledPosts') {
                        const blogId = validateBlogId(this.getNodeParameter('blogId', i), this.getNode(), i);
                        const startDate = formatDate(validateDate(
                            this.getNodeParameter('startDate', i) as string,
                            'Start Date',
                            this.getNode(),
                            i
                        ));
                        const endDate = formatDate(validateDate(
                            this.getNodeParameter('endDate', i) as string,
                            'End Date',
                            this.getNode(),
                            i
                        ));
                        const timezone = this.getNodeParameter('timezone', i);
                        responseData = await this.helpers.requestWithAuthentication.call(this, 'metricoolApi', {
                            method: 'GET',
                            url: 'https://app.metricool.com/api/v2/scheduler/posts',
                            qs: { start: startDate, end: endDate, timezone, extendedRange: false },
                        });
                    } else if (operation === 'updateScheduledPost') {
                        const blogId = validateBlogId(this.getNodeParameter('blogId', i), this.getNode(), i);
                        const postId = this.getNodeParameter('postId', i);
                        const text = this.getNodeParameter('text', i);
                        responseData = await this.helpers.requestWithAuthentication.call(this, 'metricoolApi', {
                            method: 'PUT',
                            url: `https://app.metricool.com/api/v2/scheduler/posts/${postId}`,
                            qs: { blogId, userId: await getUserId() },
                            body: { text },
                        });
                    } else if (operation === 'deleteScheduledPost') {
                        const blogId = validateBlogId(this.getNodeParameter('blogId', i), this.getNode(), i);
                        const postId = this.getNodeParameter('postId', i);
                        responseData = await this.helpers.requestWithAuthentication.call(this, 'metricoolApi', {
                            method: 'DELETE',
                            url: `https://app.metricool.com/api/v2/scheduler/posts/${postId}`,
                            qs: { blogId, userId: await getUserId() },
                        });
                    } else if (operation === 'getBestTimeToPost') {
                        const blogId = validateBlogId(this.getNodeParameter('blogId', i), this.getNode(), i);
                        const provider = this.getNodeParameter('provider', i);
                        const startDate = formatDate(validateDate(
                            this.getNodeParameter('startDate', i) as string,
                            'Start Date',
                            this.getNode(),
                            i
                        ));
                        const endDate = formatDate(validateDate(
                            this.getNodeParameter('endDate', i) as string,
                            'End Date',
                            this.getNode(),
                            i
                        ));
                        const timezone = this.getNodeParameter('timezone', i);
                        responseData = await this.helpers.requestWithAuthentication.call(this, 'metricoolApi', {
                            method: 'GET',
                            url: `https://app.metricool.com/api/v2/scheduler/besttimes/${provider}`,
                            qs: { blogId, userId: await getUserId(), start: startDate, end: endDate, timezone },
                        });
                    }
                } else if (resource === 'analytics') {
                    if (operation === 'getMetrics') {
                        const blogId = validateBlogId(this.getNodeParameter('blogId', i), this.getNode(), i);
                        const network = this.getNodeParameter('network', i);
                        const startDate = formatDate(validateDate(
                            this.getNodeParameter('startDate', i) as string,
                            'Start Date',
                            this.getNode(),
                            i
                        ));
                        const endDate = formatDate(validateDate(
                            this.getNodeParameter('endDate', i) as string,
                            'End Date',
                            this.getNode(),
                            i
                        ));
                        const timezone = this.getNodeParameter('timezone', i);
                        const metrics = this.getNodeParameter('metrics', i) as string[];
                        responseData = await this.helpers.requestWithAuthentication.call(this, 'metricoolApi', {
                            method: 'GET',
                            url: 'https://app.metricool.com/api/v2/analytics/aggregation',
                            qs: { blogId, userId: await getUserId(), network, metric: metrics.join(','), from: startDate, to: endDate, timezone },
                        });
                    } else if (operation === 'getAnalytics') {
                        const blogId = validateBlogId(this.getNodeParameter('blogId', i), this.getNode(), i);
                        const network = this.getNodeParameter('network', i);
                        const startDate = formatDate(validateDate(
                            this.getNodeParameter('startDate', i) as string,
                            'Start Date',
                            this.getNode(),
                            i
                        ));
                        const endDate = formatDate(validateDate(
                            this.getNodeParameter('endDate', i) as string,
                            'End Date',
                            this.getNode(),
                            i
                        ));
                        const timezone = this.getNodeParameter('timezone', i);
                        const metrics = this.getNodeParameter('metrics', i) as string[];
                        responseData = await this.helpers.requestWithAuthentication.call(this, 'metricoolApi', {
                            method: 'GET',
                            url: 'https://app.metricool.com/api/v2/analytics/timelines',
                            qs: { blogId, userId: await getUserId(), network, metric: metrics.join(','), from: startDate, to: endDate, timezone },
                        });
                    }
                } else if (resource === 'advertising') {
                    const startDate = formatDate(validateDate(
                        this.getNodeParameter('startDate', i) as string,
                        'Start Date',
                        this.getNode(),
                        i
                    ));
                    const endDate = formatDate(validateDate(
                        this.getNodeParameter('endDate', i) as string,
                        'End Date',
                        this.getNode(),
                        i
                    ));
                    const timezone = this.getNodeParameter('timezone', i, 'Europe/Madrid') as string;
                    const providerMap: { [key: string]: string } = { 'getFacebookAdsCampaigns': 'facebook', 'getGoogleAdsCampaigns': 'google', 'getTikTokAdsCampaigns': 'tiktok' };
                    responseData = await this.helpers.requestWithAuthentication.call(this, 'metricoolApi', {
                        method: 'GET',
                        url: 'https://app.metricool.com/api/v2/advertising/campaigns',
                        qs: { from: startDate, to: endDate, timezone, 'providers[]': providerMap[operation] },
                    });
                } else if (resource === 'competitor') {
                    const blogId = validateBlogId(this.getNodeParameter('blogId', i), this.getNode(), i);
                    const network = this.getNodeParameter('network', i);
                    if (operation === 'getNetworkCompetitors') {
                        responseData = await this.helpers.requestWithAuthentication.call(this, 'metricoolApi', {
                            method: 'GET',
                            url: `https://app.metricool.com/api/v2/analytics/competitors/${network}`,
                            qs: { blogId, userId: await getUserId() },
                        });
                    } else if (operation === 'getNetworkCompetitorsPosts') {
                        const startDate = formatDate(validateDate(
                            this.getNodeParameter('startDate', i) as string,
                            'Start Date',
                            this.getNode(),
                            i
                        ));
                        const endDate = formatDate(validateDate(
                            this.getNodeParameter('endDate', i) as string,
                            'End Date',
                            this.getNode(),
                            i
                        ));
                        responseData = await this.helpers.requestWithAuthentication.call(this, 'metricoolApi', {
                            method: 'GET',
                            url: `https://app.metricool.com/api/v2/analytics/competitors/${network}/posts`,
                            qs: { blogId, userId: await getUserId(), from: startDate, to: endDate },
                        });
                    }
                } else {
                    // Logic for social networks (facebook, instagram, etc.)
                    const blogId = validateBlogId(this.getNodeParameter('blogId', i), this.getNode(), i);
                    const startDate = validateDate(
                        this.getNodeParameter('startDate', i) as string,
                        'Start Date',
                        this.getNode(),
                        i
                    );
                    const endDate = validateDate(
                        this.getNodeParameter('endDate', i) as string,
                        'End Date',
                        this.getNode(),
                        i
                    );

                    // Twitter and Twitch use old /stats/ endpoints with YYYYMMDD format
                    // Other networks use new /v2/analytics/ endpoints with ISO format
                    const statsOperations: { [key: string]: string } = {
                        'getTwitchVideos': 'twitch/videos',
                        'getTwitterPosts': 'twitter/posts',
                    };

                    const v2EndpointMap: { [key: string]: string } = {
                        'getFacebookPosts': 'posts/facebook', 'getFacebookReels': 'reels/facebook', 'getFacebookStories': 'stories/facebook',
                        'getInstagramPosts': 'posts/instagram', 'getInstagramReels': 'reels/instagram', 'getInstagramStories': 'stories/instagram',
                        'getTikTokVideos': 'posts/tiktok', 'getLinkedInPosts': 'posts/linkedin',
                        'getPinterestPins': 'posts/pinterest', 'getThreadsPosts': 'posts/threads', 'getBlueskyPosts': 'posts/bluesky',
                    };

                    if (statsOperations[operation]) {
                        // Use old /stats/ API with YYYYMMDD format
                        const formatYYYYMMDD = (date: string) => {
                            const d = new Date(date);
                            const year = d.getFullYear();
                            const month = String(d.getMonth() + 1).padStart(2, '0');
                            const day = String(d.getDate()).padStart(2, '0');
                            return parseInt(`${year}${month}${day}`);
                        };

                        responseData = await this.helpers.requestWithAuthentication.call(this, 'metricoolApi', {
                            method: 'GET',
                            url: `https://app.metricool.com/api/stats/${statsOperations[operation]}`,
                            qs: { blogId, userId: await getUserId(), start: formatYYYYMMDD(startDate), end: formatYYYYMMDD(endDate) },
                        });
                    } else if (v2EndpointMap[operation]) {
                        // Use new /v2/analytics/ API with ISO format
                        responseData = await this.helpers.requestWithAuthentication.call(this, 'metricoolApi', {
                            method: 'GET',
                            url: `https://app.metricool.com/api/v2/analytics/${v2EndpointMap[operation]}`,
                            qs: { blogId, userId: await getUserId(), from: formatDate(startDate), to: formatDate(endDate) },
                        });
                    } else if (operation === 'getYouTubeVideos') {
                        // YouTube doesn't have a direct posts endpoint in v2
                        throw new NodeOperationError(
                            this.getNode(),
                            `YouTube videos endpoint is not available in the Metricool API. Please contact Metricool support for YouTube analytics access.`,
                            { itemIndex: i }
                        );
                    } else {
                        throw new NodeOperationError(
                            this.getNode(),
                            `Unknown operation: ${operation}`,
                            { itemIndex: i }
                        );
                    }
                }

                // Parse JSON string response if needed
                let parsedResponse = responseData;
                if (typeof responseData === 'string') {
                    try {
                        parsedResponse = JSON.parse(responseData);
                    } catch (error) {
                        throw new NodeOperationError(
                            this.getNode(),
                            `Failed to parse API response: ${(error as Error).message}`,
                            { itemIndex: i }
                        );
                    }
                }

                // UNWRAP DATA if it's in a .data property (common in v2)
                let finalResponse = parsedResponse;
                if (parsedResponse && typeof parsedResponse === 'object' && (parsedResponse as any).data !== undefined) {
                    finalResponse = (parsedResponse as any).data;
                }

                // Convert to array format properly - if already array, use directly; if object, wrap it
                const dataArray = Array.isArray(finalResponse) ? finalResponse : [finalResponse];
                returnData.push(...this.helpers.constructExecutionMetaData(
                    dataArray.map(item => ({ json: item })),
                    { itemData: { item: i } }
                ));
            } catch (error) {
                // If error is already a NodeOperationError, handle it directly
                if (error instanceof NodeOperationError) {
                    if (this.continueOnFail()) {
                        returnData.push({
                            json: {
                                error: error.message,
                                description: error.description
                            }
                        });
                    } else {
                        throw error;
                    }
                    continue;
                }

                // Wrap unknown errors in NodeOperationError for better context
                const nodeError = new NodeOperationError(
                    this.getNode(),
                    `Error in Metricool ${resource}/${operation}: ${(error as Error).message}`,
                    {
                        itemIndex: i,
                        description: error instanceof Error ? error.stack : String(error)
                    }
                );

                if (this.continueOnFail()) {
                    returnData.push({
                        json: {
                            error: nodeError.message,
                            resource,
                            operation
                        }
                    });
                } else {
                    throw nodeError;
                }
            }
        }
        return [returnData];
    }
}
