import { NextPage } from 'next';
import Link from 'next/link';

import { getItems, useGetItemsQuery } from '../../redux/api/items';
import { wrapper } from '../../redux/wrapper';
import { getRunningOperationPromises } from '../../redux/api/base';

const ServerSideRenderingPage: NextPage = () => {
  const {
    data: items,
    isLoading,
  } = useGetItemsQuery();

  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <div>
      <Link href="/" passHref>
        <a
          href="willBeReplacedByNextLink"
          className="hover:text-slate-500"
        >
          Back to home
        </a>
      </Link>
      <h1 className="mt-10">Server Side Rendering:</h1>
      <ul>
        {items?.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ServerSideRenderingPage;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    store.dispatch(getItems.initiate());

    await Promise.all(getRunningOperationPromises());

    return { props: {} };
  },
);
