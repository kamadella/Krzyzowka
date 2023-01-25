import React, { Component } from 'react';
import { redirect } from "react-router-dom";
import authService from './api-authorization/AuthorizeService';

export class CrosswordList extends Component {
  constructor(props) {
    
    super(props);

      // Set up initial state
      this.state = {
          crosswords:[],
          loading: true,
      };
  }

    componentDidMount() {
        this.populateCrosswordListData();
    }


    static renderCrosswordsTable(crosswords) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>name</th>
                        <th>size</th>
                        <th>questions</th>
                    </tr>
                </thead>
                <tbody>
                    {crosswords.map(crossword =>
                        <tr key={crossword.id}>
                            <td>{crossword.id}</td>
                            <td><a href={"/crossword?id="+crossword.id}><b>{crossword.name}</b></a></td>
                            <td>{crossword.width}x{crossword.height}</td>
                            <td>{crossword.questionCount}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        if (!this.state.crosswords.length > 0) {
            return (
                <div>
                    <h1 id="tabelLabel" >Strona Krzyżówek</h1>
                    <p>Pobieranie Krzyżówek</p>
                    <p><em>Loading...</em></p>
                </div>
            );
        }
        else {
            let contents = this.state.loading
                ? <p><em>Loading...</em></p>
                : CrosswordList.renderCrosswordsTable(this.state.crosswords);

            return (
                <div>
                    <h1 id="tabelLabel" >Dostępne krzyżówki</h1>
                    {contents}
                </div>
            );
        }        
    }

    async populateCrosswordListData() {
      const token = await authService.getAccessToken();
        const response = await fetch('epcrossword/list/', {
          headers: !token ? {} : { 'Authorization': `Bearer ${token}` }

      });
      const data = await response.json();
        this.setState({ crosswords: data, loading: false });
  }
}