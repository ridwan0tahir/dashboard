import * as React from "react";
import { PageLayout } from "@/components/layout";
import { Icons } from "@/components/icons";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardSubtitle,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { H3, P } from "@/components/typography";
import { Progress, ProgressIndicator } from "@/components/ui/progress";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Analytic, Order, Platform, Sales } from "@/types";
import { LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useMediaQuery } from "usehooks-ts";

const AnalyticCard: React.FC<{
  title: string;
  analytic: Analytic;
  Icon: React.FC<LucideProps>;
  className?: string;
}> = ({ title, Icon, analytic, className }) => {
  const isGreater = analytic.current >= analytic.previous;

  return (
    <Card className={cn("space-y-2.5 text-gray-600", className)}>
      <CardHeader className="flex items-center justify-between">
        <div className="p-2 border border-border rounded-full">
          <Icon className="w-6 h-6" />
        </div>
        <span
          className={cn("inline-block w-28 h-8", {
            "text-accent-green": isGreater,
            "text-accent-red": !isGreater,
          })}
        >
          {isGreater ? (
            <Icons.SalesUp className="w-full h-full" />
          ) : (
            <Icons.SalesDown className="w-full h-full" />
          )}
        </span>
      </CardHeader>
      <CardContent className="space-y-1.5">
        <CardTitle className="text-gray-800">{title}</CardTitle>
        <CardSubtitle>{analytic.current}</CardSubtitle>
      </CardContent>
      <CardFooter className="flex items-center justify-between space-x-2.5">
        <Badge
          variant={isGreater ? "success" : "destructive"}
          className="space-x-2"
        >
          {isGreater ? (
            <Icons.TrendUp className="w-3 h-3" />
          ) : (
            <Icons.TrendDown className="w-3 h-3" />
          )}
          <P>
            {`${Math.abs(
              ((analytic.current - analytic.previous) / analytic.current) * 100
            ).toFixed(1)}%`}
          </P>
        </Badge>
        <P>vs. previous month</P>
      </CardFooter>
    </Card>
  );
};

const backgrounds = [
  "bg-accent-purple",
  "bg-accent-green",
  "bg-accent-yellow",
  "bg-accent-red",
  "bg-accent-blue",
];

const TopPlatform: React.FC<{ platform: Platform; index: number }> = ({
  platform,
  index,
}) => {
  return (
    <div className="space-y-4">
      <H3 className="text-md">{platform.name}</H3>
      <Progress
        value={((platform.amount - platform.current) / platform.amount) * 100}
      >
        <ProgressIndicator className={cn(backgrounds[index])} />
      </Progress>
      <P className="flex items-center justify-between">
        {Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(platform.current)}
        <span>{`${(
          ((platform.current - platform.previous) / platform.current) *
          100
        ).toFixed(0)}%`}</span>
      </P>
    </div>
  );
};

const orderColumnHelper = createColumnHelper<Order>();

const orderColumns = [
  orderColumnHelper.accessor("user", {
    id: "user",
    header: () => <div className="text-left">Name</div>,
    cell: ({ getValue }) => (
      <div className="flex items-center space-x-2.5">
        <div className="w-8 h-8 rounded-full overflow-hidden">
          <img
            src={getValue().image}
            alt={getValue().name}
            className="w-full h-full object-cover"
          />
        </div>
        <H3 className="text-base">{getValue().name}</H3>
      </div>
    ),
  }),
  orderColumnHelper.accessor("date", {
    id: "date",
    header: () => <div className="text-left">Date</div>,
    cell: ({ getValue }) => <div className="text-left">{getValue()}</div>,
  }),
  orderColumnHelper.accessor("amount", {
    id: "amout",
    header: () => <div className="text-left hidden md:block">Amount</div>,
    cell: ({ getValue }) => (
      <div className="text-left hidden md:block">
        {Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(Number(getValue()))}
      </div>
    ),
  }),
  orderColumnHelper.accessor("status", {
    id: "status",
    header: () => <div className="text-left hidden md:block">Status</div>,
    cell: ({ getValue }) => (
      <div
        className={cn("text-left capitalize hidden md:block", {
          "text-accent-green": getValue() === "paid",
          "text-accent-red": getValue() === "refund",
        })}
      >
        {getValue()}
      </div>
    ),
  }),
];

