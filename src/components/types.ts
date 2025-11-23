// Notification types
export interface NotificationProps {
  type: "success" | "info" | "warning" | "error";
  message: string;
  duration: number;
  animation?: "fade" | "pop" | "slide";
  onClose?: () => void;
}

// Define the allowed positions
export type PositionType =
  | "bottom-left"
  | "bottom-right"
  | "top-left"
  | "top-right";

// Define the return type of the notification hook
export interface UseNotificationReturn {
  NotificationComponent: JSX.Element;
  triggerNotification: (notificationProps: NotificationProps) => void;
}

// Chartist types
export type ChartType = "LineChart" | "BarChart" | "PieChart";

export interface ChartistData {
  labels?: (string | number)[];
  series?: (number | number[] | { value: number; meta?: string }[])[];
  [key: string]: any;
}

export interface ChartistOptions {
  [key: string]: any;
}

export type ChartistPlugin = ((chart: any) => void) | { [key: string]: any };

export interface ChartistListener {
  [event: string]: (data: any) => void;
}

export interface NextChartistProps {
  type: ChartType;
  data: ChartistData;
  className?: string;
  options?: ChartistOptions;
  responsiveOptions?: Array<string | Array<string | ChartistOptions>>;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  listener?: ChartistListener;
  plugins?: ChartistPlugin[];
}

// Define the return type of the chartist hook
export interface UseChartistReturn {
  ChartComponent: JSX.Element;
  updateChart: (data: ChartistData, options?: ChartistOptions) => void;
  destroyChart: () => void;
}
