const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

interface RequestOptions {
  headers?: Record<string, string>;
  data?: Record<string, any>;
  timeout?: number;
  method?: string
}

function queryStringify(data: Record<string, any>): string {
  let str = '';
  for (const key in data) {
    str += `${key}=${data[key]}&`;
  }

  if (str.length > 0) {
    str = `?${str.substr(0, str.length - 1)}`;
  }

  return str;
}

class HTTPTransport {
  get(url: string, options: RequestOptions = { headers: { 'Content-Type': 'application/json' } }): Promise<XMLHttpRequest> {
    let queryStr = '';
    if (options.data) {
      queryStr = queryStringify(options.data);
    }
    return this.request(url + queryStr, { ...options, method: METHODS.GET }, options.timeout);
  }

  put(url: string, options: RequestOptions = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
  }

  post(url: string, options: RequestOptions = {}): Promise<XMLHttpRequest> {
    const formData = new FormData();
    if (options.data) {
      for (const key in options.data) {
        formData.append(key, options.data[key]);
      }
    }

    return this.request(url, { ...options, method: METHODS.POST }, options.timeout, formData);
  }

  delete(url: string, options: RequestOptions = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
  }

  request(url: string, options: RequestOptions, timeout = 1000, formData: FormData | null = null): Promise<XMLHttpRequest> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(options.method!, url);
      for (const key in options.headers) {
        xhr.setRequestHeader(key, options.headers[key]);
      }

      xhr.onerror = function () {
        if (xhr.readyState === 3) {
          // загрузка
        }
        if (xhr.readyState === 4) {
          // запрос завершён
          reject(xhr);
        }
      };

      xhr.onload = function () {
        if (xhr.readyState === 4) {
          resolve(xhr);
        }
      };

      xhr.onloadend = function () {
        if (xhr.readyState === 4) {
          reject(xhr);
        }
      };

      xhr.timeout = timeout;

      if (formData) {
        xhr.send(formData);
      } else {
        xhr.send();
      }
    });
  }
}
