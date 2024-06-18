import CustomCard from "@/components/custom/custom-card/CustomCard";
import { format } from "date-fns";

export default function HighestUseTable({ data }: { data: any }) {
  return (
    <div>
      <CustomCard
        cardClass=""
        cardTitle="Highest"
        cardDescription="Deploy your new project in one-click."
        cardContent={
          <div>
            {data?.map((item: any) => {
              return (
                <div className="w-full h-8 flex justify-between items-center flex-wrap ">
                  <span>{format(item.date, "yyyy-MM-dd")}</span>
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
