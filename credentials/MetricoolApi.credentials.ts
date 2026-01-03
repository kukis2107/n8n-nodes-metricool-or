import {
    ICredentialType,
    INodeProperties,
} from 'n8n-workflow';

export class MetricoolApi implements ICredentialType {
    name = 'metricoolApi';
    displayName = 'Metricool API';
    documentationUrl = 'https://metricool.com/api-docs/';
    properties: INodeProperties[] = [
        {
            displayName: 'User Token',
            name: 'userToken',
            type: 'string',
            default: '',
            required: true,
            typeOptions: {
                password: true,
            },
            description: 'The Metricool API user token found in your account settings under API section',
        },
        {
            displayName: 'User ID',
            name: 'userId',
            type: 'string',
            default: '',
            required: true,
            description: 'The Metricool API user ID found in your account settings under API section',
        },
    ];
    authenticate = {
        type: 'generic' as const,
        properties: {
            headers: {
                'X-Mc-Auth': '={{$credentials.userToken}}',
            },
            // Query string parameters removed for security
            // Credentials should only be sent in headers to prevent exposure in logs
        },
    };
    test = {
        request: {
            baseURL: 'https://app.metricool.com/api',
            url: '/admin/simpleProfiles',
            method: 'GET' as const,
        },
        rules: [
            {
                type: 'responseCode' as const,
                properties: {
                    value: 200,
                    message: 'Metricool API test failed',
                },
            },
        ],
    };
}
