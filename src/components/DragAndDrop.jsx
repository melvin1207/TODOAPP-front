import { useState } from "react"

const DragAndDrop = ({tareas}) => {
  var tareasDrag = []
  
  const putLista = () => {
    for (let  i = 0; i < tareas.length; i++ ){
      tareasDrag[i] = {...tareas[i], lista: 1} 
    }
  }

  putLista()

  console.log(tareasDrag)

  const [tasks, setTasks] = useState(tareasDrag);


  const getList = (lista) => {
    return tasks.filter(item => item.lista === lista)
  }

  const startDrag = (evt, item) => {
    evt.dataTransfer.setData('itemID', item._id)
    console.log(item);
  }

  const draggingOver = (evt) => {
    evt.preventDefault();
  }

  const onDrop = (evt, lista) => {
      const itemID = evt.dataTransfer.getData('itemID');
      const item = tasks.find(item => item._id == itemID);
      item.lista = lista;

      const newState = tasks.map(task => {
          if(task._id === itemID) return item;
          return task
      })
      console.log(item);
      setTasks(newState);
  }

  return (
    <>
      <div className='drag-and-drop'>
                <div className='column column-1'>
                    <h3>
                        Tareas por hacer
                    </h3>
                    <div className='dd-zone' droppable="true" onDragOver={(evt => draggingOver(evt))} onDrop={(evt => onDrop(evt, 1))}>
                        {getList(1).map(item => (
                            <div className='dd-element' key={item._id} draggable onDragStart={(evt) => startDrag(evt, item)}>
                                <strong className='title'>{item.description}</strong>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='column column-2'>
                    <h3>
                        Tareas en progreso
                    </h3>
                    <div className='dd-zone' droppable="true" onDragOver={(evt => draggingOver(evt))} onDrop={(evt => onDrop(evt, 2))}>
                        {getList(2).map(item => (
                            <div className='dd-element' key={item._id} draggable onDragStart={(evt) => startDrag(evt, item)}>
                                <strong className='title'>{item.description}</strong>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='column column-3'>
                    <h3>
                        Tareas realizadas
                    </h3>
                    <div className='dd-zone' droppable="true" onDragOver={(evt => draggingOver(evt))} onDrop={(evt => onDrop(evt, 3))}>
                        {getList(3).map(item => (
                            <div className='dd-element' key={item._id} draggable onDragStart={(evt) => startDrag(evt, item)}>
                                <strong className='title'>{item.description}</strong>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
    </>
  )
}

export default DragAndDrop