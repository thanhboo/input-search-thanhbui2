import "./todoMVC.scss";
import { useEffect, useState } from "react";

export interface InputProps {
  /** Placeholder of the input */
  placeholder?: string;
}

export interface ITodoListProps {
  value: string;
  isCompleted: boolean;
  id: number;
}

const TodoMVC = () => {
  // DO NOT remove this log
  console.log("input re-render");

  const [todoList, setTodoList] = useState<ITodoListProps[]>([]);
  const [todoCompletedList, setTodoCompletedList] = useState<ITodoListProps[]>(
    []
  );
  const [todoInCompleteList, setTodoInCompleteList] = useState<
    ITodoListProps[]
  >([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [todoListToShow, setTodoListToShow] = useState("All");
  const [isCheckedAll, setIsCheckedAll] = useState<boolean>(
    todoList.some((todo) => todo.isCompleted)
  );

  const handleInput = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLInputElement>
      | React.BaseSyntheticEvent<HTMLInputElement>
  ) => {
    if (e.type === "change") {
      setInputValue(e.target.value);
    }

    if (e.type === "keydown" && (e as React.KeyboardEvent).key === "Enter") {
      console.log("Add todo", inputValue);
      const preparedTodoTask = {
        isCompleted: false,
        value: e?.target?.value,
        id: Math.floor(Math.random() * 1000) + 1,
      };
      setTodoList((prevState) => [...prevState, preparedTodoTask]);
      setInputValue("");
    }
  };

  const onChangingTodoTaskStatus = (id: number) => {
    if (!todoList?.length) return;
    setTodoList((prevState) =>
      prevState.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const onRemovingTodoTask = (id: number) => {
    if (!todoList?.length) return;
    setTodoList((prevState) => prevState.filter((todo) => todo.id !== id));
  };

  const onClearingCompleteTask = () => {
    setTodoList((prevState) => prevState.filter((todo) => !todo.isCompleted));
  };

  const onFilteringTodoTask = (type = "All") => {
    console.log(type);

    switch (type) {
      case "Active":
        setTodoListToShow("Active");
        break;
      case "Completed":
        setTodoListToShow("Completed");
        break;

      default:
        setTodoListToShow("All");
        break;
    }
  };

  const onMarkDoneAllTasks = () => {
    setIsCheckedAll(!isCheckedAll);
    setTodoList((prevState) =>
      prevState.map((todo) => {
        return { ...todo, isCompleted: isCheckedAll };
      })
    );
  };

  useEffect(() => {
    if (!todoList?.length) return;
    setTodoCompletedList(todoList.filter((todo) => todo.isCompleted));
    setTodoInCompleteList(todoList.filter((todo) => !todo.isCompleted));
  }, [todoList]);

  // Your code start here
  return (
    <div className={"todo-mvc-component"}>
      <div className={"todo-mvc-component__input--wrapper"}>
        <div
          className={"todo-mvc-component__tick-all-btn"}
          onClick={() => {
            onMarkDoneAllTasks();
          }}
        >
          ✅
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInput}
          onKeyDown={handleInput}
          className={"todo-mvc-component__input"}
          placeholder="What needs to be done?"
        />
      </div>
      {!!todoList?.length && (
        <div className={"todo-mvc-component__todo-list"}>
          {todoListToShow === "All" &&
            todoList.map((item) => {
              return (
                <div className={"todo-mvc-component__todo-item"} key={item.id}>
                  <button
                    className={"todo-mvc-component__checkbox-btn"}
                    onClick={() => {
                      onChangingTodoTaskStatus(item.id);
                    }}
                  >
                    {item.isCompleted ? (
                      <span
                        className={
                          "todo-mvc-component__checkbox-btn__icon todo-mvc-component__checkbox-btn__icon--completed"
                        }
                      ></span>
                    ) : (
                      <span
                        className={
                          "todo-mvc-component__checkbox-btn__icon todo-mvc-component__checkbox-btn__icon--not-yet"
                        }
                      ></span>
                    )}
                  </button>
                  <label>{item.value}</label>
                  <button
                    className={"todo-mvc-component__remove-btn"}
                    onClick={() => {
                      onRemovingTodoTask(item.id);
                    }}
                  >
                    &#10060;
                  </button>
                </div>
              );
            })}
          {todoListToShow === "Active" &&
            todoInCompleteList.map((item) => {
              return (
                <div className={"todo-mvc-component__todo-item"} key={item.id}>
                  <button
                    className={"todo-mvc-component__checkbox-btn"}
                    onClick={() => {
                      onChangingTodoTaskStatus(item.id);
                    }}
                  >
                    {item.isCompleted ? (
                      <span
                        className={
                          "todo-mvc-component__checkbox-btn__icon todo-mvc-component__checkbox-btn__icon--completed"
                        }
                      ></span>
                    ) : (
                      <span
                        className={
                          "todo-mvc-component__checkbox-btn__icon todo-mvc-component__checkbox-btn__icon--not-yet"
                        }
                      ></span>
                    )}
                  </button>
                  <label>{item.value}</label>
                  <button
                    className={"todo-mvc-component__remove-btn"}
                    onClick={() => {
                      onRemovingTodoTask(item.id);
                    }}
                  >
                    &#10060;
                  </button>
                </div>
              );
            })}
          {todoListToShow === "Completed" &&
            todoCompletedList.map((item) => {
              return (
                <div className={"todo-mvc-component__todo-item"} key={item.id}>
                  <button
                    className={"todo-mvc-component__checkbox-btn"}
                    onClick={() => {
                      onChangingTodoTaskStatus(item.id);
                    }}
                  >
                    {item.isCompleted ? (
                      <span
                        className={
                          "todo-mvc-component__checkbox-btn__icon todo-mvc-component__checkbox-btn__icon--completed"
                        }
                      ></span>
                    ) : (
                      <span
                        className={
                          "todo-mvc-component__checkbox-btn__icon todo-mvc-component__checkbox-btn__icon--not-yet"
                        }
                      ></span>
                    )}
                  </button>
                  <label>{item.value}</label>
                  <button
                    className={"todo-mvc-component__remove-btn"}
                    onClick={() => {
                      onRemovingTodoTask(item.id);
                    }}
                  >
                    &#10060;
                  </button>
                </div>
              );
            })}
          <div className={"todo-mvc-component__footer"}>
            <div className={"todo-mvc-component__item-count"}>
              {todoInCompleteList?.length || 0}&nbsp;item
              {todoInCompleteList.length > 1 ? "s" : ""} left!
            </div>
            <div className={"todo-mvc-component__filters"}>
              <div
                className={`${"todo-mvc-component__filter"} ${
                  todoListToShow === "All" ? "active" : ""
                }`}
                onClick={() => {
                  onFilteringTodoTask("All");
                }}
              >
                All
              </div>
              <div
                className={`${"todo-mvc-component__filter"} ${
                  todoListToShow === "Active" ? "active" : ""
                }`}
                onClick={() => {
                  onFilteringTodoTask("Active");
                }}
              >
                Active
              </div>
              <div
                className={`${"todo-mvc-component__filter"} ${
                  todoListToShow === "Completed" ? "active" : ""
                }`}
                onClick={() => {
                  onFilteringTodoTask("Completed");
                }}
              >
                Completed
              </div>
            </div>
            <div
              className={"todo-mvc-component__clear-complete-btn"}
              onClick={onClearingCompleteTask}
            >
              Clear completed
            </div>
          </div>
        </div>
      )}
    </div>
  );
  // Your code end here
};

export default TodoMVC;
