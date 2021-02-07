## 最佳实践

### 目录结构
0. components -- 公共组件
1. containers -- 业务组件
2. locale -- 多语言目录
3. fonts -- 字体
5. utils -- 公共方法，每个公共方法都要做jest单元测试
6. hooks -- 自定义hooks
7. less -- 全局样式统一文件、公共类样式定义等
8. mock -- 本地mock数据
9. stores -- 数据流容器

### 工程化
0. webpack - base dev js less babel happypack等
1. eslint - babel-eslint eslint-loader eslintrc webpack
2. webpack alias别名跳转配置 - jsconfig.json
3. 添加router路由 - router.js
4. 添加prototype
5. 局部刷新 - react-refresh-webpack-plugin和hot:true
6. 动态路由 - react-router
7. 组件按需加载 - react-loadable
8. axios
9. mobx - https://mobx.js.org/react-integration.html mobx 最佳实践
  0. 抛弃inject，使用mobx-react-lite的observer
  1. 数据绑定使用makeAutoObservable自动绑定所有变量，也可有其他选择
  2. 根据es6，类中的实例属性可以写在constructor外的顶部
  3. 计算值全部以computed开头
  4. store中的异步请求方案：
    (0). async/await
    (1). generator + flow(该方案中promise可取消，实现原理为generator + promise， 可查看源码)
10. 单元测试 - jest




### 组件相关
0. 所有组件使用hooks写法，要遵循组件的单一功能原则
1. 组件命名 有意义，名字可以稍长，具有可读性
2. 组件props验证 （IDE 文档化）
3. 组件结构一致（区分通用组件、某个业务下组件）
5. 方法命名 动词开头
6. 拒绝使用dom API来获取DOM节点，使用useRef
8. 组件单文件行数 不超过600行， 每行120个字符
9. 组件文件 使用.jsx 结尾
10. 所有组件采用FC

### react router
1. 函数式组件中，使用`history params`等 使用hooks的方式
    ```jsx
    ...
    const history = useHistory();
    const params = useParams();
    ...
    ```
2. class类的组件中使用`history params`等 使用`withRouter`

### hooks相关
1. `useEffect useCallback useMemo`等API的第二个参数对比 `react`内部使用的是`Object.is`
2. `eslint`提示的缺少的`deps`不一定都是必选的，还是要准确的理解API


### 杂项
1. 多语言`key` 命名规则：${project}.${module}.${field}, 
其中module 建议使用当前组件名，方便查询，如果是通用文案，可以固定为common, 如：
skyEye.common.loadingTip: '加载中'
