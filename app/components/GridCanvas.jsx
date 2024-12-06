export default function GridCanvas({ gridItems, onDrop }) {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="flex-1 bg-gray-100 p-4 grid grid-cols-4 gap-4"
      onDrop={onDrop}
      onDragOver={handleDragOver}
    >
      {gridItems.map((item, index) => (
        <div
          key={index}
          className="bg-blue-500 text-white p-4 rounded flex items-center justify-center"
        >
          {item.name}
        </div>
      ))}
    </div>
  );
}
