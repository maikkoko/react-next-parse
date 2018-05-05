import React, { Component } from 'react';
import Head from 'next/head';
import initParse from '../lib/init';
import TodoList from '../components/TodoList';

class Home extends Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
    this.state = {
      disabled: true,
    };
  }

  async componentDidMount() {
    this.Parse = await initParse();

    // eslint-disable-next-line
    this.setState({ disabled: false, });
  }

  submit = (e) => {
    e.preventDefault();

    const Todo = this.Parse.Object.extend('Todo');
    const todoItem = new Todo();

    todoItem.set('text', this.inputRef.current.value);
    todoItem.save().then((newTodo) => {
      // eslint-disable-next-line no-console
      console.log(`New todo item created with id: ${newTodo.id}`);
      this.inputRef.current.value = '';
    }, (error) => {
      // eslint-disable-next-line no-console
      console.error(`Something went wrong: ${error.message}`);
    });
  }

  render() {
    return (
      <div>
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=yes"
          />
        </Head>


        <h3>Todo List</h3>
        <form onSubmit={this.submit}>
          <input
            disabled={this.state.disabled}
            type="text"
            placeholder="Add todo"
            ref={this.inputRef}
          />
        </form>
        <TodoList />
      </div>
    );
  }
}

export default Home;
