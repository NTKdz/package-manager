import CustomCard from "@/components/custom/custom-card/CustomCard";

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
                <div className="w-full h-8 flex justify-between">
                  <span>fdsfsa</span> <span>fsdf</span>
                </div>
              );
            })}
          </div>
        }
      />
    </div>
  );
}
