import { NextPage } from 'next';
import Link from 'next/link';

import { getItems, useGetItemsQuery } from '../../redux/api/items';
import { wrapper } from '../../redux/wrapper';
import { getRunningOperationPromises } from '../../redux/api/base';

const ServerSideGeneratingPage: NextPage = () => {
  const {
    data: items,
    isLoading,
  } = useGetItemsQuery();
  // eslint-disable-next-line no-console
  console.log(items, 'ITEMS');
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
      <h1 className="mt-10">Server Side Generating:</h1>
      <ul>
        {items?.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ServerSideGeneratingPage;

export const getStaticProps = wrapper.getStaticProps(
  (store) => async () => {
    store.dispatch(getItems.initiate());

    await Promise.all(getRunningOperationPromises());

    return { props: {} };
  },
);
