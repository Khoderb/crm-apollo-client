import React, { useEffect } from 'react'
import { Layout } from '../components/layout'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { gql, useQuery } from '@apollo/client';
import { NextPage } from 'next';

const GET_BEST_CLIENTS = gql`
    query getBestClients {
        getBestClients {
            client {
                name
                email
            }
            total
        }
    }
`;  	
const Bestclients : NextPage | any = ()=> {

    const { data, loading, error, startPolling, stopPolling } = useQuery(GET_BEST_CLIENTS);


    useEffect(() => {
        // if theres a change in the data, then startPolling will get new Data
        startPolling(1000);
        return () => {
            stopPolling();
        }
    }, [startPolling, stopPolling])

    if(loading) return 'Loading...';
    if(!data) return 'Loading...'

    const clientGraph : any = [];
    data?.getBestClients.map((client : any, index : any)  => {
        clientGraph[index] = {
            ...client.client[0],
            total: client.total
        }
    })


    return (
        <Layout>
            <h1 className="font-light text-white text-2xl tracking-widest">Best clients</h1>
            
                <ResponsiveContainer width="99%" height="80%">
                    <BarChart
                        className='mt-10'
                        width={500}
                        height={300}
                        data={clientGraph}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="total" fill="#6182CE" />
                    </BarChart>
                </ResponsiveContainer>
        </Layout>
    )
}






export default Bestclients
