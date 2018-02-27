export type FeedItem = {
    name: string

    notifications: number
};
export type Thread = {
    name: string

    messages: Array < Message >
        | Message

};
export type Message = {
    userId: number

    content: string

    postTime: string
};

/**
 * 
 * @class API
 * @param {(string)} [domainOrOptions] - The project domain.
 */
export class API {

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
     * @name API#ApiFeedsGet
     */
    ApiFeedsGet(parameters: {},
        headers: any,
    ): Promise < Array < FeedItem >> {
        // Generate the path
        let path = `${this.domain}/api/Feeds`;

        let queryParameters = new URLSearchParams();
        path += '?' + queryParameters.toString();

        return this.get(path)
            .then(result => result.json());
    }
    /**
     * 
     * @method
     * @name API#ApiThreadsByIdGet
     * @param {integer} id - 
     */
    ApiThreadsByIdGet(parameters: {
            id: number,
        },
        headers: any,
    ): Promise < Thread > {
        // Generate the path
        let path = `${this.domain}/api/Threads/${parameters.id}`;

        let queryParameters = new URLSearchParams();
        path += '?' + queryParameters.toString();

        return this.get(path)
            .then(result => result.json());
    }
    /**
     * 
     * @method
     * @name API#ApiThreadsPost
     * @param {} name - 
     */
    ApiThreadsPost(parameters: {
            name: string,
        },
        headers: any,
    ): Promise < number > {
        // Generate the path
        let path = `${this.domain}/api/Threads`;

        let body: {
            [param: string]: string
        } = {
            name: parameters.name,
        };

        let queryParameters = new URLSearchParams();
        path += '?' + queryParameters.toString();

        return this.post(path, body)
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