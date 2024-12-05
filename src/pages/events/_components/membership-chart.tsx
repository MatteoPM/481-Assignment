import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const membershipData = [
  { day: "Mon", members: 120 },
  { day: "Tue", members: 132 },
  { day: "Wed", members: 145 },
  { day: "Thu", members: 160 },
  { day: "Fri", members: 178 },
  { day: "Sat", members: 190 },
  { day: "Sun", members: 203 },
];

export function MembershipChart() {
  return (
    <ChartContainer
      config={{
        members: {
          label: "Members",
          color: "hsl(var(--chart-1))",
        },
      }}
    >
      <ResponsiveContainer>
        <LineChart
          data={membershipData}
          margin={{ left: -10, bottom: 15, right: 30 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="members"
            stroke="var(--color-members)"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
