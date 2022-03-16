import React, { useState, useEffect } from "react";
import styles from "./table.css";
import Pagination from 'react-paginate';

function Table() {
    const [page,setPage] =useState(0);
    const [Users, setUsers] = useState([]);
    const albumPage = 5;

    const visited = page* albumPage;

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
        <h2 className ={styles.h2}><i>Movies Table</i></h2>
      <table className ={styles.table}>
        <tr className ={styles.tr}>
          <th className ={styles.th}>S.No.</th>
          <th className ={styles.th}>Image</th>
          <th className ={styles.th}>Category</th>
          <th className ={styles.th}> Artist Name</th>
          <th className ={styles.th}>Price</th>
          <th className ={styles.th}>Copyrights</th>

        </tr>

        {Users.slice(visited,visited+albumPage).map((e,i)=>{
            return (

                <tr key ={i}>

                <td className ={styles.td}>
                    {e.category.attributes['im:id']}
                </td>

                <td className ={styles.td}>
                    <img src={e['im:image'][2].label}/>
                </td>

                <td className ={styles.td}>
                    {e.category.attributes.label}      
                </td>
                <td className ={styles.td}>
                    {e['im:artist'].label}
                </td>
                <td className ={styles.td}>
                    {e['im:price'].attributes.amount}
                </td>

                <td className ={styles.td}>
                    {e.rights.label}
                </td>
              </tr>
            )
        })}


      </table>
      <Pagination 
       previousLabel ={'<'}
       nextLabel ={'>'}
       pageCount ={5}
       containerClassName ={styles.paginationBttns}
       previousLinkClassName={styles.previousBttn}
       nextLinkClassName={styles.nextBttn}
       activeLinkClassName={styles.paginationActive}
       />

    </div>
  );
}

export default Table;
