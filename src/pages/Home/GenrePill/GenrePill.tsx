type GenrePillProps = {
  genre: string;
  handleSelectedFilter: () => void;
  isSelected: boolean;
};

export const GenrePill = ({ genre, handleSelectedFilter, isSelected }: GenrePillProps) => {
  return (
    <div
      className={`p-2 m-1 text-slate-900 rounded-lg cursor-pointer inline-block transition-all duration-200 ${
        isSelected ? 'bg-blue-500' : 'bg-gray-300'
      }`}
      onClick={handleSelectedFilter}
    >
      {genre}
    </div>
  );
};