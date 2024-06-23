import './App.css';
import React, { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const TODO_STATUS = {
  INCOMPLETE : 1,
  COMPLETE : 2,
}

function App() {
  const navigate = useNavigate();

  const [todos, setTodos] = useState([{id: 1, content: 'Do sth', status: TODO_STATUS.INCOMPLETE},
    {id: 2, content: 'Do anything', status: TODO_STATUS.COMPLETE}]);
  const [inputStr, setInputStr] = useState("");
  const sortedTodos = [...todos].sort((a, b) => {
    if (a.status === TODO_STATUS.INCOMPLETE && b.status === TODO_STATUS.COMPLETE) {
      return -1;
    }
    if (a.status === TODO_STATUS.COMPLETE && b.status === TODO_STATUS.INCOMPLETE) {
      return 1;
    }
    return 0;
  });


  function changeStatus(id, value) {
    let tmpTodos = [...todos];
    let idx = tmpTodos.findIndex(obj => obj.id === parseInt(id));
    tmpTodos[idx].status = value;
    setTodos(tmpTodos);
  }

  function handleButtonClick() {
    let tmpTodo = {id: todos[todos.length-1].id + 1, content: inputStr, status: TODO_STATUS.INCOMPLETE};
    setTodos([...todos, tmpTodo]);
    setInputStr('');
  }

  return (
    <div className="App">
      <div>
        <Nav className="justify-content-end TopBlank" activeKey="/home">
          <Nav.Item>
            <Nav.Link
              className="ActiveLink"
              onClick={()=>{ navigate('/') }}>
              Todo
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              className="Link"
              onClick={()=>{ navigate('/contact') }}>
              Contact
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>

      <Routes>
        <Route path="/" element={
          <>
            <p className="Title">Todo</p>
            <div>
              <Nav className="justify-content-center" activeKey="/home">
                <Nav.Item>
                  <Nav.Link className="ActiveLink" href="/home">All</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="Link" eventKey="link-1">Completed</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="Link" eventKey="link-2">Incompleted</Nav.Link>
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
              <Button className="AddBtn" variant="dark" onClick={handleButtonClick}>+</Button>
            </div>
            <div className="FixedWidth TopBlank">
              { sortedTodos.map((todo, i)=>{ return <DrawTodo todo={todo} changeStatusFunc={changeStatus} key={i}/> }) }
            </div>
          </>
        }/>
        <Route path="/contact" element={
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
        <Form.Check // prettier-ignore
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
        <CloseButton />
      </div>
    </Form>
  );
}


export default App;
