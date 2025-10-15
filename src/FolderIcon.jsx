import {useDraggable} from '@dnd-kit/core';

export default function FolderIcon({id, x, y, handleOpenFolder }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: id,
    });

  const style = {
    position: 'absolute',
    top: y,
    left: x,
    width: 0,
    height: 0,
    color: 'white',
    borderRadius: 8,
    cursor: 'grab',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} onDoubleClick={() => handleOpenFolder()}>
      <img src={"./img/folder.png"} alt='ERROR' style={{ height: '50px', marginRight: 4 }} />
      <h3 style={{ color: 'black', fontWeight: "bold" }}>Projects</h3>
    </div>
  );
}