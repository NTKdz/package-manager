import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReactNode } from "react";

export default function CustomCard({
  cardClass,
  cardTitle,
  cardDescription,
  cardContent,
}: {
  cardClass: string;
  cardTitle: ReactNode;
  cardDescription: string;
  cardContent: ReactNode;
}) {
  return (
    <div>
      <Card className={cardClass}>
        <CardHeader>
          <CardTitle>{cardTitle}</CardTitle>
          <CardDescription>{cardDescription}</CardDescription>
        </CardHeader>
        <CardContent>{cardContent}</CardContent>
      </Card>
    </div>
  );
}