const OrderTable: React.FC<{ orders: Order[] }> = ({ orders }) => {
  const table = useReactTable({
    data: orders,
    columns: orderColumns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <Table className="w-full overflow-x-scroll">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const SalesChart: React.FC<{ sales: Order[] }> = ({ sales }) => {
  const matches = useMediaQuery("(min-width:768px)");

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={sales} margin={{ left: -30 }} className="!min-h-64">
        <CartesianGrid stroke="#EAEAEA" strokeDasharray="3 3" />
        <XAxis dataKey="name" className="capitalize text-sm" />
        <YAxis dataKey="amount" tickCount={5} className="text-sm" />
        <Tooltip
          cursor={{ fill: "#fff" }}
          content={({ active, payload, label }) =>
            active && payload && payload.length ? (
              <div className="bg-gray-900 px-4 py-2 rounded-md text-gray-200">
                <span className="capitalize">{`${label}:`}</span>
                <br />
                {Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(Number(payload[0].value))}
              </div>
            ) : null
          }
        />
        <Bar
          barSize={matches ? 30 : 16}
          dataKey="amount"
          fill="#34CAA51A"
          radius={[20, 20, 0, 0]}
          activeBar={<Rectangle fill="#34CAA5" stroke="#EAEAEA" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

const fetchData = async <T,>(path: string) => {
  const response = await fetch(path, { method: "GET" });
  const data = await response.json();
  return data as T;
};

export default function Dashboard() {
  const [data, setData] = React.useState<any[]>([]);

  React.useEffect(() => {
    (async () => {
      const res = await Promise.all([
        fetchData<{ [key: string]: Analytic }>("/data/analytics.json"),
        fetchData<Order[]>("/data/order.json"),
        fetchData<Platform[]>("/data/platform.json"),
        fetchData<Sales[]>("/data/sales.json"),
      ]);
      setData(res);
    })();
  }, []);

  const [analytics, orders, platforms, sales] = data;

  return (
    <PageLayout title="Dashboard">
      {data && data.length > 0 && (
        <main className="grid xl:grid-cols-[1fr,35rem] gap-5">
          <section className="px-5 py-4 bg-white rounded-2xl border border-border order-2 xl:order-1 xl:col-start-1 xl:col-end-2">
            <SalesChart sales={sales} />
          </section>
          <section className="order-1 xl:order-2 lg:col-span-full xl:col-start-2 xl:col-end-3">
            <div className="grid md:grid-cols-2 gap-4">
              <AnalyticCard
                title="Total Order"
                Icon={Icons.BoxTick}
                analytic={analytics["order"]}
              />
              <AnalyticCard
                title="Total Refund"
                Icon={Icons.Rotate}
                analytic={analytics["refund"]}
              />
              <AnalyticCard
                title="Average Sales"
                Icon={Icons.ShoppingCart}
                analytic={analytics["sales"]}
              />
              <AnalyticCard
                title="Total Income"
                Icon={Icons.Coin}
                analytic={analytics["income"]}
              />
            </div>
          </section>
          <section className="px-5 py-4 bg-white rounded-2xl border border-border order-3">
            <OrderTable orders={orders} />
          </section>
          <section className="px-5 py-4 bg-white rounded-2xl border border-border order-4">
            <div className="flex flex-col space-y-5">
              {(platforms as Platform[]).map((platform, index) => (
                <TopPlatform key={index} platform={platform} index={index} />
              ))}
            </div>
          </section>
        </main>
      )}
    </PageLayout>
  );
}
