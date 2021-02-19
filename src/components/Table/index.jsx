/* eslint-disable no-unused-vars */
import React, { useMemo } from 'react'
import { useTable } from 'react-table'
import dayjs from 'dayjs'
import classNames from 'classnames'
import style from './index.module.less'

const tableWidth = 1200;

export default function Table(props) {
  const { className, data } = props;
  const columns = useMemo(() => {
    return [{
      accessor: 'address',
      Header: 'address',
      cellWidth: 500
    },
    {
      accessor: 'tag',
      Header: () => {
        return <>tag info</>
      },
      cellWidth: 500
    },
    {
      accessor: 'createTime',
      Header: () => {
        return '创建时间';
      },
      cellWidth: 200,
      Cell: ({ value }) => {
        return <>{dayjs(value).format('YYYY-MM-DD')}</>
      }
    }];
  }, [])
  const instance = useTable({
    data: data?.hits || [],
    columns: columns
  });

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    rows,
  } = instance;

  return (
    <div role="table" {...getTableProps()} className={classNames(style.table, className)} style={{ width: `${tableWidth}px` }}>
      <div role="header">
        {
          headerGroups.map((head, i) => {
            return (
              <div role="row" className={classNames('flex')} key={i} {...head.getHeaderGroupProps()}>
                {
                  head.headers.map((column, ix) => {
                    const styleSet = {};
                    column.cellWidth && (styleSet.width = `${column.cellWidth / tableWidth * 100}%`);
                    return (
                      <div
                        {...column.getHeaderProps()}
                        key={ix}
                        style={styleSet}
                      >
                        {column.render('Header')}
                      </div>
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
      <div role="body" {...getTableBodyProps()}>
        {
          rows.map((row, i) => {
            prepareRow(row);
            return (
              <div role="row" key={i} {...row.getRowProps()} className={classNames('flex')}>
                {row.cells.map(cell => {
                  const styleSet = {};
                  cell.column.cellWidth && (styleSet.width = `${cell.column.cellWidth / tableWidth * 100}%`);
                  return <div {...cell.getCellProps()} key={cell} style={styleSet}>{cell.render('Cell')}</div>
                })}
              </div>
            )
          })
        }
      </div>
    </div>
  )
}