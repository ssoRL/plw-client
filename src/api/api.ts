export type StartSessionParameters = {
    username: string

    password: string
};
export type FeedItem = {
    id: number

    name: string

    lastUpdate: string
};
export type MessagePost = {
    userId: number

    threadId: number

    content: string
};
export type Thread = {
    id: number

    name: string

    lastUpdate: string

    messages: Array < Message >
};
export type Message = {
    user: number

    thread: number

    content: string

    time: string
};
export type ThreadPost = {
    name: string
};

/**
 * 
 * @class API
 * @param {(string)} [domainOrOptions] - The project domain.
 */
export class API {
    private static instance: API | null = null;

    public domain: string | null = null;
    public token: string | null = null;
    // Handles errors codes (400<= status < 600)
    public errorHandler: (response: Response) => Promise<Response>;
    // Deals with any other exceptions in a generic way
    public catchHandler: (reason: any) => Promise<Response>;

    static Instance() {
        if(API.instance == null) {
            API.instance = new API();
        }
        
        return API.instance;
    }

    /**
     * 
     * @method
     * @name API#ApiAuthPost
     * @param {} data - 
     */
    ApiAuthPost(body: StartSessionParameters,
        headers: any = {}
    ): Promise < string > {
        // Generate the path
        let path = `${this.domain}/api/Auth`;

        let queryParameters = new URLSearchParams();
        path += '?' + queryParameters.toString();

        return this.post(path, JSON.stringify(body))
            .then(result => result.json());
    }

    /**
     * 
     * @method
     * @name API#ApiFeedsGet
     */
    ApiFeedsGet(parameters: {},
        headers: any = {}
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
     * @name API#ApiMessagesPost
     * @param {} data - 
     */
    ApiMessagesPost(body: MessagePost,
        headers: any = {}
    ): Promise < number > {
        // Generate the path
        let path = `${this.domain}/api/Messages`;

        let queryParameters = new URLSearchParams();
        path += '?' + queryParameters.toString();

        return this.post(path, JSON.stringify(body))
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
        headers: any = {}
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
     * @param {} data - 
     */
    ApiThreadsPost(body: ThreadPost,
        headers: any = {}
    ): Promise < number > {
        // Generate the path
        let path = `${this.domain}/api/Threads`;

        let queryParameters = new URLSearchParams();
        path += '?' + queryParameters.toString();

        return this.post(path, JSON.stringify(body))
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
        }).then(response => {
            if(response.status >= 400 && response.status < 600) {
                return this.errorHandler(response)
            }
            
            return response;
        }).catch(reason =>
            this.catchHandler(reason)
        );
    }

    private post(
        url: string,
        stringifiedBody: string,
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
            body: stringifiedBody
        })
          
    }
}