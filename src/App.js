import './App.css';
import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  let navigate = useNavigate();

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
              />
              <Button className="AddBtn" variant="dark">+</Button>
            </div>
            <div className="FixedWidth TopBlank">
              { Checkbox() }
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

function Checkbox() {
  return (
    <Form>
      <div key={"default-checkbox"} className="mb-3">
        <div>
          <Form.Check // prettier-ignore
            type="checkbox"
            id={"default-checkbox"}
            label={"default checkbox"}
            className="CheckBox"
          />
          <CloseButton />
        </div>
        <div>
          <Form.Check
            disabled
            type="checkbox"
            label={"disabled checkbox"}
            id={"disabled-default-checkbox"}
            className="CheckBox"
          />
          <CloseButton />
        </div>
      </div>
    </Form>
  );
}


export default App;
