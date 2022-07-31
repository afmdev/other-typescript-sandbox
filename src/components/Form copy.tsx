import useNewSubForm from "../hooks/useNewSub";
import {Sub} from "../types";


interface FormProps {
  onNewSub: (newSub: Sub) => void;
}

type FormReducerAction =  {
      type: "change_value";
      payload: {
        inputName: string;
        inputValue: string;
      };
    } | {
      type: "clear";
    };

const Form = ({onNewSub}: FormProps) => {

  const [inputValues, dispatch] = useNewSubForm()

  const handleSumit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onNewSub(inputValues);
    handleClear();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
	const {name, value} = e.target
	dispatch({
		type:	"change_value",
		payload: {
			inputName: name, 
			inputValue: value
		}
	})
  };

  const handleClear = () => {
	dispatch({type: "clear"})
 };

  return (
    <div>
      <form onSubmit={handleSumit}>
        <input onChange={handleChange} value={inputValues.nick} type="text" name="nick" placeholder="nick"></input>
        <input onChange={handleChange} value={inputValues.subMonths} type="number" name="subMonths" placeholder="subMonths"></input>
        <input onChange={handleChange} value={inputValues.avatar} type="text" name="avatar" placeholder="avatar"></input>
        <textarea onChange={handleChange} value={inputValues.description} name="description" placeholder="description"></textarea>
        <button onClick={handleClear} type="button">
          Clear
        </button>
        <button type="submit">Save new Sub!</button>
      </form>
    </div>
  );
};

export default Form;
