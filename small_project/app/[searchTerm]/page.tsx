import {FC} from 'react';
import getWikiResults from "@/lib/getWikiResults";
import Item from "@/app/[searchTerm]/components/Item";

type Props = {
  params: {
    searchTerm: string
  }
}

export async function generateMetadata({params: {searchTerm}}: Props){
  const wikiData: Promise<SearchResult> = getWikiResults(searchTerm)
  const data = await wikiData
  const displayTerm = searchTerm.replaceAll('%20', ' ')

  if(!data?.query?.pages){
    return {
      title: `${displayTerm} not found`
    }
  }

  return {
    title: displayTerm,
    description: `search results fo ${displayTerm}`
  }
}

const SearchResults:FC<Props> = async ({params: {searchTerm}}) => {
  const wikiData: Promise<SearchResult> = getWikiResults(searchTerm)
  const data = await wikiData
  const results: Result[] | undefined = data?.query?.pages

  const content = (
    <main className={"bg-slate-200 mx-auto max-w-lg py-1 min-h-screen"}>
      {results
        ? Object.values(results).map(r => <Item key={r.pageid} result={r}/>)
        : <h2 className={"p-2 text-xl"}>{`${searchTerm} notFound`}</h2>
      }
    </main>
  )

  return content
};

export default SearchResults;