import { useEffect, useState } from "react"

const useMediaQuery = (query) =>
{
    const [matches, setMatches] = useState(window.matchMedia(query).matches);

    useEffect(() =>
    {
        const mediaQueryList = window.matchMedia(query);
        const changehandler = () => setMatches(mediaQueryList.matches);

        mediaQueryList.addEventListener('change', changehandler);
        
        return () =>
        {
            mediaQueryList.removeEventListener('change', changehandler);
        }
    }, [query])
}