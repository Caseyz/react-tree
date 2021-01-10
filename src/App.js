import React from 'react';
import Tree from './Tree/index'

import data from './data'

function App() {
  return (
    <div className="App">
      <Tree
        // height={300}
        dataSource={data}
        getEditParams={(obj => { console.log(obj, 'obj') })}
        getAdd={(obj => { console.log(obj, 'obj') })}
      />
    </div>
  );
}

export default App;
