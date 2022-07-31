import React, {useEffect, useRef, useState} from "react";
import "./App.css";
import List from "./components/List";
import Form from "./components/Form";
import {Sub, SubsResponseFromApi} from "./types";

interface AppState {
  subs: Array<Sub>;
  newSubsNumber: number;
}

// const INITIAL_STATE = [
//   {
//     nick: "dapelu",
//     subMonths: 3,
//     avatar: "https://i.pravatar.cc/150?u=dapelu",
//     description: "Dapelu me la pela",
//   },
//   {
//     nick: "Ale",
//     subMonths: 7,
//     avatar: "https://i.pravatar.cc/150?u=Juan",
//   },
// ];

function App() {
  const [subs, setSubs] = useState<AppState["subs"]>([]);
  const [newSubsNumber, setNewSubsNumber] = useState<AppState["newSubsNumber"]>(0);

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
	  //  setSubs(INITIAL_STATE);
	const fetchSubs =  async (): Promise<SubsResponseFromApi> => {
		const res = await fetch("http://localhost:3000/db.json");
		return await res.json();
	}

const mapFromApiToSubs = (apiResponse: SubsResponseFromApi): Array<Sub> => {
	return apiResponse.map(subFromApi => {
		const {
			months: subMonths,
			profileUrl: avatar,
			nick,
			description
		} = subFromApi
		return {
			nick,
			description,
			avatar,
			subMonths
		}
	})
}
	fetchSubs()
	.then(mapFromApiToSubs) // esta linea hace eliminar las siguientes
	.then(setSubs) // esta linea hace lo de bajo
	// .then(apiSubs=> {
	// 	const subs = mapFromApiToSubs(apiSubs)
	// 	setSubs(subs)
	// })
  }, []);

  const handleNewSub = (newSub: Sub): void => {
    setSubs((subs) => [...subs, newSub]);
	 setNewSubsNumber(n => n + 1)
  };

  return (
    <div className="App" ref={divRef}>
      <h1>midu subs</h1>
      <List subs={subs} />
		New subs: {newSubsNumber}
      <Form onNewSub={handleNewSub} />
    </div>
  );
}

export default App;
