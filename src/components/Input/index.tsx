import "./input.scss";
import { fetchData } from "../../utils/fetch-data";
import { debounce } from "../../utils/deboucne";
import Loader from "../Loader";
import { ChangeEvent, useCallback, useRef, useState } from "react";

export interface InputProps {
  /** Placeholder of the input */
  placeholder?: string;
  /** On click item handler */
  onSelectItem: (item: string) => void;
}

export interface InputStates {
  isInitital?: boolean;
  isFetching?: boolean;
  errorMessage?: string;
  searchData?: string[];
}

const Input = ({ placeholder, onSelectItem }: InputProps) => {
  // DO NOT remove this log
  console.log("input re-render");

  const currentRenderTime = useRef<number>(0);
  const [inputState, setInputState] = useState<InputStates | null>(null);

  const handleCallAPI = debounce(async (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    if (!searchTerm) {
      setInputState(null);
      return;
    }

    const renderTime = currentRenderTime.current + 1;
    currentRenderTime.current = renderTime;
    if (!inputState?.isFetching) {
      setInputState({ isFetching: true });
    }
    if (currentRenderTime.current === renderTime && inputState?.isFetching) {
      try {
        const response = await fetchData(searchTerm);

        console.log(response);
        setInputState({
          searchData: response,
          errorMessage: "",
          isFetching: false,
        });
      } catch (error) {
        console.log("error when searching", error);
        setInputState({
          errorMessage: `error when searching ${error}`,
          searchData: [],
          isFetching: false,
        });
      }
    }
  }, 100);

  const renderHasResultBlock = () => {
    return (
      <div className={"input-search-component__result-block--has-data"}>
        {inputState?.searchData?.map((item, index) => {
          return (
            <div
              key={`search-result-${index}`}
              className={"input-search-component__result-item"}
              onClick={() => {
                onSelectItem(item);
              }}
            >
              {item}
            </div>
          );
        })}
      </div>
    );
  };

  const renderBlankResultBlock = () => {
    return (
      !inputState?.errorMessage &&
      !inputState?.searchData?.length && (
        <div className={"input-search-component__result-block--no-data"}>
          "No data matching your search. Pleas try again! "
        </div>
      )
    );
  };

  const renderErrorBlock = () => {
    return (
      inputState?.errorMessage && (
        <div className={"input-search-component__result-block--no-data"}>
          {inputState?.errorMessage}
        </div>
      )
    );
  };

  const renderResultBlock = () => {
    return (
      <div className={"input-search-component__result-block"}>
        {inputState?.isFetching && <Loader />}
        {!inputState?.isFetching && (
          <>
            {renderHasResultBlock}
            {renderBlankResultBlock}
            {renderErrorBlock}
          </>
        )}
      </div>
    );
  };

  // Your code start here
  return (
    <div className={"input-search-component"}>
      <input
        placeholder={placeholder}
        onChange={handleCallAPI}
        className={"input-search-component__input-search"}
      />
      {renderResultBlock()}
    </div>
  );
  // Your code end here
};

export default Input;
