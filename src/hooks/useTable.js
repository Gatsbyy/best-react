/* eslint-disable no-shadow */
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import TinyTable from '@components/TinyTable';

const { statusEnum } = TinyTable;
// useTableHook
// 封装table通用的业务逻辑
function useTable(fetchAction, defaultPayload, pagination) {
  const paginationConfig = useMemo(() => {
    return { ...TinyTable.defaultPagenation, ...pagination };
  }, [pagination]);
  const [current, setCurrent] = useState(paginationConfig.current);
  const [refreshTick, setRefreshTick] = useState(0);
  // 强制刷新tag，当hardRefresh为true时，无论是否处于loading状态，都会调用fetchAction
  const [hardRefresh, setHardRefresh] = useState(false);
  // 缓存初始化配置
  const memoDefaultPayload = useMemo(() => {
    return {
      ...defaultPayload,
      limit: paginationConfig.pageSize,
      offset: paginationConfig.pageSize * (paginationConfig.current - 1)
    };
  }, [defaultPayload, paginationConfig]);

  const [payload, setPayload] = useState({
    ...defaultPayload,
    limit: paginationConfig.pageSize,
    offset: paginationConfig.pageSize * (paginationConfig.current - 1)
  });

  // 类似setState 浅拷贝
  const mergePayload = useCallback((newState) => {
    setPayload({ ...payload, ...newState });
  }, [payload]);
  // 更新参数，不触发再次请求（即 只对后面的请求 才生效）
  const justUpateParams = useCallback((newPayload) => {
    return Object.assign(payload, newPayload);
  }, [payload]);
  const [total, setTotal] = useState(-1);
  const [status, setStatus] = useState(statusEnum.INITIAL);

  // 改变页码
  const onPageChange = useCallback((current) => {
    mergePayload({
      offset: payload.limit * (current - 1)
    });
  }, [mergePayload, payload.limit]);
  // 每页展示的条数发生切换
  const onPageSizeChange = useCallback((pageSize) => {
    if (pageSize !== payload.limit) {
      setPayload((p) => {
        return {
          ...p, ...{ offset: 0, limit: pageSize }
        };
      });
    }
  }, [payload]);
  // 执行请求
  const evaluateFetch = useCallback((overridePayload) => {
    if (status === statusEnum.LOADING && !hardRefresh) return () => {};
    setStatus(statusEnum.LOADING);
    const p = fetchAction(overridePayload || payload);
    p.then(({ total }) => {
      setStatus(total === 0 ? statusEnum.EMPTY : statusEnum.SHOWDATA);
      setTotal(total);
    }).catch((err) => {
      if (err.message !== 'FLOW_CANCELLED') {
        setStatus(statusEnum.ERROR);
      }
    });
    setHardRefresh(false);
    return p;
  }, [hardRefresh, payload, fetchAction, refreshTick]); // status的变化不影响函数的逻辑 所以忽略掉就行

  /**
   * @description 刷新操作
   * @param {boolean} keepPayload 是否保持payload
   */
  const refresh = useCallback((keepPayload = false, isHardRefresh = false) => {
    // eslint-disable-next-line no-param-reassign
    setRefreshTick((prevState) => { return ++prevState; });
    setHardRefresh(isHardRefresh);
    !keepPayload && setPayload(memoDefaultPayload);
  }, [memoDefaultPayload]);
  const promiseRef = useRef(true);
  // 监听payload的变化 执行请求
  useEffect(() => {
    const p = evaluateFetch();
    if (!promiseRef.current) {
      promiseRef.current = p;
    }
  }, [evaluateFetch]); // status的变化 不应该触发请求的逻辑 所以忽略掉就行
  useEffect(() => {
    if (promiseRef.current && promiseRef.current?.cancel) promiseRef.current?.cancel();
  }, [promiseRef]);
  useEffect(() => {
    const page = payload.offset / payload.limit + 1;
    setCurrent(page);
  }, [payload.offset, payload.limit]);
  return {
    status,
    payload,
    setPayload,
    mergePayload,
    justUpateParams,
    pagination: {
      total,
      current,
      pageSize: payload.limit,
      onPageChange,
      onChange: onPageSizeChange,
    },
    refresh
  };
}
export default useTable;
