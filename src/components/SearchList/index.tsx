import React from 'react';
const styles = require('./styles.css');

const SearchList = ({ list }: { list: any }) => {
  return (
    <ul className={styles.list_container}>
      {list.map((item: any) => {
        const id = item.get('id');
        return (<li key={id}>
          <a>
            {item.get('title')}
            {item.get('thumbnailUrl')}
          </a>
        </li>);
      })
      }
    </ul>
  )
}

export { SearchList }
