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
    setSearch(e.target.value);
  }, []);

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
        disabled={!user?.userName}
        onChange={handleSearchChange}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />

      {isWarned && <WarnedHoverMessage />}
    </>

  );
};

export default SearchComponent;
