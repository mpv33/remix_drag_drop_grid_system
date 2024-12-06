import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

export default function GridCanvas({ gridItems, setGridItems }) {
  return (
    <Droppable droppableId="grid-canvas">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="w-3/4 h-[80vh] bg-gray-200 grid grid-cols-4 gap-2 p-4"
        >
          {gridItems.map((item, index) => (
            <div
              key={item.id}
              className="bg-white rounded shadow p-2 text-center"
              style={{ gridColumn: item.col, gridRow: item.row }}
            >
              {item.label}
            </div>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
