const queryString = params => '?' + Object.keys(params).map(key => `${key}=${encodeURIComponent(params[key])}`).join('&');

const request = (baseUrl, partialUrl, query, body, method = 'GET') => new Promise((success, fail) => uni.request({
    url: baseUrl + partialUrl + (query ? queryString(query) : ''),
    method,
    ...['POST', 'PUT'].includes(method) ? { data: body } : {},
    success, fail
}));

export class API {
    constructor(baseUrl, before, after) {
        // 基本请求路径的属性。
        this.baseUrl = baseUrl;
        
        // 请求拦截器属性。
        this.before = before;
        
        // 相应拦截器属性。
        this.after = after;
    }
    
    // 基础路径 + 两种拦截器的中间件（跳板）函数。
    _request(partialUrl, query, body, method){
        // 在请求之前执行请求拦截器。
        this.before && this.before();
        
        // 暂存 Promise 对象。
        const promise = request(this.baseUrl, partialUrl, query, body, method)
        
        // 请求完成后的相应拦截器执行。
        promise.then(({data: { meta: { status }}}) => status !== 200 && uni.showToast({
            title: '请求失败！', icon: 'none'
        }) ).finally(() => this.after && this.after());
        
        return promise;
    }
    
    get(partialUrl, query){
        return this._request(partialUrl, query);
    }
    
    post(partialUrl, body, query){
        return this._request(partialUrl, query, body, 'POST');
    }
}

