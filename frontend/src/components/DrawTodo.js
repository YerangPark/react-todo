// images
import { ReactComponent as EditImg } from '../img/Edit.svg';
import { ReactComponent as DeleteImg } from '../img/Delete.svg';
import Form from 'react-bootstrap/Form';
import { TODO_STATUS } from '../constants/todoConst';

function DrawTodo(props) {
  return (
    <Form>
      <div key={"default-checkbox"} className="mb-3">
        <Form.Check
          type="checkbox"
          id={"default-checkbox"}
          label={props.todo.contents}
          className="CheckBox"
          checked={props.todo.status === TODO_STATUS.COMPLETE}
          onChange={ (e)=>{
            console.log(e.target.checked);
            if (e.target.checked) { props.changeStatusFunc(props.todo.id, TODO_STATUS.COMPLETE); }
            else { props.changeStatusFunc(props.todo.id, TODO_STATUS.INCOMPLETE); }
          } }
        />
        <EditImg width="25" height="25" fill="black" stroke="black" onClick={()=>{props.handleEditButtonClick(props.todo);}}/>
        <DeleteImg width="30" height="30" fill="black" stroke="black" onClick={()=>props.deleteTodoFunc(props.todo.id)}/>
      </div>
    </Form>
  );
}

export default DrawTodo;