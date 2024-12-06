import { useState } from "react";
import Sidebar from "../components/Sidebar";
import GridCanvas from "../components/GridCanvas";

export default function Index() {
  const [gridItems, setGridItems] = useState([]);
  const sidebarItems = [
    { id: "1", name: "Image" },
    { id: "2", name: "Text" },
    { id: "3", name: "Button" },
  ];

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("application/json", JSON.stringify(item));
  };

  const handleDrop = (e) => {
    const data = e.dataTransfer.getData("application/json");
    const item = JSON.parse(data);
    setGridItems((prevItems) => [...prevItems, item]);
  };

  return (
    <div className="flex h-screen">
      <Sidebar items={sidebarItems} onDragStart={handleDragStart} />
      <GridCanvas gridItems={gridItems} onDrop={handleDrop} />
    </div>
  );
}
