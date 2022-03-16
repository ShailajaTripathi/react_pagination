import React, { useState, useEffect } from "react";
import "./table.css";
import ReactPaginate from 'react-paginate';

function Table() {
    const [page,setPage] =useState(0);
    const [Users, setUsers] = useState([]);
    const albumPage = 5;

    const visited = page * albumPage;

    function changePage({selected}){
        setPage(selected);
    }

    async function getData() {
    const res = await fetch(
      "https://itunes.apple.com/in/rss/topalbums/limit=25/json"
    );

    let resData = await res.json();
setUsers(resData.feed.entry);

  }
//   console.log(Users);

  useEffect(() => {
    getData();
  }, []);


  return (
    <div>
        <h2><i>Movies Table</i></h2>
      <table >
        <tr >
          <th>S.No.</th>
          <th>Image</th>
          <th>Category</th>
          <th> Artist Name</th>
          <th>Price</th>
          <th>Copyrights</th>

        </tr>

        {Users.slice(visited,visited+albumPage).map((e,i)=>{
            return (

                <tr key ={i}>

                <td >
                    {visited+i+1}
                </td>

                <td >
                    <img src={e['im:image'][2].label}/>
                </td>

                <td >
                    {e.category.attributes.label}      
                </td>
                <td >
                    {e['im:artist'].label}
                </td>
                <td >
                    {e['im:price'].attributes.amount}
                </td>

                <td>
                    {e.rights.label}
                </td>
              </tr>
            )
        })}


      </table>
      <ReactPaginate
							previousLabel={"<"}
							nextLabel={">"}
							pageCount={5}
							onPageChange={changePage}
							containerClassName="paginationBttns"
							previousLinkClassName="previousBttn"
							nextLinkClassName="nextBttn"
							activeClassName="paginationActive"
						/>


    </div>
  );
}

export default Table;
