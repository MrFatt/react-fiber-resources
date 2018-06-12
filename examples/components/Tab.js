import React from 'react';

const style = {
  tab: {
    padding: 0,
    listStyle: 'none',
    display: 'flex',
    height: 100,
  },
  content: {
    flex: 1,
    textAlign: 'center',
    padding: 'auto',
    backgroundColor: '#eee',
    color: 'black',
    borderRadius: 3,
    fontSize: '1.2rem',
    paddingTop: 40,
  },
  active: {
    backgroundColor: 'tomato',
    color: '#fff',
  },
};

const Tab = ({isAsync, isDebounce, isSync, onClick}) => (
  <ul style={style.tab}>
    <li
      style={Object.assign({}, style.content, isAsync ? style.active : null)}
      onClick={() => onClick("async")}
    >
      Async mode
    </li>
    <li
        style={Object.assign({}, style.content, isDebounce ? style.active : null)}
        onClick={() => onClick("debounce")}
    >
        Debounce mode
    </li>
    <li
      style={Object.assign({}, style.content, isSync ? style.active : null)}
      onClick={() => onClick("sync")}
    >
      Sync mode
    </li>
  </ul>
);
export default Tab;
