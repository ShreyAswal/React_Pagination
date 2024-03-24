import { useEffect, useRef, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [data, setData] = useState('');
  const [currdata, setcurrdata] = useState('');
  const [page, setPage] = useState(1);
  const [flag,setFlag] = useState(false);

  const noOfPostsPerPage = 10;

  const lastPostIndex = page * noOfPostsPerPage - 1;
  const firstPostIndex = lastPostIndex - noOfPostsPerPage + 1;

  //To mark first page render
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
      .then((data) => {

        setData(data);
        // console.log(data);

        setcurrdata(
          data
            .slice(
              firstPostIndex,lastPostIndex
            )
            .map((content, i) => {
              // console.log(page);
              // console.log(content);
              return content.body;
            })
        );
        setFlag(!flag);
        // console.log(flag)
      });
  }, []);


  useEffect(() => {
    // console.log(page);
    // console.log(flag)
    if (flag) {
      setcurrdata(
        data
          .slice(
            firstPostIndex,lastPostIndex
          )
          .map((content, i) => {
            // console.log(page);
            // console.log(content);
            return content.body;
          })
      );
    }
  }, [page]);

  const handleFirst = () => {
    // console.log("handleFirst")
    setPage(1);
    // console.log(page);
    // handlePage();
  };

  // console.log(page);

  const handlePage = () => {
    // console.log(page)
    if(page === 10){
      setPage(1);
      // console.log("Page is 10 or 0")
    } else {
      setPage(page + 1);

      // console.log('Else condition');
    }
  };

  return (
    <>
      <p>{currdata}</p>
      <button onClick={()=>{handleFirst(); }}>First Page</button>
      <h1>{page}</h1>
      <button onClick={handlePage}>Next Page</button>
    </>
  );
}

export default App;
