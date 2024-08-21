import _throttle from "lodash/throttle";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SchedulerView() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const isDragging = useRef(false);
  const clickableRef = useRef(true);

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

  const onMouseMove = _throttle((e) => {
    if (!isDragging.current || !tableRef.current || !fixedCellRef.current)
      return;
    e.preventDefault();

    const rect = tableRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const delta = offsetX - posRef.current;

    requestAnimationFrame(() => {
      if (tableRef.current && fixedCellRef.current) {
        tableRef.current.scrollLeft -= delta;
        // if (fixedCellRef.current.offsetWidth <= tableRef.current.scrollLeft) {
        //   setIsFixed(true);
        // } else {
        //   setIsFixed(false);
        // }
      }
    });
    posRef.current = offsetX;
    clickableRef.current = false;
  }, 1000 / 60);

  
  const onMouseDown = (e) => {
    if (!tableRef.current) return;
    e.preventDefault();

    const rect = tableRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;

    posRef.current = offsetX;
    isDragging.current = true;
    clickableRef.current = true;
  };

  const onMouseUp = () => {
    if (tableRef.current) {
      isDragging.current = false;
      tableRef.current.style.cursor = "grab";
    }
  };

  const onMouseLeave = () => {
    if (tableRef.current) {
      isDragging.current = false;
      tableRef.current.style.cursor = "";
    }
  };

  const onMouseEnter = () => {
    if (tableRef.current) {
      tableRef.current.style.cursor = "grab";
    }
  };

  useEffect(() => {
    const onPageLoad = () => {
      console.log("page loaded");
      setLoading(false);
    };

    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad, false);
      return () => window.removeEventListener("load", onPageLoad);
    }
  }, []);

  return (
    <div>
      {!loading && (
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
            <tr>
              <td className="min-w-[100px] text-center">Ten nguoi dung</td>
              {Array.from({ length: 31 }, () => (
                <td className="min-w-[100px] text-center">27-JULY-2077</td>
              ))}
            </tr>
          </thead>
          <tbody className="">
            {Array.from({ length: 100 }, () => {
              return (
                <tr className="relative ">
                  <th
                    className={`min-w-[200px] font-bold sticky left-0 top-0 bg-white`}
                    ref={fixedCellRef}
                  >
                    Nguyen the khoi Nguyen the khoi Nguyen the khoi Nguyen the
                    khoi Nguyen the khoi Nguyen the khoi Nguyen the khoi Nguyen
                    the khoi
                  </th>
                  {Array.from({ length: 31 }, () => (
                    <td
                      className="min-w-[300px] hover:bg-primary hover:text-white"
                      onClick={() => {
                        if (clickableRef.current) navigate("./test");
                      }}
                    >
                      {appointments.map((appointment) => {
                        return (
                          <div>
                            <p>- {appointment.title}</p>
                          </div>
                        );
                      })}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
