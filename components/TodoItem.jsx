import React from 'react';
import PropTypes from 'prop-types';

class TodoItem extends React.Component {
  state = {
    updateMode: false,
    value: null,
  };

  onInputChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  }

  onUpdateSave = () => {
    const { todoItem } = this.props;

    todoItem.set('text', this.state.value);
    todoItem.save();

    this.toggleUpdateMode();
  }

  toggleUpdateMode = () => {
    const { todoItem } = this.props;

    this.setState({
      updateMode: !this.state.updateMode,
      value: !this.state.value ? todoItem.get('text') : null,
    });
  }

  render() {
    const { todoItem } = this.props;

    if (this.state.updateMode) {
      return (
        <li>
          <input
            type="text"
            value={this.state.value}
            onChange={this.onInputChange}
          />

          <div>
            <button onClick={this.onUpdateSave}>save</button>
            <button onClick={this.toggleUpdateMode}>cancel</button>
          </div>

          <style jsx>{`
            li {
              display: flex;
              justify-content: space-between;
            }
          `}
          </style>

        </li>
      );
    }

    return (
      <li>
        <span>
          {todoItem.get('text')}
        </span>
        <div>
          <button onClick={this.toggleUpdateMode}>edit</button>
          <button onClick={() => todoItem.destroy()}>delete</button>
        </div>

        <style jsx>{`
          li {
            display: flex;
            justify-content: space-between;
          }
        `}
        </style>
      </li>
    );
  }
}

TodoItem.propTypes = {
  // eslint-disable-next-line
  todoItem: PropTypes.object.isRequired,
};


export default TodoItem;

