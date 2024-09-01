interface CatalogCardProps {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  vote_average: number;
  poster_path: string;
  release_date: string;
  video: boolean
}

export const CatalogCard = ({ title, release_date, vote_average, poster_path, video }: CatalogCardProps) => {
  return (
    <div className="w-full max-w-sm flex bg-white border border-gray-200 rounded shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer p-4">

      <div className="max-h-48 max-w-48 flex-1 relative">
        <img className="h-full w-full rounded" src={`https://image.tmdb.org/t/p/original${poster_path}`} alt="product image" />
      </div>

      <div className="flex-1">
        <h5 className="text-xl px-4 font-semibold tracking-tight text-slate-50 dark:text-white">
          {title.length > 15 ? title.slice(0, 12) + '...' : title}
        </h5>

        <div className="flex-1">
          <div className="flex items-center justify-between w-full h-full relative">
            <div className="text-slate-50 flex items-center justify-between px-4">
              {release_date}
            </div>

            <div className={`p-1 px-2 rounded font-bold text-slate-50 ${vote_average > 7 ? 'bg-yellow-400' : ''}`}>
              {vote_average}
            </div>
          </div>
        </div>


      </div>
    </div>

  )
}