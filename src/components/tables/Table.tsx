import { type ReactNode, type ThHTMLAttributes, type TdHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface TableProps {
    children: ReactNode
    className?: string
}

function Table({ children, className }: TableProps) {
    return (
        <div className="w-full overflow-x-auto rounded-[16px] border border-border">
            <table className={cn('w-full border-collapse', className)}>{children}</table>
        </div>
    )
}

Table.displayName = 'Table'

interface TableHeaderProps {
    children: ReactNode
    className?: string
}

function TableHeader({ children, className }: TableHeaderProps) {
    return <thead className={cn('bg-gray-50', className)}>{children}</thead>
}

TableHeader.displayName = 'Table.Header'

interface TableBodyProps {
    children: ReactNode
    className?: string
}

function TableBody({ children, className }: TableBodyProps) {
    return <tbody className={cn('divide-y divide-border', className)}>{children}</tbody>
}

TableBody.displayName = 'Table.Body'

interface TableRowProps {
    children: ReactNode
    className?: string
}

function TableRow({ children, className }: TableRowProps) {
    return (
        <tr className={cn('transition-colors duration-150 hover:bg-gray-50', className)}>
            {children}
        </tr>
    )
}

TableRow.displayName = 'Table.Row'

interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {
    children?: ReactNode
}

function TableHead({ className, children, ...props }: TableHeadProps) {
    return (
        <th
            className={cn(
                'px-4 py-3 text-left text-sm font-medium text-text-secondary',
                className,
            )}
            {...props}
        >
            {children}
        </th>
    )
}

TableHead.displayName = 'Table.Head'

interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
    children?: ReactNode
}

function TableCell({ className, children, ...props }: TableCellProps) {
    return (
        <td className={cn('px-4 py-3 text-sm text-text-primary', className)} {...props}>
            {children}
        </td>
    )
}

TableCell.displayName = 'Table.Cell'

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell }
export default Table
