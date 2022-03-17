import React from 'react';
import ReactDOM from 'react-dom';
import Spinner from '@/components/Spinner';
import algosdk from 'algosdk';
ReactDOM.render(<div>
  <Spinner color="red"/>
  {Object.keys(algosdk)}
</div>, document.getElementById('root'));
