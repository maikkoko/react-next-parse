import { Component } from 'react';
import initParse from '../lib/init';
import TodoItem from './TodoItem';

class TodoList extends Component {
  state = {
    todoItems: [],
  }

  async componentDidMount() {
    const Parse = await initParse();

    const Todo = Parse.Object.extend('Todo');
    const query = new Parse.Query(Todo);
    query.descending('createdAt');
    query.find().then((todoItems) => {
      this.setState({ todoItems });
    }, (error) => {
      // eslint-disable-next-line no-console
      console.error(`Something went wrong: ${error.message}`);
    });

    this.subscription = query.subscribe();
    this.subscription.on('open', () => {
      // eslint-disable-next-line no-console
      console.info('Subscription open on todo items.');
    });

    this.subscription.on('create', (newTodo) => {
      this.setState({
        todoItems: [newTodo, ...this.state.todoItems],
      });
    });

    this.subscription.on('delete', (deletedTodo) => {
      this.setState({ todoItems: this.state.todoItems.filter(item => item.id !== deletedTodo.id) });

      // eslint-disable-next-line no-console
      console.info(`Deleted item with id: ${deletedTodo.id}`);
    });
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  renderItems = () => this.state.todoItems.map(item => <TodoItem key={item.id} todoItem={item} />)

  render() {
    return (
      <ul>
        {this.renderItems()}
      </ul>
    );
  }
}

export default TodoList;
