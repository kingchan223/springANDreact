import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

const Detail = (props) => {
  const id = props.match.params.id;
  const [book, setBook] = useState({});

  useEffect(() => {
    fetch('http://localhost:8080/book/' + id, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setBook(res))
      .catch((error) => {
        alert('책 상세보기에 실패하였습니다.');
        console.log(error);
      });
  }, []);

  const deleteBook = () => {
    fetch('http://localhost:8080/book/' + id, { method: 'DELETE' })
      .then((res) => res.text())
      .then((res) => {
        if (res === 'ok') {
          alert('삭제에 성공하였습니다.');
          props.history.push('/');
        } else {
          alert('삭제에 실패하였습니다.');
        }
      });
  };

  const updateBook = () => {
    props.history.push('/updateForm/' + id);
  };
  return (
    <div>
      <h1>책 상세보기</h1>
      <h3>책번호: {book.id}</h3>
      <h3>책제목: {book.title}</h3>
      <h3>저자: {book.author}</h3>
      <Button variant="warning" onClick={updateBook}>
        수정
      </Button>{' '}
      <Button variant="danger" onClick={() => deleteBook(book.id)}>
        삭제
      </Button>
    </div>
  );
};
export default Detail;
