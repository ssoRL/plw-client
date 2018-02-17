export type FeedItem = {
    name: string

    notifications: number
};

/**
 * 
 * @class Test
 * @param {(string)} [domainOrOptions] - The project domain.
 */
export default class Test {

    private domain: string = '';
    private errorHandlers: (() => {})[] = [];

    constructor(domain ? : string) {
        if (domain) {
            this.domain = domain;
        }
    }

    getDomain() {
        return this.domain;
    }

    addErrorHandler(handler: (() => {})) {
        this.errorHandlers.push(handler);
    }

    /**
     * 
     * @method
     * @name Test#ApiPagesGet
     */
    ApiPagesGet(parameters: {},
        headers: any,
    ): Promise < Array < FeedItem >> {
        // Generate the path
        let path = `${this.domain}/api/Pages`;

        let queryParameters = new URLSearchParams();
        path += '?' + queryParameters.toString();

        return this.get(path)
            .then(result => result.json());
    }

    private get(
        url: string,
        extraHeaders: {
            [param: string]: string
        } = {}
    ) {
        // Create the Headers
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        for (const param in extraHeaders) {
            headers.append(param, extraHeaders[param]);
        }

        return fetch(url, {
            method: 'get',
            headers: headers
        })
    }

    private post(
        url: string,
        body: {
            [param: string]: string
        },
        extraHeaders: {
            [param: string]: string
        } = {}
    ) {
        // Create the Headers
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        for (const param in extraHeaders) {
            headers.append(param, extraHeaders[param]);
        }

        return fetch(url, {
            method: 'post',
            headers: headers,
            body: JSON.stringify(body)
        })
    }
}