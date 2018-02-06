export type Page = {
    'name': string

    'notifications': number

    'date': string

    'color': string
};

// type Logger = {
//     log: (line: string) => any
// };

/**
 * 
 * @class Test
 * @param {(string)} [domainOrOptions] - The project domain.
 */
export class Test {

    private domain: string = '';
    private errorHandlers: (() => {})[] = [];

    constructor(domain ?: string) {
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
                headers: {[name: string]: string},
    ): Promise < Array < Page >> {
        // Generate the path
        let path = `${this.domain}/api/Pages`;

        let queryParameters = new URLSearchParams();
        path += '?' + queryParameters.toString();

        return this.request('GET', path)
            .then(result => result.json());
    }

    private request(
        method: string,
        url: string,
    ) {
        // Create the Headers
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        // for (const param in extraHeaders) {
        //     headers.append(param, extraHeaders[param]);
        // }

        return fetch(url, {
            method: method,
            headers: headers,
            mode: 'cors'
        });
    }
    /**
     * 
     * @method
     * @name Test#ApiPagesPost
     * @param {} name - 
     * @param {} date - 
     * @param {} color - 
     */
    // ApiPagesPost(parameters: {
    //         name: string,
    //         date: string,
    //         color: string,
    //     },
    //              headers: any,
    // ): Promise < Page > {
    //     // Generate the path
    //     let path = `${this.domain}/api/Pages`;

    //     let body: {
    //         [param: string]: string
    //     } = {
    //         name: parameters.name,
    //         date: parameters.date,
    //         color: parameters.color,
    //     };

    //     let queryParameters = new URLSearchParams();
    //     path += '?' + queryParameters.toString();

    //     return this.request('POST', path, body, {})
    //         .then(result => result.json < Page > ());
    // }
    // /**
    //  * 
    //  * @method
    //  * @name Test#ApiPagesByIdGet
    //  * @param {integer} id - 
    //  */
    // ApiPagesByIdGet(parameters: {
    //         id: number,
    //     },
    //                 headers: any,
    // ): Promise < Page > {
    //     // Generate the path
    //     let path = `${this.domain}/api/Pages/${parameters.id}`;

    //     let body: {
    //         [param: string]: string
    //     } = {};

    //     let queryParameters = new URLSearchParams();
    //     path += '?' + queryParameters.toString();

    //     return this.request('GET', path, body, {})
    //         .then(result => result.json < Page > ());
    // }
}