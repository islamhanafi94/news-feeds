import React, { useState, useEffect } from 'react'
import NanBar from '../navbar';
import Spinner from '../common/spinner';
import ArticlesList from './articlesList';
import newsService from '../../services/newsService';
function Home(props) {
    const [articles, setArticles] = useState([]);
    const [msg, setMsg] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            const { data } = await newsService.getNews();
            if (data.message) {
                setIsLoaded(true)
                return setMsg(data.message)
            }
            setArticles(data.articles)
            setIsLoaded(true)

        })();
    }, [])

    return (
        <>
            <NanBar />
            {isLoaded ? (<ArticlesList title={msg || "News Feeds"} sources={articles} />) : <Spinner />}
        </>
    )
}


export default Home
