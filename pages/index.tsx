import { NextPage } from 'next'
import { Layout } from '../components/layout'
import { useQuery, gql } from '@apollo/client'
import Link from 'next/link';
import { Client } from '../components/clientui'
import { useEffect } from 'react';

export default function Home(): JSX.Element {

  interface Client {
    id: string
    name: string
    lastname: string
    company: string
    email: string
    phone?: string
  }

  const GET_CLIENTS_BY_SELLER = gql`
  query getClientsBySeller{
    getClientsBySeller{
      name
      lastname
      email
      phone
      company
      id
    }
  }
`;

  //Apollo query
  const { data,
    loading,
    startPolling,
    stopPolling
  } = useQuery(GET_CLIENTS_BY_SELLER);

  useEffect(() => {
    startPolling(500)
    return () => {
      stopPolling()
    }
  }, [startPolling, stopPolling])


  return (
    <>
      {(loading || (!data)) ? 'loading...' :
        <Layout>
          <h1 className="text-2xl text-white font-light">Clients</h1>
          <Link href="/create-client">
            <span className="py-2 px-5 mt-3 inline-block text-white text-sm transition-colors rounded-md duration-300 hover:bg-gray-900 mb-3 font-bold w-full border border-gray-400 lg:w-auto text-center">New Client</span>
          </Link>
          <div className="shadow-md mt-10 animate-2 w-lg">
              <div className="border border-b-0 border-gray-700">
                {data?.getClientsBySeller?.map( (client: Client) => (
                  <Client
                    key={client.id}
                    client={client}
                  />
                ))}
              </div>
          </div>
        </Layout>
      }
    </>
  )
}
// export default Home;