var React = require('react')
var TestUtils = require('react/lib/ReactTestUtils')
var Header = require('../src/header');

describe('Header', function() {
  beforeEach(function() {
    this.itemsStore = {
      push: function() {}
    };

    this.component = TestUtils.renderIntoDocument(
      <Header itemsStore={this.itemsStore} />
    );
  });

  it('creates a new task', function() {
    var task = 'Make the bed';

    var taskInput =
      TestUtils.findRenderedDOMComponentWithTag(this.component, 'input');
    taskInput.value = task;

    TestUtils.Simulate.change(taskInput, {target: taskInput});
    expect(this.component.state.text).toEqual(task);

    spyOn(this.itemsStore, 'push');

    var addTaskButton =
      TestUtils.findRenderedDOMComponentWithTag(this.component, 'button');
    TestUtils.Simulate.click(addTaskButton);

    expect(this.itemsStore.push)
      .toHaveBeenCalledWith({
        text: task,
        done: false
      });

    expect(this.component.state.text).toEqual('');
  });
});
