// components/ui/table.tsx
import * as React from "react";

export function Table({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="w-full overflow-auto">
      <table className="w-full caption-bottom text-sm" {...props}>
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className="bg-slate-100" {...props}>{children}</thead>;
}

export function TableBody({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className="bg-white" {...props}>{children}</tbody>;
}

export function TableRow({ children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return <tr className="border-b hover:bg-slate-50" {...props}>{children}</tr>;
}

export function TableHead({ children, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return <th className="px-4 py-2 text-left font-semibold text-slate-700" {...props}>{children}</th>;
}

export function TableCell({ children, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className="px-4 py-2 align-middle" {...props}>{children}</td>;
}
