import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import { useAppDispatch, useAppSelector } from '../../redux/utils/hooks';
import { decrement, increment } from '../../redux/slices/counter';
import { HomeProps } from './types/homeProps';

const Home = ({ title }:HomeProps) => {
  const { count } = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();

  return (
  <div className="flex min-h-screen flex-col items-center justify-center py-2">
    <Head>
      <title>BEIN Web</title>
    </Head>
    <nav className="w-full border-b-2">
      <ul className="flex space-x-8 justify-center">
        <li className="hover:text-slate-500">
          <Link href="/csr">CSR</Link>
        </li>
        <li className="hover:text-slate-500">
          <Link href="/ssg">SSG</Link>
        </li>
        <li className="hover:text-slate-500">
          <Link href="/ssr">SSR</Link>
        </li>
      </ul>
    </nav>
    <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
      <div>{`Home Page: ${title}`}</div>
      <div className="mt-8">{`Counter Example: ${count}`}</div>
      <section className="flex space-x-4 mt-4">
        <button onClick={() => dispatch(decrement())}>Decrement</button>
        <button onClick={() => dispatch(increment())}>Increment</button>
      </section>
    </main>
  </div>
  );
};

export default Home;
