## 最佳实践 beta

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
