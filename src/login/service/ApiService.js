
export function call(api, method, request) {
  let headers = new Headers({
    "Content-Type": "application/json",
  });

  // 로컬 스토리지에서 ACCESS TOKEN 가져오기
  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  if (accessToken && accessToken !== null) {
    headers.append("Authorization", "Bearer " + accessToken);
  }

  // 쿼리 문자열을 생성하는 함수
  const buildQueryString = (params) => {
    return Object.keys(params)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
      .join('&');
  };

  let options = {
    headers: headers,
    url: window.env.REACT_APP_URL+api,
    method: method,
    // credentials: 'include',
    body: method !== 'GET' ? JSON.stringify(request) : null,
  };

  // GET 요청인 경우 쿼리 문자열을 URL에 추가
  if (method === 'GET' && request) {
    options.url += '?' + buildQueryString(request);
  }

  //비동기통신: axios, ajax, fetch, promise...
  return fetch(options.url, options)
  .then((response) => {
    const contentType = response.headers.get("content-type");
    
    // 응답이 JSON 형식인지 확인
    if (contentType && contentType.indexOf("application/json") !== -1) {
      return response.json().then((json) => {
        console.log(json);
        if (!response.ok) {
          return Promise.reject(json);
        }
        return json;
      });
    } else if (contentType && contentType.indexOf("text/plain") !== -1) {
      // 응답이 텍스트 형식인 경우 처리
      return response.text().then((text) => {
        console.log(text);
        if (!response.ok) {
          return Promise.reject(text);
        }
        return text;
      });
    } else {
      // 예상치 못한 Content-Type의 경우
      return Promise.reject("Unexpected content type: " + contentType);
    }
  })
  .catch((error) => {
    console.log(error);
    if (error.status === undefined || error.status === 403) {
     // window.location.href = "/login"; // redirect
    }
    return Promise.reject(error);
  });
}




