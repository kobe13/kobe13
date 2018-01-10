import {Component} from 'react'
import Page from '../components/Page'
import fetch from 'isomorphic-fetch'
import moment from 'moment'

class Item extends Component {

    static async getInitialProps({query}) {
        const response = await fetch(
            `https://hacker-news.firebaseio.com/v0/item/${query.id}.json`
        );
        const item = await response.json();
        return {item}
    }

    render() {
        const {title, text, url, time} = this.props.item;
            return (
            <Page>
                <div>
                    <h4>{title}</h4>
                    <p>{text}</p>
                    <a href={url}>{url}</a>
                    <i> - {moment(time).format('MMM Do YY')}</i>
                </div>
            </Page>
        )
    }
}

export default Item
