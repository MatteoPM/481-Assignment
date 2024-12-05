import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const eventData = [
  { day: "Mon", attendance: 35 },
  { day: "Tue", attendance: 40 },
  { day: "Wed", attendance: 45 },
  { day: "Thu", attendance: 50 },
  { day: "Fri", attendance: 55 },
  { day: "Sat", attendance: 60 },
  { day: "Sun", attendance: 65 },
];

export function EventAttendanceChart() {
  return (
    <ChartContainer
      config={{
        attendance: {
          label: "Attendance",
          color: "hsl(var(--chart-1))",
        },
      }}
    >
      <ResponsiveContainer>
        <BarChart
          data={eventData}
          margin={{ left: -10, bottom: 15, right: 30 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey="attendance"
            fill="var(--color-attendance)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
