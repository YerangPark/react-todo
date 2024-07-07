import './App.css';
import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Routes, Route, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// images
import { ReactComponent as EditImg } from './img/Edit.svg';
import { ReactComponent as DeleteImg } from './img/Delete.svg';


const TODO_STATUS = {
  ALL : 0,
  INCOMPLETE : 1,
  COMPLETE : 2,
}

const PAGE_STATUS = {
  TODO : 0,
  INFO : 1,
}

function App() {
  const navigate = useNavigate();

  const [todos, setTodos] = useState([{id: 1, content: 'Do sth', status: TODO_STATUS.INCOMPLETE},
    {id: 2, content: 'Do anything', status: TODO_STATUS.COMPLETE}]);
  const [inputStr, setInputStr] = useState("");
  const [tab, setTab] = useState(TODO_STATUS.ALL);
  const [mainTab, setMainTab] = useState(PAGE_STATUS.TODO);
  let [completedTodos, setCompletedTodos] = useState([]);
  let [incompletedTodos, setIncompletedTodos] = useState([]);
  let [modalShow, setModalShow] = useState(false);

  useEffect(()=>{
    // Think : 투두가 추가되면 항상 Incompleted로 추가될텐데, completed state도 업데이트하게 됨.
    // Think : 또한 마지막 인덱스만 검사하면 되지 않나..? 싶기도 한데 -> 그러면 todo update 함수에서 처리하면 도는 횟수도 줄 것 같은데..
    const newCompletedTodos = [];
    const newIncompletedTodos = [];

    todos.forEach((obj) => {
      if (obj.status === TODO_STATUS.COMPLETE) {
        newCompletedTodos.push(obj);
      } else if (obj.status === TODO_STATUS.INCOMPLETE) {
        newIncompletedTodos.push(obj);
      }
    }, []);

    setCompletedTodos(newCompletedTodos);
    setIncompletedTodos(newIncompletedTodos);
  }, [todos]);

  function changeStatus(id, value) {
    let tmpTodos = [...todos];
    let idx = tmpTodos.findIndex(obj => obj.id === parseInt(id));
    tmpTodos[idx].status = value;
    setTodos(tmpTodos);
  }

  function deleteTodo(id) {
    let tmpTodos = [...todos];
    let idx = tmpTodos.findIndex(obj => obj.id === parseInt(id));
    tmpTodos.splice(idx, 1);
    setTodos(tmpTodos);
  }

  function handleAddButtonClick() {
    let newId = 1;
    if (todos.length !== 0) {
      newId = todos[todos.length-1].id + 1;
    }
    let tmpTodo = {id: newId, content: inputStr, status: TODO_STATUS.INCOMPLETE};
    setTodos([...todos, tmpTodo]);
    setInputStr('');
  }

  return (
    <div className="App">
      <div>
        <Nav className="justify-content-end TopBlank" activeKey="/home">
          <Nav.Item>
            <Nav.Link
              className={mainTab === PAGE_STATUS.TODO ? "ActiveLink" : "Link"}
              onClick={()=>{ setMainTab(PAGE_STATUS.TODO); navigate('/'); }}>
              Todo
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              className={mainTab === PAGE_STATUS.INFO ? "ActiveLink" : "Link"}
              onClick={()=>{ setMainTab(PAGE_STATUS.INFO); navigate('/info'); }}>
              Info
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>

      <Routes>
        <Route path="/" element={
          <>
            <DrawModal show={modalShow} onHide={() => setModalShow(false)}></DrawModal>
            <p className="Title">Todo</p>
            <div>
              <Nav className="justify-content-center" defaultActiveKey="link-0">
                <Nav.Item>
                  <Nav.Link className={tab === TODO_STATUS.ALL ? "ActiveLink" : "Link"} eventKey="link-0" onClick={()=>setTab(TODO_STATUS.ALL)}>All</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className={tab === TODO_STATUS.COMPLETE ? "ActiveLink" : "Link"} eventKey="link-1" onClick={()=>setTab(TODO_STATUS.COMPLETE)}>Completed</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className={tab === TODO_STATUS.INCOMPLETE ? "ActiveLink" : "Link"} eventKey="link-2" onClick={()=>setTab(TODO_STATUS.INCOMPLETE)}>Incompleted</Nav.Link>
                </Nav.Item>
              </Nav>
            </div>

            <div style={{ marginTop : '1em' }}>
              <Form.Control
                type="text"
                id="inputTodo"
                aria-describedby="todoInputBlock"
                placeholder="Type..."
                className="InputTodo"
                value={inputStr}
                onChange={(e)=>{setInputStr(e.target.value)}} // TODO : 추후 length 제한 걸기. 300자?
              />
              <Button className="AddBtn" variant="dark" onClick={handleAddButtonClick}>+</Button>
            </div>
            <div className="FixedWidth TopBlank">
              {
                (tab === TODO_STATUS.INCOMPLETE || tab === TODO_STATUS.ALL) ?
                  incompletedTodos.map((todo, i)=>{ return <DrawTodo todo={todo} changeStatusFunc={changeStatus} deleteTodoFunc={deleteTodo} key={i} modalOpenFunc={setModalShow}/>})
                  : null
              }
              {(tab === TODO_STATUS.ALL) ? <hr/> : null}
              {
                (tab === TODO_STATUS.COMPLETE || tab === TODO_STATUS.ALL) ?
                  completedTodos.map((todo, i)=>{ return <DrawTodo todo={todo} changeStatusFunc={changeStatus} deleteTodoFunc={deleteTodo} key={i}/>})
                  : null
              }
            </div>
          </>
        }/>
        <Route path="/info" element={
          <>
            <h1>설명란입니다.</h1>
          </>
        }/>
      </Routes>

      <div>
        <hr style={{ marginTop : '10em' }}/>
        <div className="FooterName">yrpark, 2024 June</div>
        <div className="FooterSocial">
          <img
            className="FooterSocialIcon"
            src={require('./img/SocialInsta.png')}
            alt="Button"
            onClick={()=>{console.log("Insta Btn Clicked")}}
          />
          <img
            className="FooterSocialIcon"
            src={require('./img/SocialGithub.png')}
            alt="Button"
            onClick={()=>{console.log("GitHub Btn Clicked")}}
          />
        </div>
        <div style={{height: '5em'}}></div>
      </div>
    </div>
  );
}

