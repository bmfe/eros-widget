# 1.0.1
生命周期，自定义事件均做调整，如果不更改，请不要升级到 `1.0.1`。
* `bmRouter` 变更为 `eros`
* 添加 `pushMessage`，可在页面中监听推送
* 添加 `appActive`，可在页面中监听 app 切换到后台事件
* 添加 `appDeactive`，可在页面中监听 app 切换至前台事件
* `viewWillAppear` 变更为 `beforeAppear`，beforeBackAppear，通过打开类型来做区分
* `viewDidAppear` 变更为 `appeared`，`backAppeared`，通过打开类型来做区分
* `viewWillDisappear` 变更为 `beforeDisappear`
* `viewDidDisappear` 变更为 `disappeared`

# 1.0.0
* 从模板中抽离 widget 完成