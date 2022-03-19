import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { VariableSizeList } from 'react-window';
import { hacksListFake } from '../src/mocks/main-page-mocks/hacks-list';

const items = hacksListFake;

const Row = ({ index, style }) => {
  const item = items[index];
  return (
    <div style={style}>
      <h1>{ item.title }</h1>
    </div>
  );
};

export default function IndexPage({ ping, getServerSidePropsError }) {
  const [text, setText] = useState('');

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setText(`${Math.random()}`);
    }, 1000);
    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      Hello
      {' '}
      {text}
      <VariableSizeList
        itemSize={() => 100}
        height={600}
        itemCount={items.length}
        width={1000}
      >
        {Row}
      </VariableSizeList>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const response = (await axios.get('')).data;
    return {
      props: {
        getServerSidePropsError: false,
        ping: response,
      },
    };
  } catch (error) {
    return {
      props: {
        getServerSidePropsError: true,
      },
    };
  }
}
