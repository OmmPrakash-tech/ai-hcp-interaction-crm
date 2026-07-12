import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Users, BarChart3, Clock, UserCheck, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { getAnalytics } from "@/services/analyticsService";

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

  

 const [initialMetrics, setInitialMetrics] = useState<MetricData[]>([]);

 useEffect(() => {
  async function loadAnalytics() {
    try {
      const data = await getAnalytics();

      setInitialMetrics([
        {
          label: "Total Interactions",
          value: data.total,
          change: "Live",
          isPositive: true,
          icon: Users,
          sparkline: [0, 1, 2, 3, data.total - 2, data.total - 1, data.total],
          colorClass: "text-brand-primary",
          glowClass: "rgba(91,140,255,0.2)",
        },
        {
          label: "Positive",
          value: data.positive,
          change: "Live",
          isPositive: true,
          icon: BarChart3,
          sparkline: [0, 1, data.positive],
          colorClass: "text-brand-success",
          glowClass: "rgba(0,230,118,0.2)",
        },
        {
          label: "Negative",
          value: data.negative,
          change: "Live",
          isPositive: false,
          icon: Clock,
          sparkline: [0, 1, data.negative],
          colorClass: "text-brand-warning",
          glowClass: "rgba(255,193,7,0.2)",
        },
        {
          label: "Doctors",
          value: data.doctors,
          change: "Live",
          isPositive: true,
          icon: UserCheck,
          sparkline: [0, 1, data.doctors],
          colorClass: "text-brand-accent",
          glowClass: "rgba(124,77,255,0.2)",
        },
      ]);

    } catch (err) {
      console.error(err);
    }
  }

  loadAnalytics();
}, [metricsUpdatedTrigger]);

  useEffect(() => {
    // Count-up animation

    if (initialMetrics.length === 0) return;

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
