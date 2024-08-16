import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCallback, useEffect, useRef, useState } from "react";

export default function SchedulerView() {
  const [isDragging, setDragging] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const posRef = useRef(0);
  const tableRef = useRef<HTMLTableElement>(null);
  const fixedCellRef = useRef<HTMLTableCellElement>(null);

  const appointments = [
    {
      date: "2024-08-12",
      startTime: "09:00",
      endTime: "10:00",
      title: "Meeting with John Doe",
      description: "Discuss new project proposal",
    },
    {
      date: "2024-08-14",
      startTime: "14:00",
      endTime: "15:00",
      title: "Client call - Acme Inc.",
      description: "Follow up on ongoing project",
    },
    {
      date: "2024-08-15",
      startTime: "11:30",
      endTime: "12:30",
      title: "Lunch break",
      description: "",
    },
    {
      date: "2024-08-12",
      startTime: "09:00",
      endTime: "10:00",
      title: "Meeting with John Doe",
      description: "Discuss new project proposal",
    },
    {
      date: "2024-08-14",
      startTime: "14:00",
      endTime: "15:00",
      title: "Client call - Acme Inc.",
      description: "Follow up on ongoing project",
    },
    {
      date: "2024-08-15",
      startTime: "11:30",
      endTime: "12:30",
      title: "Lunch break",
      description: "",
    },
    {
      date: "2024-08-12",
      startTime: "09:00",
      endTime: "10:00",
      title: "Meeting with John Doe",
      description: "Discuss new project proposal",
    },
    {
      date: "2024-08-14",
      startTime: "14:00",
      endTime: "15:00",
      title: "Client call - Acme Inc.",
      description: "Follow up on ongoing project",
    },
    {
      date: "2024-08-15",
      startTime: "11:30",
      endTime: "12:30",
      title: "Lunch break",
      description: "",
    },
  ];

  const onMouseMove = useCallback(
    (e) => {
      if (!isDragging || !tableRef.current || !fixedCellRef.current) return;
      e.preventDefault();

      const rect = tableRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const delta = offsetX - posRef.current;

      requestAnimationFrame(() => {
        if (tableRef.current && fixedCellRef.current) {
          tableRef.current.scrollLeft -= delta;

          if (fixedCellRef.current.offsetWidth <= tableRef.current.scrollLeft) {
            setIsFixed(true);
          } else {
            setIsFixed(false);
          }
        }
      });
      posRef.current = offsetX;
    },
    [isDragging]
  );

  const onMouseDown = (e) => {
    if (!tableRef.current) return;
    e.preventDefault();

    const rect = tableRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;

    posRef.current = offsetX;
    setDragging(true);
  };

  const onMouseUp = () => {
    setDragging(false);
    if (tableRef.current) {
      tableRef.current.style.cursor = "grab";
    }
  };

  const onMouseLeave = () => {
    if (tableRef.current) {
      setDragging(false);
      tableRef.current.style.cursor = "";
    }
  };

  const onMouseEnter = () => {
    if (tableRef.current) {
      tableRef.current.style.cursor = "grab";
    }
  };

  return (
    <div>
      <Table
        ref={tableRef}
        className="overflow-x-scroll overflow-y-hidden block"
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onMouseEnter={onMouseEnter}
      >
        <TableCaption className="block">
          A list of your recent invoices.
        </TableCaption>
        <TableHeader>
          <TableRow>
            {Array.from({ length: 32 }, () => (
              <TableHead className="min-w-[100px] text-center">
                27-JULY-2077
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {Array.from({ length: 50 }, () => {
            return (
              <TableRow className="relative ">
                <TableCell
                  className={`min-w-[200px] font-bold sticky left-0 top-0 bg-white`}
                  ref={fixedCellRef}
                >
                  Nguyen the khoi Nguyen the khoi Nguyen the khoi Nguyen the
                  khoi Nguyen the khoi Nguyen the khoi Nguyen the khoi Nguyen
                  the khoi
                </TableCell>
                {Array.from({ length: 31 }, () => (
                  <TableCell
                    className="min-w-[300px] hover:bg-primary hover:text-white"
                    onClick={() => {}}
                  >
                    {appointments.map((appointment) => {
                      return (
                        <div>
                          <p>- {appointment.title}</p>
                        </div>
                      );
                    })}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
