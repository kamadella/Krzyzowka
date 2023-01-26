import React, { Component, useState } from 'react';
import authService from './api-authorization/AuthorizeService';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

export class WordList extends Component {
    constructor(props) {

        super(props);

        // Set up initial state
        this.state = {   
            words: [],
            loading: true,
        };
    }

    componentDidMount() {
        this.populateWordListData();
    }

    render() {
        if (this.state.loading) {
            return (
                <div>
                    <h1 id="tabelLabel" >Strona Pytań</h1>
                    <p>Pobieranie pytań</p>
                    <p><em>Loading...</em></p>
                </div>
            );
        }
        else {
            return (
                <div className="container">
                    <div className="dataContainer bg-light p-5 rounded">
                        <h1>Add word</h1>
                        <ShowAddWord />
                    </div>
                    <div className="dataContainer bg-light p-5 rounded">
                        <h1>Word List</h1>
                        <div className="wordList">
                            {this.state.words.map((word, index) => (
                                <ShowRow key={index} wordData={word} />
                            ))}
                        </div>
                    </div>                    
                </div>
            );
        }
    }

    async populateWordListData() {
        const token = await authService.getAccessToken();
        const response = await fetch('epcrossword/word/list', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        this.setState({ words: data, loading: false });
    }


}    

function ShowAddWord() {
    const [word, setWord] = useState("");
    const [clue, setClue] = useState("");

    function handleWordChange(event) {
        setWord(event.target.value);
    }
    function handleClueChange() {
        setClue(event.target.value);
    }

    async function handleAddSelect() {
        if (word.length > 0 && clue.length > 0) {
            await fetch('epcrossword/word/post', {
                method: 'POST',
                body: JSON.stringify({ word: word, clue: clue }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setWord("");
            setClue("");
            window.location.reload(false);
        }
        else {
            console.log("złe dane wejściowe");
        }
    }


    return (
        <div>
            <div className="form">
                <div className="inputSection">
                    <label htmlFor="word">word:</label><br />
                    <input id="word" name="word" type="text" onChange={handleWordChange} value={word} />
                </div>
                <div className="inputSection">
                    <label htmlFor="clue">clue:</label><br />
                    <textarea id="clue" name="clue" rows="4" cols="50" onChange={handleClueChange} value={clue} />
                </div>
                <button className="btn btn-success" onClick={handleAddSelect}> Confirm </button>
            </div>
        </div>
    );
}

function ShowRow({ wordData }) {
    const [open, setOpen] = useState(false);
    const [openEdit, setopenEdit] = useState(false);
    const [word, setWord] = useState(wordData.word);
    const [clue, setClue] = useState(wordData.clue);

    function handleWordChange(event) {
        setWord(event.target.value);
    }
    function handleClueChange() {
        setClue(event.target.value);
    }
    async function handleEditConfirm() {
        if (word.length > 0 && clue.length > 0) {
            wordData.word = word;
            wordData.clue = clue;
            setopenEdit(!openEdit);
            await fetch('epcrossword/word/put', {
                method: 'PUT',
                body: JSON.stringify({ Id: wordData.id, word: word, clue: clue }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        else {
            console.log("złe dane wejściowe");
        }
    }
    async function handleDeleteConfirm() {
        if (wordData.crosswords.length == 0) {
            wordData.isActive = false;
            await fetch('epcrossword/word/delete', {
                method: 'DELETE',
                body: JSON.stringify({ Id: wordData.id }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setopenEdit(!open);
        }
    }

    return ( wordData.isActive &&(
            <div className="card">
                <div className="card-header" id="headingOne" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls={"collapsable" + wordData.id}>
                    <h5 className="mb-0">
                        {wordData.word} ({ wordData.word.length })
                    </h5>
                </div>
                <Collapse in={open} className="details">
                    <div id={"collapsable" + wordData.id }>
                        <div>
                            <h3>Definicja:</h3>
                            <p className="details-info">{wordData.clue}</p>
                        </div>
                        <hr/>
                        { wordData.crosswords.length>0 && (
                            <div>
                                <h3>Użyto w:</h3>
                                {wordData.crosswords.map((crossword,index) => (
                                    <p key={wordData.id+"_"+index} className="details-info">{crossword}</p>
                                ))}
                                <hr />
                            </div>
                        )}
                        {!openEdit && (
                            <div className="row">
                                <div className="col-10"></div>
                                <div className="col-2 d-flex justify-content-center">
                                    <button className="btn btn-warning" onClick={() => setopenEdit(!openEdit)} aria-expanded={openEdit} aria-controls={"collapsable_edit" + wordData.id}>
                                        Edit
                                    </button>
                                </div>
                            </div>
                    )}
                    {openEdit &&(
                        <div>
                            <div className="form">
                                <div className="inputSection">
                                    <label htmlFor="index">Id:</label><br />
                                    <input id="index" name="index" type="number" disabled value={wordData.id} />
                                </div>
                                <div className="inputSection">
                                    <label htmlFor="word">word:</label><br />
                                    <input id="word" name="word" type="text" onChange={handleWordChange} value={word} />
                                </div>
                                <div className="inputSection">
                                    <label htmlFor="clue">clue:</label><br />
                                    <textarea id="clue" name="clue" rows="4" cols="50" onChange={handleClueChange} value={clue} />
                                </div>
                                <div className="row">
                                    <div className="col-4 d-flex justify-content-center">
                                        <button className="btn btn-warning" onClick={handleEditConfirm}>
                                            Save
                                        </button>
                                    </div>
                                    <div className="col-4 d-flex justify-content-center">
                                        <button className="btn btn-warning" onClick={() => setopenEdit(!openEdit)} aria-expanded={openEdit} aria-controls={"collapsable_edit" + wordData.id}>
                                            Cancel
                                        </button>
                                    </div>
                                    <div className="col-4 d-flex justify-content-center">
                                        <button className="btn btn-danger" onClick={handleDeleteConfirm} >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    </div>
                </Collapse>
        </div>
        )
    );

}