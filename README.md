# n8n-nodes-metricool

This is an n8n community node. It lets you use Metricool in your n8n workflows.

[Metricool](https://metricool.com/) is a social media management platform that allows you to analyze, manage, and schedule content across multiple social networks.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Resources](#resources)  

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

### Brand Operations
- Get Brands - Get a list of brands from your Metricool account
- Get Brands (Complete) - Get a detailed list of brands with all available information

### Social Media Content Operations
- Get Instagram Posts, Reels, and Stories
- Get Facebook Posts, Reels, and Stories
- Get TikTok Videos
- Get LinkedIn Posts
- Get Pinterest Pins
- Get YouTube Videos
- Get Twitch Videos
- Get X (Twitter) Posts
- Get Bluesky Posts
- Get Threads Posts

### Analytics Operations
- Get Metrics - Get available metrics for a specific network
- Get Analytics - Get analytics data for a specific network and metrics

### Post Management Operations
- Schedule Post - Schedule a post to multiple social networks
- Get Scheduled Posts - Get a list of scheduled posts
- Update Scheduled Post - Update an existing scheduled post

### Competitor Analysis Operations
- Get Network Competitors - Get a list of competitors for supported networks
- Get Network Competitors Posts - Get and analyze posts from competitors

### Optimal Timing Operations
- Get Best Time to Post - Get the best time to post for a specific network

### Advertising Operations
- Get Facebook Ads Campaigns
- Get Google Ads Campaigns
- Get TikTok Ads Campaigns

## Credentials

To use this node, you need to have a Metricool account with API access (Advanced Tier) and obtain your API credentials:

1. Sign up for a Metricool account at [metricool.com](https://metricool.com/)
2. Upgrade to the Advanced Tier to get API access
3. Get your User Token and User ID from the API section in your account settings

## Compatibility

This node has been tested with n8n version 1.0.0 and later.

## Advanced Features

### Multi-Platform Scheduling with Vertical Slicing

This node supports **advanced multi-platform, multi-format scheduling** using a "Vertical Slicing" algorithm. This allows you to schedule different content types across multiple platforms in a single workflow execution.

**How it works:**
- Select multiple post types for Instagram (Feed, Reel, Story)
- Select multiple post types for Facebook (Feed, Reel, Story)
- Select multiple post types for YouTube (Video, Short)
- The node automatically groups the 1st selection of each platform together, 2nd selections together, etc.

**Example:**
If you select:
- Instagram: Feed, Reel, Story
- Facebook: Feed, Reel
- YouTube: Video

The node will create **3 separate scheduled posts**:
1. Instagram Feed + Facebook Feed + YouTube Video
2. Instagram Reel + Facebook Reel
3. Instagram Story

This optimizes API calls while ensuring each content type is scheduled correctly.

### Instagram Reel Options

When scheduling Instagram Reels, you have the option to **Show Reel on Feed**, which makes the Reel visible in your main Instagram grid in addition to the Reels tab.

## Usage Examples

### Example 1: Simple Cross-Platform Post

Schedule a single post to Instagram, Facebook, and YouTube:

```
Blog ID: 1234567
Post Text: "Check out our new product! 🚀"
Platforms: Instagram, Facebook, YouTube
Instagram Post Type: Feed
Facebook Post Type: Feed
YouTube Post Type: Video
Scheduled Date: 2025-01-15T10:00:00
Media URLs: ["https://example.com/image.jpg"]
```

### Example 2: Multi-Format Instagram Campaign

Schedule the same content as Feed, Reel, and Story on Instagram:

```
Blog ID: 1234567
Post Text: "New year, new goals! 💪"
Platforms: Instagram
Instagram Post Type: Feed, Reel, Story
Scheduled Date: 2025-01-01T09:00:00
Media URLs: ["https://example.com/video.mp4"]
Show Reel on Feed: true
```

This creates 3 separate Instagram posts with the same content but different formats.

### Example 3: Advanced Multi-Platform Strategy

Schedule different formats across Instagram, Facebook, and YouTube:

```
Blog ID: 1234567
Post Text: "Behind the scenes content 🎬"
Platforms: Instagram, Facebook, YouTube
Instagram Post Type: Reel, Story
Facebook Post Type: Reel, Story
YouTube Post Type: Short
Scheduled Date: 2025-01-20T14:00:00
Media URLs: ["https://example.com/bts-video.mp4"]
```

This creates 2 posts:
- Post 1: Instagram Reel + Facebook Reel + YouTube Short
- Post 2: Instagram Story + Facebook Story

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [Metricool API documentation](https://help.metricool.com/es/article/acceso-a-la-api-exporta-datos-de-metricool-a-otras-herramientas-y-automatiza-tareas-29gqn7/)
