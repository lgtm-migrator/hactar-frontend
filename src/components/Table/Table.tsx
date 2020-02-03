import React from "react";
import { Table as RTable, Column, Index, AutoSizer } from "react-virtualized";

interface ITableProps {
    data: Object[];
    columns: any[];
}

export const Table = ({ data, columns }: ITableProps) => {
    const getRowClassName = ({index}: Index) => {
        let className = "table-custom-row";
        if (index < 0) {
            return "";
        } else {
            return index % 2 === 0 ? className : `${className} odd`;
        }
    };

    return (
        <div className="table-wrapper">
            <AutoSizer disableHeight>
                {({width}) => (
                    <RTable
                        headerClassName="table-custom-header"
                        rowClassName={getRowClassName}
                        gridClassName="table-custom-grid"
                        width={width}
                        height={400}
                        headerHeight={80}
                        rowHeight={56}
                        rowCount={data.length}
                        rowGetter={({index}) => data[index]}
                    >
                    {columns.map((column, index) => (
                        <Column
                        key={index}
                        label={column.label || column.key}
                        dataKey={column.key}
                        width={200}
                        cellRenderer={column.renderer}
                        />
                    ))}
                </RTable>
                )}
            </AutoSizer>
        </div>
    );
}

