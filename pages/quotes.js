import Link from 'next/link'
import React from 'react'
import Layout from "../components/generic/Layout"
import PageRow from '../components/generic/PageRow'

import { inject, observer } from 'mobx-react'

@observer
export default class Quotes extends React.Component {
    // static async getInitialProps({ initialStoreState }) {
    //     console.log('quotes.js getInitialProps', initialStoreState)
    //     return {}
    // }
    render() {
        return (
            <Layout>
                <div>
                    <p>This is the quotes page</p>
                    <Link href="/">
                        <a>index</a>
                    </Link>
                </div>
            </Layout>
        );
    }
}