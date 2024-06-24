import CustomCard from "@/components/custom/custom-card/CustomCard";
import { format } from "date-fns";

export default function UserCountTable({
  data,
}: {
  data: { date: string; count: number };
}) {
  return (
    <div>
      <CustomCard
        cardClass=""
        cardTitle="Số lượng người dùng trong khoảng thời gian"
        cardDescription=""
        cardContent={
          <div>
            <div className="w-full text-center">
              <div className="text-lg mx-auto text-center">
                <span>{data && data.date}</span>
              </div>
              <div className="text-8xl mx-auto text-center">
                <span>{data && data.count}</span>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}
