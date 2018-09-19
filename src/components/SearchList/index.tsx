import React from 'react';
const styles = require('./styles.css');

const SearchList = ({ list, setPhoto, showOverlay }:
  { list: any, setPhoto: any, showOverlay: any }) => {
  return (
    <ul className={styles.list_container}>
      {list.map((item: any) => {
        const id = item.get('id');
        return (
          <li key={id}>
            <div>
              <img src={item.get('url')} />
              <div></div>
              <div>
                {item.get('title')}
              </div>
              <button onClick={() => {
                setPhoto(item)
                showOverlay(true)
              }}>View full size</button>
            </div>
          </li>
        );
      })
      }
    </ul>
  )
}

export { SearchList }
