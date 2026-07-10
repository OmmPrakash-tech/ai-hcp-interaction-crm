import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Users, BarChart3, Clock, UserCheck, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface MetricData {
  label: string;
  value: number;
  suffix?: string;
  change: string;
  isPositive: boolean;
  icon: React.ComponentType<any>;
  sparkline: number[];
  colorClass: string;
  glowClass: string;
}

export function AnalyticsStrip({ metricsUpdatedTrigger }: { metricsUpdatedTrigger?: number }) {
  const [animatedValues, setAnimatedValues] = useState<number[]>([0, 0, 0, 0]);

  const initialMetrics: MetricData[] = [
    {
      label: "Today's Meetings",
      value: 6,
      change: "+2 today",
      isPositive: true,
      icon: Users,
      sparkline: [4, 5, 4, 6, 8, 5, 7, 6],
      colorClass: "text-brand-primary",
      glowClass: "rgba(91, 140, 255, 0.2)",
    },
    {
      label: "Positive Sentiment",
      value: 84,
      suffix: "%",
      change: "+4.2% wk",
      isPositive: true,
      icon: BarChart3,
      sparkline: [78, 80, 81, 79, 82, 85, 83, 84],
      colorClass: "text-brand-success",
      glowClass: "rgba(0, 230, 118, 0.2)",
    },
    {
      label: "Pending Follow-ups",
      value: 12,
      change: "-3 since yesterday",
      isPositive: true,
      icon: Clock,
      sparkline: [18, 16, 17, 14, 15, 12, 11, 12],
      colorClass: "text-brand-warning",
      glowClass: "rgba(255, 193, 7, 0.2)",
    },
    {
      label: "Doctors Visited",
      value: 148,
      change: "+12 this mo",
      isPositive: true,
      icon: UserCheck,
      sparkline: [120, 125, 128, 132, 135, 140, 145, 148],
      colorClass: "text-brand-accent",
      glowClass: "rgba(124, 77, 255, 0.2)",
    },
  ];

  useEffect(() => {
    // Count-up animation
    const intervals = initialMetrics.map((m, idx) => {
      let current = 0;
      const target = m.value;
      const step = Math.max(1, Math.floor(target / 30));
      const interval = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        setAnimatedValues((prev) => {
          const next = [...prev];
          next[idx] = current;
          return next;
        });
      }, 25);
      return interval;
    });

    return () => {
      intervals.forEach((interval) => clearInterval(interval));
    };
  }, [metricsUpdatedTrigger]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {initialMetrics.map((metric, idx) => {
        const Icon = metric.icon;
        
        // Compute sparkline path
        const maxVal = Math.max(...metric.sparkline);
        const minVal = Math.min(...metric.sparkline);
        const delta = maxVal - minVal || 1;
        const width = 80;
        const height = 24;
        const points = metric.sparkline
          .map((val, index) => {
            const x = (index / (metric.sparkline.length - 1)) * width;
            const y = height - ((val - minVal) / delta) * height;
            return `${x},${y}`;
          })
          .join(" ");

        return (
          <motion.div
            key={metric.label}
            id={`metric-card-${idx}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden glass-card-hover"
          >
            {/* Subtle glow background */}
            <div 
              className="absolute -right-4 -top-4 w-16 h-16 rounded-full blur-[24px]"
              style={{ backgroundColor: metric.glowClass }}
            />

            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-text-sec uppercase tracking-wider font-sans">
                {metric.label}
              </span>
              <div className={`p-2 rounded-xl bg-white/5 ${metric.colorClass}`}>
                <Icon size={16} />
              </div>
            </div>

            <div className="flex items-end justify-between">
              <div>
                <div className="flex items-baseline gap-0.5">
                  <span className="text-2xl font-bold font-sans tracking-tight text-white tabular-nums">
                    {animatedValues[idx]}
                  </span>
                  {metric.suffix && (
                    <span className="text-sm font-semibold text-text-sec">{metric.suffix}</span>
                  )}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  {metric.isPositive ? (
                    <ArrowUpRight size={12} className="text-brand-success" />
                  ) : (
                    <ArrowDownRight size={12} className="text-brand-error" />
                  )}
                  <span className={`text-[10px] font-medium ${metric.isPositive ? 'text-brand-success' : 'text-brand-error'}`}>
                    {metric.change}
                  </span>
                </div>
              </div>

              {/* Sparkline Graph */}
              <div className="h-6 w-20 self-end opacity-80">
                <svg width={width} height={height}>
                  <polyline
                    fill="none"
                    stroke={
                      metric.colorClass.includes("primary")
                        ? "#5B8CFF"
                        : metric.colorClass.includes("success")
                        ? "#00E676"
                        : metric.colorClass.includes("warning")
                        ? "#FFC107"
                        : "#7C4DFF"
                    }
                    strokeWidth="1.5"
                    points={points}
                  />
                </svg>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
