// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { memo, useEffect, useState, useMemo } from "react";
import { useAppSelector } from "../hooks";
import {SearchProps, ThemeStyles, Todo, TodoGroup} from "../types/types";
import type {FuseResult} from "fuse.js";
import Fuse from "fuse.js";
import { debounce } from "lodash";

export const Search = memo(function({ keys, setter, list }: SearchProps) {
  const theme = useAppSelector(state => state.global.theme);
  const [searchQuery, setSearchText] = useState<string>("");
  const [result, setResult] = useState<TodoGroup[] | Todo[]>([]);

  const search = useMemo(() => {
    // @ts-ignore
    const fuse = new Fuse(list , {
      keys: keys,
      includeScore: true
    });

    return debounce((query: string) => {
      const searchResults = fuse.search(query);
      setResult(searchResults.map((result: FuseResult<Todo | TodoGroup>) => result.item));
    }, 500);
  }, [list, keys]);

  useEffect(() => {
    if (searchQuery.trim().length !== 0) {
      search(searchQuery);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery.trim().length !== 0) {
      setter && setter(result);
    } else {
     setter && setter(list);
    }
  }, [result]);

  return (
    <div className="relative w-full min-w-[200px]">
      <img
        className={`absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5`}
        src={theme === "light" ? "/assets/search.svg" : "/assets/search-white.svg"} alt="search" />
      <input type="text" onChange={(e) => setSearchText(e.target.value)}
             className={`pl-8 w-full h-9 rounded ${theme} ${theme === ThemeStyles.light ? "focus:outline-none focus:ring-2 focus:ring-purple focus:ring-opacity-40 border border-purple" :
               "focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-40 border border-white"}`}
             placeholder="Search note..." />
    </div>
  );
});