import React, { useEffect } from "react";

const uws = new WebSocket("ws://localhost:5001/uws");

function App() {
  useEffect(() => {
    uws.onopen = (e) => {
      console.log(e);
    };
    uws.onmessage = (e) => {
      console.log(e.data);
      const reader = new FileReader();
      reader.readAsBinaryString(e.data);
      reader.onload = () => {
        // 해석된 데이터 받음
        console.log(reader.result);
      };
      console.log(e);
    };
    uws.onerror = (e) => {
      console.log(e);
    };
    uws.onclose = (e) => {
      console.log(e);
    };
  }, []);
  const handleSend = () => {
    const data = {
      name: "kimson",
      age: 25,
      gender: 1,
    };

    const jsonData = JSON.stringify(data);
    const binaryData = jsonData
      .split("")
      .map((json) => json.charCodeAt(0).toString(2));
    const encoder = new TextEncoder();
    const encodedBinaryData = encoder.encode(binaryData);
    console.log(encodedBinaryData);
    uws.send(encodedBinaryData);
  };
  return (
    <div className='App'>
      <button onClick={handleSend}>send</button>
    </div>
  );
}

export default App;
