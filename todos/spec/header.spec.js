var React = require('react')
var TestUtils = require('react/lib/ReactTestUtils')
var Header = require('../src/header');

describe('Header', function() {
  it('renders', function() {
    var header = TestUtils.renderIntoDocument(<Header />);
    expect(TestUtils.isCompositeComponentWithType(header, Header)).toBeTruthy();
  });
});
