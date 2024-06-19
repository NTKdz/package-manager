import CustomCard from "@/components/custom/custom-card/CustomCard";

export default function HighestByDepByDate({ data }: { data: any }) {
  return (
    <div>
      <CustomCard
        cardClass=""
        cardTitle="Highest"
        cardDescription="Deploy your new project in one-click."
        cardContent={
          <div>
            {data?.map((item: any,index:number) => {
              return (
                <div key={index} className="w-full h-8 flex justify-between items-center flex-wrap">
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
