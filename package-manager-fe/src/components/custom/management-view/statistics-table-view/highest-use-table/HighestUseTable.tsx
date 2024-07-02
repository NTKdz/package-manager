import CustomCard from "@/components/custom/custom-card/CustomCard";
import { format } from "date-fns";

export default function HighestUseTable({
  data,
}: {
  data: { date: string; count: number }[];
}) {
  // const [type, setType] = useState<string>("day");

  return (
    <div>
      <CustomCard
        cardClass=""
        cardTitle="Danh sách mốc thời gian sử dụng nhiều nhất"
        cardDescription=""
        cardContent={
          <div>
            {data?.slice(0, 8).map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className="w-full min-h-8 flex justify-between items-center"
                >
                  <span>
                    {format(
                      item.date,
                      // type === "day" ? "yyyy-MM-dd" : "yyyy-MM"
                      "yyyy-MM-dd"
                    )}
                  </span>
                  <div className="h-full flex items-end flex-1">
                    <div className="h-1 flex-1 mr-1 ml-1 bg-primary-foreground"></div>
                  </div>

                  <span>{item.count}</span>
                </div>
              );
            })}
          </div>
        }
      />
    </div>
  );
}
