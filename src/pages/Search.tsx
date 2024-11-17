import SearchInput from "../components/SearchInput"
import { plantProps } from "../types";

function Search() {
  const plants: plantProps[] = [{ common_name: 'Coconut', image_url: '' }]; 
  
  return (
    <main>
      <SearchInput />
      <section>
        <h2>Previous Searches</h2>
        <div className="grid grid-cols-3">
          
        </div>
      </section>
    </main>
  );
}

export default Search
