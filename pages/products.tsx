import { NextPage } from 'next'
import { Layout } from '../components/layout'
import { gql, useQuery } from '@apollo/client'
import { Product } from '../components/Product'
import Link from 'next/link'


const GET_PRODUCTS = gql`
 query getProducts{
    getProducts{
      name
      existence
      price
      id
    }
}
`

interface Product {
    name: string
    existence: number
    price: number
    id: string

}
const Products: NextPage = () => {

    const { data, loading, error } = useQuery(GET_PRODUCTS);

    return (
        <>
            <Layout>
                <h1 className="text-2xl text-white font-light">Products</h1>
                <Link href="/create-product">
                    <span className="bg-gray-800 py-2 px-5 mt-3 inline-block text-white text-sm transition-colors duration-300 hover:bg-gray-900 mb-3 font-bold w-full    lg:w-auto text-center">New Product</span>
                </Link>
                <div className="overflow-x-scroll">
                    <table className="table-auto shadow-md mt-10 w-full animate-2 w-lg">
                        <thead className="bg-gray-900">
                            <tr className="text-white">
                                <th className="w-1/5 py-2">Name</th>
                                <th className="w-1/5 py-2">Existence</th>
                                <th className="w-1/5 py-2">Price</th>
                                <th className="w-1/5 py-2 ">Delete</th>
                                <th className="w-1/5 py-2">Edit</th>
                            </tr>
                        </thead>

                        <tbody className="bg-white">
                            {data?.getProducts?.map((prod: Product) => ( 
                                <Product
                                    key={prod.id}
                                    product={prod}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>

            </Layout>
        </>
    )
}
export default Products;