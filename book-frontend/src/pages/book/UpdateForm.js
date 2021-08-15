import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const UpdateForm = (props) => {
  const id = props.match.params.id;
  const [book, setBook] = useState({
    title: '',
    author: '',
  });

  useEffect(() => {
    fetch('http://localhost:8080/book/' + id, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setBook(res))
      .catch((error) => {
        alert('수정할 책 정보를 불러오는 데에 실패하였습니다.');
        console.log(error);
      });
  }, []);

  const changeValue = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  const submitBook = (e) => {
    e.preventDefault(); // 이래야 action을 안탄다.
    fetch('http://localhost:8080/book/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(book),
    })
      .then((res) => {
        console.log(1, res);
        if (res.status === 200) return res.json();
        else return null;
      })
      .then((res) => {
        if (res !== null) {
          alert('책 정보 수정에 성공하였습니다.');
          props.history.push('/book/' + id);
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
      <h1>책 수정하기</h1>
      <Form onSubmit={submitBook}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>책 이름</Form.Label>
          <Form.Control
            type="text"
            placeholder="책 이름을 입력하세요"
            onChange={changeValue}
            name="title"
            value={book.title}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>책 저자</Form.Label>
          <Form.Control
            type="text"
            placeholder="저자를 입력하세요"
            onChange={changeValue}
            name="author"
            value={book.author}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          수정하기
        </Button>
      </Form>
    </div>
  );
};

export default UpdateForm;