function DrawTodo(props) {
  return (
    <Form>
      <div key={"default-checkbox"} className="mb-3">
        <Form.Check
          type="checkbox"
          id={"default-checkbox"}
          label={props.todo.content}
          className="CheckBox"
          checked={props.todo.status === TODO_STATUS.COMPLETE}
          onChange={ (e)=>{
            console.log(e.target.checked);
            if (e.target.checked) { props.changeStatusFunc(props.todo.id, TODO_STATUS.COMPLETE); }
            else { props.changeStatusFunc(props.todo.id, TODO_STATUS.INCOMPLETE); }
          } }
        />
        <EditImg width="25" height="25" fill="black" stroke="black" onClick={()=>{props.modalOpenFunc(true)}}/>
        <DeleteImg width="30" height="30" fill="black" stroke="black" onClick={()=>props.deleteTodoFunc(props.todo.id)}/>
      </div>
    </Form>
  );
}

function DrawModal(props) {
  return (
    <Modal
      {...props} // show={modalShow} onHide={() => setModalShow(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          모달 제목
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          type="text"
          id="inputTodo"
          aria-describedby="todoInputBlock"
          placeholder="Type..."
          className="mb-3"
          value="임시값"
          // onChange={(e)=>{setInputStr(e.target.value)}} // TODO : 추후 length 제한 걸기. 300자?
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Save</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default App;
