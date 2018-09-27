import React, { Component } from "react";
import Note from './Notes/Note'
import NoteForm from './NoteForm/NoteForm';
import {db} from './Config/config.js';
import {auth} from './Config/config.js';

class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            notes: [],
            loading: true,
            authenticated: false,
            user: null
        }
        this.database = db.ref().child('notes');
        this.addNote = this.addNote.bind(this);
        this.removeNote = this.removeNote.bind(this);
    }

    componentWillMount() {
        
            auth.onAuthStateChanged(user => {
              if (user) {
                this.setState({
                  authenticated: true,
                  currentUser: user,
                  loading: false
                });
              } else {
                this.setState({
                  authenticated: false,
                  currentUser: null,
                  loading: false
                });
              }
            });
        
        
            const previousNotes = this.state.notes;
            this.database.on('child_added', snap => {
              previousNotes.push({
                id: snap.key,
                noteContent: snap.val().noteContent,
              });
        
              this.setState({
                notes: previousNotes
              })
            })
        
            this.database.on('child_removed', snap => {
              for(var i=0; i < previousNotes.length; i++){
                if(previousNotes[i].id === snap.key){
                  previousNotes.splice(i, 1);
                }
              }

            this.setState({
                notes: previousNotes
            })
        })
        
        this.setState({
            notes: previousNotes
        })
    }

    addNote(note) {
        this.database.push().set({
            noteContent: note
        })
    }
    
    removeNote(noteId) {
        this.database.child(noteId).remove();
    }

    render(){
        return (
            <div className="container">
                <h2 className="titulo">My keep :)</h2>
            
                <div className="notes">
                    {
                    this.state.notes.map((note) => {
                        return (
                        <Note noteContent={note.noteContent} 
                            noteId={note.id} 
                            key={note.id} 
                            removeNote={this.removeNote}/>
                        )
                    })
                    }
                </div>
            
                <div className="footer">
                    <NoteForm addNote={this.addNote} />
                </div>
            
            </div>
        )
    }
};

export default Home;