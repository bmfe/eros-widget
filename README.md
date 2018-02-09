eros widget is the two encapsulation for eros module.

## How to use
1.install eros-widget in eros init project.
```
$ npm i eros-widget -S
```
2.init widget in appboard js bundle.(default: `config/index.js`)
```
import widget from 'eros-Widget'

const options = {}

new widget(options)
```

## Config options
```js
const options = {
    router: {
        /**
         * 路由配置表
         */
        routes: {}
    },
    ajax: {
        baseUrl: 'http://app.weex-eros.com:52077',
        /**
         * 接口别名
         */
        apis: {},
        // 接口超时时间
        timeout: 30000,

        /**
         * 请求发送统一拦截器 （可选）
         * options 你请求传入的所有参数和配置
         * next
         */
        requestHandler (options, next) {
            console.log('request-opts', options)
            next()
        },
        /**
         * 请求返回统一拦截器 （可选）
         * options 你请求传入的所有参数和配置
         * resData 服务器端返回的所有数据
         * resolve 请求成功请resolve你得结果，这样请求的.then中的成功回调就能拿到你resolve的数据
         * reject 请求成功请resolve你得结果，这样请求的.then中的失败回调就能拿到你reject的数据
         */
        responseHandler (options, resData, resolve, reject) {
            const { status, errorMsg, data } = resData
            if (status !== 200) {
                console.log(`invoke error status: ${status}`)
                console.log(`invoke error message: ${errorMsg}`)
                reject(resData)
            } else {
                // 自定义请求逻辑
                resolve(data)
            }
        }
    }
```

`router.routes`: config $router.open path alias
```js
routes: {
	'demo': {
        title: 'weex-eros demo',
        url: '/pages/demo/index.js'
    }
}
```

#### `ajax.baseUrl`: config you request baseUrl
#### `ajax.apis`: config you request path alias
```js
apis: {
	'COMMON.getInfo': '/test/info/'
}
```
 also you can config dynamic path.
```
apis: {
	'COMMON.getInfo': '/test/info/{plaform}/{id}'
}
```
and we deliver them in $get/$post params option.
```js
this.$get({
	name: 'COMMON.getInfo',
	params: {
		platform: 'app',
		id: 3
	},
	data: {
		name: 'eros'
	}
})
```
finally our request url become :
```
ajax.baseUrl + /test/info/app/3?name=eros
```

#### `ajax.timeout`: request timeout time.(ms)
#### `ajax.requestHandler`: request Interceptor
#### `ajax.responseHandler`: response Interceptor

## How to develop

1.init eros project.

```
$ eros init
```

2.cd your project and enter src/js

```
$ cd eros-demo/src/js
```

3.clone eros-widget.git.
```
git clone https://github.com/bmfe/eros-widget.git eros-widget
```

4.add config `eros.dev.js` alias option.
```
	"ErosWidget": "js/eros-widget"
```

5.init widget in appboard js bundle.(default: `config/index.js`)
```
import ErosWidget from 'ErosWidget'

const options = {}

new ErosWidget(options)
```

> welcome your pull request! eros loves you.
