import './App.css';
import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


// components
import DrawTodo from './components/DrawTodo'
import DrawModal from './components/DrawModal'
import todoApi from './api/todoApi'
import { TODO_STATUS, PAGE_STATUS } from './constants/todoConst';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [todos, setTodos] = useState([]);
  const [inputStr, setInputStr] = useState("");
  const [tab, setTab] = useState(TODO_STATUS.ALL);
  const [mainTab, setMainTab] = useState(PAGE_STATUS.TODO);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [incompletedTodos, setIncompletedTodos] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(()=>{
    // 초반에 로컬 스토리지에서 불러오기
    todoApi.getAllTodos()
    .then((todoData) => {
      setTodos(todoData);
    })
    .catch((error) => {
      console.error('Error handling all todos:', error);
    });
      // setTodos(JSON.parse(todoData));
  }, []);

  useEffect(() => {
    if (location.pathname === '/info') {
      setMainTab(PAGE_STATUS.INFO);
    }
  }, [location]);

  useEffect(()=>{
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
    const previousTodos = [...todos];
    let tmpTodos = [...todos];
    let idx = tmpTodos.findIndex(obj => obj.id === parseInt(id));
    tmpTodos[idx].status = value;
    setTodos(tmpTodos);
    todoApi.updateTodoStatus(id, value)
    .catch((error) => {
      setTodos(previousTodos);
      console.error('Error handling change todo status:', error);
    });
  }

  function handleDeleteButtonClick(id) {
    const previousTodos = [...todos];
    let tmpTodos = [...todos];
    let idx = tmpTodos.findIndex(obj => obj.id === parseInt(id));
    tmpTodos.splice(idx, 1);
    setTodos(tmpTodos);
    todoApi.deleteTodo(id)
    .catch((error) => {
      setTodos(previousTodos);
      console.error('Error handling delete todo:', error);
    });
  }

  function handleAddButtonClick() {
    const previousTodos = [...todos];
    let newId = 1;
    if (todos.length !== 0) {
      newId = todos[todos.length-1].id + 1;
    }
    let tmpTodo = {id: newId, contents: inputStr, status: TODO_STATUS.INCOMPLETE};
    setTodos([...todos, tmpTodo]);
    setInputStr('');
    todoApi.insertTodo(newId, inputStr, TODO_STATUS.INCOMPLETE)
    .catch((error) => {
      setTodos(previousTodos);
      console.error('Error handling get all todos:', error);
    });
  }

  async function handleEditButtonClick(todo) {
    try {
      setSelectedItem(todo);
      setModalShow(true);
    } catch (error) {
      console.error('Error updating selected item:', error);
    }
  }

  function handleEditSaveButtonClick(id, value) {
    const previousTodos = [...todos];
    let tmpTodos = [...todos];
    let idx = tmpTodos.findIndex(obj => obj.id === parseInt(id));
    tmpTodos[idx].contents = value;
    setTodos(tmpTodos);

    todoApi.updateTodoContents(id, value)
    .catch((error) => {
      setTodos(previousTodos);
      console.error('Error handling edit todo:', error);
    });
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
            <DrawModal
              todo={selectedItem}
              show={modalShow}
              onHide={() => setModalShow(false)}
              onSave={handleEditSaveButtonClick}
            />
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
                  incompletedTodos.map((todo, i)=>{ return <DrawTodo todo={todo} changeStatusFunc={changeStatus} deleteTodoFunc={handleDeleteButtonClick} key={i} handleEditButtonClick={handleEditButtonClick}/>})
                  : null
              }
              {(tab === TODO_STATUS.ALL) ? <hr/> : null}
              {
                (tab === TODO_STATUS.COMPLETE || tab === TODO_STATUS.ALL) ?
                  completedTodos.map((todo, i)=>{ return <DrawTodo todo={todo} changeStatusFunc={changeStatus} deleteTodoFunc={handleDeleteButtonClick} key={i} handleEditButtonClick={handleEditButtonClick}/>})
                  : null
              }
            </div>
          </>
        }/>
        <Route path="/info" element={
          <>
            <h1><b>리액트 기반의 Todo 프로젝트입니다.</b></h1>
            <br/>
            <p style={{textAlign: 'center'}}>
              저는 강의를 듣고 스스로 React를 학습하여 본 프로젝트를 완성시켰습니다.<br/>
              연락을 원하시면 buuuuung@naver.com으로 메일을 남겨주세요.
            </p>
          </>
        }/>
      </Routes>

      <div>
        <hr style={{ marginTop : '10em' }}/>
        <div className="FooterName">yrpark, 2024 June</div>
        <div className="FooterSocial">
          <img
            className="FooterSocialIcon"
            src={require('./img/SocialGithub.png')}
            alt="Button"
            onClick={()=>{window.open('https://github.com/YerangPark', '_blank', 'noopener,noreferrer');}}
          />
        </div>
        <div style={{height: '5em'}}></div>
      </div>
    </div>
  );
}

export default App;
