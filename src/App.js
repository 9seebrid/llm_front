import React, { useState } from 'react';
import './App.css';

function App() {
  const [question, setQuestion] = useState(''); // 입력된 질문 상태
  const [answer, setAnswer] = useState(''); // 서버로부터 받은 응답 상태
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태

  const handleInputChange = (e) => {
    setQuestion(e.target.value); // 질문 입력 값 업데이트
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 페이지 리로드 방지
    setIsLoading(true); // 로딩 상태로 변경

    try {
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }), // 질문을 서버로 전달
      });

      const data = await response.json();
      setAnswer(data.answer); // 서버로부터 받은 응답 설정
    } catch (error) {
      console.error('Error:', error);
      setAnswer('오류가 발생했습니다.');
    }

    setIsLoading(false); // 로딩 상태 해제
  };

  return (
    <div className="App">
      <h1>질문을 입력하세요:</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={question} onChange={handleInputChange} placeholder="질문을 입력하세요" required />
        <button type="submit">질문 보내기</button>
      </form>

      {isLoading ? (
        <p className="loading">응답을 기다리는 중...</p>
      ) : (
        answer && (
          <div className="answer-container">
            <p className="answer-text">
              {answer.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
          </div>
        )
      )}
    </div>
  );
}

export default App;
