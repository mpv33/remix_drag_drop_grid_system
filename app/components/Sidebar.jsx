export default function Sidebar({ items, onDragStart }) {
  return (
    <div className="w-64 bg-white shadow-md p-4">
      <h2 className="text-lg font-bold mb-4">Components</h2>
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            draggable
            onDragStart={(e) => onDragStart(e, item)}
            className="bg-gray-200 rounded p-2 mb-2 cursor-pointer"
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
