/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomCard from "@/components/custom/custom-card/CustomCard";

export default function HighestByDepByDate({ data }: { data: any }) {
  return (
    <div>
      <CustomCard
        cardClass=""
        cardTitle="Danh sách phòng ban sử dụng nhiều nhất"
        cardDescription=""
        cardContent={
          <div>
            {data?.slice(0,8).map((item: any,index:number) => {
              return (
                <div key={index} className="w-full min-h-8 flex justify-between items-center">
                  <span>{item.depName}</span>
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
