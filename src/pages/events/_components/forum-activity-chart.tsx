import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const forumData = [
  { day: "Mon", posts: 45, messages: 320 },
  { day: "Tue", posts: 52, messages: 380 },
  { day: "Wed", posts: 61, messages: 420 },
  { day: "Thu", posts: 58, messages: 390 },
  { day: "Fri", posts: 65, messages: 450 },
  { day: "Sat", posts: 75, messages: 520 },
  { day: "Sun", posts: 80, messages: 580 },
];

export function ForumActivityChart() {
  return (
    <ChartContainer
      config={{
        posts: {
          label: "Posts",
          color: "hsl(var(--chart-1))",
        },
        messages: {
          label: "Messages",
          color: "hsl(var(--chart-2))",
        },
      }}
    >
      <ResponsiveContainer>
        <LineChart
          data={forumData}
          margin={{ left: -10, bottom: 15, right: 30 }}
          // margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="posts"
            stroke="var(--color-posts)"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="messages"
            stroke="var(--color-messages)"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
