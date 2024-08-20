import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CustomScheduler() {
  const navigate = useNavigate();
  const [isDragging, setDragging] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [clickable, setClickable] = useState(true);

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

  function throttle(func, delay) {
    let lastCall = 0;
    return function (...args) {
      const now = new Date().getTime();
      if (now - lastCall < delay) {
        return;
      }
      lastCall = now;
      return func(...args);
    };
  }

  const onMouseMove = (e) => {
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
    setClickable(false);
  };

  const onMouseDown = (e) => {
    if (!tableRef.current) return;
    e.preventDefault();

    const rect = tableRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;

    posRef.current = offsetX;
    setDragging(true);
    setClickable(true);
  };

  const onMouseUp = () => {
    if (tableRef.current) {
      setDragging(false);
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
      <table
        ref={tableRef}
        className="overflow-x-scroll overflow-y-hidden block"
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onMouseEnter={onMouseEnter}
      >
        <thead>
          {Array.from({ length: 32 }, () => (
            <th className="min-w-[100px] text-center">27-JULY-2077</th>
          ))}
        </thead>
        <tbody className="">
          {Array.from({ length: 24 }, () => {
            return (
              <tr className="relative ">
                <td
                  className={`min-w-[200px] font-bold sticky left-0 top-0 bg-white`}
                >
                  Nguyen the khoi Nguyen the khoi Nguyen the khoi Nguyen the
                  khoi Nguyen the khoi Nguyen the khoi Nguyen the khoi Nguyen
                  the khoi
                </td>
                {Array.from({ length: 31 }, () => (
                  <td
                    className="min-w-[300px] hover:bg-primary hover:text-white"
                    onClick={() => {}}
                  >
                    dsdasd
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
