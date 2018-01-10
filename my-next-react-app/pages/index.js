import {Component} from 'react'
import Page from '../components/Page'
import fetch from 'isomorphic-fetch'
import Link from 'next/link'

class Home extends Component {
    static async getInitialProps() {
        const stories = await fetch(
            'https://hacker-news.firebaseio.com/v0/beststories.json'
        );
        const jsonIDs = await stories.json();
        const storiesData = await Promise.all(
            jsonIDs.slice(0, 20).map(id =>
                fetch(
                    `https://hacker-news.firebaseio.com/v0/item/${id}.json`
                ).then(res => res.json())
            )
        );
        return {storiesData} // {storiesData: storiesData}
    }

    render() {
        const {storiesData} = this.props; // const storiesData = this.props.storiesData
        return (
            <Page>
                <h2>Best Stories</h2>
                <ul>
                    {storiesData.map((story, index) =>
                        <li key={index}>
                            {story.title} - <Link href={{pathname: '/item', query: {id: story.id}}}><a>more!</a></Link>
                        </li>)}
                </ul>
            </Page>
        )
    }
}

export default Home
