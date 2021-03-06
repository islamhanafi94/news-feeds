import React, { useEffect, useState } from 'react'
import NanBar from '../navbar';
import SourcesList from './sourcesList';
import Spinner from '../common/spinner';
import sourcesService from '../../services/sourcesService';

function SourcesPage(props) {
    const [sources, setSources] = useState([]);
    const [userSubscribes, setUserSubscribes] = useState([])
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            const sources = await sourcesService.getAvailableSources();
            const subscribes = await sourcesService.getUserSources();
            setUserSubscribes(subscribes)
            setSources(sources)
            setIsLoaded(true)
        })()
    }, [])

    return (
        <>
            <NanBar />
            {isLoaded ? <SourcesList title="Available Resources" userSubscribes={userSubscribes} sources={sources} /> : <Spinner />}
        </>
    )
}

export default SourcesPage
