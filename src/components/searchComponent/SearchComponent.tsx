import { useCallback, useState } from "react";
import { useAuth } from "../../hooks";
import { Variant } from "../../types";
import Input from "../input/Input";
import WarnedHoverMessage from "../warnedHoverMessage/WarnedHoverMessage";

const SearchComponent = () => {
  const { user } = useAuth();
  const [isWarned, setIsWarned] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (user?.userName) {
      setSearch(e.target.value);
    }
  }, [user?.userName]);

  const handleMouseEnter = useCallback(() => {
    if (!user?.userName) {
      setIsWarned(true);
    }
  }, [user]);

  const handleMouseLeave = useCallback(() => {
    setIsWarned(false);
  }, []);

  return (

    <>
      <Input
        placeHolder="Search by userName..."
        variant={Variant.secondary}
        type="search"
        onChange={handleSearchChange}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        value={search}
        
      />

      {isWarned && <WarnedHoverMessage />}
    </>

  );
};

export default SearchComponent;
