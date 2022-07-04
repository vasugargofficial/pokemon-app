export class ApiClient {
    get = (url: string): Promise<any> => {
        return this.promiseErrorHandler(this.fetchData(url, 'GET'));
    }

    private fetchData = (url: string, method: 'GET' | 'POST', body?: object): Promise<any> => {
        return fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(body) || null
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            throw new Error('API Failed');
        })
    }

    private promiseErrorHandler = (request: Promise<any>): Promise<any> => {
        return new Promise((resolve, reject) =>
            request.then(resolve).catch(error => {
                reject(error);
            })
        );
    }
}