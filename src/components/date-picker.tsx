import React, { useState, useEffect } from "react";
import Picker from "rmc-picker";
import "rmc-picker/assets/index.css";
import { useTrans } from "@/hooks/useTrans";
import { Drawer } from "./drawer";

const generateDays = (year: number, month: number) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());
};

const years = Array.from({ length: 100 }, (_, i) => (1970 + i).toString());

interface TimePickerProps {
  value?: { year: number; month: number; day: number };
  onChange?: (timestamp: number) => void;
  open: boolean;
  onClose: () => void;
}

const TimePicker: React.FC<TimePickerProps> = ({
  value,
  open,
  onClose,
  onChange,
}) => {
  const t = useTrans();
  const [selectedYear, setSelectedYear] = useState(value?.year || 2025);
  const [selectedMonth, setSelectedMonth] = useState(value?.month || 1);
  const [selectedDay, setSelectedDay] = useState(value?.day || 1);

  const [days, setDays] = useState(generateDays(selectedYear, selectedMonth));

  useEffect(() => {
    setDays(generateDays(selectedYear, selectedMonth));
    if (selectedDay > days.length) {
      setSelectedDay(days.length);
    }
  }, [selectedYear, selectedMonth, selectedDay, days.length]);

  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  return (
    <Drawer
      open={open}
      title={
        <div className="flex justify-between">
          <span
            className="text-text2 font-normal"
            onClick={() => {
              setSelectedYear(value?.year || new Date().getFullYear());
              setSelectedMonth(value?.month || new Date().getMonth());
              setSelectedDay(value?.day || new Date().getDay());
              onClose?.();
            }}
          >
            {t("common.cancel")}
          </span>
          <b className="font-bold text-lg">{t("dateSelector")}</b>
          <span
            className="font-medium text-primary"
            onClick={() => {
              onChange?.(
                new Date(
                  Number(selectedYear),
                  Number(selectedMonth),
                  Number(selectedDay)
                ).getTime()
              );
              onClose();
            }}
          >
            {t("common.confirm")}
          </span>
        </div>
      }
      onChange={() => onClose?.()}
    >
      <div className="flex justify-center border-t border-border2 pt-6">
        <Picker
          selectedValue={selectedMonth.toString()}
          onValueChange={(v) => setSelectedMonth(v)}
          style={{ flex: 1 }}
        >
          {months.map((m, idx) => (
            <Picker.Item key={m} value={idx.toString()}>
              {t(m)}
            </Picker.Item>
          ))}
        </Picker>

        <Picker
          selectedValue={selectedDay.toString()}
          onValueChange={(v) => setSelectedDay(v)}
          style={{ flex: 0.5 }}
        >
          {days.map((d) => (
            <Picker.Item key={d} value={d.toString()}>
              {d}
            </Picker.Item>
          ))}
        </Picker>

        <Picker
          selectedValue={selectedYear.toString()}
          onValueChange={(v) => setSelectedYear(v)}
          style={{ flex: 0.7 }}
        >
          {years.map((y) => (
            <Picker.Item key={y} value={y.toString()}>
              {y}
            </Picker.Item>
          ))}
        </Picker>
      </div>
    </Drawer>
  );
};

export default TimePicker;
