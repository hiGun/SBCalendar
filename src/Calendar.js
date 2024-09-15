import React, { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  addDays,
  isSameMonth,
  isToday,
} from "date-fns";
import Modal from "./Modal";
import OptionsPanel from "./OptionsPanel";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({});
  const [options, setOptions] = useState({
    AAA: { text: "AAA", color: "lightyellow" },
    BBB: { text: "BBB", color: "#ffcccb" }, // lightred
    CCC: { text: "CCC", color: "lightgreen" },
    DDD: { text: "DDD", color: "lightblue" },
    Clear: { text: "Clear", color: "white" }, // to reset
  });

  const calendarStyle = {
    fontFamily: "'Source Code Pro', 'Courier New', monospace",
  };

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowModal(true);
  };

  const handleOptionSelect = (option) => {
    const dateStr = format(selectedDate, "yyyy-MM-dd");
    if (option === "Clear") {
      const newData = { ...data };
      delete newData[dateStr];
      setData(newData);
    } else {
      setData({ ...data, [dateStr]: option });
    }
    setShowModal(false);
  };

  const handleOptionChange = (key, newText, newColor) => {
    if (key !== "Clear") {
      setOptions({
        ...options,
        [key]: { text: newText, color: newColor },
      });
    }
  };

  const renderWeekDays = () => {
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      weekDays.push(
        <div
          key={`weekday-${i}`}
          style={{ fontWeight: "bold", textAlign: "center", ...calendarStyle }}
        >
          {format(addDays(weekStart, i), "EEE")}
        </div>
      );
    }
    return weekDays;
  };

  const renderCalendar = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfMonth(addDays(monthEnd, 6));

    const dateArray = eachDayOfInterval({ start: startDate, end: endDate });

    return dateArray.map((date) => {
      const dateStr = format(date, "yyyy-MM-dd");
      const selectedOption = data[dateStr]; //for including text also
      //const backgroundColor = data[dateStr]? options[data[dateStr]].color: "white";
      const backgroundColor = selectedOption
        ? options[selectedOption].color
        : "white"; // for incl. text
      //const optionText = selectedOption ? options[selectedOption].text : ""; //for incl. text
      const optionText =
        selectedOption && selectedOption !== "Clear"
          ? options[selectedOption].text
          : "";
      const isCurrentMonth = isSameMonth(date, currentDate);
      const isCurrentDate = isToday(date);

      return (
        <div
          key={dateStr}
          onClick={() => handleDateClick(date)}
          style={{
            backgroundColor,
            cursor: "auto",
            padding: "5px",
            border: "1px solid #ccc",
            textAlign: "center",
            color: isCurrentMonth ? "black" : "#ccc",
            position: "relative",
            height: "60px", //for incl. text
            display: "flex", //for incl. text
            flexDirection: "column", //for incl. text
            justifyContent: "space-between", //for incl. text
            ...calendarStyle,
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: "24px",
              height: "24px",
              lineHeight: "24px",
              borderRadius: "50%",
              border: isCurrentDate ? "2px solid red" : "none",
              fontSize: "14px", //for incl. text
              ...calendarStyle,
            }}
          >
            {format(date, "d")}
          </span>
          <span
            style={{
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            {optionText}
          </span>
        </div>
      );
    });
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "20px",
            fontSize: "24px",
            fontWeight: "bold",
            ...calendarStyle,
          }}
        >
          <button
            onClick={handlePrevMonth}
            style={{
              fontSize: "32px",
              margin: "0 20px",
              background: "none",
              border: "none",
              cursor: "pointer",
              ...calendarStyle,
            }}
          >
            &lt;
          </button>
          <span>{format(currentDate, "MMMM yyyy")}</span>
          <button
            onClick={handleNextMonth}
            style={{
              fontSize: "32px",
              margin: "0 20px",
              background: "none",
              border: "none",
              cursor: "pointer",
              ...calendarStyle,
            }}
          >
            &gt;
          </button>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: "2px",
          }}
        >
          {renderWeekDays()}
          {renderCalendar()}
        </div>
        {showModal && (
          <Modal
            options={options}
            onSelect={handleOptionSelect}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
      <OptionsPanel options={options} onChange={handleOptionChange} />
    </div>
  );
};

export default Calendar;
