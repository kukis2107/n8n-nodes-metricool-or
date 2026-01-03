import {
    INodeProperties,
} from 'n8n-workflow';

export const brandOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['brand'],
            },
        },
        options: [
            {
                name: 'Get Brands',
                value: 'getBrands',
                description: 'Get a list of brands from your Metricool account',
                action: 'Get a list of brands',
            },
            {
                name: 'Get Brands (Complete)',
                value: 'getBrandsComplete',
                description: 'Get a detailed list of brands from your Metricool account',
                action: 'Get a detailed list of brands',
            },
        ],
        default: 'getBrands',
    },
];

export const brandFields: INodeProperties[] = [];
