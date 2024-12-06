import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const componentsList = [
  { id: 'progress-bar', label: 'Progress Bar' },
  { id: 'timer', label: 'Timer' },
  { id: 'question-text', label: 'Question Text' },
  { id: 'image', label: 'Image' },
  { id: 'option-1', label: 'Option 1' },
  { id: 'option-2', label: 'Option 2' },
  { id: 'option-3', label: 'Option 3' },
  { id: 'option-4', label: 'Option 4' },
];

export default function Sidebar() {
  return (
    <div className="w-1/4 bg-gray-100 p-4">
      <h2 className="text-xl font-bold mb-4">Components</h2>
      <div>
        {componentsList.map((item, index) => (
          <Draggable key={item.id} draggableId={item.id} index={index}>
            {(provided) => (
              <div
                className="bg-white p-2 mb-2 rounded shadow cursor-pointer"
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                {item.label}
              </div>
            )}
          </Draggable>
        ))}
      </div>
    </div>
  );
}
