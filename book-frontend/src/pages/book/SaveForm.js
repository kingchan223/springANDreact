import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const SaveForm = (props) => {
  const [book, setBook] = useState({
    title: '',
    author: '',
  });

  const changeValue = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  const submitBook = (e) => {
    e.preventDefault(); // 이래야 action을 안탄다.
    fetch('http://localhost:8080/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(book),
    })
      .then((res) => {
        console.log(1, res);
        if (res.status === 201) return res.json();
        else return null;
      })
      .then((res) => {
        if (res !== null) {
          props.history.push('/');
        } else {
          alert('책 등록에 실패하였습니다.');
        }
      })
      .catch((error) => {
        //원래는 catch문 하나만 써도 된다.
        console.log(error);
      });
  };

  return (
    <div>
      <h1>책 등록하기</h1>
      <Form onSubmit={submitBook}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>책 이름</Form.Label>
          <Form.Control
            type="text"
            placeholder="책 이름을 입력하세요"
            onChange={changeValue}
            name="title"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>책 저자</Form.Label>
          <Form.Control
            type="text"
            placeholder="저자를 입력하세요"
            onChange={changeValue}
            name="author"
          />
        </Form.Group>
        <Button variant="success" type="submit">
          등록하기
        </Button>
      </Form>
    </div>
  );
};

export default SaveForm;
