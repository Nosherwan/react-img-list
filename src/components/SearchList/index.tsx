import React from 'react';

const SearchList = ({ list }: { list: any }) => {
  return (
    <ul>
      {list.map((item: any) =>
        <li key={item.symbol}>
          {item.symbol} : {item.name}
        </li>)}
    </ul>
  )
}

export { SearchList }
