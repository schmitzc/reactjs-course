var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils');
var List = require('../src/list');
var ListItem = require('../src/list-item');

describe('List', function() {
  it('shows a message if there are no items in list', function() {
    var component = TestUtils.renderIntoDocument(
      <List items={null} />
    );

    var message = TestUtils.findRenderedDOMComponentWithTag(component, 'h4');
    expect(message.props.children).toEqual('Add a task to get started.');
  });

  it('shows a list of items', function() {
    items = {
      'a': {
        item: 'Make the bed'
      },
      'b': {
        item: 'Clean'
      }
    };

    var component = TestUtils.renderIntoDocument(
      <List items={items} />
    );

    var listItems = TestUtils.scryRenderedComponentsWithType(component, ListItem);
    expect(listItems.length).toEqual(2);

    var listItem1 = listItems[0];
    var key1 = 'a';
    var item1 = items[key1];
    item1.id = key1;

    expect(listItem1.props.item).toEqual(item1);

    var listItem2 = listItems[1];
    var key2 = 'b';
    var item2 = items[key2];
    item2.id = key2;

    expect(listItem2.props.item).toEqual(item2);
  });
});
