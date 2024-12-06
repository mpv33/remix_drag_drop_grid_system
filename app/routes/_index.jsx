import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useLoaderData, Form } from '@remix-run/react';
import { json } from '@remix-run/node';
import { mockQuizData } from '../utils/mockData';

// Remix loader to fetch the grid setup
export const loader = async () => {
  return json({ quizData: mockQuizData });
};

// Remix action to save grid configuration
export const action = async ({ request }) => {
  const formData = await request.formData();
  const savedLayout = JSON.parse(formData.get('layout')); // Parse the layout data
  console.log('Saved Layout:', savedLayout); // Save to database in real implementation
  return json({ success: true });
};

export default function Index() {
  const { quizData } = useLoaderData(); // Load initial quiz data
  const [gridItems, setGridItems] = useState(quizData || []);
  const [isAdmin, setIsAdmin] = useState(true); // Toggle between Admin and User views

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

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;

    // Check if the draggable item is being dropped onto the grid
    if (destination.droppableId === 'grid-canvas') {
      const newItem = {
        id: draggableId,
        label: draggableId.replace('-', ' '),
        col: Math.ceil((destination.index % 4) + 1), // Adjust column index
        row: Math.floor(destination.index / 4) + 1, // Adjust row index
      };

      setGridItems((prevItems) => [...prevItems, newItem]);
    }
  };

  const handleSaveLayout = async () => {
    const layoutData = JSON.stringify(gridItems);
    const formData = new FormData();
    formData.append('layout', layoutData);

    await fetch('/', { method: 'POST', body: formData });
    alert('Layout saved successfully!');
  };

  return (
    <div className="flex h-screen">
      <DragDropContext onDragEnd={handleDragEnd}>
        {isAdmin && (
          <div className="w-1/4 bg-gray-100 p-4">
            <h2 className="text-xl font-bold mb-4">Components</h2>
            <Droppable droppableId="sidebar">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {componentsList.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white p-2 mb-2 rounded shadow cursor-pointer"
                        >
                          {item.label}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        )}

        <div className={`w-${isAdmin ? '3/4' : 'full'} h-[80vh] bg-gray-200`}>
          <Droppable droppableId="grid-canvas">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="grid grid-cols-4 gap-2 p-4 bg-gray-200"
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
        </div>
      </DragDropContext>

      {/* Admin Controls */}
      {isAdmin && (
        <div className="p-4">
          <button
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            onClick={handleSaveLayout}
          >
            Save Layout
          </button>
        </div>
      )}

      {/* Toggle Button */}
      <div className="fixed bottom-4 right-4">
        <button
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
          onClick={() => setIsAdmin(!isAdmin)}
        >
          Toggle to {isAdmin ? 'User' : 'Admin'} View
        </button>
      </div>
    </div>
  );
}
