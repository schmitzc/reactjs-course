var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils');
var Firebase = require('firebase');
var ListItem = require('../src/list-item');

describe('ListItem', function() {
  beforeEach(function() {
    this.item = {
      id: 'a',
      text: 'Make the bed',
      done: false
    }

    this.component = TestUtils.renderIntoDocument(
      <ListItem key='a' item={this.item} />
    );

    spyOn(this.component.firebase, 'update');
    spyOn(this.component.firebase, 'remove');
  });

  it('sets the initial state', function() {
    expect(this.component.state.text).toEqual(this.item.text);
    expect(this.component.state.done).toEqual(this.item.done);
    expect(this.component.state.textChanged).toEqual(false);
  });

  it('marks a task as completed', function() {
    var doneCheckbox =
      TestUtils.findRenderedDOMComponentWithClass(this.component, 'done-checkbox');

    expect(doneCheckbox.props.checked).toEqual(false);

    doneCheckbox.checked = true;
    TestUtils.Simulate.change(doneCheckbox, {target: doneCheckbox});

    expect(this.component.state.done).toEqual(true);
    expect(this.component.firebase.update)
      .toHaveBeenCalledWith({done: true});
  });

  it('undos changes to task text', function() {
    var taskInput =
      TestUtils.findRenderedDOMComponentWithClass(this.component, 'form-control');

    expect(taskInput.props.value).toEqual(this.item.text);

    taskInput.value = 'updated';
    TestUtils.Simulate.change(taskInput, {target: taskInput});

    expect(this.component.state.text).not.toEqual(this.item.text);
    expect(this.component.state.textChanged).toEqual(true);

    var undoButton =
      TestUtils.findRenderedDOMComponentWithClass(this.component, 'undo-button');
    TestUtils.Simulate.click(undoButton);

    expect(this.component.state.text).toEqual(this.item.text);
    expect(this.component.state.textChanged).toEqual(false);
  });

  it('saves changes to task text', function() {
    var taskInput =
      TestUtils.findRenderedDOMComponentWithClass(this.component, 'form-control');

    expect(taskInput.props.value).toEqual(this.item.text);

    var updatedTask = 'updated';
    taskInput.value = updatedTask;
    TestUtils.Simulate.change(taskInput, {target: taskInput});

    expect(this.component.state.textChanged).toEqual(true);

    var saveButton =
      TestUtils.findRenderedDOMComponentWithClass(this.component, 'save-button');
    TestUtils.Simulate.click(saveButton);

    expect(this.component.state.textChanged).toEqual(false);
    expect(this.component.firebase.update)
      .toHaveBeenCalledWith({text: updatedTask});
  });

  it('deletes the task', function() {
    var deleteButton =
      TestUtils.findRenderedDOMComponentWithClass(this.component, 'delete-button');
    TestUtils.Simulate.click(deleteButton);

    expect(this.component.firebase.remove).toHaveBeenCalled();
  });
});
