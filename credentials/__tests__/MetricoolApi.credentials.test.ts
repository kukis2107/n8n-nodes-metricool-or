import { MetricoolApi } from '../MetricoolApi.credentials';

describe('MetricoolApi Credentials', () => {
    let credentials: MetricoolApi;

    beforeEach(() => {
        credentials = new MetricoolApi();
    });

    it('should have correct credential name', () => {
        expect(credentials.name).toBe('metricoolApi');
    });

    it('should have correct display name', () => {
        expect(credentials.displayName).toBe('Metricool API');
    });

    it('should not expose userToken in query string', () => {
        const auth = credentials.authenticate;
        // userToken must NEVER be in query string (security risk)
        // userId is safe to be in query string (it's not the secret)
        expect((auth.properties as any).qs?.userToken).toBeUndefined();
    });

    it('should include userToken in headers only', () => {
        const auth = credentials.authenticate;
        expect(auth.properties.headers).toBeDefined();
        expect(auth.properties.headers['X-Mc-Auth']).toBeDefined();
    });

    it('should include userId in query string', () => {
        const auth = credentials.authenticate;
        expect(auth.properties.qs).toBeDefined();
        expect(auth.properties.qs.userId).toBeDefined();
    });

    it('should have valid credential test endpoint', () => {
        expect(credentials.test).toBeDefined();
        expect(credentials.test.request).toBeDefined();
        expect(credentials.test.request.url).toBe('/admin/simpleProfiles');
        expect(credentials.test.request.method).toBe('GET');
    });

    it('should require userToken property', () => {
        const userTokenProp = credentials.properties.find(p => p.name === 'userToken');
        expect(userTokenProp).toBeDefined();
        expect(userTokenProp?.required).toBe(true);
    });

    it('should require userId property', () => {
        const userIdProp = credentials.properties.find(p => p.name === 'userId');
        expect(userIdProp).toBeDefined();
        expect(userIdProp?.required).toBe(true);
    });
});
