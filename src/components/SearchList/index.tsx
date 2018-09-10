import React from 'react';
const styles = require('./styles.css');

const SearchList = ({ list }: { list: any }) => {
  return (
    <ul className={styles.list_container}>
      {list.map((item: any) =>
        <li key={item.get('symbol')}>
          <a>
            {item.get('symbol')} : {item.get('name')}
          </a>
        </li>)}
    </ul>
  )
}

export { SearchList }
